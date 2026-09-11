import React, { useState, useEffect, useRef } from 'react'
import L from 'leaflet'

interface CameraStream {
  id: string
  name: string
  code: string
  location: string
  timeStr: string
  quality: string
  icon: string
  bitrate: string
  statusBadge: string
  statusType: 'live' | 'alert' | 'anpr'
  highlightBadge?: string
  aiNote?: string
  footerInfo?: string
  coords: [number, number]
}

const cameraStreams: CameraStream[] = [
  {
    id: 'cam1',
    name: 'Ngã 3 trung tâm Chợ Can Lộc - Trục đường chính',
    code: 'CANLOC-CAM-01',
    location: 'Khu vực Chợ Can Lộc',
    timeStr: '2025-02-24 10:24:18 ICT',
    quality: '1080P@30FPS',
    icon: 'fa-solid fa-video',
    bitrate: '4.2 Mbps',
    statusBadge: 'Lưu lượng: 42 xe/phút',
    statusType: 'live',
    highlightBadge: 'PTZ TỰ ĐỘNG',
    aiNote: '[AI: Xe máy x 14] [Ô tô x 3]',
    coords: [18.5284, 105.7483],
  },
  {
    id: 'cam2',
    name: 'Cổng Trụ sở UBND & Công an Xã Can Lộc',
    code: 'CANLOC-CAM-02',
    location: 'Trụ sở UBND Xã',
    timeStr: '2025-02-24 10:24:18 ICT',
    quality: '1080P - ANPR',
    icon: 'fa-solid fa-building-shield',
    bitrate: '3.8 Mbps',
    statusBadge: 'An ninh: Bình thường',
    statusType: 'anpr',
    footerInfo: '38A-128.94 vừa vào',
    coords: [18.531, 105.75],
  },
  {
    id: 'cam3',
    name: 'Ngã tư Trường Tiểu học Can Lộc - Khu vực Cổng',
    code: 'CANLOC-CAM-03',
    location: 'Trường Tiểu học',
    timeStr: '2025-02-24 10:24:18 ICT',
    quality: '1080P - AI CROWD',
    icon: 'fa-solid fa-school',
    bitrate: '4.0 Mbps',
    statusBadge: 'Cảnh báo: Mật độ cao',
    statusType: 'alert',
    coords: [18.532, 105.744],
  },
  {
    id: 'cam4',
    name: 'Cầu vượt kênh tưới tiêu Thôn Phúc Hậu',
    code: 'CANLOC-CAM-04',
    location: 'Thôn Phúc Hậu',
    timeStr: '2025-02-24 10:24:18 ICT',
    quality: '1080P',
    icon: 'fa-solid fa-water',
    bitrate: '3.5 Mbps',
    statusBadge: 'Mực nước an toàn: +1.2m',
    statusType: 'live',
    footerInfo: 'Không phát hiện vi phạm xả thải',
    coords: [18.529, 105.736],
  },
  {
    id: 'cam5',
    name: 'Ngã 3 Thôn Trâm Lạc (Điểm nóng phản ánh ANTT)',
    code: 'CANLOC-CAM-05',
    location: 'Thôn Trâm Lạc',
    timeStr: '2025-02-24 10:24:18 ICT',
    quality: '1080P - PTZ',
    icon: 'fa-solid fa-person-military-pointing',
    bitrate: '4.5 Mbps',
    statusBadge: 'Theo dõi tụ tập ANTT',
    statusType: 'alert',
    coords: [18.5225, 105.7585],
  },
  {
    id: 'cam6',
    name: 'Đoạn đường liên thôn Can Lộc - Sơn Hà (Tuyến ĐT 548)',
    code: 'CANLOC-CAM-06',
    location: 'Tuyến ĐT 548',
    timeStr: '2025-02-24 10:24:18 ICT',
    quality: '1080P - RADAR',
    icon: 'fa-solid fa-truck-moving',
    bitrate: '4.6 Mbps',
    statusBadge: 'Xe tải nặng: 48 km/h',
    statusType: 'alert',
    coords: [18.5335, 105.7512],
  },
]

