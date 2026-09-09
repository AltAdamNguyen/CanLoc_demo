import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'

interface CameraItem {
  id: string
  code: string
  name: string
  area: string
  category: 'center' | 'market' | 'school' | 'highway' | 'village'
  resolution: string
  fps: string
  image: string
  status: 'live' | 'warning' | 'maintenance'
  statusBadge?: string
  statusBadgeColor?: string
  overlayText?: string
  overlayIcon?: string
  timeString?: string
  tag: string
  coords: [number, number]
  actionType: 'speaker' | 'anpr' | 'traffic_speaker' | 'water' | 'patrol' | 'ticket'
  actionLabel: string
  actionIcon: string
  actionBtnClass: string
}

export const CameraPage: React.FC = () => {
  const navigate = useNavigate()

  // Layout & Filter States
  const [gridLayout, setGridLayout] = useState<'2x2' | '3x3' | '4x4'>('2x2')
  const [selectedArea, setSelectedArea] = useState<string>('all')
  const [activeModalCamera, setActiveModalCamera] = useState<CameraItem | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<string>('')

  // Video wall container ref for Fullscreen
  const videoWallRef = useRef<HTMLDivElement>(null)

  // Leaflet Mini-map refs
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const yyyy = now.getFullYear()
      const mm = String(now.getMonth() + 1).padStart(2, '0')
      const dd = String(now.getDate()).padStart(2, '0')
      const hh = String(now.getHours()).padStart(2, '0')
      const min = String(now.getMinutes()).padStart(2, '0')
      const ss = String(now.getSeconds()).padStart(2, '0')
      setCurrentTime(`${yyyy}-${mm}-${dd} ${hh}:${min}:${ss} ICT`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  // Camera Data matching camera.html
  const cameras: CameraItem[] = [
    {
      id: 'cam-1',
      code: 'CAM 01',
      name: 'Ngã 3 trung tâm Chợ Can Lộc - Trục đường chính',
      area: 'Ngã ba Chợ Can Lộc',
      category: 'market',
      resolution: '1080p',
      fps: '24fps',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBE71W_wyp8vyqjJsnpLsJZeq9ugQSvFbi3D8JCzAGMMEBiV7QI5X0uhRbJr22eG_VY8BAGLCAKYWTtkP2gJonrg562FLlpsxg8uWFw0m1zsYhwJ5ZEq82W9PuIn2jwuFDK5Clu_XKUFfEzVNG6_O9zALoZmB8dZQI5pCYKFbxprnKP5qmDFaoBSZts0CBkAoJIgbZqG9Gu1cssrLMsNMZz73LR9oPDADpL8H5Nm-xV-xZoENTFWzThkw',
      status: 'live',
      statusBadge: 'PTZ TỰ ĐỘNG',
      statusBadgeColor: 'bg-secondary text-on-secondary',
      overlayText: 'Lưu lượng: 42 xe/phút',
      overlayIcon: 'traffic',
      tag: 'Bitrate: 4.2 Mbps',
      coords: [18.5284, 105.7483],
      actionType: 'speaker',
      actionLabel: 'Phát loa cảnh báo',
      actionIcon: 'volume_up',
      actionBtnClass: 'bg-surface-container text-primary hover:bg-primary hover:text-white',
    },
    {
      id: 'cam-2',
      code: 'CAM 02',
      name: 'Cổng Trụ sở UBND & Công an Xã Can Lộc',
      area: 'Khu vực Trung tâm UBND & Công an Xã',
      category: 'center',
      resolution: '1080p',
      fps: '30fps',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCROTsEIgCPV4qvh4PL92f9T2dl04wwiqD1X5Udiki7q_lxCwEBWktOtWBOyanQM_cnnQ9OMrUTEXG2tWuGGeVQ8N4iHp7WfBUJF3om7j5N8FTXZy0hxOi0l0ETUWYMidjUvtprL7cSL-kCBYW9Xl7uJgMAFWqLQLdTKdJlhgO8XVVcbYBJwtOi8q_FkUvPkvMOkwSeq6sMaeiEyD-_7_zfFEEY07XtUbm6LaB_hiVHNlg5RlwZX0tebg',
      status: 'live',
      statusBadge: 'ANPR Biển số',
      statusBadgeColor: 'bg-secondary text-on-secondary',
      overlayText: 'An ninh: Bình thường',
      overlayIcon: 'verified_user',
      tag: 'Trực ban 24/7',
      coords: [18.528, 105.747],
      actionType: 'anpr',
      actionLabel: 'Tra cứu biển số',
      actionIcon: 'badge',
      actionBtnClass: 'bg-secondary-fixed text-on-secondary-fixed hover:opacity-90',
    },
    {
      id: 'cam-3',
      code: 'CAM 03',
      name: 'Ngã tư Trường Tiểu học Can Lộc - Khu vực Cổng',
      area: 'Cổng Trường THCS & Tiểu học',
      category: 'school',
      resolution: '1080p',
      fps: '24fps',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCKhZQiBxIUU1z-MRZy6nReyMtuuUnSFOh9trbtqSUycyesFkdNCUl6O9EtJ5dVVrxWSikpaS0SMXxvRgVxq_0xnHsbRgEoSp3TmTZAFVMUCNjvSdrFLad0Jry53BIibUlcRqe8PslU0djmbBG44gJaN4dXE4R5ytGsUHrhPmXFFw-cMTXHWjOSFt3CG_BSCOVS7WaadKzjZG1ONKEpu4R-p7idGPoliddCiFAydA8-WEmmKvJKn5BeDA',
      status: 'warning',
      statusBadge: 'Cảnh báo: Mật độ cao',
      statusBadgeColor: 'bg-secondary text-on-secondary animate-pulse',
      overlayText: 'Cảnh báo: Mật độ cao',
      overlayIcon: 'warning',
      tag: 'Phân tích đám đông AI',
      coords: [18.531, 105.745],
      actionType: 'traffic_speaker',
      actionLabel: 'Thông báo loa ATGT',
      actionIcon: 'campaign',
      actionBtnClass: 'bg-secondary-container text-on-secondary-container hover:opacity-90',
    },
    {
      id: 'cam-4',
      code: 'CAM 04',
      name: 'Cầu vượt kênh tưới tiêu Thôn Phúc Hậu',
      area: 'Khu dân cư Thôn Phúc Hậu',
      category: 'village',
      resolution: '1080p',
      fps: '20fps',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBrQCgT2RJOOIfk15MFONmtFZcEeJgxhHjVadfRlon_0pMDgC7nniS8NSRC7LRQ1SZYkqoczZn-FZHnGFaq6ZKgMYBaGubOvB16mF2tBEKby_m5-g80VP8Txx_4jbYg57ziNEDxmFJB8CNHXr6BqZow-k0YvVBZAozLJPdNshwJtE-2nZc1VvEilqwfQIY9f5ZDyqtRKH7riKnDRR92mtzJcloeJ9MO-HyVL6z9EGuUedOf4xtb1q_3Gw',
      status: 'live',
      statusBadge: 'Quan trắc môi trường',
      statusBadgeColor: 'bg-tertiary text-on-tertiary',
      overlayText: 'Mực nước an toàn: +1.2m',
      overlayIcon: 'water',
      tag: 'Môi trường nông thôn',
      coords: [18.529, 105.736],
      actionType: 'water',
      actionLabel: 'Kiểm tra mức nước',
      actionIcon: 'water_drop',
      actionBtnClass: 'bg-tertiary-fixed text-tertiary hover:opacity-90',
    },
    {
      id: 'cam-5',
      code: 'CAM 05',
      name: 'Ngã 3 Thôn Trâm Lạc (Điểm nóng phản ánh ANTT)',
      area: 'Khu dân cư Thôn Trâm Lạc',
      category: 'village',
      resolution: '1080p',
      fps: '24fps',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuABO58njimVNmIa3l3VVQ9OJT2a9QGYypPtwThqAAGKTT--geXoFs9OZqq1tgW8Z-Q6NixKmXhqEf386vrzvS4vu7zRvtr6nGlm5pSFblkjlPkneYvzppm3FIsW1la9hxoUDP_e-7Jf3OGH_luGLFJvjZujoZg3mldBDgOPBl7YC1hfFlh8Kcytkv9SNWSKDAOB_aDU3vza1rASK_nD60bd0wweUeWen8vXZGTd7CGaK4dlx_QN2k2okA',
      status: 'warning',
      statusBadge: 'Theo dõi tụ tập ANTT',
      statusBadgeColor: 'bg-primary text-on-primary',
      overlayText: 'Cảm biến chuyển động AI',
      overlayIcon: 'groups',
      tag: 'Cảm biến chuyển động AI',
      coords: [18.5195, 105.762],
      actionType: 'patrol',
      actionLabel: 'Gửi tuần tra cơ động',
      actionIcon: 'notifications_active',
      actionBtnClass: 'bg-primary text-on-primary hover:bg-primary-container',
    },
    {
      id: 'cam-6',
      code: 'CAM 06',
      name: 'Đoạn đường liên thôn Can Lộc - Sơn Hà (Tuyến ĐT 548)',
      area: 'Tuyến ĐT 548 qua địa bàn',
      category: 'highway',
      resolution: '1080p',
      fps: '30fps',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCu5uqv9bPm16eLaVG1IG21NBmhxiFh7mw8Nt9-dnNs1yapJqaO0RAGM7l20xknLraLRXPjyvdgUnK-X3yYCrrLs01UpAW1B-8femg1mZTQECOqzWVTRHDgNdmV20F-e2LSb7Bz3WU1OrRZQiarQ5jlriSO8XGT1nQRDFBDNXtmP63R5FfJsqOA_qMZMGAIvVfMKRA8ndSDs1J9opVDOzgl0YGEOcCVOfXVuzgaTYFRYji129FNP2-gyA',
      status: 'live',
      statusBadge: 'RADAR Tốc độ',
      statusBadgeColor: 'bg-secondary text-on-secondary',
      overlayText: 'Xe tải nặng: 48 km/h',
      overlayIcon: 'speed',
      tag: 'Kiểm soát tải trọng',
      coords: [18.525, 105.767],
      actionType: 'ticket',
      actionLabel: 'Lập phiếu vi phạm',
      actionIcon: 'receipt_long',
      actionBtnClass: 'bg-surface-container text-primary hover:bg-primary hover:text-white',
    },
  ]

  // Filtered cameras
  const filteredCameras =
    selectedArea === 'all'
      ? cameras
      : cameras.filter((c) => {
          if (selectedArea === 'center') return c.category === 'center'
          if (selectedArea === 'market') return c.category === 'market'
          if (selectedArea === 'school') return c.category === 'school'
          if (selectedArea === 'highway') return c.category === 'highway'
          if (selectedArea === 'village') return c.category === 'village'
          return true
        })

  // Fullscreen action
  const toggleFullscreen = () => {
    if (!videoWallRef.current) return
    if (!document.fullscreenElement) {
      videoWallRef.current.requestFullscreen().catch((err) => {
        setToastMessage(`Không thể kích hoạt toàn màn hình: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Handle Quick Actions
  const handleAction = (cam: CameraItem, e: React.MouseEvent) => {
    e.stopPropagation()
    switch (cam.actionType) {
      case 'speaker':
        setToastMessage(`Đã kích hoạt hệ thống loa cảnh báo công cộng tại ${cam.name}`)
        break
      case 'anpr':
        setToastMessage(`Tra cứu biển số 38A-128.94: Xe cá nhân cư dân thôn Phúc Hậu`)
        break
      case 'traffic_speaker':
        setToastMessage(`Đang phát thông điệp nhắc nhở phụ huynh không dừng đỗ lấn chiếm cổng trường`)
        break
      case 'water':
        setToastMessage(`Mực nước kênh N2 hiện tại: +1.2m (Trạng thái bình thường an toàn)`)
        break
      case 'patrol':
        setToastMessage(`Đã gửi thông báo điều động Tổ tuần tra lưu động đến ${cam.name}`)
        break
      case 'ticket':
        setToastMessage(`Đã xuất thông tin vi phạm quá tốc độ phương tiện sang phân hệ xử lý`)
        break
      default:
        setToastMessage(`Đã thực hiện thao tác trên ${cam.code}`)
    }
  }

  const handleSnapshot = (cam: CameraItem, e: React.MouseEvent) => {
    e.stopPropagation()
    setToastMessage(`Đã chụp ảnh snapshot từ ${cam.code} và lưu vào hồ sơ kiểm toán số`)
  }

  const handleCutClip = (cam: CameraItem, e: React.MouseEvent) => {
    e.stopPropagation()
    setToastMessage(`Đã trích xuất đoạn clip 30 giây bằng chứng từ ${cam.code}`)
  }

  // Initialize mini Leaflet map on right panel
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return

    const CAN_LOC_CENTER: [number, number] = [18.5284, 105.7483]
    const HA_TINH_BOUNDS: L.LatLngBoundsExpression = [
      [17.80, 105.0],
      [18.90, 106.6],
    ]

    const miniMap = L.map(mapContainerRef.current, {
      center: CAN_LOC_CENTER,
      zoom: 13,
      minZoom: 10,
      maxZoom: 16,
      maxBounds: HA_TINH_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      attributionControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(miniMap)

    // Add camera markers to map
    cameras.forEach((cam) => {
      const isWarning = cam.status === 'warning'
      const icon = L.divIcon({
        className: 'custom-div-icon',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            ${
              isWarning
                ? '<span class="absolute w-7 h-7 rounded-full bg-secondary animate-ping opacity-75"></span>'
                : ''
            }
            <div class="w-6 h-6 rounded-full ${
              isWarning ? 'bg-secondary' : 'bg-primary'
            } text-white flex items-center justify-center shadow-md border-2 border-white hover:scale-125 transition-transform">
              <span class="material-symbols-outlined text-[14px]">videocam</span>
            </div>
          </div>
        `,
      })

      const marker = L.marker(cam.coords, { icon })
      marker.bindPopup(`
        <div class="p-3">
          <div class="flex items-center gap-1 mb-1">
            <span class="font-bold text-xs text-primary">${cam.code}</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded bg-gray-100 font-semibold">${cam.resolution}</span>
          </div>
          <div class="font-medium text-[11px] text-gray-800 leading-snug">${cam.name}</div>
          <div class="text-[10px] text-gray-500 mt-1">Trạng thái: ${
            cam.status === 'warning' ? 'Đang có cảnh báo' : 'Trực tiếp bình thường'
          }</div>
        </div>
      `)
      marker.addTo(miniMap)
    })

    mapInstanceRef.current = miniMap

    return () => {
      miniMap.remove()
      mapInstanceRef.current = null
    }
  }, [])

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#271816] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 border border-outline-variant/40 animate-in fade-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
            notifications_active
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

      {/* 1. Header Card & Controls */}
      <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-xs flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[24px]">videocam</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-headline-sm text-headline-sm text-primary uppercase font-bold tracking-tight">
                  Hệ thống Camera Giám sát An ninh Trật tự &amp; Giao thông Địa bàn Xã Can Lộc
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm font-bold bg-primary text-on-primary">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
                  TRỰC TIẾP CHỈ HUY
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                Hạ tầng mạng truyền dẫn cáp quang tốc độ cao kết nối Đồn Công an và Trung tâm Hành
                chính Xã
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Grid Switcher */}
            <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-[#E4E7EC]">
              <button
                onClick={() => setGridLayout('2x2')}
                className={`px-2.5 py-1 rounded-md text-label-sm font-label-sm font-semibold transition-all flex items-center gap-1 ${
                  gridLayout === '2x2'
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                <span>2x2</span>
              </button>
              <button
                onClick={() => setGridLayout('3x3')}
                className={`px-2.5 py-1 rounded-md text-label-sm font-label-sm font-semibold transition-all flex items-center gap-1 ${
                  gridLayout === '3x3'
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">apps</span>
                <span>3x3</span>
              </button>
              <button
                onClick={() => setGridLayout('4x4')}
                className={`px-2.5 py-1 rounded-md text-label-sm font-label-sm font-semibold transition-all flex items-center gap-1 ${
                  gridLayout === '4x4'
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">view_comfy</span>
                <span>4x4</span>
              </button>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 hover:bg-surface-container-high transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              <span>Toàn màn hình</span>
            </button>

            {/* History Playback Button */}
            <button
              onClick={() =>
                setToastMessage('Đang tải bộ lọc xem lại video lịch sử camera theo mốc thời gian...')
              }
              className="px-3.5 py-1.5 rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1 hover:opacity-90 transition-opacity shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>Xem lại lịch sử</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/30">
            <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">sensors</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Trạng thái truyền phát
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-title-lg text-title-lg font-bold text-primary">32/34</span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                  (2 bảo trì)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/30">
            <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">pin_invoke</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Mắt quét nhận diện ANPR
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-title-lg text-title-lg font-bold text-on-surface">
                  06 Điểm
                </span>
                <span className="font-label-sm text-label-sm text-primary font-bold">
                  100% Hoạt động
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/30">
            <div className="w-9 h-9 rounded-lg bg-tertiary text-on-tertiary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">360</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Mắt camera PTZ 360°
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-title-lg text-title-lg font-bold text-on-surface">
                  04 Thiết bị
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Điều khiển từ xa
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/30">
            <div className="w-9 h-9 rounded-lg bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">notification_important</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Cảnh báo thông minh trong ca
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-title-lg text-title-lg font-bold text-primary">
                  03 Điểm nóng
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-medium">
                  Chờ xử lý
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
          <span className="font-label-sm text-label-sm font-bold uppercase text-on-surface-variant whitespace-nowrap">
            Khu vực:
          </span>
          <button
            onClick={() => setSelectedArea('all')}
            className={`px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold transition-all whitespace-nowrap ${
              selectedArea === 'all'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Tất cả camera (34)
          </button>
          <button
            onClick={() => setSelectedArea('center')}
            className={`px-3 py-1 rounded-full text-label-sm font-label-sm font-medium transition-all whitespace-nowrap ${
              selectedArea === 'center'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Khu vực Trung tâm UBND &amp; Công an Xã (8)
          </button>
          <button
            onClick={() => setSelectedArea('market')}
            className={`px-3 py-1 rounded-full text-label-sm font-label-sm font-medium transition-all whitespace-nowrap ${
              selectedArea === 'market'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Ngã ba Chợ Can Lộc (6)
          </button>
          <button
            onClick={() => setSelectedArea('school')}
            className={`px-3 py-1 rounded-full text-label-sm font-label-sm font-medium transition-all whitespace-nowrap ${
              selectedArea === 'school'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Cổng Trường THCS &amp; Tiểu học (5)
          </button>
          <button
            onClick={() => setSelectedArea('highway')}
            className={`px-3 py-1 rounded-full text-label-sm font-label-sm font-medium transition-all whitespace-nowrap ${
              selectedArea === 'highway'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Tuyến ĐT 548 qua địa bàn (9)
          </button>
          <button
            onClick={() => setSelectedArea('village')}
            className={`px-3 py-1 rounded-full text-label-sm font-label-sm font-medium transition-all whitespace-nowrap ${
              selectedArea === 'village'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Khu dân cư Thôn Trâm Lạc (6)
          </button>
        </div>
      </div>

      {/* 2. Main Content Grid (Video Wall Left & Controls Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
        {/* LEFT COLUMN (Span 8) - Video Wall */}
        <div ref={videoWallRef} className="xl:col-span-8 flex flex-col gap-4">
          <div
            className={`grid gap-3 transition-all duration-300 ${
              gridLayout === '2x2'
                ? 'grid-cols-1 md:grid-cols-2'
                : gridLayout === '3x3'
                ? 'grid-cols-1 md:grid-cols-3'
                : 'grid-cols-2 md:grid-cols-4'
            }`}
          >
            {filteredCameras.map((cam) => (
              <div
                key={cam.id}
                className="group relative bg-[#1e1b1b] rounded-xl overflow-hidden flex flex-col shadow-sm border border-[#E4E7EC] hover:shadow-md transition-all"
              >
                {/* Camera Screen Feed */}
                <div
                  className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer"
                  onClick={() => setActiveModalCamera(cam)}
                >
                  <img
                    src={cam.image}
                    alt={cam.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-primary text-on-primary font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      LIVE
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white font-label-sm text-label-sm font-semibold">
                      {cam.code}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white/90 font-label-sm text-label-sm hidden sm:inline-block">
                      {cam.resolution} | {cam.fps}
                    </span>
                  </div>

                  {/* Top Right Overlay Tag */}
                  {cam.overlayText && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/65 backdrop-blur-xs px-2 py-0.5 rounded-md text-white font-label-sm text-label-sm shadow-xs">
                      {cam.overlayIcon && (
                        <span className="material-symbols-outlined text-[14px] text-secondary-fixed">
                          {cam.overlayIcon}
                        </span>
                      )}
                      <span>{cam.overlayText}</span>
                    </div>
                  )}

                  {/* Bottom Text inside video */}
                  <div className="absolute left-2.5 bottom-2.5 right-2.5 flex items-end justify-between text-white pointer-events-none">
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="font-label-md text-label-md font-bold drop-shadow truncate">
                        {cam.name}
                      </span>
                      <span className="font-label-sm text-label-sm text-white/80 font-mono drop-shadow">
                        {currentTime} | {cam.tag}
                      </span>
                    </div>
                    {cam.statusBadge && (
                      <span
                        className={`px-2 py-0.5 rounded-md font-label-sm text-label-sm font-bold shrink-0 shadow-xs ${
                          cam.statusBadgeColor || 'bg-secondary text-on-secondary'
                        }`}
                      >
                        {cam.statusBadge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="bg-white p-2 flex items-center justify-between border-t border-[#E4E7EC]">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveModalCamera(cam)}
                      className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface transition-colors"
                      title="Phóng to khung hình"
                    >
                      <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                    </button>
                    <button
                      onClick={(e) => handleSnapshot(cam, e)}
                      className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface transition-colors"
                      title="Chụp ảnh snapshot"
                    >
                      <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                    </button>
                    <button
                      onClick={(e) => handleCutClip(cam, e)}
                      className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface transition-colors"
                      title="Cắt clip bằng chứng 30s"
                    >
                      <span className="material-symbols-outlined text-[18px]">content_cut</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveModalCamera(cam)
                        setToastMessage(`Đang chuyển sang chế độ điều khiển PTZ trên ${cam.code}`)
                      }}
                      className="p-1.5 rounded-lg hover:bg-surface-container text-primary transition-colors"
                      title="Điều khiển góc quay PTZ"
                    >
                      <span className="material-symbols-outlined text-[18px]">control_camera</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleAction(cam, e)}
                      className={`px-2.5 py-1 rounded-lg font-label-sm text-label-sm font-bold flex items-center gap-1 transition-colors shadow-xs ${cam.actionBtnClass}`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {cam.actionIcon}
                      </span>
                      <span className="hidden sm:inline-block">{cam.actionLabel}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Wall Footer with Stats & Pagination */}
          <div className="bg-white rounded-xl p-4 border border-[#E4E7EC] shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label-sm text-label-sm font-bold text-on-surface">
                Đang hiển thị {filteredCameras.length}/32 mắt giám sát trực tiếp
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                • Băng thông đường truyền: 28.4 MB/s • Độ trễ mạng: 14ms
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setToastMessage('Đang ở trang 1')}
                className="px-3 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-medium hover:bg-surface-container-high transition-colors"
              >
                Trang trước
              </button>
              <span className="font-label-sm text-label-sm font-bold text-primary px-1">
                Trang 1 / 6
              </span>
              <button
                onClick={() => setToastMessage('Chuyển sang trang 2 camera tiếp theo')}
                className="px-3 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-medium hover:bg-surface-container-high transition-colors"
              >
                Trang sau
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Span 4) - Map & AI Event Feed & Quick Command */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* Card: Map positioning of cameras */}
          <div className="bg-white rounded-xl border border-[#E4E7EC] p-4 md:p-5 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">map</span>
                <span className="font-title-lg text-title-lg text-on-surface font-bold">
                  Bản đồ Định vị Mạng lưới Camera
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md">
                32 MẮT ONLINE
              </span>
            </div>

            {/* Leaflet Mini Map */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden border border-[#E4E7EC] select-none">
              <div ref={mapContainerRef} className="w-full h-full z-0" />
              <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md font-label-sm text-label-sm text-on-surface font-medium shadow-xs border border-gray-200 z-10">
                Tỷ lệ phủ sóng dân cư: 88.5%
              </div>
            </div>

            <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant pt-1 border-t border-gray-100">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Đang trực tiếp
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> Đang cảnh báo
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-outline"></span> Bảo trì
              </span>
            </div>
          </div>

          {/* Card: AI Event Feed */}
          <div className="bg-white rounded-xl border border-[#E4E7EC] p-4 md:p-5 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                <span className="font-title-lg text-title-lg text-on-surface font-bold">
                  Cảnh báo Thông minh (AI Event Feed)
                </span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Event 1 */}
              <div className="p-3 rounded-xl bg-error-container/80 text-on-error-container flex flex-col gap-1.5 border border-error/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold bg-error text-white px-2 py-0.5 rounded-md">
                    MỨC ĐỘ 1: GIAO THÔNG
                  </span>
                  <span className="font-label-sm text-label-sm font-mono opacity-80">
                    10:12 Hôm nay
                  </span>
                </div>
                <span className="font-label-md text-label-md font-bold text-on-error-container leading-snug">
                  Phát hiện xe tải che chắn không kỹ làm rơi vãi đất đá
                </span>
                <div className="flex items-center justify-between text-label-sm font-label-sm">
                  <span className="font-semibold">Vị trí: CAM 06 (Tuyến ĐT 548)</span>
                  <span className="font-mono underline font-bold">BS: 38C-082.11</span>
                </div>
                <div className="flex items-center gap-2 pt-1.5">
                  <button
                    onClick={() =>
                      setToastMessage('Đã mở phân hệ lập biên bản điện tử xử phạt BS 38C-082.11')
                    }
                    className="px-3 py-1 rounded-lg bg-error text-white font-label-sm text-label-sm font-bold hover:opacity-90 shadow-xs transition-opacity"
                  >
                    Lập biên bản
                  </button>
                  <button
                    onClick={() =>
                      setToastMessage('Đang phát lại đoạn video sự kiện xe tải vi phạm lúc 10:12')
                    }
                    className="px-3 py-1 rounded-lg bg-white text-on-surface font-label-sm text-label-sm font-semibold hover:bg-gray-50 border border-[#E4E7EC] shadow-xs transition-colors"
                  >
                    Xem lại video
                  </button>
                </div>
              </div>

              {/* Event 2 */}
              <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5 border border-outline-variant/30 hover:bg-surface-container transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold bg-secondary text-on-secondary px-2 py-0.5 rounded-md">
                    MỨC ĐỘ 2: TRẬT TỰ
                  </span>
                  <span className="font-label-sm text-label-sm font-mono text-on-surface-variant">
                    09:45 Hôm nay
                  </span>
                </div>
                <span className="font-label-md text-label-md font-bold text-on-surface leading-snug">
                  Cảnh báo lấn chiếm lòng lề đường họp chợ trái phép
                </span>
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>Vị trí: CAM 01 (Khu vực Chợ Can Lộc)</span>
                  <span>Khu vực bán rau quả</span>
                </div>
                <div className="flex items-center gap-2 pt-1.5">
                  <button
                    onClick={() =>
                      setToastMessage('Đã phát thông điệp nhắc nhở giải tỏa lòng lề đường họp chợ')
                    }
                    className="px-3 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:opacity-90 shadow-xs transition-opacity"
                  >
                    Phát loa nhắc nhở
                  </button>
                  <button
                    onClick={() => setToastMessage('Đã ghi nhận bỏ qua sự kiện cảnh báo')}
                    className="px-3 py-1 rounded-lg bg-white text-on-surface font-label-sm text-label-sm font-medium hover:bg-gray-50 border border-[#E4E7EC] transition-colors"
                  >
                    Bỏ qua
                  </button>
                </div>
              </div>

              {/* Event 3 */}
              <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5 border border-outline-variant/30 hover:bg-surface-container transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm font-bold bg-tertiary text-on-tertiary px-2 py-0.5 rounded-md">
                    MỨC ĐỘ 3: LƯU LƯỢNG
                  </span>
                  <span className="font-label-sm text-label-sm font-mono text-on-surface-variant">
                    08:30 Hôm nay
                  </span>
                </div>
                <span className="font-label-md text-label-md font-bold text-on-surface leading-snug">
                  Mật độ phương tiện tăng cao trước cổng trường học
                </span>
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span>Vị trí: CAM 03 (Trường Tiểu học)</span>
                  <span>Đã thông thoáng</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Tổ tự quản đã giải tỏa an toàn
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Quick Commands */}
          <div className="bg-white rounded-xl border border-[#E4E7EC] p-4 md:p-5 shadow-xs flex flex-col gap-3">
            <span className="font-title-lg text-title-lg text-on-surface font-bold">
              Thao tác Chỉ huy Tức thời
            </span>

            <button
              onClick={() => navigate('/feedback')}
              className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">send_to_mobile</span>
              <span>Trích xuất biên bản sang Module Phản ánh</span>
            </button>

            <button
              onClick={() =>
                setToastMessage(
                  'Đã phát lệnh báo động khẩn cấp tới 3 đội Tuần tra Cơ động Công an Xã Can Lộc!'
                )
              }
              className="w-full py-2.5 px-4 rounded-xl bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">local_police</span>
              <span>Báo động lực lượng Tuần tra Cơ động</span>
            </button>

            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-1.5 mt-1">
              <div className="flex items-center justify-between text-label-sm font-label-sm">
                <span className="text-on-surface-variant font-medium">
                  Trực ban Chỉ huy Trực tiếp:
                </span>
                <span className="font-bold text-primary">Trung tá Trần Đình B.</span>
              </div>
              <div className="flex items-center justify-between text-label-sm font-label-sm">
                <span className="text-on-surface-variant font-medium">Hotline Trực ban Công an:</span>
                <span className="font-mono font-bold text-on-surface">0239.3841.xxx</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Detailed Camera Feed Inspector */}
      {activeModalCamera && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-outline-variant/50 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-4 bg-[#271816] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded bg-primary text-white font-label-sm text-label-sm font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  LIVE
                </span>
                <span className="font-title-lg text-title-lg font-bold">
                  {activeModalCamera.code} - {activeModalCamera.name}
                </span>
              </div>
              <button
                onClick={() => setActiveModalCamera(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Big Feed */}
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src={activeModalCamera.image}
                alt={activeModalCamera.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded-md text-white font-mono text-xs">
                {currentTime} | {activeModalCamera.resolution} @ {activeModalCamera.fps}
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white bg-black/60 backdrop-blur-xs p-2.5 rounded-lg">
                <span className="text-xs font-semibold">{activeModalCamera.tag}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleSnapshot(activeModalCamera, e)}
                    className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-xs font-semibold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">photo_camera</span> Chụp
                    ảnh
                  </button>
                  <button
                    onClick={(e) => handleCutClip(activeModalCamera, e)}
                    className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-xs font-semibold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">content_cut</span> Cắt
                    clip
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Controls Bar */}
            <div className="p-4 bg-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm font-bold text-gray-500">
                  Điều khiển PTZ:
                </span>
                <button
                  onClick={() => setToastMessage('Điều hướng PTZ: Quay Trái 15°')}
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </button>
                <button
                  onClick={() => setToastMessage('Điều hướng PTZ: Nâng góc 10°')}
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                </button>
                <button
                  onClick={() => setToastMessage('Điều hướng PTZ: Hạ góc 10°')}
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </button>
                <button
                  onClick={() => setToastMessage('Điều hướng PTZ: Quay Phải 15°')}
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => setToastMessage('Đã thiết lập góc quay chuẩn Preset 1')}
                  className="px-2.5 py-1.5 rounded-lg bg-surface-container text-xs font-semibold hover:bg-surface-container-high"
                >
                  Preset 1
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleAction(activeModalCamera, e)}
                  className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-bold flex items-center gap-1.5 shadow-xs ${activeModalCamera.actionBtnClass}`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {activeModalCamera.actionIcon}
                  </span>
                  <span>{activeModalCamera.actionLabel}</span>
                </button>
                <button
                  onClick={() => setActiveModalCamera(null)}
                  className="px-4 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-on-surface font-label-sm text-label-sm font-semibold"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
