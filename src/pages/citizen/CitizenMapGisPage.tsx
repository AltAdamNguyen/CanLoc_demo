import React, { useState, useEffect, useRef } from 'react'
import L from 'leaflet'

export const CitizenMapGisPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [showBoundaries, setShowBoundaries] = useState<boolean>(true)
  const [showPolice, setShowPolice] = useState<boolean>(true)
  const [showUbnd, setShowUbnd] = useState<boolean>(true)
  const [showSchool, setShowSchool] = useState<boolean>(true)
  const [showMarket, setShowMarket] = useState<boolean>(true)
  const [showHealthCenter, setShowHealthCenter] = useState<boolean>(false)
  const [showRadius, setShowRadius] = useState<boolean>(true)
  const [showDistance, setShowDistance] = useState<boolean>(true)
  const [actionStatus, setActionStatus] = useState<string>('ĐANG XỬ LÝ')
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const boundaryLayerGroupRef = useRef<L.LayerGroup | null>(null)
  const landmarksLayerGroupRef = useRef<L.LayerGroup | null>(null)
  const hotspotsLayerGroupRef = useRef<L.LayerGroup | null>(null)
  const measurementLayerGroupRef = useRef<L.LayerGroup | null>(null)

  const HA_TINH_BOUNDS: L.LatLngBoundsExpression = [
    [17.80, 105.0],
    [18.90, 106.6],
  ]
  const CAN_LOC_CENTER: [number, number] = [18.5284, 105.7483] // Xã Can Lộc, Hà Tĩnh
  const FOCAL_COORDS: [number, number] = [18.5225, 105.7585] // Ngã 3 Trâm Lạc
  const POLICE_COORDS: [number, number] = [18.528, 105.747] // Công an Xã Can Lộc
  const UBND_COORDS: [number, number] = [18.531, 105.75] // Trụ sở UBND
  const SCHOOL_COORDS: [number, number] = [18.532, 105.744] // THCS Can Lộc
  const MARKET_COORDS: [number, number] = [18.5284, 105.7483] // Chợ Dân Sinh
  const HEALTH_COORDS: [number, number] = [18.527, 105.749] // Trạm Y Tế

  const VILLAGE_POLYGONS: { name: string; pop: string; coords: [number, number][] }[] = [
    {
      name: 'Thôn Trâm Lạc',
      pop: '1.420 dân',
      coords: [
        [18.529, 105.752],
        [18.527, 105.765],
        [18.518, 105.762],
        [18.520, 105.750],
      ],
    },
    {
      name: 'Thôn Phúc Hậu',
      pop: '1.180 dân',
      coords: [
        [18.535, 105.733],
        [18.533, 105.746],
        [18.525, 105.744],
        [18.526, 105.731],
      ],
    },
    {
      name: 'Thôn Thượng Xá',
      pop: '960 dân',
      coords: [
        [18.525, 105.731],
        [18.525, 105.744],
        [18.517, 105.742],
        [18.516, 105.728],
      ],
    },
    {
      name: 'Thôn Kim Đính',
      pop: '1.310 dân',
      coords: [
        [18.538, 105.748],
        [18.537, 105.762],
        [18.529, 105.760],
        [18.530, 105.746],
      ],
    },
    {
      name: 'Thôn Sơn Hà',
      pop: '850 dân',
      coords: [
        [18.520, 105.764],
        [18.518, 105.776],
        [18.510, 105.770],
        [18.512, 105.758],
      ],
    },
  ]

  const handleAction = (msg: string) => {
    setStatusMessage(msg)
    setTimeout(() => setStatusMessage(null), 3000)
  }

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: CAN_LOC_CENTER,
      zoom: 14,
      minZoom: 9, // Giới hạn không thu nhỏ ra ngoài tỉnh Hà Tĩnh
      maxZoom: 18,
      maxBounds: HA_TINH_BOUNDS, // Khóa phạm vi di chuyển trong tỉnh Hà Tĩnh
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
    }).addTo(map)

    boundaryLayerGroupRef.current = L.layerGroup().addTo(map)
    landmarksLayerGroupRef.current = L.layerGroup().addTo(map)
    hotspotsLayerGroupRef.current = L.layerGroup().addTo(map)
    measurementLayerGroupRef.current = L.layerGroup().addTo(map)

    mapInstanceRef.current = map

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize()
    })
    resizeObserver.observe(mapContainerRef.current)

    return () => {
      resizeObserver.disconnect()
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // 2. Render Boundaries
  useEffect(() => {
    if (!boundaryLayerGroupRef.current) return
    boundaryLayerGroupRef.current.clearLayers()

    if (!showBoundaries) return

    VILLAGE_POLYGONS.forEach((village) => {
      const polygon = L.polygon(village.coords, {
        color: '#3b82f6',
        weight: 1.5,
        dashArray: '5, 5',
        fillColor: '#60a5fa',
        fillOpacity: 0.08,
      })

      polygon.bindTooltip(
        `<div class="font-bold text-xs text-blue-900">${village.name}</div><div class="text-[10px] text-gray-500">${village.pop}</div>`,
        { permanent: true, direction: 'center', className: 'custom-village-tooltip' }
      )
      polygon.addTo(boundaryLayerGroupRef.current!)
    })
  }, [showBoundaries])

  // 3. Render Landmarks
  useEffect(() => {
    if (!landmarksLayerGroupRef.current) return
    landmarksLayerGroupRef.current.clearLayers()

    if (showPolice) {
      const policeIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        iconSize: [140, 52],
        iconAnchor: [70, 48],
        popupAnchor: [0, -48],
        html: `
          <div class="flex flex-col items-center cursor-pointer group">
            <div class="bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap mb-1 flex items-center gap-1 border border-yellow-400">
              <span>★ Công an Xã Can Lộc</span>
            </div>
            <div class="w-8 h-8 rounded-full bg-red-600 text-yellow-300 flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-[18px]">local_police</span>
            </div>
          </div>
        `,
      })
      const marker = L.marker(POLICE_COORDS, { icon: policeIcon })
      marker.bindPopup(`
        <div class="p-2 text-xs">
          <div class="font-bold text-red-700 text-sm">CÔNG AN XÃ CAN LỘC</div>
          <div class="text-gray-600 mt-0.5">Trực ban tiếp dân 24/7</div>
          <div class="font-mono text-red-600 font-bold mt-1">SĐT: 0239.3841.115</div>
        </div>
      `)
      marker.addTo(landmarksLayerGroupRef.current!)
    }

    if (showUbnd) {
      const ubndIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        iconSize: [140, 52],
        iconAnchor: [70, 48],
        popupAnchor: [0, -48],
        html: `
          <div class="flex flex-col items-center cursor-pointer group">
            <div class="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap mb-1">
              Trụ sở UBND Xã Can Lộc
            </div>
            <div class="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md border-2 border-white hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-[16px]">account_balance</span>
            </div>
          </div>
        `,
      })
      const marker = L.marker(UBND_COORDS, { icon: ubndIcon })
      marker.bindPopup(`
        <div class="p-2 text-xs">
          <div class="font-bold text-amber-700 text-sm">UBND XÃ CAN LỘC</div>
          <div class="text-gray-600 mt-0.5">Bộ phận Một cửa &amp; Điều hành hành chính</div>
        </div>
      `)
      marker.addTo(landmarksLayerGroupRef.current!)
    }

    if (showSchool) {
      const schoolIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        iconSize: [90, 40],
        iconAnchor: [45, 36],
        popupAnchor: [0, -36],
        html: `
          <div class="flex flex-col items-center cursor-pointer group">
            <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow border-2 border-white hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-[13px]">school</span>
            </div>
            <span class="text-[9px] font-bold text-gray-700 bg-white/95 px-1 rounded mt-0.5 shadow-xs border border-gray-200">THCS Can Lộc</span>
          </div>
        `,
      })
      const marker = L.marker(SCHOOL_COORDS, { icon: schoolIcon })
      marker.bindPopup('<div class="p-2 text-xs font-bold text-blue-800">Trường THCS Can Lộc</div>')
      marker.addTo(landmarksLayerGroupRef.current!)
    }

    if (showMarket) {
      const marketIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        iconSize: [90, 40],
        iconAnchor: [45, 36],
        popupAnchor: [0, -36],
        html: `
          <div class="flex flex-col items-center cursor-pointer group">
            <div class="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shadow border-2 border-white hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-[13px]">storefront</span>
            </div>
            <span class="text-[9px] font-bold text-gray-700 bg-white/95 px-1 rounded mt-0.5 shadow-xs border border-gray-200">Chợ Can Lộc</span>
          </div>
        `,
      })
      const marker = L.marker(MARKET_COORDS, { icon: marketIcon })
      marker.bindPopup('<div class="p-2 text-xs font-bold text-amber-800">Chợ Dân sinh Can Lộc</div>')
      marker.addTo(landmarksLayerGroupRef.current!)
    }

    if (showHealthCenter) {
      const clinicIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        iconSize: [90, 40],
        iconAnchor: [45, 36],
        popupAnchor: [0, -36],
        html: `
          <div class="flex flex-col items-center cursor-pointer group">
            <div class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow border-2 border-white hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-[13px]">local_hospital</span>
            </div>
            <span class="text-[9px] font-bold text-gray-700 bg-white/95 px-1 rounded mt-0.5 shadow-xs border border-gray-200">Trạm Y Tế Xã</span>
          </div>
        `,
      })
      const marker = L.marker(HEALTH_COORDS, { icon: clinicIcon })
      marker.bindPopup('<div class="p-2 text-xs font-bold text-emerald-800">Trạm Y Tế Xã Can Lộc - Trực cấp cứu 24/7</div>')
      marker.addTo(landmarksLayerGroupRef.current!)
    }
  }, [showPolice, showUbnd, showSchool, showMarket, showHealthCenter])

  // 4. Render Hotspots, Focal Radar Pin, Distance Measurement & Radius
  useEffect(() => {
    if (!hotspotsLayerGroupRef.current || !measurementLayerGroupRef.current) return
    hotspotsLayerGroupRef.current.clearLayers()
    measurementLayerGroupRef.current.clearLayers()

    // Focal Hotspot Marker (#PA-2026-0330)
    const focalIcon = L.divIcon({
      className: 'custom-focal-leaflet-icon',
      iconSize: [220, 60],
      iconAnchor: [110, 48],
      popupAnchor: [0, -48],
      html: `
        <div class="flex flex-col items-center cursor-pointer">
          <div class="bg-[#b91c1c] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded shadow-lg whitespace-nowrap mb-1 flex items-center gap-1.5 border border-yellow-300">
            <span class="w-2 h-2 rounded-full bg-yellow-300 animate-ping"></span>
            <span>ĐIỂM NÓNG ANTT [PA-2026-0330]</span>
          </div>
          <div class="relative flex items-center justify-center">
            <span class="absolute w-12 h-12 rounded-full bg-red-500/40 radar-pulse pointer-events-none"></span>
            <div class="w-9 h-9 rounded-full bg-[#b91c1c] text-white flex items-center justify-center shadow-2xl border-2 border-white">
              <span class="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
        </div>
      `,
    })

    const focalMarker = L.marker(FOCAL_COORDS, { icon: focalIcon })
    focalMarker.bindPopup(`
      <div class="p-2 text-xs">
        <div class="font-extrabold text-red-700">ĐIỂM NÓNG: #PA-2026-0330</div>
        <div class="font-semibold text-gray-800 mt-1">Tụ tập nhóm thanh niên gây mất ANTT, nẹt pô xe</div>
        <div class="text-gray-500 mt-0.5">Vị trí: Ngã 3 liên thôn Trâm Lạc</div>
        <div class="text-[11px] text-amber-700 font-medium mt-1">Tổ tuần tra CA xã cách: 650m (~2 phút)</div>
      </div>
    `)
    focalMarker.addTo(hotspotsLayerGroupRef.current!)

    // Secondary incident dots
    const incidentDots: { coords: [number, number]; cat: string; title: string; color: string; icon: string }[] = [
      { coords: [18.5335, 105.7512], cat: 'construction', title: 'Lấn chiếm hành lang đường bộ', color: 'bg-amber-500', icon: 'warning' },
      { coords: [18.519, 105.739], cat: 'environment', title: 'Điểm đổ rác tự phát', color: 'bg-emerald-500', icon: 'recycling' },
      { coords: [18.525, 105.762], cat: 'antt', title: 'Đèn đường chiếu sáng bị hỏng', color: 'bg-blue-500', icon: 'lightbulb' },
    ]

    incidentDots.forEach((inc) => {
      if (activeCategory !== 'all' && activeCategory !== inc.cat) return

      const incIcon = L.divIcon({
        className: 'custom-inc-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
        html: `
          <div class="w-6 h-6 rounded-full ${inc.color} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow cursor-pointer hover:scale-125 transition-transform">
            <span class="material-symbols-outlined text-[12px]">${inc.icon}</span>
          </div>
        `,
      })
      const incMarker = L.marker(inc.coords, { icon: incIcon })
      incMarker.bindPopup(`<div class="p-1.5 text-xs font-bold text-gray-800">${inc.title}</div>`)
      incMarker.addTo(hotspotsLayerGroupRef.current!)
    })

    // Measurement line from Focal Hotspot to Police Station
    if (showDistance) {
      const measureLine = L.polyline([FOCAL_COORDS, POLICE_COORDS], {
        color: '#b91c1c',
        weight: 2.5,
        dashArray: '5, 5',
      })
      measureLine.addTo(measurementLayerGroupRef.current!)

      const midLat = (FOCAL_COORDS[0] + POLICE_COORDS[0]) / 2
      const midLng = (FOCAL_COORDS[1] + POLICE_COORDS[1]) / 2
      const badgeIcon = L.divIcon({
        className: 'custom-dist-badge',
        iconSize: [95, 22],
        iconAnchor: [47, 11],
        html: `
          <div class="bg-slate-900/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap text-center border border-slate-700">
            650m • ~2 phút
          </div>
        `,
      })
      L.marker([midLat, midLng], { icon: badgeIcon, interactive: false }).addTo(measurementLayerGroupRef.current!)
    }

    // 800m Radius Circle around Focal Hotspot
    if (showRadius) {
      const radiusCircle = L.circle(FOCAL_COORDS, {
        radius: 800,
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.1,
        weight: 1.5,
        dashArray: '4, 4',
      })
      radiusCircle.addTo(measurementLayerGroupRef.current!)
    }
  }, [showDistance, showRadius, activeCategory])

  return (
    <div className="flex flex-col w-full space-y-4 pb-10">
      {/* Inline styles for GIS Map canvas grid & radar simulation */}
      <style>{`
        .radar-pulse {
          animation: pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.7);
            opacity: 0.8;
          }
          70%, 100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
        .custom-village-tooltip {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid #bfdbfe;
          border-radius: 6px;
          padding: 2px 6px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Sub-header & Filter Bar */}
      <section className="bg-white rounded-lg shadow-xs border border-gray-200 p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              BẢN ĐỒ SỐ GIS &amp; ĐIỀU HÀNH ĐỊA BÀN - XÃ CAN LỘC
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1"></span>
              Dữ liệu GIS trực tuyến 24/7
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Giám sát an ninh trật tự, quản lý hạ tầng và tiếp nhận phản ánh hiện trường 06 thôn hành chính
          </p>
        </div>

        {/* Quick category filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-md font-semibold shadow-xs flex items-center gap-1 transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#b91c1c] text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
            Tất cả (14)
          </button>
          <button
            onClick={() => setActiveCategory('antt')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1 transition-colors ${
              activeCategory === 'antt'
                ? 'bg-[#b91c1c] text-white font-semibold'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-600"></span> ANTT (4)
          </button>
          <button
            onClick={() => setActiveCategory('pccc')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1 transition-colors ${
              activeCategory === 'pccc'
                ? 'bg-[#b91c1c] text-white font-semibold'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> PCCC (1)
          </button>
          <button
            onClick={() => setActiveCategory('attp')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1 transition-colors ${
              activeCategory === 'attp'
                ? 'bg-[#b91c1c] text-white font-semibold'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> ATTP (2)
          </button>
          <button
            onClick={() => setActiveCategory('environment')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1 transition-colors ${
              activeCategory === 'environment'
                ? 'bg-[#b91c1c] text-white font-semibold'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Môi trường (3)
          </button>
          <button
            onClick={() => setActiveCategory('construction')}
            className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1 transition-colors ${
              activeCategory === 'construction'
                ? 'bg-[#b91c1c] text-white font-semibold'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Trật tự xây dựng (4)
          </button>
        </div>
      </section>

      {statusMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-4 py-2 rounded-lg flex items-center justify-between">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="font-bold text-emerald-900">
            ×
          </button>
        </div>
      )}

      {/* Map and Detail Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* BEGIN: LeftGISMap (Column 70% ~ 8 cols on LG) */}
        <section className="lg:col-span-8 flex flex-col space-y-3">
          {/* GIS Map Main Container */}
          <div className="relative bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden flex-1 min-h-[640px] flex flex-col">
            {/* Map Overlay Top Toolbars */}
            <div className="absolute top-3 left-3 right-3 z-[600] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
              {/* Address and Search helper in map */}
              <div className="pointer-events-auto flex items-center bg-white/95 backdrop-blur-xs border border-gray-200 shadow-xs rounded-lg px-3 py-1.5 max-w-md w-full">
                <svg className="w-4 h-4 text-[#b91c1c] mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    clipRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2.5 2.5 0 000 4z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <input
                  className="w-full border-none p-0 text-xs font-semibold text-gray-800 focus:ring-0 bg-transparent"
                  readOnly
                  type="text"
                  value="Ngã 3 đường liên thôn, Thôn Trâm Lạc, Xã Can Lộc"
                />
                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                  18.5225°N, 105.7585°E
                </span>
              </div>

              {/* GIS Layer switchers */}
              <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1 border border-gray-200 shadow-xs rounded-lg text-xs font-medium">
                <button
                  onClick={() => {
                    setShowRadius(!showRadius)
                    handleAction(showRadius ? 'Đã ẩn bán kính 800m' : 'Đã bật chế độ xem bán kính 800m')
                  }}
                  className={`px-2.5 py-1 rounded border flex items-center gap-1 font-semibold transition ${
                    showRadius ? 'bg-red-50 text-[#b91c1c] border-red-200 hover:bg-red-100' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 text-[#b91c1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  Bán kính 800m
                </button>
                <button
                  onClick={() => {
                    setShowDistance(!showDistance)
                    handleAction(showDistance ? 'Đã ẩn thước đo khoảng cách' : 'Công cụ đo khoảng cách đang hoạt động')
                  }}
                  className={`px-2.5 py-1 rounded border flex items-center gap-1 font-semibold transition ${
                    showDistance ? 'bg-red-50 text-[#b91c1c] border-red-200 hover:bg-red-100' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  Đo khoảng cách
                </button>
                <label className="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-gray-100 cursor-pointer text-gray-700">
                  <input
                    checked={showBoundaries}
                    onChange={(e) => setShowBoundaries(e.target.checked)}
                    className="rounded text-[#b91c1c] focus:ring-red-500 w-3.5 h-3.5"
                    type="checkbox"
                  />
                  <span>Ranh giới 6 thôn</span>
                </label>
              </div>
            </div>

            {/* Secondary Filter Ribbon on Map: Landmarks selection */}
            <div className="absolute top-14 left-3 z-[600] pointer-events-auto bg-white/95 backdrop-blur-xs border border-gray-200 rounded-md shadow-xs px-3 py-1.5 flex flex-wrap items-center gap-3 text-xs">
              <span className="font-bold text-gray-700 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-[#b91c1c]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Cơ sở trọng yếu:
              </span>
              <label className="inline-flex items-center gap-1 text-gray-700 cursor-pointer">
                <input
                  checked={showPolice}
                  onChange={(e) => setShowPolice(e.target.checked)}
                  className="rounded text-[#b91c1c] focus:ring-red-500 w-3.5 h-3.5"
                  type="checkbox"
                />
                <span>Công an Xã Can Lộc</span>
              </label>
              <label className="inline-flex items-center gap-1 text-gray-700 cursor-pointer">
                <input
                  checked={showUbnd}
                  onChange={(e) => setShowUbnd(e.target.checked)}
                  className="rounded text-[#b91c1c] focus:ring-red-500 w-3.5 h-3.5"
                  type="checkbox"
                />
                <span>Trụ sở UBND Xã</span>
              </label>
              <label className="inline-flex items-center gap-1 text-gray-700 cursor-pointer">
                <input
                  checked={showSchool}
                  onChange={(e) => setShowSchool(e.target.checked)}
                  className="rounded text-[#b91c1c] focus:ring-red-500 w-3.5 h-3.5"
                  type="checkbox"
                />
                <span>Trường THCS Can Lộc</span>
              </label>
              <label className="inline-flex items-center gap-1 text-gray-700 cursor-pointer">
                <input
                  checked={showMarket}
                  onChange={(e) => setShowMarket(e.target.checked)}
                  className="rounded text-[#b91c1c] focus:ring-red-500 w-3.5 h-3.5"
                  type="checkbox"
                />
                <span>Chợ Dân sinh Can Lộc</span>
              </label>
              <label className="inline-flex items-center gap-1 text-gray-700 cursor-pointer">
                <input
                  checked={showHealthCenter}
                  onChange={(e) => setShowHealthCenter(e.target.checked)}
                  className="rounded text-[#b91c1c] focus:ring-red-500 w-3.5 h-3.5"
                  type="checkbox"
                />
                <span>Trạm Y tế Xã</span>
              </label>
            </div>

            {/* Real Interactive Leaflet Map Canvas */}
            <div className="relative w-full h-[580px] overflow-hidden">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* GIS Map Legend (Chú giải) */}
              <div className="absolute bottom-3 left-3 z-[600] bg-white/95 backdrop-blur-xs border border-gray-200 rounded-lg p-3 shadow-md text-xs w-60 pointer-events-auto">
                <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-1 mb-2 flex items-center justify-between">
                  <span>CHÚ GIẢI BẢN ĐỒ GIS</span>
                  <span className="text-[10px] text-gray-400 font-normal">Tỷ lệ: 1/5.000</span>
                </h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#b91c1c] shrink-0"></span>
                    <span className="text-gray-700 font-medium">Điểm nóng ANTT khẩn cấp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600 shrink-0"></span>
                    <span className="text-gray-700 font-medium">Công an Xã Can Lộc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0"></span>
                    <span className="text-gray-700 font-medium">Trụ sở HĐND &amp; UBND Xã</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0"></span>
                    <span className="text-gray-700 font-medium">Trường học, trạm y tế, chợ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-blue-400 border-b border-blue-400 border-dashed shrink-0"></span>
                    <span className="text-gray-700 font-medium">Ranh giới 06 Thôn dân cư</span>
                  </div>
                </div>
              </div>

              {/* Map Controls (Zoom, Geolocation) */}
              <div className="absolute bottom-3 right-3 z-[600] flex flex-col gap-1.5 pointer-events-auto">
                <button
                  onClick={() => {
                    mapInstanceRef.current?.zoomIn()
                    handleAction('Phóng to bản đồ')
                  }}
                  className="w-8 h-8 rounded bg-white shadow-md border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 flex items-center justify-center text-sm transition"
                  title="Phóng to"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    mapInstanceRef.current?.zoomOut()
                    handleAction('Thu nhỏ bản đồ')
                  }}
                  className="w-8 h-8 rounded bg-white shadow-md border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 flex items-center justify-center text-sm transition"
                  title="Thu nhỏ"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    mapInstanceRef.current?.setView(CAN_LOC_CENTER, 14)
                    handleAction('Đã định vị về trung tâm Xã Can Lộc, Tỉnh Hà Tĩnh')
                  }}
                  className="w-8 h-8 rounded bg-white shadow-md border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 flex items-center justify-center text-xs transition"
                  title="Vị trí trung tâm Xã Can Lộc"
                >
                  <svg className="w-4 h-4 text-[#b91c1c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-9a1 1 0 112 0v2a1 1 0 11-2 0v-2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Bottom Realtime Indicator Bar */}
            <div className="bg-gray-50 border-t border-gray-200 p-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-6">
                <div>
                  <span className="text-gray-500">Tổng điểm nóng hôm nay:</span>
                  <span className="font-bold text-[#b91c1c] text-sm ml-1">14 vụ việc</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div>
                  <span className="text-gray-500">Tổ tuần tra đang tác chiến địa bàn:</span>
                  <span className="font-bold text-blue-700 text-sm ml-1">03 tổ tác chiến</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div>
                  <span className="text-gray-500">Tỷ lệ xử lý đúng hẹn (SLA):</span>
                  <span className="font-bold text-emerald-600 text-sm ml-1">96.4%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500">Đồng bộ GPS tuần tra: 10 giây trước</span>
                <button
                  onClick={() => handleAction('Đã làm mới dữ liệu GIS')}
                  className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-medium text-[11px]"
                >
                  Làm mới GIS
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BEGIN: RightDetailIncidentPanel (Column 30% ~ 4 cols on LG) */}
        <section className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-lg shadow-xs border border-gray-200 p-4 space-y-3.5">
            {/* Title & Incident Status Header */}
            <div className="border-b border-gray-100 pb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1 animate-pulse"></span>
                  TRẠNG THÁI: {actionStatus}
                </span>
                <span className="text-xs text-gray-400 font-mono">PA-2026-0330 #08</span>
              </div>
              <h2 className="text-base font-bold text-[#b91c1c] leading-snug">
                Tụ tập nhóm thanh niên gây mất ANTT, nẹt pô xe sau 23h tại ngã 3 Thôn Trâm Lạc
              </h2>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                <span>🕒 22:45 - Hôm nay (Cách đây 18 phút)</span>
                <span>•</span>
                <span className="text-[#b91c1c] font-semibold">Lĩnh vực: ANTT</span>
              </p>
            </div>

            {/* Quick Dispatch Status Callout */}
            <div className="bg-amber-50/80 border-l-4 border-amber-500 p-2.5 rounded-r text-xs">
              <p className="text-amber-900 font-medium">
                <strong className="font-bold">Chỉ đạo tức thời:</strong> Đã điều động Tổ công tác Công an Xã Can Lộc
                phụ trách địa bàn Thôn Trâm Lạc tiếp cận hiện trường ngăn chặn vi phạm.
              </p>
            </div>

            {/* Citizen / Reporter Details */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 text-xs space-y-1.5">
              <div className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                Người dân cung cấp thông tin
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800 text-sm">Nguyễn Văn Thành</span>
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                  ✔ Đã xác thực VNeID Cấp 2
                </span>
              </div>
              <div className="text-gray-600 flex justify-between">
                <span>
                  Số điện thoại: <span className="font-mono font-medium">0912.xxx.892</span>
                </span>
                <span>
                  Thôn cư trú: <strong>Trâm Lạc</strong>
                </span>
              </div>
            </div>

            {/* GPS Location & Actual Scene Address */}
            <div className="border border-gray-200 rounded-lg p-3 text-xs space-y-1">
              <div className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                Tọa độ GPS &amp; Địa chỉ hiện trường
              </div>
              <p className="font-semibold text-gray-800">
                Ngã 3 đường liên thôn, Thôn Trâm Lạc, Xã Can Lộc, Tỉnh Hà Tĩnh
              </p>
              <div className="flex items-center justify-between text-gray-500 font-mono text-[11px] pt-1">
                <span>GPS: 18.4682° N, 105.7410° E</span>
                <button
                  onClick={() => handleAction('Đã sao chép tọa độ vào clipboard')}
                  className="text-blue-600 hover:underline font-sans text-xs"
                >
                  Sao chép tọa độ
                </button>
              </div>
            </div>

            {/* Field Photo Attachment */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                  Hình ảnh hiện trường (Từ ứng dụng phản ánh)
                </span>
                <span className="text-gray-400 text-[11px]">1 ảnh đính kèm</span>
              </div>
              <div className="relative rounded-lg overflow-hidden border border-gray-200 group">
                <img
                  alt="Hình ảnh hiện trường phản ánh tại Can Lộc"
                  className="w-full h-36 object-cover object-center group-hover:scale-105 transition duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIuEezb8vHjXGXzGX5f7Q1w1xFwiJFtZ1vNWKe5R2mzhq8a7pScc-u7_HkhECqsAujqnMKxkO-x3rfZxb20Dml4VQ53-OFMBHZfCsc_TDUuGVSeemI8yKFTlcUH5bdNjNH9gB8jN3q9eWXMjSWth59DukxPrYkCum3iNymclgCi6CaiNsuOXb71EKDGYqiMx2SokFPoe8Hxzj1QkVHIDHqFPlplyp-wLDQoLo0PKJs5wEcF_rKLOLzlg"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-[10px] flex justify-between items-end font-mono">
                  <span>GPS: 18.4682, 105.7410 • CAN LOC</span>
                  <span className="bg-[#b91c1c] px-1.5 py-0.5 rounded font-bold font-sans">XÁC THỰC SỐ</span>
                </div>
              </div>
            </div>

            {/* Assigned Officer & Task Force in Charge */}
            <div className="bg-red-50/70 border border-red-200 rounded-lg p-3 text-xs">
              <div className="text-[#b91c1c] font-bold uppercase tracking-wider text-[10px] mb-1.5">
                Cán bộ &amp; Tổ công tác phụ trách
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900 text-sm">Đ/c Thiếu úy Lê Văn B</p>
                  <p className="text-gray-600">Cảnh sát khu vực Thôn Trâm Lạc</p>
                </div>
                <a
                  className="px-2.5 py-1.5 bg-[#b91c1c] text-white font-bold rounded shadow-xs text-xs hover:bg-[#991b1b] transition flex items-center gap-1"
                  href="tel:0983113113"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  0983.xxx.113
                </a>
              </div>
            </div>

            {/* Distance Metrics to Administrative Facilities */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                <span className="text-gray-500 block text-[10px]">Đến CA Xã Can Lộc:</span>
                <strong className="text-[#b91c1c] text-xs">650 mét (~2 phút)</strong>
              </div>
              <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                <span className="text-gray-500 block text-[10px]">Đến Trạm Y tế Xã:</span>
                <strong className="text-blue-700 text-xs">1.2 km (~4 phút)</strong>
              </div>
            </div>

            {/* Action Buttons Group */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => {
                  setActionStatus('ĐÃ XÁC MINH')
                  handleAction('Đã cập nhật tiến độ xử lý điểm nóng')
                }}
                className="w-full py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-md shadow-xs transition flex items-center justify-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                Cập nhật tiến độ
              </button>
              <button
                onClick={() => handleAction('Đã mở hộp thoại chuyển giao đơn vị chuyên môn')}
                className="w-full py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-md shadow-xs transition flex items-center justify-center gap-1"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                Chuyển đơn vị
              </button>
              <button
                onClick={() => handleAction('Đang kết nối liên lạc bộ đàm tới Tổ tuần tra cơ động...')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-md shadow-xs transition flex items-center justify-center gap-1"
              >
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                Gọi cán bộ tuần tra
              </button>
              <button
                onClick={() => {
                  setActionStatus('ĐÃ ĐÓNG')
                  handleAction('Đã đóng phản ánh này sau khi xử lý triệt để')
                }}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition flex items-center justify-center gap-1"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                Đóng phản ánh
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* BEGIN: VillageProgressSection (Thống kê theo 6 thôn dân cư xã Can Lộc) */}
      <section className="bg-white rounded-lg shadow-xs border border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b border-gray-200 gap-2">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#b91c1c]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
              </svg>
              TÌNH HÌNH AN NINH &amp; XỬ LÝ PHẢN ÁNH THEO 06 THÔN HÀNH CHÍNH
            </h3>
            <p className="text-xs text-gray-500">Tiến độ giải quyết vụ việc, vi phạm và kiến nghị cộng đồng trong tuần</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-3 h-2 rounded bg-emerald-500 inline-block"></span> Đã giải quyết dứt điểm
            </span>
            <span className="flex items-center gap-1 text-red-600">
              <span className="w-3 h-2 rounded bg-red-500 inline-block"></span> Đang xử lý / Tồn đọng
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Thôn 1: Trâm Lạc */}
          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-md text-xs">
            <div className="flex justify-between items-center font-bold text-gray-800 mb-1">
              <span>Thôn Trâm Lạc</span>
              <span className="text-[11px] font-mono text-gray-500">11/14</span>
            </div>
            <div className="w-full bg-red-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '78%' }}></div>
              <div className="bg-red-500 h-full" style={{ width: '22%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Xử lý: 78%</span>
              <span className="text-[#b91c1c] font-semibold">3 vụ đang mở</span>
            </div>
          </div>

          {/* Thôn 2: Hồng Triều */}
          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-md text-xs">
            <div className="flex justify-between items-center font-bold text-gray-800 mb-1">
              <span>Thôn Hồng Triều</span>
              <span className="text-[11px] font-mono text-gray-500">13/18</span>
            </div>
            <div className="w-full bg-red-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '72%' }}></div>
              <div className="bg-red-500 h-full" style={{ width: '28%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Xử lý: 72%</span>
              <span className="text-[#b91c1c] font-semibold">5 vụ đang mở</span>
            </div>
          </div>

          {/* Thôn 3: Kim Đính */}
          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-md text-xs">
            <div className="flex justify-between items-center font-bold text-gray-800 mb-1">
              <span>Thôn Kim Đính</span>
              <span className="text-[11px] font-mono text-gray-500">8/9</span>
            </div>
            <div className="w-full bg-red-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '88%' }}></div>
              <div className="bg-red-500 h-full" style={{ width: '12%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Xử lý: 88%</span>
              <span className="text-[#b91c1c] font-semibold">1 vụ đang mở</span>
            </div>
          </div>

          {/* Thôn 4: Thượng Xá */}
          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-md text-xs">
            <div className="flex justify-between items-center font-bold text-gray-800 mb-1">
              <span>Thôn Thượng Xá</span>
              <span className="text-[11px] font-mono text-gray-500">9/12</span>
            </div>
            <div className="w-full bg-red-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '75%' }}></div>
              <div className="bg-red-500 h-full" style={{ width: '25%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Xử lý: 75%</span>
              <span className="text-[#b91c1c] font-semibold">3 vụ đang mở</span>
            </div>
          </div>

          {/* Thôn 5: Phúc Hậu */}
          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-md text-xs">
            <div className="flex justify-between items-center font-bold text-gray-800 mb-1">
              <span>Thôn Phúc Hậu</span>
              <span className="text-[11px] font-mono text-gray-500">6/7</span>
            </div>
            <div className="w-full bg-red-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '85%' }}></div>
              <div className="bg-red-500 h-full" style={{ width: '15%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Xử lý: 85%</span>
              <span className="text-[#b91c1c] font-semibold">1 vụ đang mở</span>
            </div>
          </div>

          {/* Thôn 6: Sơn Hà */}
          <div className="p-2.5 bg-slate-50 border border-gray-200 rounded-md text-xs">
            <div className="flex justify-between items-center font-bold text-gray-800 mb-1">
              <span>Thôn Sơn Hà</span>
              <span className="text-[11px] font-mono text-gray-500">4/5</span>
            </div>
            <div className="w-full bg-red-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '80%' }}></div>
              <div className="bg-red-500 h-full" style={{ width: '20%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>Xử lý: 80%</span>
              <span className="text-[#b91c1c] font-semibold">1 vụ đang mở</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CitizenMapGisPage
