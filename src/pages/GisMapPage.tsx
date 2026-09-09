import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'

interface Hotspot {
  id: string
  code: string
  title: string
  category: 'ANTT' | 'PCCC' | 'ATTP' | 'Môi trường' | 'Đô thị'
  coords: [number, number]
  address: string
  timeAgo: string
  priority: 'Khẩn cấp' | 'Cao' | 'Trung bình'
  status: 'Đang xử lý' | 'Đã điều động' | 'Chờ xử lý'
  reporterName: string
  reporterPhone: string
  vneidLevel: string
  assignedOfficer: string
  officerRole: string
  officerPhone: string
  distanceToPolice: string
  distanceToClinic: string
  evidenceImage?: string
  isFocal?: boolean
}

interface Landmark {
  id: string
  name: string
  type: 'police' | 'ubnd' | 'clinic' | 'school' | 'market' | 'post'
  coords: [number, number]
  icon: string
  color: string
  textColor: string
  bgColor: string
  borderColor: string
  description: string
}

export const GisMapPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)

  // Layer groups
  const boundaryLayerGroupRef = useRef<L.LayerGroup | null>(null)
  const landmarksLayerGroupRef = useRef<L.LayerGroup | null>(null)
  const hotspotsLayerGroupRef = useRef<L.LayerGroup | null>(null)
  const measurementLayerGroupRef = useRef<L.LayerGroup | null>(null)

  // States
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('Ngã 3 đường liên thôn, Thôn Trâm Lạc')
  const [isSatellite, setIsSatellite] = useState<boolean>(false)
  const [showRadius, setShowRadius] = useState<boolean>(true)
  const [showDistance, setShowDistance] = useState<boolean>(true)
  const [showBoundaries, setShowBoundaries] = useState<boolean>(true)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Landmark checkboxes state
  const [landmarkVisibility, setLandmarkVisibility] = useState({
    police: true,
    ubnd: true,
    clinic: true,
    school: true,
    market: true,
    post: true,
  })

  // Bounding box strictly restricting zoom & pan within Hà Tĩnh Province
  const HA_TINH_BOUNDS: L.LatLngBoundsExpression = [
    [17.80, 105.0],
    [18.90, 106.6],
  ]
  const CAN_LOC_CENTER: [number, number] = [18.5284, 105.7483]
  const FOCAL_COORDS: [number, number] = [18.5225, 105.7585] // Ngã 3 Trâm Lạc
  const POLICE_COORDS: [number, number] = [18.528, 105.747] // Công an Xã Can Lộc
  const CLINIC_COORDS: [number, number] = [18.527, 105.749] // Trạm y tế

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  // Hotspots Data
  const hotspots: Hotspot[] = [
    {
      id: 'hotspot-1',
      code: '#PA-2026-0889',
      title: 'Tụ tập nhóm thanh niên gây mất ANTT, nẹt pô xe sau 23h tại ngã 3 Thôn Trâm Lạc',
      category: 'ANTT',
      coords: FOCAL_COORDS,
      address: 'Ngã 3 đường liên thôn, Thôn Trâm Lạc, Xã Can Lộc',
      timeAgo: '22:45 - Hôm nay (Cách đây 18 phút)',
      priority: 'Khẩn cấp',
      status: 'Đang xử lý',
      reporterName: 'Nguyễn Văn Thành',
      reporterPhone: '0912.xxx.892',
      vneidLevel: 'VNeID Cấp 2',
      assignedOfficer: 'Đ/c Thiếu úy Lê Văn B',
      officerRole: 'Cảnh sát khu vực Thôn Trâm Lạc',
      officerPhone: '0983.xxx.113',
      distanceToPolice: '650 mét (~2 phút)',
      distanceToClinic: '1.2 km (~4 phút)',
      evidenceImage:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBgr3d0nCafLQyygGwKzlqWJuc8U2EHl8i762f6paldhpRkFcKhTFqPPGIuHQT949-jUoWE-_2bIuW_HH--6TXF8esFVw0v0p6-_7fiVX4SKHCo4BNux9pXzOd220Mx74X_fE_--AN7MUap6xcdb1z8ujV-NSZLLb1Kf1nH8rVBXLUDUoZUZZNyVnAMmnWlQ6Bh4t35c5yAQHwJ_IEDHLq5Eldb8HBrTXfv8vm8dLrKT9mKXt_PfwyVyw',
      isFocal: true,
    },
    {
      id: 'hotspot-2',
      code: '#PA-2026-0884',
      title: 'Khói phát sinh từ bãi tập kết phế liệu sát đường dân sinh',
      category: 'PCCC',
      coords: [18.5305, 105.736],
      address: 'Thôn Phúc Hậu / Đan Hà, Xã Can Lộc',
      timeAgo: '21:30 - Hôm nay (Cách đây 1 giờ)',
      priority: 'Cao',
      status: 'Đang xử lý',
      reporterName: 'Trần Đình Nam',
      reporterPhone: '0945.xxx.412',
      vneidLevel: 'VNeID Cấp 2',
      assignedOfficer: 'Đ/c Đại úy Phan Văn C',
      officerRole: 'Cảnh sát PCCC & CNCH địa bàn',
      officerPhone: '0978.xxx.678',
      distanceToPolice: '1.4 km (~4 phút)',
      distanceToClinic: '1.1 km (~3 phút)',
    },
    {
      id: 'hotspot-3',
      code: '#PA-2026-0879',
      title: 'Cơ sở giết mổ gia súc không đảm bảo điều kiện an toàn thực phẩm',
      category: 'ATTP',
      coords: [18.5284, 105.7483],
      address: 'Khu vực phía sau Chợ Can Lộc',
      timeAgo: '18:15 - Hôm nay (Cách đây 4 giờ)',
      priority: 'Trung bình',
      status: 'Chờ xử lý',
      reporterName: 'Lê Thị Mai',
      reporterPhone: '0981.xxx.221',
      vneidLevel: 'VNeID Cấp 1',
      assignedOfficer: 'Đ/c Trung úy Hoàng Văn D',
      officerRole: 'Tổ công tác liên ngành ATTP',
      officerPhone: '0962.xxx.901',
      distanceToPolice: '200 mét (~1 phút)',
      distanceToClinic: '350 mét (~1 phút)',
    },
    {
      id: 'hotspot-4',
      code: '#PA-2026-0872',
      title: 'Đổ rác thải sinh hoạt bừa bãi xuống bờ kênh mương tiêu',
      category: 'Môi trường',
      coords: [18.519, 105.739],
      address: 'Thôn Đông Vĩnh / Hồng Triều, Xã Can Lộc',
      timeAgo: '16:00 - Hôm nay (Cách đây 6 giờ)',
      priority: 'Trung bình',
      status: 'Đã điều động',
      reporterName: 'Đặng Văn Lộc',
      reporterPhone: '0934.xxx.889',
      vneidLevel: 'VNeID Cấp 2',
      assignedOfficer: 'Đ/c Cán bộ Địa chính - Môi trường',
      officerRole: 'Ban chỉ đạo Môi trường Xã',
      officerPhone: '0915.xxx.345',
      distanceToPolice: '1.8 km (~5 phút)',
      distanceToClinic: '1.6 km (~4 phút)',
    },
    {
      id: 'hotspot-5',
      code: '#PA-2026-0865',
      title: 'Lấn chiếm hành lang đường bộ đặt biển quảng cáo che tầm nhìn',
      category: 'Đô thị',
      coords: [18.5335, 105.7512],
      address: 'Tuyến ĐT 548 qua Thôn Kim Đính',
      timeAgo: '14:20 - Hôm nay (Cách đây 8 giờ)',
      priority: 'Trung bình',
      status: 'Đang xử lý',
      reporterName: 'Vũ Thị Hạnh',
      reporterPhone: '0903.xxx.765',
      vneidLevel: 'VNeID Cấp 2',
      assignedOfficer: 'Đ/c Thượng úy Đinh Văn E',
      officerRole: 'Tổ Trật tự đô thị Xã',
      officerPhone: '0989.xxx.456',
      distanceToPolice: '800 mét (~2 phút)',
      distanceToClinic: '750 mét (~2 phút)',
    },
  ]

  // Landmarks Data
  const landmarks: Landmark[] = [
    {
      id: 'lm-1',
      name: 'Công an Xã Can Lộc',
      type: 'police',
      coords: POLICE_COORDS,
      icon: 'local_police',
      color: 'bg-primary text-white',
      textColor: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary',
      description: 'Trụ sở Công an Xã Can Lộc - Trực ban 24/7',
    },
    {
      id: 'lm-2',
      name: 'Trụ sở UBND Xã',
      type: 'ubnd',
      coords: [18.531, 105.75],
      icon: 'account_balance',
      color: 'bg-secondary text-white',
      textColor: 'text-secondary',
      bgColor: 'bg-secondary-fixed/40',
      borderColor: 'border-secondary',
      description: 'UBND Xã Can Lộc - Trung tâm điều hành hành chính',
    },
    {
      id: 'lm-3',
      name: 'Trạm Y Tế Xã Can Lộc',
      type: 'clinic',
      coords: CLINIC_COORDS,
      icon: 'local_hospital',
      color: 'bg-tertiary text-white',
      textColor: 'text-tertiary',
      bgColor: 'bg-tertiary-fixed/50',
      borderColor: 'border-tertiary',
      description: 'Trạm Y tế Xã Can Lộc - Sơ cấp cứu y tế',
    },
    {
      id: 'lm-4',
      name: 'Trường Tiểu học & THCS Can Lộc',
      type: 'school',
      coords: [18.532, 105.744],
      icon: 'school',
      color: 'bg-slate-700 text-white',
      textColor: 'text-slate-800',
      bgColor: 'bg-slate-100',
      borderColor: 'border-slate-300',
      description: 'Khu vực trường học trọng điểm',
    },
    {
      id: 'lm-5',
      name: 'Chợ Dân sinh Can Lộc',
      type: 'market',
      coords: [18.5284, 105.7483],
      icon: 'storefront',
      color: 'bg-amber-600 text-white',
      textColor: 'text-amber-800',
      bgColor: 'bg-amber-100',
      borderColor: 'border-amber-300',
      description: 'Chợ trung tâm xã Can Lộc',
    },
    {
      id: 'lm-6',
      name: 'Bưu điện Văn hóa Xã',
      type: 'post',
      coords: [18.529, 105.746],
      icon: 'local_post_office',
      color: 'bg-yellow-700 text-white',
      textColor: 'text-yellow-800',
      bgColor: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      description: 'Điểm Bưu điện Văn hóa xã Can Lộc',
    },
  ]

  // Sector polygons approximate boundaries
  const SECTOR_POLYGONS: [number, number][][] = [
    [
      [18.548, 105.72],
      [18.553, 105.742],
      [18.539, 105.745],
      [18.528, 105.716],
    ],
    [
      [18.553, 105.742],
      [18.549, 105.768],
      [18.539, 105.782],
      [18.535, 105.752],
    ],
    [
      [18.535, 105.752],
      [18.539, 105.782],
      [18.521, 105.776],
      [18.511, 105.756],
      [18.525, 105.745],
    ],
  ]

  // Initialize selected hotspot to focal hotspot on mount
  useEffect(() => {
    setSelectedHotspot(hotspots[0])
  }, [])

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    // 1. Create Map restricted strictly to Hà Tĩnh
    const map = L.map(mapContainerRef.current, {
      center: FOCAL_COORDS,
      zoom: 14,
      minZoom: 9, // Minimum zoom shows the entire Ha Tinh province, prevents zooming out past Ha Tinh
      maxZoom: 18,
      maxBounds: HA_TINH_BOUNDS, // Strictly restrict panning beyond Ha Tinh
      maxBoundsViscosity: 1.0, // Prevent panning outside Ha Tinh
      zoomControl: false,
      attributionControl: false,
    })

    // 2. Base Tile Layer (Default OSM)
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
    }).addTo(map)
    tileLayerRef.current = tileLayer

    // 3. Layer Groups
    boundaryLayerGroupRef.current = L.layerGroup().addTo(map)
    measurementLayerGroupRef.current = L.layerGroup().addTo(map)
    landmarksLayerGroupRef.current = L.layerGroup().addTo(map)
    hotspotsLayerGroupRef.current = L.layerGroup().addTo(map)

    mapInstanceRef.current = map

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize()
    })
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Switch Base Layer (Satellite vs Standard OSM)
  useEffect(() => {
    if (!mapInstanceRef.current) return

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current)
    }

    const newUrl = isSatellite
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    const newLayer = L.tileLayer(newUrl, {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
    }).addTo(mapInstanceRef.current)

    tileLayerRef.current = newLayer
  }, [isSatellite])

  // Render Boundaries
  useEffect(() => {
    const group = boundaryLayerGroupRef.current
    if (!group) return
    group.clearLayers()

    if (!showBoundaries) return

    SECTOR_POLYGONS.forEach((poly, idx) => {
      const colors = ['#91000A', '#745B00', '#00487D']
      L.polygon(poly, {
        color: colors[idx % colors.length],
        weight: 2,
        dashArray: '6, 4',
        fillColor: colors[idx % colors.length],
        fillOpacity: 0.04,
      }).addTo(group)
    })
  }, [showBoundaries])

  // Render Measurement / Radius
  useEffect(() => {
    const group = measurementLayerGroupRef.current
    if (!group) return
    group.clearLayers()

    if (showRadius) {
      // 500m Tactical radius
      L.circle(FOCAL_COORDS, {
        radius: 350,
        color: '#ba1a1a',
        weight: 1.5,
        dashArray: '4, 4',
        fillColor: '#ba1a1a',
        fillOpacity: 0.08,
      }).addTo(group)

      // 1000m Extended radius
      L.circle(FOCAL_COORDS, {
        radius: 700,
        color: '#745b00',
        weight: 1.5,
        dashArray: '6, 6',
        fillColor: 'transparent',
      }).addTo(group)
    }

    if (showDistance) {
      // Tactical arterial line connecting Focal Hotspot to Police Post
      L.polyline([FOCAL_COORDS, POLICE_COORDS], {
        color: '#91000a',
        weight: 3,
        dashArray: '6, 4',
      }).addTo(group)

      // Tactical distance marker label
      const midLat = (FOCAL_COORDS[0] + POLICE_COORDS[0]) / 2
      const midLng = (FOCAL_COORDS[1] + POLICE_COORDS[1]) / 2

      const distIcon = L.divIcon({
        className: 'custom-div-icon',
        iconSize: [110, 26],
        iconAnchor: [55, 13],
        html: `
          <div class="px-2 py-0.5 rounded bg-[#271816] text-white text-[11px] font-mono font-bold shadow-md border border-white/20 text-center flex items-center justify-center gap-1">
            <span class="material-symbols-outlined text-[13px] text-amber-400">straighten</span>
            <span>650m • 2 phút</span>
          </div>
        `,
      })
      L.marker([midLat, midLng], { icon: distIcon, interactive: false }).addTo(group)
    }
  }, [showRadius, showDistance])

  // Render Landmarks
  useEffect(() => {
    const group = landmarksLayerGroupRef.current
    if (!group) return
    group.clearLayers()

    landmarks.forEach((lm) => {
      const isVisible = landmarkVisibility[lm.type]
      if (!isVisible) return

      const icon = L.divIcon({
        className: 'custom-div-icon',
        iconSize: [150, 48],
        iconAnchor: [75, 40],
        popupAnchor: [0, -40],
        html: `
          <div class="flex flex-col items-center cursor-pointer group">
            <div class="px-2 py-0.5 rounded-md text-[11px] font-bold shadow-md flex items-center gap-1 border ${lm.borderColor} ${lm.bgColor} ${lm.textColor} whitespace-nowrap">
              <span class="material-symbols-outlined text-[14px]">${lm.icon}</span>
              <span>${lm.name}</span>
            </div>
            <div class="w-7 h-7 rounded-full ${lm.color} flex items-center justify-center shadow-lg border-2 border-white -mt-1 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-[15px]">${lm.icon}</span>
            </div>
          </div>
        `,
      })

      const marker = L.marker(lm.coords, { icon })
      marker.bindPopup(`
        <div class="p-3 max-w-[220px]">
          <div class="font-bold text-xs ${lm.textColor} flex items-center gap-1 mb-1">
            <span class="material-symbols-outlined text-[16px]">${lm.icon}</span>
            <span>${lm.name}</span>
          </div>
          <p class="text-[11px] text-gray-600 leading-snug">${lm.description}</p>
          <div class="text-[10px] text-gray-400 font-mono mt-1">Tọa độ: ${lm.coords[0].toFixed(
            4
          )}° N, ${lm.coords[1].toFixed(4)}° E</div>
        </div>
      `)
      marker.addTo(group)
    })
  }, [landmarkVisibility])

  // Render Hotspots
  useEffect(() => {
    const group = hotspotsLayerGroupRef.current
    if (!group) return
    group.clearLayers()

    const filtered =
      activeCategory === 'all' ? hotspots : hotspots.filter((h) => h.category === activeCategory)

    filtered.forEach((h) => {
      const isFocal = h.isFocal

      const icon = L.divIcon({
        className: 'custom-div-icon',
        iconSize: isFocal ? [180, 70] : [140, 50],
        iconAnchor: isFocal ? [90, 60] : [70, 40],
        popupAnchor: [0, -50],
        html: `
          <div class="relative flex flex-col items-center cursor-pointer group">
            ${
              isFocal
                ? '<div class="absolute -inset-2 rounded-full bg-red-600 opacity-40 animate-ping pointer-events-none"></div>'
                : ''
            }
            <div class="flex items-center gap-1 px-2.5 py-0.5 ${
              isFocal ? 'bg-error text-white ring-2 ring-white' : 'bg-white text-gray-800 shadow'
            } font-bold text-[11px] rounded-lg shadow-lg border border-red-200 whitespace-nowrap mb-1">
              <span class="material-symbols-outlined text-[14px] ${
                isFocal ? 'animate-bounce text-amber-300' : 'text-error'
              }">warning</span>
              <span>${isFocal ? `ĐIỂM NÓNG: ${h.code}` : h.code}</span>
            </div>
            <div class="w-8 h-8 rounded-full ${
              h.category === 'PCCC'
                ? 'bg-error'
                : h.category === 'ANTT'
                ? 'bg-red-700'
                : h.category === 'ATTP'
                ? 'bg-blue-700'
                : 'bg-emerald-700'
            } text-white flex items-center justify-center shadow-xl border-2 border-white group-hover:scale-125 transition-transform">
              <span class="material-symbols-outlined text-[18px]">
                ${
                  h.category === 'PCCC'
                    ? 'local_fire_department'
                    : h.category === 'ANTT'
                    ? 'campaign'
                    : h.category === 'ATTP'
                    ? 'restaurant'
                    : 'eco'
                }
              </span>
            </div>
            <div class="w-2 h-2 bg-error rotate-45 -mt-1 ring-1 ring-white"></div>
          </div>
        `,
      })

      const marker = L.marker(h.coords, { icon })
      marker.on('click', () => {
        setSelectedHotspot(h)
        setDrawerOpen(true)
        mapInstanceRef.current?.flyTo(h.coords, 15, { duration: 0.8 })
      })
      marker.addTo(group)
    })
  }, [activeCategory])

  // Handle Search Location
  const handleLocateSearch = () => {
    if (!mapInstanceRef.current) return
    mapInstanceRef.current.flyTo(FOCAL_COORDS, 15, { duration: 1 })
    setToastMessage(`Đã định vị mục tiêu: ${searchQuery}`)
  }

  // Copy coordinates
  const handleCopyCoords = (coords: [number, number]) => {
    const text = `${coords[0].toFixed(4)}° N, ${coords[1].toFixed(4)}° E`
    navigator.clipboard.writeText(text)
    setToastMessage(`Đã sao chép tọa độ: ${text}`)
  }

  return (
    <div className="w-full flex-1 flex flex-col space-y-3 select-none min-h-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#271816] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 border border-outline-variant/40 animate-in fade-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
            location_on
          </span>
          <span className="font-body-md text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/60 hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Command & Control Ribbon */}
      <div className="w-full bg-white rounded-xl border border-[#E4E7EC] shadow-xs p-4 md:p-5 flex flex-col gap-3.5 shrink-0">
        {/* Row 1: Search & Filter Categories */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Box with Commune Context */}
          <div className="relative flex-1 min-w-[300px]">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-[20px]">
              pin_drop
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm thôn xóm, cơ sở kinh doanh, điểm nóng tại Can Lộc..."
              className="w-full h-10 pl-11 pr-24 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm border border-[#E4E7EC] outline-none placeholder:text-on-surface-variant focus:bg-white focus:border-primary transition-colors"
            />
            <button
              onClick={handleLocateSearch}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm font-bold hover:bg-primary-container transition-colors shadow-xs"
            >
              Định vị
            </button>
          </div>

          {/* Incident Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">apps</span>
              Tất cả (14)
            </button>
            <button
              onClick={() => setActiveCategory('ANTT')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-all ${
                activeCategory === 'ANTT'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-primary hover:bg-surface-container-high'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
              ANTT (4)
            </button>
            <button
              onClick={() => setActiveCategory('PCCC')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-all ${
                activeCategory === 'PCCC'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
              PCCC (1)
            </button>
            <button
              onClick={() => setActiveCategory('ATTP')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-all ${
                activeCategory === 'ATTP'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">restaurant</span>
              ATTP (2)
            </button>
            <button
              onClick={() => setActiveCategory('Môi trường')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-all ${
                activeCategory === 'Môi trường'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">eco</span>
              Môi trường (3)
            </button>
            <button
              onClick={() => setActiveCategory('Đô thị')}
              className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-all ${
                activeCategory === 'Đô thị'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">traffic</span>
              Trật tự Đô thị (4)
            </button>
          </div>

          {/* GIS Toolset Buttons */}
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-[#E4E7EC]">
            <button
              onClick={() => {
                setShowRadius(!showRadius)
                setToastMessage(showRadius ? 'Đã ẩn bán kính tác chiến' : 'Đã bật bán kính tác chiến')
              }}
              className={`p-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-1 font-label-sm text-label-sm font-semibold ${
                showRadius ? 'bg-white text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Vẽ bán kính kiểm tra"
            >
              <span className="material-symbols-outlined text-[18px]">radio_button_checked</span>
              <span>Bán kính</span>
            </button>
            <div className="w-px h-4 bg-outline-variant"></div>
            <button
              onClick={() => {
                setShowDistance(!showDistance)
                setToastMessage(showDistance ? 'Đã ẩn thước đo cự ly' : 'Đã bật đo cự ly tác chiến')
              }}
              className={`p-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-1 font-label-sm text-label-sm font-semibold ${
                showDistance ? 'bg-white text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Đo đạc cự ly tác chiến"
            >
              <span className="material-symbols-outlined text-[18px]">straighten</span>
              <span>Đo khoảng cách</span>
            </button>
            <div className="w-px h-4 bg-outline-variant"></div>
            <button
              onClick={() => {
                setShowBoundaries(!showBoundaries)
                setToastMessage(showBoundaries ? 'Đã ẩn ranh giới thôn' : 'Đã bật ranh giới 6 thôn/xóm')
              }}
              className={`p-1.5 px-2.5 rounded-lg font-label-sm text-label-sm flex items-center gap-1 font-semibold transition-colors ${
                showBoundaries ? 'bg-white text-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              title="Lớp ranh giới thửa đất / Thôn xóm"
            >
              <span className="material-symbols-outlined text-[18px]">layers</span>
              <span>Lớp ranh giới</span>
            </button>
          </div>
        </div>

        {/* Row 2: Landmarks Toggle Checklist */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 border-t border-[#E4E7EC]">
          <div className="flex items-center gap-1.5 text-primary font-bold font-label-sm text-label-sm uppercase tracking-wide">
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            <span>Địa điểm hành chính Can Lộc:</span>
          </div>

          <label className="inline-flex items-center gap-1.5 cursor-pointer font-body-md text-sm text-on-surface hover:text-primary transition-colors">
            <input
              type="checkbox"
              checked={landmarkVisibility.police}
              onChange={(e) =>
                setLandmarkVisibility({ ...landmarkVisibility, police: e.target.checked })
              }
              className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
            />
            <span className="flex items-center gap-1 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
              Công an Xã Can Lộc
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer font-body-md text-sm text-on-surface hover:text-primary transition-colors">
            <input
              type="checkbox"
              checked={landmarkVisibility.ubnd}
              onChange={(e) =>
                setLandmarkVisibility({ ...landmarkVisibility, ubnd: e.target.checked })
              }
              className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
            />
            <span className="flex items-center gap-1 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span>
              Trụ sở UBND Xã
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer font-body-md text-sm text-on-surface hover:text-primary transition-colors">
            <input
              type="checkbox"
              checked={landmarkVisibility.clinic}
              onChange={(e) =>
                setLandmarkVisibility({ ...landmarkVisibility, clinic: e.target.checked })
              }
              className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
            />
            <span className="flex items-center gap-1 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary inline-block"></span>
              Trạm Y Tế Xã Can Lộc
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer font-body-md text-sm text-on-surface hover:text-primary transition-colors">
            <input
              type="checkbox"
              checked={landmarkVisibility.school}
              onChange={(e) =>
                setLandmarkVisibility({ ...landmarkVisibility, school: e.target.checked })
              }
              className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
            />
            <span className="flex items-center gap-1">Trường Tiểu học &amp; THCS</span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer font-body-md text-sm text-on-surface hover:text-primary transition-colors">
            <input
              type="checkbox"
              checked={landmarkVisibility.market}
              onChange={(e) =>
                setLandmarkVisibility({ ...landmarkVisibility, market: e.target.checked })
              }
              className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
            />
            <span className="flex items-center gap-1">Chợ Dân sinh Can Lộc</span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer font-body-md text-sm text-on-surface hover:text-primary transition-colors">
            <input
              type="checkbox"
              checked={landmarkVisibility.post}
              onChange={(e) =>
                setLandmarkVisibility({ ...landmarkVisibility, post: e.target.checked })
              }
              className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
            />
            <span className="flex items-center gap-1">Bưu điện Văn hóa Xã</span>
          </label>

          {/* Satellite Layer Switch */}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => {
                setIsSatellite(!isSatellite)
                setToastMessage(isSatellite ? 'Chuyển sang bản đồ đường phố OSM' : 'Chuyển sang bản đồ vệ tinh 2026')
              }}
              className={`inline-flex items-center gap-1.5 font-label-sm text-label-sm px-3 py-1 rounded-lg font-bold transition-all shadow-xs border ${
                isSatellite
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-white text-on-surface border-[#E4E7EC] hover:bg-gray-50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">satellite_alt</span>
              <span>{isSatellite ? 'Vệ tinh 2026 (BẬT)' : 'Bản đồ Vệ tinh 2026'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Leaflet GIS Map Viewport with Slide Drawer */}
      <div className="relative w-full flex-1 min-h-[500px] rounded-xl overflow-hidden shadow-md border border-[#E4E7EC] bg-surface-container-high flex">
        {/* Leaflet Canvas */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Mini Map Legend Quick Box (Bottom-Left) */}
        <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-2 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-3 rounded-xl shadow-md border border-[#E4E7EC] flex flex-col gap-1.5 w-52">
            <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider">
              Chú giải bản đồ GIS
            </span>
            <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-3 h-3 rounded-full bg-error shrink-0"></span>
              <span>Điểm nóng ANTT khẩn cấp</span>
            </div>
            <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-3 h-3 rounded-full bg-primary shrink-0"></span>
              <span>Công an Xã Can Lộc</span>
            </div>
            <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-3 h-3 rounded-full bg-secondary shrink-0"></span>
              <span>Trụ sở UBND Xã</span>
            </div>
            <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
              <span className="w-3 h-3 rounded-full bg-tertiary shrink-0"></span>
              <span>Trạm Y Tế Xã Can Lộc</span>
            </div>
          </div>

          {/* Floating Zoom & Orientation Toolset */}
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-[#E4E7EC] p-1 w-fit">
            <button
              onClick={() => mapInstanceRef.current?.zoomIn()}
              title="Phóng to"
              className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container rounded-lg transition-colors font-bold text-lg"
            >
              +
            </button>
            <div className="w-px h-4 bg-outline-variant"></div>
            <button
              onClick={() => mapInstanceRef.current?.zoomOut()}
              title="Thu nhỏ"
              className="w-8 h-8 flex items-center justify-center text-on-surface hover:bg-surface-container rounded-lg transition-colors font-bold text-lg"
            >
              -
            </button>
            <div className="w-px h-4 bg-outline-variant"></div>
            <button
              onClick={() => mapInstanceRef.current?.flyTo(CAN_LOC_CENTER, 14, { duration: 1 })}
              title="Về trung tâm Can Lộc"
              className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">my_location</span>
            </button>
            <div className="w-px h-4 bg-outline-variant"></div>
            <button
              onClick={() => mapInstanceRef.current?.flyToBounds(HA_TINH_BOUNDS, { duration: 1 })}
              title="Toàn cảnh tỉnh Hà Tĩnh"
              className="w-8 h-8 flex items-center justify-center text-tertiary hover:bg-surface-container rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
            </button>
          </div>
        </div>

        {/* Toggle Drawer Button if closed */}
        {!drawerOpen && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="absolute top-4 right-4 z-20 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-lg border border-[#E4E7EC] flex items-center gap-1.5 hover:bg-primary hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">menu_open</span>
            <span>Xem hồ sơ phản ánh hiện trường</span>
          </button>
        )}

        {/* Active Incident Details Drawer (Right-Aligned Slide-over Panel) */}
        {selectedHotspot && (
          <div
            className={`absolute top-0 right-0 h-full w-[460px] max-w-[90vw] bg-white shadow-2xl z-30 flex flex-col overflow-hidden border-l-4 border-primary transition-transform duration-300 ${
              drawerOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Drawer Header (Fixed at top) */}
            <div className="p-4 md:p-5 bg-surface-container-low flex flex-col gap-2.5 border-b border-[#E4E7EC] shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md font-label-sm text-label-sm font-bold bg-primary text-on-primary">
                    {selectedHotspot.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md font-label-sm text-label-sm font-bold bg-error-container text-on-error-container flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                    {selectedHotspot.priority}
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                  title="Đóng ngăn chi tiết"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <h2 className="font-title-lg text-lg text-primary font-bold leading-snug">
                {selectedHotspot.title}
              </h2>

              <div className="flex items-center gap-3 font-label-sm text-label-sm text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">schedule</span>
                  {selectedHotspot.timeAgo}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-primary font-semibold">
                  <span className="material-symbols-outlined text-[15px]">shield</span>
                  Lĩnh vực {selectedHotspot.category}
                </span>
              </div>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="p-4 md:p-5 flex flex-col gap-4 flex-1 overflow-y-auto">
              {/* Live Action Status Notification */}
              <div className="p-3 rounded-xl bg-secondary-container/30 border border-secondary-container flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">directions_run</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-on-secondary-container">
                      Trạng thái xử lý:
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold">
                      {selectedHotspot.status}
                    </span>
                  </div>
                  <p className="font-body-md text-sm text-on-surface font-medium mt-0.5">
                    Đã điều động Tổ tuần tra Công an Xã Can Lộc tới hiện trường.
                  </p>
                </div>
              </div>

              {/* Citizen Reporter Profile & Verification */}
              <div className="flex flex-col gap-1.5 bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
                  Người dân cung cấp thông tin
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-lg text-sm font-bold text-on-surface leading-tight">
                        {selectedHotspot.reporterName}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                        SĐT: {selectedHotspot.reporterPhone}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-white text-tertiary rounded-lg font-label-sm text-label-sm font-bold shadow-xs border border-tertiary/20">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    <span>{selectedHotspot.vneidLevel}</span>
                  </div>
                </div>
              </div>

              {/* Physical Location & GPS */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
                  Tọa độ GPS &amp; Địa chỉ hiện trường
                </span>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      location_on
                    </span>
                    <span className="font-body-md text-sm font-semibold text-on-surface">
                      {selectedHotspot.address}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant font-mono text-xs pl-6">
                    <span>
                      GPS: {selectedHotspot.coords[0].toFixed(4)}° N,{' '}
                      {selectedHotspot.coords[1].toFixed(4)}° E
                    </span>
                    <button
                      onClick={() => handleCopyCoords(selectedHotspot.coords)}
                      className="text-primary hover:underline font-sans font-semibold text-xs"
                    >
                      Sao chép tọa độ
                    </button>
                  </div>
                </div>
              </div>

              {/* Citizen Submitted Visual Evidence */}
              {selectedHotspot.evidenceImage && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
                      Hình ảnh hiện trường (Từ ứng dụng phản ánh)
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                      1 ảnh đính kèm
                    </span>
                  </div>
                  <div className="relative w-full h-44 rounded-xl overflow-hidden group shadow-xs bg-surface-container border border-[#E4E7EC]">
                    <img
                      src={selectedHotspot.evidenceImage}
                      alt="Hiện trường"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2.5 flex items-end justify-between text-white">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm font-mono leading-tight">
                          GPS: {selectedHotspot.coords[0].toFixed(4)},{' '}
                          {selectedHotspot.coords[1].toFixed(4)} • CAN LỘC
                        </span>
                        <span className="font-label-sm text-label-sm font-mono opacity-80 leading-tight">
                          2026-03-30 22:43:12 GMT+7
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-primary text-white rounded-md font-label-sm text-label-sm font-bold uppercase shadow-xs">
                        Xác thực số
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Command & Patrol Assignment */}
              <div className="flex flex-col gap-1.5 bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
                  Cán bộ &amp; Tổ công tác phụ trách
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-xs">
                      <span className="material-symbols-outlined text-[20px]">badge</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body-md text-sm font-bold text-on-surface">
                        {selectedHotspot.assignedOfficer}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {selectedHotspot.officerRole}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`tel:${selectedHotspot.officerPhone}`}
                    className="px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-xs hover:bg-primary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>{selectedHotspot.officerPhone}</span>
                  </a>
                </div>
              </div>

              {/* Tactical Proximity Analysis */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant">
                  Cự ly đến cơ sở hành chính trọng yếu
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      shield
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Đến CA Xã Can Lộc
                      </span>
                      <span className="font-body-md text-sm font-bold text-primary">
                        {selectedHotspot.distanceToPolice}
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/30 flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">
                      local_hospital
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Đến Trạm Y tế Xã
                      </span>
                      <span className="font-body-md text-sm font-bold text-tertiary">
                        {selectedHotspot.distanceToClinic}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Panel (Fixed at bottom) */}
            <div className="p-4 md:p-5 bg-surface-container border-t border-[#E4E7EC] flex flex-col gap-2 shrink-0">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setToastMessage('Đã mở phân hệ cập nhật tiến độ xử lý phản ánh hiện trường')
                  }
                  className="px-3 py-2.5 rounded-xl bg-primary text-on-primary font-body-md text-sm font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  <span>Cập nhật tiến độ</span>
                </button>
                <button
                  onClick={() => setToastMessage('Đang chuyển đơn vị phối hợp (Đội CSGT / Trật tự Huyện)')}
                  className="px-3 py-2.5 rounded-xl bg-white text-primary font-body-md text-sm font-bold hover:bg-gray-50 border border-[#E4E7EC] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">share_location</span>
                  <span>Chuyển đơn vị</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setToastMessage(`Đang kết nối cuộc gọi thoại đến ${selectedHotspot.assignedOfficer}`)
                  }
                  className="flex-1 px-3 py-2 rounded-xl bg-tertiary text-on-tertiary font-label-md text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-1 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">ring_volume</span>
                  <span>Gọi cán bộ tuần tra</span>
                </button>
                <button
                  onClick={() => {
                    setToastMessage('Đã hoàn tất xác minh & đóng phản ánh')
                    setDrawerOpen(false)
                  }}
                  className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-label-md text-xs font-semibold hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">task_alt</span>
                  <span>Đóng phản ánh</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Administrative Status & Key Activity Summary Stream */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3 shrink-0">
        {/* Stat 1 */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#E4E7EC] flex items-center justify-between border-t-4 border-t-primary">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Tổng điểm nóng hôm nay
            </span>
            <span className="font-display-lg text-2xl font-bold text-primary mt-0.5">
              14 vụ việc
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary shadow-xs">
            <span className="material-symbols-outlined text-[22px]">crisis_alert</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#E4E7EC] flex items-center justify-between border-t-4 border-t-secondary">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Tổ tuần tra đang trực tiếp địa bàn
            </span>
            <span className="font-display-lg text-2xl font-bold text-secondary mt-0.5">
              03 tổ tác chiến
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-on-secondary-container shadow-xs">
            <span className="material-symbols-outlined text-[22px]">local_police</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#E4E7EC] flex items-center justify-between border-t-4 border-t-tertiary">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Tỷ lệ xử lý đúng hẹn
            </span>
            <span className="font-display-lg text-2xl font-bold text-tertiary mt-0.5">96.8%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary shadow-xs">
            <span className="material-symbols-outlined text-[22px]">trending_up</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#E4E7EC] flex items-center justify-between border-t-4 border-t-outline-variant">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Địa bàn Thôn Trâm Lạc
            </span>
            <span className="font-body-md text-base font-bold text-error mt-0.5">
              01 điểm nóng ANTT
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-error-container text-on-error-container font-label-sm text-label-sm font-bold shadow-xs">
            Đang can thiệp
          </span>
        </div>
      </div>
    </div>
  )
}
