import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import L from 'leaflet'

// Interfaces
interface Incident {
  id: string
  code: string
  category: 'PCCC' | 'ANTT' | 'ATTP' | 'Môi trường' | 'Đô thị' | 'Tiếng ồn'
  title: string
  location: string
  village: string
  timeAgo: string
  severity: 'Cao' | 'Trung bình' | 'Thấp'
  status: string
  statusType: 'danger' | 'warning' | 'info' | 'success'
  coords: [number, number]
  icon: string
  bgColor: string
  bgLight: string
  textColor: string
  pulse?: boolean
}

interface VillageProgress {
  name: string
  completed: number
  total: number
  rate: number
  statusNote: string
  statusColor: string
}

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate()
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersGroupRef = useRef<L.LayerGroup | null>(null)
  const heatmapGroupRef = useRef<L.LayerGroup | null>(null)
  const boundaryGroupRef = useRef<L.LayerGroup | null>(null)
  const facilitiesGroupRef = useRef<L.LayerGroup | null>(null)

  // Filter & Layer States
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [radarHeatmap, setRadarHeatmap] = useState<boolean>(true)
  const [showIncidents, setShowIncidents] = useState<boolean>(true)
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true)
  const [showBoundaries, setShowBoundaries] = useState<boolean>(true)
  const [showFacilities, setShowFacilities] = useState<boolean>(false)
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null)

  // Coordinates: Center on Can Lộc, Hà Tĩnh
  const CAN_LOC_CENTER: [number, number] = [18.5284, 105.7483]

  // Bounding box strictly restricting zoom & pan within Hà Tĩnh Province
  // Southwest (Kỳ Anh / Deo Ngang / border): [17.80, 105.00]
  // Northeast (Nghi Xuân / Cửa Lò border): [18.90, 106.60]
  const HA_TINH_BOUNDS: L.LatLngBoundsExpression = [
    [17.80, 105.0],
    [18.90, 106.6],
  ]

  // Commune polygon approximate boundary (Can Lộc commune)
  const COMMUNE_BOUNDARY: [number, number][] = [
    [18.548, 105.72],
    [18.553, 105.742],
    [18.549, 105.768],
    [18.539, 105.782],
    [18.521, 105.776],
    [18.511, 105.756],
    [18.513, 105.731],
    [18.528, 105.716],
  ]

  // Village labels
  const VILLAGES = [
    { name: 'THÔN THƯỢNG XÁ', coords: [18.541, 105.728] as [number, number] },
    { name: 'THÔN KIM ĐÍNH', coords: [18.538, 105.761] as [number, number] },
    { name: 'THÔN PHÚC HẬU', coords: [18.529, 105.736] as [number, number] },
    { name: 'TRUNG TÂM XÃ (CHỢ)', coords: [18.5284, 105.7483] as [number, number], isCenter: true },
    { name: 'THÔN SƠN HÀ', coords: [18.525, 105.767] as [number, number] },
    { name: 'THÔN HỒNG TRIỀU', coords: [18.519, 105.739] as [number, number] },
    { name: 'THÔN TRÂM LẠC', coords: [18.518, 105.761] as [number, number] },
  ]

  // Incidents data matching home.html
  const incidents: Incident[] = [
    {
      id: 'inc-1',
      code: 'PA-2401',
      category: 'PCCC',
      title: 'Khói lớn từ khu chứa phế liệu gần đường lớn',
      location: 'Gần đường liên xã',
      village: 'Thôn Phúc Hậu',
      timeAgo: '12 phút trước',
      severity: 'Cao',
      status: 'Đang xử lý (Cán bộ địa bàn đã tới)',
      statusType: 'warning',
      coords: [18.53, 105.7355],
      icon: 'local_fire_department',
      bgColor: 'bg-error',
      bgLight: 'bg-error-container',
      textColor: 'text-error',
      pulse: true,
    },
    {
      id: 'inc-2',
      code: 'PA-2402',
      category: 'ANTT',
      title: 'Tụ tập xe máy lạng lách sau 23h tại ngã ba làng',
      location: 'Ngã ba đường làng',
      village: 'Thôn Trâm Lạc',
      timeAgo: '25 phút trước',
      severity: 'Trung bình',
      status: 'Mới tiếp nhận',
      statusType: 'info',
      coords: [18.5195, 105.762],
      icon: 'security',
      bgColor: 'bg-secondary',
      bgLight: 'bg-secondary-fixed',
      textColor: 'text-secondary',
    },
    {
      id: 'inc-3',
      code: 'PA-2403',
      category: 'Môi trường',
      title: 'Xả rác thải nông nghiệp xuống kênh mương tưới tiêu',
      location: 'Kênh tưới tiêu N2',
      village: 'Thôn Hồng Triều',
      timeAgo: '40 phút trước',
      severity: 'Thấp',
      status: 'Mới',
      statusType: 'info',
      coords: [18.5175, 105.738],
      icon: 'delete_sweep',
      bgColor: 'bg-primary-container',
      bgLight: 'bg-primary-fixed',
      textColor: 'text-primary',
    },
    {
      id: 'inc-4',
      code: 'PA-2404',
      category: 'ATTP',
      title: 'Cơ sở chế biến thịt không đảm bảo vệ sinh an toàn',
      location: 'Khu chế biến thịt',
      village: 'Chợ Can Lộc',
      timeAgo: '1 giờ trước',
      severity: 'Cao',
      status: 'Đang xử lý (Tổ KT liên ngành)',
      statusType: 'warning',
      coords: [18.5284, 105.7483],
      icon: 'restaurant',
      bgColor: 'bg-tertiary',
      bgLight: 'bg-tertiary-fixed',
      textColor: 'text-tertiary',
    },
    {
      id: 'inc-5',
      code: 'PA-2405',
      category: 'Đô thị',
      title: 'Lấn chiếm vỉa hè đặt biển quảng cáo che khuất tầm nhìn',
      location: 'Đường trục chính',
      village: 'Đường trục xã',
      timeAgo: '2 giờ trước',
      severity: 'Thấp',
      status: 'Đang xử lý',
      statusType: 'warning',
      coords: [18.5335, 105.7512],
      icon: 'traffic',
      bgColor: 'bg-inverse-surface',
      bgLight: 'bg-surface-container-highest',
      textColor: 'text-on-surface',
    },
    {
      id: 'inc-6',
      code: 'PA-2406',
      category: 'ANTT',
      title: 'Gây mất trật tự công cộng tại quán ăn đêm',
      location: 'Cụm dân cư số 3',
      village: 'Thôn Kim Đính',
      timeAgo: '3 giờ trước',
      severity: 'Trung bình',
      status: 'Đã hòa giải cơ sở',
      statusType: 'success',
      coords: [18.5365, 105.7595],
      icon: 'two_wheeler',
      bgColor: 'bg-secondary',
      bgLight: 'bg-secondary-fixed',
      textColor: 'text-secondary',
    },
    {
      id: 'inc-7',
      code: 'PA-2407',
      category: 'PCCC',
      title: 'Đốt rơm rạ sát đường dân sinh gây khói mù',
      location: 'Khu vực đồng bãi',
      village: 'Thôn Thượng Xá',
      timeAgo: '4 giờ trước',
      severity: 'Trung bình',
      status: 'Đã dập tắt & nhắc nhở',
      statusType: 'success',
      coords: [18.542, 105.726],
      icon: 'local_fire_department',
      bgColor: 'bg-error',
      bgLight: 'bg-error-container',
      textColor: 'text-error',
    },
  ]

  // Key facilities (218 cơ sở trọng điểm) sample
  const FACILITIES = [
    { name: 'UBND Xã Can Lộc', coords: [18.528, 105.747] as [number, number], type: 'Hành chính' },
    { name: 'Trạm Y tế Xã', coords: [18.527, 105.749] as [number, number], type: 'Y tế' },
    { name: 'Trường THCS Can Lộc', coords: [18.531, 105.745] as [number, number], type: 'Giáo dục' },
    { name: 'Chợ Trung tâm Can Lộc', coords: [18.5284, 105.7483] as [number, number], type: 'Thương mại' },
    { name: 'Cây xăng Hồng Triều', coords: [18.52, 105.741] as [number, number], type: 'CSKD Xăng dầu' },
    { name: 'Kho mộc Thôn Kim Đính', coords: [18.537, 105.759] as [number, number], type: 'PCCC Trọng điểm' },
  ]

  // Village progress data
  const villagesProgress: VillageProgress[] = [
    {
      name: 'Thôn Trâm Lạc',
      completed: 8,
      total: 9,
      rate: 89.0,
      statusNote: '1 đang xử lý',
      statusColor: 'text-secondary',
    },
    {
      name: 'Thôn Hồng Triều',
      completed: 6,
      total: 7,
      rate: 85.7,
      statusNote: '1 mới tiếp nhận',
      statusColor: 'text-secondary',
    },
    {
      name: 'Thôn Sơn Hà',
      completed: 4,
      total: 4,
      rate: 100.0,
      statusNote: 'Không tồn đọng',
      statusColor: 'text-tertiary',
    },
    {
      name: 'Thôn Phúc Hậu',
      completed: 3,
      total: 6,
      rate: 50.0,
      statusNote: '2 vụ quá hạn',
      statusColor: 'text-error',
    },
    {
      name: 'Thôn Kim Đính',
      completed: 5,
      total: 6,
      rate: 83.3,
      statusNote: '1 đang điều tra',
      statusColor: 'text-secondary',
    },
    {
      name: 'Thôn Thượng Xá',
      completed: 5,
      total: 6,
      rate: 83.3,
      statusNote: '1 phối hợp huyện',
      statusColor: 'text-secondary',
    },
  ]

  // Category Filter Chips
  const categoryFilters = [
    { id: 'all', label: 'Tất cả (38)', icon: 'layers', count: 38 },
    { id: 'ANTT', label: 'ANTT (18)', colorDot: 'bg-secondary', count: 18 },
    { id: 'PCCC', label: 'PCCC (8)', colorDot: 'bg-error', count: 8 },
    { id: 'ATTP', label: 'ATTP (12)', colorDot: 'bg-tertiary', count: 12 },
    { id: 'Môi trường', label: 'Môi trường (14)', colorDot: 'bg-primary-container', count: 14 },
    { id: 'Đô thị', label: 'Đô thị (22)', colorDot: 'bg-inverse-surface', count: 22 },
    { id: 'Tiếng ồn', label: 'Tiếng ồn (5)', colorDot: 'bg-outline', count: 5 },
  ]

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // 1. Create Leaflet Map restricted strictly to Hà Tĩnh Province
    const map = L.map(mapContainerRef.current, {
      center: CAN_LOC_CENTER,
      zoom: 13,
      minZoom: 9, // Minimum zoom shows the entire Ha Tinh province, won't zoom out past Ha Tinh
      maxZoom: 18,
      maxBounds: HA_TINH_BOUNDS, // Strictly restrict panning beyond Ha Tinh
      maxBoundsViscosity: 1.0, // Hard boundary elasticity - user cannot pan outside Ha Tinh
      zoomControl: false, // We use custom styled controls
      attributionControl: false,
    })

    // 2. Base Tile Layer (OpenStreetMap standard / crisp tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
    }).addTo(map)

    // 3. Layer Groups for Toggling
    const boundaryGroup = L.layerGroup().addTo(map)
    const heatmapGroup = L.layerGroup().addTo(map)
    const facilitiesGroup = L.layerGroup().addTo(map)
    const markersGroup = L.layerGroup().addTo(map)

    boundaryGroupRef.current = boundaryGroup
    heatmapGroupRef.current = heatmapGroup
    facilitiesGroupRef.current = facilitiesGroup
    markersGroupRef.current = markersGroup
    mapInstanceRef.current = map

    // Render Boundary & Villages
    renderBoundaries(boundaryGroup)

    // Render Heatmaps
    renderHeatmap(heatmapGroup)

    // Render Facilities (if enabled)
    renderFacilities(facilitiesGroup)

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Helper to render boundaries & village tags
  const renderBoundaries = (group: L.LayerGroup) => {
    group.clearLayers()

    // Can Loc Commune Boundary Polygon
    L.polygon(COMMUNE_BOUNDARY, {
      color: '#91000a',
      weight: 2,
      dashArray: '6, 6',
      fillColor: '#91000a',
      fillOpacity: 0.05,
    }).addTo(group)

    // Village Markers / Labels
    VILLAGES.forEach((v) => {
      const villageIcon = L.divIcon({
        className: 'custom-div-icon',
        iconSize: [120, 24],
        iconAnchor: [60, 12],
        html: `
          <div class="flex items-center justify-center pointer-events-none">
            <span class="px-2 py-0.5 rounded-md shadow-xs border ${v.isCenter
            ? 'bg-[#91000a] text-white font-bold text-[11px] border-[#91000a]'
            : 'bg-white/95 text-[#5b403d] font-semibold text-[10px] border-[#e4beb9]'
          }">
              ${v.name}
            </span>
          </div>
        `,
      })
      L.marker(v.coords, { icon: villageIcon, interactive: false }).addTo(group)
    })
  }

  // Helper to render heatmap circles
  const renderHeatmap = (group: L.LayerGroup) => {
    group.clearLayers()

    // Hotspot 1 (Chợ Can Lộc - High Activity)
    L.circle([18.5284, 105.7483], {
      radius: 400,
      color: 'transparent',
      fillColor: '#fdd355',
      fillOpacity: 0.28,
    }).addTo(group)

    L.circle([18.5284, 105.7483], {
      radius: 180,
      color: 'transparent',
      fillColor: '#ba1a1a',
      fillOpacity: 0.35,
    }).addTo(group)

    // Hotspot 2 (Thôn Phúc Hậu - PCCC)
    L.circle([18.53, 105.7355], {
      radius: 320,
      color: 'transparent',
      fillColor: '#ba1a1a',
      fillOpacity: 0.25,
    }).addTo(group)

    // Hotspot 3 (Thôn Trâm Lạc - ANTT)
    L.circle([18.5195, 105.762], {
      radius: 350,
      color: 'transparent',
      fillColor: '#0060a4',
      fillOpacity: 0.22,
    }).addTo(group)
  }

  // Helper to render Facilities
  const renderFacilities = (group: L.LayerGroup) => {
    group.clearLayers()
    FACILITIES.forEach((fac) => {
      const facIcon = L.divIcon({
        className: 'custom-div-icon',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -13],
        html: `
          <div class="w-6 h-6 rounded-md bg-white border-2 border-primary text-primary flex items-center justify-center shadow-md">
            <span class="material-symbols-outlined text-[14px]">account_balance</span>
          </div>
        `,
      })
      const marker = L.marker(fac.coords, { icon: facIcon })
      marker.bindPopup(`
        <div class="p-3">
          <div class="font-bold text-xs text-primary">${fac.name}</div>
          <div class="text-[11px] text-gray-500 mt-0.5">Loại: ${fac.type}</div>
          <div class="text-[10px] text-gray-400 mt-1">Cơ sở trọng điểm giám sát xã Can Lộc</div>
        </div>
      `)
      marker.addTo(group)
    })
  }

  // Update incident markers whenever active category or incident list changes
  useEffect(() => {
    const group = markersGroupRef.current
    if (!group) return

    group.clearLayers()

    if (!showIncidents) return

    const filtered =
      activeCategory === 'all'
        ? incidents
        : incidents.filter((inc) => inc.category === activeCategory)

    filtered.forEach((inc) => {
      // Color scheme for marker badge
      let markerBgClass = 'bg-[#ba1a1a]'
      if (inc.category === 'ANTT') markerBgClass = 'bg-[#745b00]'
      else if (inc.category === 'ATTP') markerBgClass = 'bg-[#00487d]'
      else if (inc.category === 'Môi trường') markerBgClass = 'bg-[#b71c1c]'
      else if (inc.category === 'Đô thị') markerBgClass = 'bg-[#3e2c2a]'

      const markerHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          ${inc.pulse
          ? `<span class="absolute w-8 h-8 rounded-full ${markerBgClass} animate-ping opacity-75"></span>`
          : ''
        }
          <div class="w-8 h-8 rounded-full ${markerBgClass} text-white flex items-center justify-center shadow-lg border-2 border-white transform transition-transform hover:scale-125">
            <span class="material-symbols-outlined text-[18px]">${inc.icon}</span>
          </div>
        </div>
      `

      const icon = L.divIcon({
        className: 'custom-div-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
        html: markerHtml,
      })

      const marker = L.marker(inc.coords, { icon })

      // Custom Leaflet Popup with modern rounded corners
      const popupContent = `
        <div class="p-3.5 max-w-[260px]">
          <div class="flex items-center justify-between gap-2 pb-1.5 border-b border-gray-100 mb-2">
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-xs text-[#91000a]">${inc.code}</span>
              <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${inc.category === 'PCCC'
          ? 'bg-red-100 text-red-700'
          : inc.category === 'ANTT'
            ? 'bg-amber-100 text-amber-800'
            : inc.category === 'ATTP'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-orange-100 text-orange-800'
        }">
                ${inc.category}
              </span>
            </div>
            <span class="text-[10px] text-gray-400 font-medium">${inc.timeAgo}</span>
          </div>
          <div class="font-semibold text-xs text-[#271816] leading-snug mb-2">
            ${inc.title}
          </div>
          <div class="flex flex-col gap-1 text-[11px] text-gray-600 mb-2.5">
            <div class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px] text-gray-400">location_on</span>
              <span>${inc.village}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[13px] text-gray-400">priority_high</span>
              <span>Mức độ: <strong class="${inc.severity === 'Cao' ? 'text-red-600' : 'text-amber-600'
        }">${inc.severity}</strong></span>
            </div>
          </div>
          <div class="bg-gray-50 p-1.5 rounded-md text-[10px] font-semibold text-gray-700 border border-gray-100">
            Trạng thái: ${inc.status}
          </div>
        </div>
      `

      marker.bindPopup(popupContent)
      marker.on('click', () => {
        setSelectedIncidentId(inc.id)
      })
      marker.addTo(group)
    })
  }, [activeCategory, showIncidents])

  // Sync Layer visibility states
  useEffect(() => {
    if (heatmapGroupRef.current) {
      if (showHeatmap && radarHeatmap) {
        renderHeatmap(heatmapGroupRef.current)
      } else {
        heatmapGroupRef.current.clearLayers()
      }
    }
  }, [showHeatmap, radarHeatmap])

  useEffect(() => {
    if (boundaryGroupRef.current) {
      if (showBoundaries) {
        renderBoundaries(boundaryGroupRef.current)
      } else {
        boundaryGroupRef.current.clearLayers()
      }
    }
  }, [showBoundaries])

  useEffect(() => {
    if (facilitiesGroupRef.current) {
      if (showFacilities) {
        renderFacilities(facilitiesGroupRef.current)
      } else {
        facilitiesGroupRef.current.clearLayers()
      }
    }
  }, [showFacilities])

  // Pan to incident when clicked in sidebar list
  const handleSelectIncident = (inc: Incident) => {
    setSelectedIncidentId(inc.id)
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(inc.coords, 15, { duration: 1 })
      // Open popup
      markersGroupRef.current?.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          const latLng = layer.getLatLng()
          if (
            Math.abs(latLng.lat - inc.coords[0]) < 0.0001 &&
            Math.abs(latLng.lng - inc.coords[1]) < 0.0001
          ) {
            layer.openPopup()
          }
        }
      })
    }
  }

  // Map Controls
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn()
  }

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut()
  }

  const handleResetCenter = () => {
    mapInstanceRef.current?.flyTo(CAN_LOC_CENTER, 13, { duration: 1 })
  }

  const handleFitHaTinh = () => {
    mapInstanceRef.current?.flyToBounds(HA_TINH_BOUNDS, { duration: 1.2 })
  }

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* 1. Page Header & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              DỮ LIỆU ĐỊA CHÍNH &amp; GIÁM SÁT TRỰC TUYẾN
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              • Tuần 42 (14/10 - 20/10/2024)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-1.5">
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
              Bảng Điều Hành GIS &amp; Phản Ánh Hiện Trường Cấp Xã
            </h1>
            <span className="px-2.5 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-xs">
              ĐỊA BÀN CAN LỘC
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/report')}
            className="h-10 px-4 rounded-xl bg-white border border-[#E4E7EC] text-primary hover:bg-surface-container font-body-md text-body-md font-semibold flex items-center gap-1.5 shadow-xs hover:shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Xuất báo cáo ngày
          </button>
          <button
            onClick={() => navigate('/feedback')}
            className="h-10 px-4 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-body-md text-body-md font-semibold flex items-center gap-2 shadow-xs hover:shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Tiếp nhận phản ánh tại bàn
          </button>
        </div>
      </div>

      {/* 2. Top 4 KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter">
        {/* KPI 1 */}
        <div className="relative bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Tổng tiếp nhận tuần này
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display-lg text-display-lg text-primary font-bold">38</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">vụ việc</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">folder_special</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-fixed px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +8.4%
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              so với tuần trước (35 vụ)
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="relative bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-fixed-dim"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Đang thụ lý giải quyết
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display-lg text-display-lg text-secondary font-bold">14</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">hồ sơ mở</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed/40 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">pending_actions</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
            <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              Trong hạn: <strong>12</strong>
            </span>
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-error font-semibold bg-error-container/60 px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-[13px]">warning</span> Quá hạn: 2
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="relative bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Đã hoàn thành bàn giao
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display-lg text-display-lg text-tertiary font-bold">24</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">kết luận</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[24px]">check_circle</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Tỷ lệ: <strong className="text-tertiary font-bold">87.5%</strong>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-md font-medium">
              SLA TB: 16 giờ
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="relative bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Cơ sở địa bàn &amp; Giám sát
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display-lg text-display-lg text-on-surface font-bold">
                  218
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">hộ/CSKD</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">store</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
            <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              Camera ANTT: <strong className="text-primary font-bold">32/32</strong> trực tuyến
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              100% kết nối
            </span>
          </div>
        </div>
      </section>

      {/* 3. Main Bento Grid (Map & Charts / Incidents) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
        {/* LEFT COLUMN (Span 8) */}
        <div className="xl:col-span-8 flex flex-col gap-gutter">
          {/* Main Map Card */}
          <div className="bg-white rounded-xl border border-[#E4E7EC] shadow-sm overflow-hidden flex flex-col">
            {/* Map Card Header */}
            <div className="p-4 md:p-5 flex flex-wrap items-center justify-between gap-3 bg-surface-container-low border-b border-[#E4E7EC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">satellite_alt</span>
                </div>
                <div>
                  <h2 className="font-title-lg text-title-lg text-on-surface font-bold">
                    Bản đồ GIS Địa bàn Số Xã Can Lộc
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Tọa độ trung tâm: 18.5284° N, 105.7483° E • Phạm vi giám sát giới hạn trong tỉnh
                    Hà Tĩnh
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRadarHeatmap(!radarHeatmap)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold transition-all shadow-xs border ${radarHeatmap
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-on-surface border-[#E4E7EC] hover:bg-gray-50'
                    }`}
                >
                  <span className="material-symbols-outlined text-[15px]">radar</span>
                  Radar Heatmap: {radarHeatmap ? 'BẬT' : 'TẮT'}
                </button>
              </div>
            </div>

            {/* Thematic Category Chips */}
            <div className="px-4 py-2.5 bg-white flex flex-wrap items-center gap-2 border-b border-[#E4E7EC] overflow-x-auto">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold mr-1">
                Lớp chuyên đề:
              </span>
              {categoryFilters.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1.5 transition-all ${isActive
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                  >
                    {cat.icon && (
                      <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
                    )}
                    {cat.colorDot && (
                      <span className={`w-2 h-2 rounded-full ${cat.colorDot}`}></span>
                    )}
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Interactive Leaflet Map Container */}
            <div className="relative w-full h-[470px] bg-[#f2f4f8] overflow-hidden select-none">
              {/* The div where Leaflet attaches */}
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Floating Layer Settings Overlay (Top-Left) */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md border border-[#E4E7EC] text-on-surface max-w-[210px] z-10">
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-outline-variant/30">
                  <span className="font-label-sm text-label-sm font-bold text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    Bảng lớp bản đồ
                  </span>
                </div>
                <div className="space-y-1.5 font-label-sm text-label-sm">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="checkbox"
                      checked={showIncidents}
                      onChange={(e) => setShowIncidents(e.target.checked)}
                      className="accent-primary rounded w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>Phản ánh / Vi phạm</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="checkbox"
                      checked={showHeatmap}
                      onChange={(e) => setShowHeatmap(e.target.checked)}
                      className="accent-primary rounded w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>Heatmap điểm nóng</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="checkbox"
                      checked={showBoundaries}
                      onChange={(e) => setShowBoundaries(e.target.checked)}
                      className="accent-primary rounded w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>Ranh giới 6 thôn/xóm</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="checkbox"
                      checked={showFacilities}
                      onChange={(e) => setShowFacilities(e.target.checked)}
                      className="accent-primary rounded w-3.5 h-3.5 cursor-pointer"
                    />
                    <span>218 Cơ sở trọng điểm</span>
                  </label>
                </div>
              </div>

              {/* Floating Custom Map Controls (Bottom-Right) */}
              <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 z-10">
                <button
                  onClick={handleZoomIn}
                  title="Phóng to"
                  className="w-9 h-9 rounded-lg bg-white/95 backdrop-blur-md text-on-surface shadow-md border border-[#E4E7EC] flex items-center justify-center hover:bg-surface-container hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
                <button
                  onClick={handleZoomOut}
                  title="Thu nhỏ"
                  className="w-9 h-9 rounded-lg bg-white/95 backdrop-blur-md text-on-surface shadow-md border border-[#E4E7EC] flex items-center justify-center hover:bg-surface-container hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <button
                  onClick={handleResetCenter}
                  title="Về trung tâm Xã Can Lộc"
                  className="w-9 h-9 rounded-lg bg-white/95 backdrop-blur-md text-primary shadow-md border border-[#E4E7EC] flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">my_location</span>
                </button>
                <button
                  onClick={handleFitHaTinh}
                  title="Toàn cảnh tỉnh Hà Tĩnh"
                  className="w-9 h-9 rounded-lg bg-white/95 backdrop-blur-md text-tertiary shadow-md border border-[#E4E7EC] flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">map</span>
                </button>
              </div>

              {/* Floating Map Legend (Bottom-Left) */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-label-sm text-on-surface font-label-sm shadow-md border border-[#E4E7EC] flex flex-wrap items-center gap-3 z-10">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-error"></span> PCCC/Khẩn cấp
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> ANTT
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> ATTP
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span> MT/Đô thị
                </span>
              </div>
            </div>

            {/* Village Handling Progress Section */}
            <div className="p-4 md:p-5 bg-white border-t border-[#E4E7EC]">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    analytics
                  </span>
                  <span className="font-title-lg text-title-lg text-on-surface font-bold">
                    Tiến độ xử lý phản ánh theo Thôn / Xóm
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Cập nhật 5 phút trước
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {villagesProgress.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:border-primary/30 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-body-md text-body-md font-bold text-on-surface">
                        {v.name}
                      </span>
                      <span className="font-label-sm text-label-sm font-semibold text-tertiary">
                        Hoàn thành: {v.completed}/{v.total} vụ
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden my-1 flex">
                      <div
                        className="h-full bg-tertiary rounded-full transition-all duration-500"
                        style={{ width: `${v.rate}%` }}
                      ></div>
                      {v.rate < 100 && (
                        <div
                          className="h-full bg-error rounded-full"
                          style={{ width: `${100 - v.rate}%` }}
                        ></div>
                      )}
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-between mt-1">
                      <span>Tỷ lệ: {v.rate}%</span>
                      <span className={`font-medium ${v.statusColor}`}>{v.statusNote}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Span 4) */}
        <div className="xl:col-span-4 flex flex-col gap-gutter">
          {/* Card: Phân loại tuần này */}
          <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  pie_chart
                </span>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                  Phân loại tuần này
                </h3>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md">
                74 lượt vi phạm/tin
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1.5">
                  <span className="text-on-surface font-medium flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-inverse-surface"></span> Trật tự Đô
                    thị &amp; Lấn chiếm
                  </span>
                  <span className="font-bold text-on-surface">22 vụ (30%)</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-inverse-surface rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1.5">
                  <span className="text-on-surface font-medium flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> An ninh trật tự
                    (ANTT)
                  </span>
                  <span className="font-bold text-on-surface">18 vụ (24%)</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1.5">
                  <span className="text-on-surface font-medium flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span> Vệ sinh &amp;
                    Môi trường
                  </span>
                  <span className="font-bold text-on-surface">14 vụ (19%)</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-container rounded-full"
                    style={{ width: '19%' }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1.5">
                  <span className="text-on-surface font-medium flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> An toàn thực phẩm
                    (ATTP)
                  </span>
                  <span className="font-bold text-on-surface">12 vụ (16%)</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full" style={{ width: '16%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1.5">
                  <span className="text-on-surface font-medium flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error"></span> Phòng cháy chữa cháy
                    (PCCC)
                  </span>
                  <span className="font-bold text-on-surface">8 vụ (11%)</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-error rounded-full" style={{ width: '11%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Phản ánh hiện trường mới nhất */}
          <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E4E7EC]">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
                  <h3 className="font-title-lg text-title-lg text-primary font-bold">
                    Phản ánh hiện trường mới nhất
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Cập nhật trực tiếp từ người dân Can Lộc
                </span>
              </div>
              <button
                onClick={() => navigate('/feedback')}
                className="text-tertiary hover:underline font-label-sm text-label-sm font-semibold flex items-center gap-0.5"
              >
                Xem tất cả
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* List of incidents */}
            <div className="flex flex-col gap-3">
              {incidents.slice(0, 5).map((inc) => {
                const isSelected = selectedIncidentId === inc.id
                return (
                  <div
                    key={inc.id}
                    onClick={() => handleSelectIncident(inc)}
                    className={`p-3.5 rounded-xl flex flex-col gap-1.5 transition-all cursor-pointer border ${isSelected
                        ? 'bg-surface-container border-primary shadow-xs'
                        : 'bg-surface-container-low border-transparent hover:border-outline-variant hover:bg-surface-container'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-md text-label-md font-bold text-primary">
                          {inc.code}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md font-label-sm text-label-sm font-bold ${inc.category === 'PCCC'
                              ? 'bg-error-container text-on-error-container'
                              : inc.category === 'ANTT'
                                ? 'bg-secondary-fixed text-on-secondary-fixed'
                                : inc.category === 'ATTP'
                                  ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                                  : inc.category === 'Môi trường'
                                    ? 'bg-primary-fixed text-on-primary-fixed-variant'
                                    : 'bg-surface-container-highest text-on-surface'
                            }`}
                        >
                          {inc.category}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          • {inc.village}
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-error font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>{' '}
                        {inc.timeAgo}
                      </span>
                    </div>
                    <p className="font-body-md text-body-md font-semibold text-on-surface leading-snug">
                      {inc.title}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span
                        className={`inline-flex items-center gap-1 text-label-sm font-semibold ${inc.severity === 'Cao'
                            ? 'text-error'
                            : inc.severity === 'Trung bình'
                              ? 'text-secondary'
                              : 'text-on-surface-variant'
                          }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${inc.severity === 'Cao'
                              ? 'bg-error'
                              : inc.severity === 'Trung bình'
                                ? 'bg-secondary'
                                : 'bg-outline'
                            }`}
                        ></span>
                        Mức độ: {inc.severity}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-label-sm text-label-sm font-bold ${inc.statusType === 'warning'
                            ? 'bg-secondary-container text-on-secondary-container'
                            : inc.statusType === 'info'
                              ? 'bg-surface-container-high text-on-surface'
                              : 'bg-tertiary-fixed text-tertiary'
                          }`}
                      >
                        {inc.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination / Summary Footer */}
            <div className="mt-4 pt-3 border-t border-[#E4E7EC] flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Tổng cộng: 38 tin tuần này
              </span>
              <div className="flex items-center gap-1.5">
                <button className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-label-sm text-label-sm font-bold shadow-xs">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