export const CitizenCameraPage: React.FC = () => {
  const [gridMode, setGridMode] = useState<'2x2' | '3x3' | '4x4'>('3x3')
  const [filterLocation, setFilterLocation] = useState<string>('all')
  const [selectedCam, setSelectedCam] = useState<CameraStream | null>(null)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  const miniMapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  const HA_TINH_BOUNDS: L.LatLngBoundsExpression = [
    [17.80, 105.0],
    [18.90, 106.6],
  ]
  const CAN_LOC_CENTER: [number, number] = [18.5284, 105.7483] // Xã Can Lộc, Hà Tĩnh

  const handleAction = (msg: string) => {
    setAlertMessage(msg)
    setTimeout(() => setAlertMessage(null), 3000)
  }

  // Mini Leaflet Map initialization
  useEffect(() => {
    if (!miniMapContainerRef.current || mapInstanceRef.current) return

    const miniMap = L.map(miniMapContainerRef.current, {
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
    }).addTo(miniMap)

    cameraStreams.forEach((cam, index) => {
      const isAlert = cam.statusType === 'alert'
      const camNum = index + 1
      const icon = L.divIcon({
        className: 'custom-cam-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            ${isAlert
            ? '<span class="absolute w-7 h-7 rounded-full bg-red-500 animate-ping opacity-75"></span>'
            : ''
          }
            <div class="w-6 h-6 rounded-full ${isAlert ? 'bg-red-600' : 'bg-slate-900'
          } text-white flex items-center justify-center text-[10px] font-bold shadow-md border-2 border-white hover:scale-125 transition-transform">
              ${camNum}
            </div>
          </div>
        `,
      })

      const marker = L.marker(cam.coords, { icon })
      marker.bindPopup(`
        <div class="p-2 text-xs">
          <div class="flex items-center gap-1 mb-1">
            <span class="font-bold text-xs text-red-700">CAM 0${camNum}</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded bg-gray-100 font-semibold">${cam.quality}</span>
          </div>
          <div class="font-medium text-[11px] text-gray-800 leading-snug">${cam.name}</div>
          <div class="text-[10px] text-gray-500 mt-1">Vị trí: ${cam.location}</div>
        </div>
      `)
      marker.on('click', () => {
        setSelectedCam(cam)
      })
      marker.addTo(miniMap)
    })

    mapInstanceRef.current = miniMap

    const resizeObserver = new ResizeObserver(() => {
      miniMap.invalidateSize()
    })
    resizeObserver.observe(miniMapContainerRef.current)

    return () => {
      resizeObserver.disconnect()
      miniMap.remove()
      mapInstanceRef.current = null
    }
  }, [])

  const filteredCams = cameraStreams.filter((cam) => {
    if (filterLocation === 'all') return true
    if (filterLocation === 'ubnd') return cam.location.includes('UBND')
    if (filterLocation === 'market') return cam.location.includes('Chợ')
    if (filterLocation === 'school') return cam.location.includes('Trường')
    if (filterLocation === 'dt548') return cam.location.includes('ĐT 548')
    return true
  })

  return (
    <div className="flex flex-col w-full space-y-4 pb-10">
      <style>{`
        .cam-live-indicator {
          animation: pulse-dot 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: .4; }
        }
      `}</style>

      {/* Title Section & Direct Command Banner */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg md:text-xl font-black text-[#991b1b] tracking-tight uppercase flex items-center gap-2">
                <span className="w-8 h-8 rounded bg-red-100 text-[#b91c1c] flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-video"></i>
                </span>
                HỆ THỐNG CAMERA GIÁM SÁT AN NINH TRẬT TỰ &amp; GIAO THÔNG ĐỊA BÀN XÃ CAN LỘC
              </h1>
              <span className="bg-red-600 text-white text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-white cam-live-indicator"></span> TRỰC TIẾP CHỈ HUY
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <i className="fa-solid fa-network-wired text-slate-400"></i> Hạ tầng mạng truyền dẫn cáp quang tốc độ
              cao kết nối Đồn Công an Xã và Trung tâm Hành chính Công - Bao phủ 06 thôn hành chính
            </p>
          </div>

          {/* Live Stream Stats Badges */}
          <div className="flex items-center gap-2 text-xs self-stretch lg:self-auto">
            <button
              onClick={() => handleAction('Đã làm mới tất cả 32 luồng camera')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 border border-slate-300 transition"
            >
              <i className="fa-solid fa-rotate"></i> Làm mới luồng
            </button>
            <button
              onClick={() => handleAction('Đã gửi tín hiệu báo động tới trực ban Công an Xã!')}
              className="bg-[#991b1b] hover:bg-red-800 text-white px-3.5 py-1.5 rounded-md font-semibold flex items-center gap-1.5 shadow-xs transition"
            >
              <i className="fa-solid fa-bullhorn text-amber-300"></i> Báo động toàn xã
            </button>
          </div>
        </div>

        {/* Quick KPI Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-100">
          {/* Metric 1: Stream Status */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Trạng thái truyền phát</div>
              <div className="text-lg font-black text-slate-800 mt-0.5">
                32/34 <span className="text-xs font-normal text-amber-600 font-medium">(2 bảo trì)</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-tower-broadcast"></i>
            </div>
          </div>

          {/* Metric 2: ANPR License Plate Reading */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Mắt quét nhận diện ANPR</div>
              <div className="text-lg font-black text-blue-700 mt-0.5">
                06 <span className="text-xs font-medium text-blue-600">Điểm (100% Online)</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-id-badge"></i>
            </div>
          </div>

          {/* Metric 3: PTZ 360 Rotation */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Camera PTZ 360° cơ động</div>
              <div className="text-lg font-black text-indigo-700 mt-0.5">
                04 <span className="text-xs font-medium text-slate-600">Điều khiển từ xa</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-arrows-up-down-left-right"></i>
            </div>
          </div>

          {/* Metric 4: Active Alerts */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-red-700 font-medium">Cảnh báo thông minh AI</div>
              <div className="text-lg font-black text-[#b91c1c] mt-0.5">
                03 <span className="text-xs font-semibold text-red-600">Điểm nóng chờ xử lý</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-red-200 text-[#b91c1c] flex items-center justify-center text-sm font-bold animate-pulse">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
          </div>
        </div>
      </div>

      {alertMessage && (
        <div className="p-3 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-300 flex items-center justify-between text-xs animate-in fade-in">
          <span>{alertMessage}</span>
          <button onClick={() => setAlertMessage(null)} className="font-bold text-emerald-800">
            ×
          </button>
        </div>
      )}

      {/* Layout Controls & Filter Toolbar */}
      <div className="bg-white rounded-lg shadow-xs border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Grid Mode Switchers & Actions */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-semibold mr-1">Chế độ xem:</span>
          <button
            onClick={() => setGridMode('2x2')}
            className={`px-2.5 py-1 rounded font-semibold transition flex items-center gap-1 ${gridMode === '2x2' ? 'bg-[#b91c1c] text-white shadow-xs' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
          >
            <i className="fa-solid fa-table-cells-large"></i> 2x2
          </button>
          <button
            onClick={() => setGridMode('3x3')}
            className={`px-2.5 py-1 rounded font-semibold transition flex items-center gap-1 ${gridMode === '3x3' ? 'bg-[#b91c1c] text-white shadow-xs' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
          >
            <i className="fa-solid fa-table-cells"></i> 3x3 Lưới chính
          </button>
          <button
            onClick={() => setGridMode('4x4')}
            className={`px-2.5 py-1 rounded font-semibold transition flex items-center gap-1 ${gridMode === '4x4' ? 'bg-[#b91c1c] text-white shadow-xs' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
          >
            <i className="fa-solid fa-grip"></i> 4x4
          </button>
          <div className="h-4 w-[1px] bg-slate-300 mx-1"></div>
          <button
            onClick={() => handleAction('Đã kích hoạt chế độ toàn màn hình')}
            className="px-2.5 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium flex items-center gap-1"
          >
            <i className="fa-solid fa-expand"></i> Toàn màn hình
          </button>
          <button
            onClick={() => handleAction('Mở kho lưu trữ phát lại lịch sử 30 ngày')}
            className="px-2.5 py-1 rounded bg-amber-700 text-white hover:bg-amber-800 font-medium flex items-center gap-1 shadow-xs"
          >
            <i className="fa-solid fa-clock-rotate-left"></i> Xem lại lịch sử
          </button>
        </div>

        {/* Filter by Location / Village */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-slate-500 font-semibold whitespace-nowrap">
            <i className="fa-solid fa-filter"></i> Lọc theo:
          </span>
          {[
            { id: 'all', label: 'Tất cả (34)' },
            { id: 'ubnd', label: 'UBND & CA Xã (8)' },
            { id: 'market', label: 'Ngã ba Chợ Can Lộc (6)' },
            { id: 'school', label: 'Cổng Trường THCS & Tiểu học (5)' },
            { id: 'dt548', label: 'Tuyến ĐT 548 qua Xã (7)' },
          ].map((loc) => {
            const isActive = filterLocation === loc.id
            return (
              <button
                key={loc.id}
                onClick={() => setFilterLocation(loc.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition ${isActive
                  ? 'bg-slate-800 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
              >
                {loc.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* BEGIN: Realtime Camera Grid */}
      <section className=" gap-4" data-purpose="camera-realtime-grid">
        <div
          className={`grid gap-3.5 ${gridMode === '2x2'
            ? 'grid-cols-1 sm:grid-cols-2'
            : gridMode === '4x4'
              ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2'
            }`}
        >
          {filteredCams.map((cam) => (
            <article
              key={cam.id}
              className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-md flex flex-col justify-between"
            >
              <div className="relative bg-slate-950 aspect-video flex items-center justify-center overflow-hidden group">
                {/* Live Video Feed Representation */}
                <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center text-slate-600 relative">
                  <i className={`${cam.icon} text-4xl mb-2 text-slate-700`}></i>
                  <span className="text-xs text-slate-400 font-mono">
                    {cam.code} [{cam.quality}]
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Bitrate: {cam.bitrate} | Ping: 12ms
                  </span>

                  {/* Street Detection Overlay simulation */}
                  <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                  {cam.aiNote && (
                    <div className="absolute top-8 left-10 border border-yellow-400/70 bg-yellow-400/10 px-1 py-0.5 text-[9px] text-yellow-300 font-mono rounded">
                      {cam.aiNote}
                    </div>
                  )}
                </div>

                {/* Top Stream Overlay Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white cam-live-indicator"></span> LIVE
                  </span>
                  <span className="bg-slate-900/80 backdrop-blur-xs text-slate-200 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700">
                    {cam.code.replace('CANLOC-', '')}
                  </span>
                  <span className="bg-slate-900/80 backdrop-blur-xs text-slate-200 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700">
                    1080P
                  </span>
                </div>

                <div className="absolute top-2 right-2">
                  <span
                    className={`backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs ${cam.statusType === 'alert'
                      ? 'bg-red-600 animate-pulse'
                      : cam.statusType === 'anpr'
                        ? 'bg-blue-600'
                        : 'bg-amber-600/90'
                      }`}
                  >
                    {cam.statusBadge}
                  </span>
                </div>

                {/* Bottom Stream Location */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end text-white text-xs pointer-events-none">
                  <div className="bg-slate-950/80 backdrop-blur-xs px-2 py-1 rounded border border-slate-700/80 max-w-[80%]">
                    <div className="font-bold text-amber-300 text-xs flex items-center gap-1 truncate">
                      <i className="fa-solid fa-location-dot text-red-500"></i> {cam.name}
                    </div>
                    <div className="text-[10px] text-slate-300 font-mono">
                      {cam.timeStr} | Bitrate: {cam.bitrate}
                    </div>
                  </div>
                  {cam.highlightBadge && (
                    <span className="bg-blue-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                      {cam.highlightBadge}
                    </span>
                  )}
                </div>
              </div>

              {/* Cam Action Bar */}
              <div className="bg-slate-900 px-3 py-2 flex items-center justify-between border-t border-slate-800 text-slate-300 text-xs">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedCam(cam)}
                    className="hover:text-white hover:scale-110 transition"
                    title="Phóng to luồng"
                  >
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                  </button>
                  <button
                    onClick={() => handleAction(`Đã chụp ảnh bằng chứng từ ${cam.code}`)}
                    className="hover:text-white hover:scale-110 transition"
                    title="Chụp ảnh bằng chứng"
                  >
                    <i className="fa-solid fa-camera"></i>
                  </button>
                  <button
                    onClick={() => handleAction(`Mở bảng điều khiển góc xoay PTZ cho ${cam.code}`)}
                    className="hover:text-white hover:scale-110 transition"
                    title="Điều khiển góc xoay PTZ"
                  >
                    <i className="fa-solid fa-arrows-up-down-left-right"></i>
                  </button>
                  <button
                    onClick={() => handleAction(`Bật lưới ngắm radar cho ${cam.code}`)}
                    className="hover:text-white hover:scale-110 transition"
                    title="Bật lưới radar"
                  >
                    <i className="fa-solid fa-crosshairs"></i>
                  </button>
                </div>
                {cam.footerInfo ? (
                  <span className="text-[11px] font-mono bg-slate-800 text-emerald-400 border border-slate-700 px-2 py-0.5 rounded">
                    {cam.footerInfo}
                  </span>
                ) : (
                  <button
                    onClick={() => handleAction(`Đang phát thông điệp cảnh báo qua loa tại ${cam.location}`)}
                    className="bg-[#b91c1c] hover:bg-red-700 text-white text-[11px] font-bold px-2.5 py-1 rounded flex items-center gap-1.5 shadow-xs transition"
                  >
                    <i className="fa-solid fa-bullhorn text-amber-300"></i> Phát loa cảnh báo
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Pagination & Bandwidth status */}
        <div className="bg-white rounded-lg border border-slate-200 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 font-medium">
            Đang hiển thị <span className="font-bold text-slate-800">{filteredCams.length}/32</span> mắt giám sát
            trực tiếp • Băng thông đường truyền:{' '}
            <span className="font-bold text-emerald-600">28.4 MB/s</span> • Độ trễ mạng:{' '}
            <span className="font-bold text-slate-800">14ms</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <button className="px-2.5 py-1 rounded border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50 text-xs font-medium">
              Trang trước
            </button>
            <span className="px-3 py-1 bg-[#b91c1c] text-white font-bold rounded text-xs">Trang 1 / 6</span>
            <button className="px-2.5 py-1 rounded border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-medium">
              Trang sau
            </button>
          </div>
        </div>
      </section>

      {/* Modal Zoom Camera if selected */}
      {selectedCam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 w-full max-w-4xl rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
            <div className="p-3 bg-slate-950 flex items-center justify-between border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 cam-live-indicator"></span>
                <span className="font-bold text-sm text-amber-300">{selectedCam.name}</span>
                <span className="text-xs text-slate-400 font-mono">({selectedCam.code})</span>
              </div>
              <button
                onClick={() => setSelectedCam(null)}
                className="text-slate-400 hover:text-white px-2 py-1 text-lg font-bold"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <div className="text-center text-slate-500">
                <i className={`${selectedCam.icon} text-6xl mb-3 text-slate-700`}></i>
                <div className="font-mono text-slate-300 text-sm">{selectedCam.code} [FULL HD 1080P]</div>
                <div className="text-xs text-slate-500">Đang truyền phát với độ trễ thấp &bull; 30 FPS</div>
              </div>
              <div className="absolute bottom-4 left-4 bg-slate-900/80 px-3 py-1.5 rounded text-white text-xs border border-slate-700">
                <div>{selectedCam.name}</div>
                <div className="text-[10px] text-slate-400 font-mono">{selectedCam.timeStr}</div>
              </div>
            </div>
            <div className="p-3 bg-slate-950 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedCam(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CitizenCameraPage
