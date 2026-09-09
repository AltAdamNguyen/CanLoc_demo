import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface IncidentItem {
  id: string
  code: string
  time: string
  priority: 'Khẩn cấp' | 'Bình thường' | 'Thấp'
  priorityLevel: 'high' | 'medium' | 'low'
  senderName: string
  senderInitials: string
  senderPhone: string
  telLink: string
  senderAddress: string
  locationGps: string
  title: string
  summary: string
  details: string
  village: 'tramlac' | 'hongtrieu' | 'sonha' | 'phuchau' | 'kimdinh' | 'thuongxa'
  villageName: string
  category: 'antt' | 'pccc' | 'env' | 'land' | 'food' | 'noise'
  categoryName: string
  categoryBadgeClass: string
  status: 'new' | 'processing' | 'resolved' | 'rejected'
  statusName: string
  statusBadgeClass: string
  hasImages: boolean
  imageCount: number
  images?: { url: string; label: string }[]
  resolvedImage?: string
  handler: string
  partner: string
  defaultResponse: string
}

const INITIAL_INCIDENTS: IncidentItem[] = [
  {
    id: '1',
    code: '#PA-2401',
    time: '08:45 Hôm nay',
    priority: 'Khẩn cấp',
    priorityLevel: 'high',
    senderName: 'Bác Trần Đình Hùng',
    senderInitials: 'TH',
    senderPhone: '0982.***.219',
    telLink: '0982000219',
    senderAddress: 'Công dân cư trú tại Xóm 3, Thôn Phúc Hậu',
    locationGps: '18.4521° N, 105.7198° E (Cuối Xóm 3, Phúc Hậu)',
    title: 'Khói lớn và mùi khét từ bãi tập kết phế liệu Thôn Phúc Hậu',
    summary: 'Khói lớn và mùi khét từ bãi phế liệu tự phát, ảnh hưởng khu dân cư xung quanh',
    details:
      'Khoảng 08h20 sáng nay, bãi tập kết thu mua phế liệu tại cuối xóm 3 đốt lượng lớn bao bì, dây điện nhựa tạo khói đen cuồn cuộn bay thẳng vào trường mầm non và cụm dân cư. Mùi khét rất nồng nặc khiến nhiều cháu nhỏ khó thở. Đề nghị UBND xã cử lực lượng can thiệp gấp!',
    village: 'phuchau',
    villageName: 'Thôn Phúc Hậu',
    category: 'env',
    categoryName: 'Môi trường',
    categoryBadgeClass: 'bg-error-container text-on-error-container',
    status: 'processing',
    statusName: 'Đang xử lý',
    statusBadgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    hasImages: true,
    imageCount: 2,
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF8lOLFhDodh8LIxHygybRUfGfE4MMOB6rHnThfNNCZxtSctot4FmBLgZsDao_eU3wl_hGWpgyRxGXT0LtaTSoCkN_euCpg2Mvwg4XIK4UMGsEV1qzfLwjXHRcPbRXDHl4gjCO25amrowvZ2xsby0d-fCvbzRYwe31t6UecpqDMK1fWoZEbX-rg0rftXxHi_qnfotaxzOIryMZnP3yRiMk7-fft-xNwyH167qk49ezqygeRv6P9Gdi4g',
        label: 'Ảnh 1: Cột khói đen',
      },
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyThVK5t5gqvvtTFIWx9l2yq0Nm6yow3LEnIGd7UpO6OWcyPYR5hZQVQ9bhsTq0SFRG9wQI-K7zdmWO5KA88G6pzf-reAtxDF3D4VuURJKmF5LYdr9tpaGevzt_gD-MDquPU-1aMARvh_c_E7xUqsBQ1Zs3fKsqnPqAa9UyXU-v2gSvcnVyBOzyM2LM8Z0CyOmjvJZeGN25m-EH7KnFLCqxFF_8X9UuyWp06VQhQoYSWsPSymvXPv4YQ',
        label: 'Ảnh 2: Điểm đốt rác thải',
      },
    ],
    resolvedImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC0T7H0nP9DFzWhIme8Hyh1TR6aAyt92X3DnYgbisOhLMx1pNwp_ws8u2Ht5lZ2ajBv71HBySm2mWDKHIDdGXjhXHS-axcANVRI0WLsSj8sfIECxwSAf_fWwOfIY4UXM8TW6l5p2Ce8SR_isWi_8eDHdx3HFyrbW4FGCdsbnPdqDm60ktjkQhniSCiwqYHbZCe-9qduP93yqlYSKhAxKPkaQux--mh5d13mX-N4raY4MZ1XWZ9n6Cr79A',
    handler: 'Nguyễn Văn A (Địa chính - MT)',
    partner: 'Công an Xã Can Lộc',
    defaultResponse:
      'Đã kiểm tra lúc 09h15. Lực lượng Công an xã cùng Cán bộ Môi trường và Đội dân phòng thôn Phúc Hậu đã yêu cầu chủ cơ sở dập tắt đống phế liệu đốt sai quy định, đồng thời lập biên bản xử phạt hành chính và yêu cầu ký cam kết không tái phạm.',
  },
  {
    id: '2',
    code: '#PA-2399',
    time: '07:20 Hôm nay',
    priority: 'Bình thường',
    priorityLevel: 'medium',
    senderName: 'Chị Lê Thị Mai',
    senderInitials: 'LM',
    senderPhone: '0913.***.882',
    telLink: '0913000882',
    senderAddress: 'Công dân cư trú tại Thôn Sơn Hà',
    locationGps: '18.4612° N, 105.7250° E (Ngã ba cổng NVH Thôn Sơn Hà)',
    title: 'Hố ga ven đường liên thôn bị vỡ nắp bê tông',
    summary: 'Hố ga ven đường liên thôn bị vỡ nắp bê tông, tiềm ẩn nguy cơ tai nạn giao thông giờ cao điểm',
    details:
      'Đoạn đường liên thôn qua cổng nhà văn hóa Thôn Sơn Hà có một hố ga thoát nước bị sập nắp đậy từ tối qua. Sáng nay học sinh và người dân đi lại đông rất nguy hiểm. Kính đề nghị ban địa chính xã cho che chắn và sửa chữa kịp thời.',
    village: 'sonha',
    villageName: 'Thôn Sơn Hà',
    category: 'land',
    categoryName: 'Giao thông - Xây dựng',
    categoryBadgeClass: 'bg-surface-container text-on-surface',
    status: 'new',
    statusName: 'Mới nhận',
    statusBadgeClass: 'bg-surface-container-high text-primary',
    hasImages: false,
    imageCount: 0,
    handler: 'Lê Quốc Huy (Giao thông thủy lợi)',
    partner: 'Ban chỉ huy Quân sự Xã',
    defaultResponse:
      'Đã tiếp nhận phản ánh. Cán bộ giao thông xã đang mang rào chắn tạm thời tới hiện trường và điều phối tổ thợ thay thế nắp đan bê tông mới trong ngày.',
  },
  {
    id: '3',
    code: '#PA-2395',
    time: '16:15 Hôm qua',
    priority: 'Thấp',
    priorityLevel: 'low',
    senderName: 'Ông Hoàng Đình T.',
    senderInitials: 'HT',
    senderPhone: '0944.***.112',
    telLink: '0944000112',
    senderAddress: 'Công dân cư trú tại Thôn Trâm Lạc',
    locationGps: '18.4580° N, 105.7140° E (Ngã ba liên xã)',
    title: 'Hát karaoke loa kéo quá 22h đêm gây mất an ninh trật tự',
    summary: 'Hát karaoke loa kéo quá 22h đêm gây mất an ninh trật tự tại ngã ba liên xã',
    details:
      'Cửa hàng tạp hóa tại ngã ba thường xuyên mở loa kéo công suất lớn đến 23h30 đêm, ảnh hưởng lớn đến việc học tập của các cháu và giấc ngủ của người già trong xóm. Đã nhắc nhở nhiều lần nhưng không chuyển biến.',
    village: 'tramlac',
    villageName: 'Thôn Trâm Lạc',
    category: 'antt',
    categoryName: 'ANTT & Tiếng ồn',
    categoryBadgeClass: 'bg-primary-fixed text-on-primary-fixed-variant',
    status: 'resolved',
    statusName: 'Đã giải quyết',
    statusBadgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    hasImages: false,
    imageCount: 0,
    handler: 'Đại úy Phan Văn C (Trưởng Công an Xã)',
    partner: 'Tổ an ninh cơ sở thôn Trâm Lạc',
    defaultResponse:
      'Tổ công tác Công an xã đã đến trực tiếp làm việc, lập biên bản nhắc nhở và yêu cầu chủ cơ sở cam kết tuân thủ quy định trật tự công cộng, tắt âm thanh sau 22h.',
  },
  {
    id: '4',
    code: '#PA-2390',
    time: '14:00 Hôm qua',
    priority: 'Bình thường',
    priorityLevel: 'medium',
    senderName: 'Nguyễn Thị Hồng',
    senderInitials: 'NH',
    senderPhone: '0971.***.554',
    telLink: '0971000554',
    senderAddress: 'Công dân cư trú tại Thôn Hồng Triều',
    locationGps: '18.4650° N, 105.7310° E (Kênh tưới N2)',
    title: 'Lấn chiếm hành lang mương tưới tiêu phục vụ sản xuất nông nghiệp',
    summary: 'Lấn chiếm hành lang mương tưới tiêu phục vụ sản xuất nông nghiệp khu vực cánh đồng',
    details:
      'Có một hộ dân tự ý đổ đất đá lấn bờ kênh tưới tiêu N2 khiến dòng chảy bị tắc nghẽn, nước tràn vào ruộng lúa non lân cận. Kính mong ban nông nghiệp xã giải quyết.',
    village: 'hongtrieu',
    villageName: 'Thôn Hồng Triều',
    category: 'land',
    categoryName: 'Đất đai - Thủy lợi',
    categoryBadgeClass: 'bg-surface-container text-on-surface',
    status: 'resolved',
    statusName: 'Đã giải quyết',
    statusBadgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    hasImages: false,
    imageCount: 0,
    handler: 'Trần Văn Bình (Cán bộ Nông nghiệp)',
    partner: 'Hợp tác xã Nông nghiệp Hồng Triều',
    defaultResponse:
      'Hợp tác xã cùng cán bộ địa phương đã cho nạo vét, khai thông dòng chảy kênh N2 và lập biên bản xử lý vi phạm đối với hộ đổ đất trái phép.',
  },
  {
    id: '5',
    code: '#PA-2388',
    time: '10:10 14/05',
    priority: 'Thấp',
    priorityLevel: 'low',
    senderName: 'Phan Văn Đức',
    senderInitials: 'PD',
    senderPhone: '0935.***.612',
    telLink: '0935000612',
    senderAddress: 'Khu vực Chợ Can Lộc, Thôn Kim Đính',
    locationGps: '18.4505° N, 105.7220° E (Cổng phụ chợ Can Lộc)',
    title: 'Bảng thông tin cảnh báo phòng dịch tại chợ xã bị nghiêng đổ sau đợt dông lốc',
    summary: 'Bảng thông tin cảnh báo phòng dịch tại chợ xã bị nghiêng đổ sau đợt dông lốc',
    details:
      'Trận dông gió tối qua làm đổ tấm bảng pano tuyên truyền tại cổng phụ chợ Kim Đính. Kính báo UBND xã cử tổ bảo vệ dựng lại để đảm bảo an toàn cho bà con đi chợ.',
    village: 'kimdinh',
    villageName: 'Thôn Kim Đính',
    category: 'noise',
    categoryName: 'Văn hóa - TT',
    categoryBadgeClass: 'bg-surface-container text-on-surface',
    status: 'resolved',
    statusName: 'Đã giải quyết',
    statusBadgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    hasImages: false,
    imageCount: 0,
    handler: 'Trần Văn Cường (Văn hóa - Xã hội)',
    partner: 'Ban quản lý Chợ Xã',
    defaultResponse:
      'Ban Quản lý Chợ đã cử lực lượng gia cố, hàn lại chân bảng và lắp dựng cố định an toàn trong buổi sáng 14/05.',
  },
  {
    id: '6',
    code: '#PA-2382',
    time: '11:20 13/05',
    priority: 'Khẩn cấp',
    priorityLevel: 'high',
    senderName: 'Đặng Bá Quyết',
    senderInitials: 'BQ',
    senderPhone: '0984.***.731',
    telLink: '0984000731',
    senderAddress: 'Công dân cư trú tại Thôn Thượng Xá',
    locationGps: '18.4710° N, 105.7180° E (Bến đò sông Nghèn)',
    title: 'Tụ tập xả rác và phao cứu sinh bị rách hỏng tại bến đò sông Nghèn',
    summary: 'Tụ tập xả rác và phao cứu sinh bị rách hỏng tại bến đò sông Nghèn',
    details:
      'Khu vực bến sông xuất hiện nhiều bao rác sinh hoạt bị vứt bừa bãi và tủ áo phao trang bị phòng chống lụt bão bị cạy phá hư hỏng. Cần kiểm tra xử lý và lắp bổ sung phao cứu sinh mới.',
    village: 'thuongxa',
    villageName: 'Thôn Thượng Xá',
    category: 'env',
    categoryName: 'Môi trường',
    categoryBadgeClass: 'bg-error-container text-on-error-container',
    status: 'processing',
    statusName: 'Đang xử lý',
    statusBadgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    hasImages: false,
    imageCount: 0,
    handler: 'Nguyễn Văn A (Địa chính - MT)',
    partner: 'Tổ bảo vệ dân phố Thượng Xá',
    defaultResponse:
      'Đã cử tổ tuần tra thu dọn vệ sinh hiện trường và lập kế hoạch đề xuất mua sắm bổ sung phao cứu sinh mới.',
  },
]

export const SceneReportPage: React.FC = () => {
  const [incidents, setIncidents] = useState<IncidentItem[]>(INITIAL_INCIDENTS)
  const [selectedIncident, setSelectedIncident] = useState<IncidentItem>(INITIAL_INCIDENTS[0])
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'processing' | 'resolved' | 'rejected'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [villageFilter, setVillageFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Form states
  const [statusOption, setStatusOption] = useState<'verifying' | 'dispatching' | 'fined' | 'resolved'>('resolved')
  const [responseText, setResponseText] = useState<string>(selectedIncident.defaultResponse)
  const [notifyCitizen, setNotifyCitizen] = useState<boolean>(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  // Modals
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [newIncidentForm, setNewIncidentForm] = useState({
    senderName: '',
    senderPhone: '',
    village: 'phuchau' as IncidentItem['village'],
    category: 'env' as IncidentItem['category'],
    priority: 'Khẩn cấp' as IncidentItem['priority'],
    title: '',
    details: '',
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Handle row click
  const handleSelectIncident = (item: IncidentItem) => {
    setSelectedIncident(item)
    setResponseText(item.defaultResponse)
    setIsDrawerOpen(true)
  }

  // Filter logic
  const filteredIncidents = incidents.filter((item) => {
    if (activeTab !== 'all' && item.status !== activeTab) return false
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false
    if (villageFilter !== 'all' && item.village !== villageFilter) return false
    if (priorityFilter !== 'all' && item.priorityLevel !== priorityFilter) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchCode = item.code.toLowerCase().includes(q)
      const matchName = item.senderName.toLowerCase().includes(q)
      const matchPhone = item.senderPhone.includes(q)
      const matchTitle = item.title.toLowerCase().includes(q)
      const matchSummary = item.summary.toLowerCase().includes(q)
      if (!matchCode && !matchName && !matchPhone && !matchTitle && !matchSummary) {
        return false
      }
    }
    return true
  })

  // Submit form handler
  const handleUpdateFeedback = (e: React.FormEvent) => {
    e.preventDefault()

    // Determine new status based on option
    let newStatus: IncidentItem['status'] = selectedIncident.status
    let newStatusName = selectedIncident.statusName
    let newBadgeClass = selectedIncident.statusBadgeClass

    if (statusOption === 'resolved') {
      newStatus = 'resolved'
      newStatusName = 'Đã giải quyết'
      newBadgeClass = 'bg-tertiary-fixed text-on-tertiary-fixed'
    } else {
      newStatus = 'processing'
      newStatusName = 'Đang xử lý'
      newBadgeClass = 'bg-secondary-fixed text-on-secondary-fixed'
    }

    const updated = incidents.map((item) => {
      if (item.id === selectedIncident.id) {
        return {
          ...item,
          status: newStatus,
          statusName: newStatusName,
          statusBadgeClass: newBadgeClass,
          defaultResponse: responseText,
        }
      }
      return item
    })

    setIncidents(updated)
    setSelectedIncident({
      ...selectedIncident,
      status: newStatus,
      statusName: newStatusName,
      statusBadgeClass: newBadgeClass,
      defaultResponse: responseText,
    })

    setToastMessage('Đã cập nhật hồ sơ và gửi thông báo tới công dân thành công!')
    setTimeout(() => {
      setToastMessage(null)
    }, 4500)
  }

  // Handle Add New Incident from "Tiếp nhận tại Một cửa"
  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newIncidentForm.senderName || !newIncidentForm.title) {
      alert('Vui lòng nhập đầy đủ họ tên và tiêu đề phản ánh.')
      return
    }

    const newCode = `#PA-${Math.floor(2400 + Math.random() * 50)}`
    const initials = newIncidentForm.senderName
      .split(' ')
      .map((w) => w[0])
      .slice(-2)
      .join('')
      .toUpperCase()

    const villageMap: Record<string, string> = {
      tramlac: 'Thôn Trâm Lạc',
      hongtrieu: 'Thôn Hồng Triều',
      sonha: 'Thôn Sơn Hà',
      phuchau: 'Thôn Phúc Hậu',
      kimdinh: 'Thôn Kim Đính',
      thuongxa: 'Thôn Thượng Xá',
    }

    const categoryMap: Record<string, { name: string; badge: string }> = {
      antt: { name: 'ANTT & Tiếng ồn', badge: 'bg-primary-fixed text-on-primary-fixed-variant' },
      pccc: { name: 'PCCC', badge: 'bg-error-container text-on-error-container' },
      env: { name: 'Môi trường', badge: 'bg-error-container text-on-error-container' },
      land: { name: 'Đất đai - Xây dựng', badge: 'bg-surface-container text-on-surface' },
      food: { name: 'ATTP', badge: 'bg-surface-container text-on-surface' },
      noise: { name: 'Nếp sống văn minh', badge: 'bg-surface-container text-on-surface' },
    }

    const newCreated: IncidentItem = {
      id: Date.now().toString(),
      code: newCode,
      time: 'Vừa xong',
      priority: newIncidentForm.priority,
      priorityLevel:
        newIncidentForm.priority === 'Khẩn cấp'
          ? 'high'
          : newIncidentForm.priority === 'Bình thường'
          ? 'medium'
          : 'low',
      senderName: newIncidentForm.senderName,
      senderInitials: initials || 'CD',
      senderPhone: newIncidentForm.senderPhone || '098x.***.xxx',
      telLink: newIncidentForm.senderPhone.replace(/[^0-9]/g, '') || '0980000000',
      senderAddress: `Tiếp nhận trực tiếp tại Một cửa xã Can Lộc (${villageMap[newIncidentForm.village]})`,
      locationGps: `18.45${Math.floor(10 + Math.random() * 50)}° N, 105.72${Math.floor(10 + Math.random() * 50)}° E`,
      title: newIncidentForm.title,
      summary: newIncidentForm.details.slice(0, 80) + '...',
      details: newIncidentForm.details || newIncidentForm.title,
      village: newIncidentForm.village,
      villageName: villageMap[newIncidentForm.village],
      category: newIncidentForm.category,
      categoryName: categoryMap[newIncidentForm.category]?.name || 'Hành chính',
      categoryBadgeClass: categoryMap[newIncidentForm.category]?.badge || 'bg-surface-container text-on-surface',
      status: 'new',
      statusName: 'Mới nhận',
      statusBadgeClass: 'bg-surface-container-high text-primary',
      hasImages: false,
      imageCount: 0,
      handler: 'Cán bộ Tiếp nhận Một cửa',
      partner: 'Bộ phận chuyên môn xã Can Lộc',
      defaultResponse: 'Hồ sơ đã được tiếp nhận tại bộ phận Một cửa UBND xã Can Lộc và chuyển giao cho cán bộ thụ lý.',
    }

    setIncidents([newCreated, ...incidents])
    setSelectedIncident(newCreated)
    setIsReceiveModalOpen(false)
    setNewIncidentForm({
      senderName: '',
      senderPhone: '',
      village: 'phuchau',
      category: 'env',
      priority: 'Khẩn cấp',
      title: '',
      details: '',
    })

    setToastMessage(`Đã tiếp nhận hồ sơ ${newCode} thành công!`)
    setTimeout(() => setToastMessage(null), 4000)
  }

  return (
    <>
      <div className="w-full flex flex-col space-y-4 select-none pb-8">
      {/* Toast Success Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#271816] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center justify-between gap-3 border border-secondary-container/30 animate-in fade-in slide-in-from-bottom-5 max-w-md">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary-container text-[22px]">
              check_circle
            </span>
            <span className="font-label-md text-sm leading-snug">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/60 hover:text-white p-1"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Top Banner Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-xl shadow-xs border border-[#E4E7EC]">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-primary-container text-secondary-container flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[26px]">campaign</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-title-lg text-title-lg text-primary uppercase font-bold tracking-tight">
                Quản lý Phản ánh Hiện trường
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                Cấp Xã Can Lộc
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              Quy trình số hóa tiếp nhận, kiểm tra thực địa, phân công phối hợp và phản hồi kết quả trực tiếp cho công dân
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-label-md text-label-md font-semibold flex items-center gap-1.5 border border-[#E4E7EC]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Xuất sổ theo dõi tiếp nhận</span>
          </button>
          <button
            onClick={() => setIsReceiveModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-primary text-on-primary hover:bg-primary-container hover:text-secondary-fixed transition-colors font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Tiếp nhận tại Một cửa</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-xs border border-[#E4E7EC] relative overflow-hidden flex flex-col justify-between border-t-4 border-t-primary">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant font-medium">
                Tổng tiếp nhận
              </span>
              <span className="font-display-lg text-display-lg text-primary font-bold mt-1">156</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">inbox</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 font-label-sm text-label-sm text-on-surface-variant">
            <span className="text-primary font-bold flex items-center">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>+8
            </span>
            <span>so với tuần trước</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-xs border border-[#E4E7EC] relative overflow-hidden flex flex-col justify-between border-t-4 border-t-secondary">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant font-medium">
                Mới tiếp nhận
              </span>
              <span className="font-display-lg text-display-lg text-secondary font-bold mt-1">12</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">mark_email_unread</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 font-label-sm text-label-sm text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            <span className="text-secondary font-bold">Chờ thẩm tra ban đầu</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-xs border border-[#E4E7EC] relative overflow-hidden flex flex-col justify-between border-t-4 border-t-tertiary">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant font-medium">
                Đang xử lý thực địa
              </span>
              <span className="font-display-lg text-display-lg text-tertiary font-bold mt-1">28</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">pending_actions</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 font-label-sm text-label-sm text-on-surface-variant">
            <span className="text-tertiary font-bold">7 vụ phối hợp Công an</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-xs border border-[#E4E7EC] relative overflow-hidden flex flex-col justify-between border-t-4 border-t-secondary-container">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md uppercase tracking-wide text-on-surface-variant font-medium">
                Đã giải quyết xong
              </span>
              <span className="font-display-lg text-display-lg text-on-surface font-bold mt-1">116</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">task_alt</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 font-label-sm text-label-sm">
            <span className="text-on-surface-variant">Tỷ lệ đúng hạn:</span>
            <span className="px-2 py-0.5 rounded-md bg-surface-container text-primary font-bold">
              94.2%
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-surface-container-lowest p-5 rounded-xl shadow-xs border border-[#E4E7EC] flex flex-col gap-4">
        {/* Row 1: Status Category Tabs & Refresh */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
              type="button"
            >
              Tất cả ({incidents.length})
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                activeTab === 'new'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
              type="button"
            >
              Mới tiếp nhận ({incidents.filter((i) => i.status === 'new').length})
            </button>
            <button
              onClick={() => setActiveTab('processing')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                activeTab === 'processing'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
              type="button"
            >
              Đang xử lý ({incidents.filter((i) => i.status === 'processing').length})
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                activeTab === 'resolved'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
              type="button"
            >
              Đã giải quyết ({incidents.filter((i) => i.status === 'resolved').length})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                activeTab === 'rejected'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
              type="button"
            >
              Trả lại / Không duyệt (0)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Cập nhật lúc: 10:42 Hôm nay
            </span>
            <button
              onClick={() => {
                setToastMessage('Đã đồng bộ và làm mới dữ liệu phản ánh hiện trường!')
                setTimeout(() => setToastMessage(null), 3000)
              }}
              className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors"
              title="Làm mới"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Row 2: Select Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 border-t border-[#E4E7EC]">
          {/* Lĩnh vực */}
          <div className="flex flex-col">
            <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">
              Theo Lĩnh vực
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-surface-container-low font-body-md text-sm text-on-surface border border-[#E4E7EC] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="all">Tất cả lĩnh vực tiếp nhận</option>
              <option value="antt">An ninh trật tự (ANTT)</option>
              <option value="pccc">Phòng cháy chữa cháy (PCCC)</option>
              <option value="env">Vệ sinh môi trường</option>
              <option value="land">Đất đai - Xây dựng</option>
              <option value="food">An toàn thực phẩm</option>
              <option value="noise">Tiếng ồn - Nếp sống văn minh</option>
            </select>
          </div>

          {/* Địa bàn Thôn */}
          <div className="flex flex-col">
            <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">
              Địa bàn Thôn
            </label>
            <select
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-surface-container-low font-body-md text-sm text-on-surface border border-[#E4E7EC] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="all">Toàn bộ địa bàn Xã Can Lộc</option>
              <option value="tramlac">Thôn Trâm Lạc</option>
              <option value="hongtrieu">Thôn Hồng Triều</option>
              <option value="sonha">Thôn Sơn Hà</option>
              <option value="phuchau">Thôn Phúc Hậu</option>
              <option value="kimdinh">Thôn Kim Đính</option>
              <option value="thuongxa">Thôn Thượng Xá</option>
            </select>
          </div>

          {/* Mức độ ưu tiên */}
          <div className="flex flex-col">
            <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">
              Mức độ ưu tiên
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-surface-container-low font-body-md text-sm text-on-surface border border-[#E4E7EC] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="high">Khẩn cấp / Nguy cơ cao</option>
              <option value="medium">Bình thường</option>
              <option value="low">Thấp</option>
            </select>
          </div>

          {/* Tìm kiếm nhanh */}
          <div className="flex flex-col">
            <label className="font-label-sm text-label-sm text-on-surface-variant mb-1 font-semibold">
              Lọc nhanh theo từ khóa
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên công dân, số ĐT, mã..."
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low font-body-md text-sm text-on-surface border border-[#E4E7EC] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table of Incidents (Full Width) */}
      <div className="w-full flex flex-col bg-surface-container-lowest rounded-xl shadow-xs border border-[#E4E7EC] overflow-hidden">
        <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-[#E4E7EC]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">list_alt</span>
            <h2 className="font-title-lg text-title-lg font-bold text-on-surface">
              Danh sách Phản ánh Hiện trường
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Hiển thị {filteredIncidents.length} / {incidents.length} hồ sơ
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md">
            <thead className="bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3.5 font-bold">Mã / Giờ</th>
                <th className="py-3 px-3.5 font-bold">Người gửi</th>
                <th className="py-3 px-3.5 font-bold">Nội dung tóm tắt</th>
                <th className="py-3 px-3.5 font-bold">Địa bàn</th>
                <th className="py-3 px-3.5 font-bold">Lĩnh vực</th>
                <th className="py-3 px-3.5 font-bold text-center">Trạng thái</th>
                <th className="py-3 px-3.5 font-bold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-on-surface divide-y divide-[#E4E7EC]">
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl text-gray-400 mb-2 block">
                      search_off
                    </span>
                    Không tìm thấy phản ánh nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((item) => {
                  const isSelected = item.id === selectedIncident.id
                  return (
                    <tr
                      key={item.id}
                      onClick={() => handleSelectIncident(item)}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-surface-container border-l-4 border-l-primary'
                          : 'hover:bg-surface-container-low'
                      }`}
                    >
                      {/* Mã / Giờ */}
                      <td className="py-3 px-3.5 align-top">
                        <div className="flex flex-col">
                          <span
                            className={`font-label-md text-label-md font-bold ${
                              isSelected ? 'text-primary' : 'text-on-surface'
                            }`}
                          >
                            {item.code}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {item.time}
                          </span>
                          {item.priority === 'Khẩn cấp' && (
                            <span className="inline-flex items-center px-1.5 py-0.5 mt-1 rounded text-[10px] font-bold bg-error text-on-error w-max shadow-xs">
                              Khẩn cấp
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Người gửi */}
                      <td className="py-3 px-3.5 align-top">
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md font-bold text-on-surface">
                            {item.senderName}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                            {item.senderPhone}
                          </span>
                        </div>
                      </td>

                      {/* Nội dung tóm tắt */}
                      <td className="py-3 px-3.5 align-top max-w-[280px]">
                        <p className="font-body-md text-body-md font-semibold line-clamp-2 text-on-surface leading-snug">
                          {item.title}
                        </p>
                        {item.hasImages && (
                          <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm mt-1">
                            <span className="material-symbols-outlined text-[14px] text-primary">
                              image
                            </span>
                            <span className="text-primary font-medium">{item.imageCount} hình đính kèm</span>
                          </div>
                        )}
                      </td>

                      {/* Địa bàn */}
                      <td className="py-3 px-3.5 align-top whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-surface-container font-label-sm text-label-sm font-medium">
                          {item.villageName}
                        </span>
                      </td>

                      {/* Lĩnh vực */}
                      <td className="py-3 px-3.5 align-top whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-md font-label-sm text-label-sm font-semibold ${item.categoryBadgeClass}`}
                        >
                          {item.categoryName}
                        </span>
                      </td>

                      {/* Trạng thái */}
                      <td className="py-3 px-3.5 align-top text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold shadow-xs ${item.statusBadgeClass}`}
                        >
                          {item.statusName}
                        </span>
                      </td>

                      {/* Thao tác */}
                      <td className="py-3 px-3.5 align-top text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectIncident(item)
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm font-bold hover:bg-primary hover:text-white transition-all shadow-xs border border-primary/20"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit_note</span>
                          <span>Chi tiết &amp; Xử lý</span>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Bar */}
        <div className="p-4 bg-surface-container-low flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant border-t border-[#E4E7EC]">
          <span>
            Hiển thị trang 1 trên {Math.max(1, Math.ceil(filteredIncidents.length / 5))}
          </span>
          <div className="flex items-center gap-1.5">
            <button className="h-8 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors font-medium">
              Trước
            </button>
            <button className="h-8 w-8 rounded-lg bg-primary text-on-primary font-bold shadow-xs">
              1
            </button>
            <button className="h-8 w-8 rounded-lg bg-surface-container hover:bg-surface-container-high font-medium">
              2
            </button>
            <button className="h-8 w-8 rounded-lg bg-surface-container hover:bg-surface-container-high font-medium">
              3
            </button>
            <button className="h-8 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors font-medium">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Drawer Backdrop Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Active Incident Details & Workflow Action Drawer (Slide-over from right) */}
      <div
        className={`fixed top-0 bottom-0 right-0 h-screen z-50 w-full sm:w-[560px] md:w-[640px] max-w-full bg-white shadow-2xl flex flex-col overflow-hidden border-l-4 border-primary transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header (Fixed at top, shrink-0) */}
        <div className="bg-primary text-on-primary p-4 md:p-5 flex items-start justify-between border-b-2 border-secondary-container shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-secondary-container text-primary font-label-sm text-label-sm font-bold tracking-wide">
                HỒ SƠ TIẾP NHẬN
              </span>
              <span className="font-title-lg text-title-lg font-bold text-secondary-fixed">
                {selectedIncident.code}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md font-label-sm text-label-sm font-bold shadow-xs ${selectedIncident.statusBadgeClass}`}
              >
                {selectedIncident.statusName}
              </span>
            </div>
            <h2 className="font-headline-sm text-lg md:text-xl font-bold mt-1.5 text-on-primary leading-snug">
              {selectedIncident.title}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <button
              onClick={() => {
                alert(`Đang in phiếu công vụ hồ sơ ${selectedIncident.code}...`)
              }}
              className="w-8 h-8 rounded-lg bg-primary-container text-secondary-container flex items-center justify-center hover:opacity-90 shadow-xs transition-opacity"
              title="In phiếu công vụ"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
            </button>
            <Link
              to="/map"
              className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center hover:opacity-90 shadow-xs transition-opacity"
              title="Xem trên bản đồ GIS"
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
            </Link>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center hover:bg-white/20 transition-colors"
              title="Đóng ngăn chi tiết"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Drawer Body (Scrollable, flex-1 overflow-y-auto) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
          {/* Citizen info card */}
          <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3 border border-[#E4E7EC]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-sm shadow-xs">
                  {selectedIncident.senderInitials}
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-on-surface">
                    {selectedIncident.senderName}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {selectedIncident.senderAddress}
                  </span>
                </div>
              </div>
              <a
                className="px-2.5 py-1 rounded-lg bg-surface-container-high text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 hover:bg-primary hover:text-white transition-colors"
                href={`tel:${selectedIncident.telLink}`}
              >
                <span className="material-symbols-outlined text-[14px]">call</span>
                <span>{selectedIncident.senderPhone}</span>
              </a>
            </div>

            {/* Citizen Quote */}
            <div className="text-on-surface font-body-md text-body-md bg-white/70 p-3 rounded-lg border border-[#E4E7EC]/60">
              <p className="leading-relaxed italic">"{selectedIncident.details}"</p>
            </div>

            {/* Attached Citizen Images */}
            {selectedIncident.images && selectedIncident.images.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                  Hình ảnh phản ánh từ người dân ({selectedIncident.images.length}):
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {selectedIncident.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setPreviewImage(img.url)}
                      className="relative rounded-xl overflow-hidden aspect-video group cursor-pointer border border-[#E4E7EC] shadow-xs hover:ring-2 hover:ring-primary transition-all"
                    >
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={img.url}
                        alt={img.label}
                      />
                      <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-medium backdrop-blur-xs">
                        {img.label}
                      </span>
                      <span className="material-symbols-outlined absolute top-1 right-1 text-white/90 bg-black/40 rounded p-0.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        zoom_in
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GPS Location info */}
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm pt-1">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
                <span className="font-mono text-xs font-semibold">{selectedIncident.locationGps}</span>
              </div>
            </div>
          </div>

          {/* Workflow Action Form */}
          <form id="drawer-action-form" onSubmit={handleUpdateFeedback} className="flex flex-col gap-4">
            {/* Status Selector */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md uppercase tracking-wider font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>Cập nhật trạng thái xử lý</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label
                  className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all border ${
                    statusOption === 'verifying'
                      ? 'bg-surface-container border-primary font-bold text-primary shadow-xs'
                      : 'bg-surface-container-low border-[#E4E7EC] hover:bg-surface-container'
                  }`}
                >
                  <input
                    type="radio"
                    name="status_opt"
                    value="verifying"
                    checked={statusOption === 'verifying'}
                    onChange={() => setStatusOption('verifying')}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="font-body-md text-sm">Đang xác minh thực địa</span>
                </label>

                <label
                  className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all border ${
                    statusOption === 'dispatching'
                      ? 'bg-surface-container border-primary font-bold text-primary shadow-xs'
                      : 'bg-surface-container-low border-[#E4E7EC] hover:bg-surface-container'
                  }`}
                >
                  <input
                    type="radio"
                    name="status_opt"
                    value="dispatching"
                    checked={statusOption === 'dispatching'}
                    onChange={() => setStatusOption('dispatching')}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="font-body-md text-sm">Đang cử lực lượng</span>
                </label>

                <label
                  className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all border ${
                    statusOption === 'fined'
                      ? 'bg-surface-container border-primary font-bold text-primary shadow-xs'
                      : 'bg-surface-container-low border-[#E4E7EC] hover:bg-surface-container'
                  }`}
                >
                  <input
                    type="radio"
                    name="status_opt"
                    value="fined"
                    checked={statusOption === 'fined'}
                    onChange={() => setStatusOption('fined')}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="font-body-md text-sm">Lập biên bản xử lý</span>
                </label>

                <label
                  className={`flex items-center gap-2 p-2.5 rounded-xl cursor-pointer transition-all border ${
                    statusOption === 'resolved'
                      ? 'bg-surface-container-high border-primary font-bold text-primary shadow-xs'
                      : 'bg-surface-container-low border-[#E4E7EC] hover:bg-surface-container'
                  }`}
                >
                  <input
                    type="radio"
                    name="status_opt"
                    value="resolved"
                    checked={statusOption === 'resolved'}
                    onChange={() => setStatusOption('resolved')}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="font-body-md text-sm font-bold text-primary">
                    Đã xử lý &amp; Hoàn thành
                  </span>
                </label>
              </div>
            </div>

            {/* Assignment (2 cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface mb-1">
                  Cán bộ xử lý chính
                </label>
                <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-surface-container-low font-body-md text-sm border border-[#E4E7EC]">
                  <span className="material-symbols-outlined text-primary text-[18px]">badge</span>
                  <span className="font-semibold text-on-surface truncate">
                    {selectedIncident.handler}
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface mb-1">
                  Đơn vị phối hợp thực thi
                </label>
                <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-surface-container-low font-body-md text-sm border border-[#E4E7EC]">
                  <span className="material-symbols-outlined text-secondary text-[18px]">shield</span>
                  <span className="text-on-surface truncate">{selectedIncident.partner}</span>
                </div>
              </div>
            </div>

            {/* Citizen Response Textarea */}
            <div className="flex flex-col">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface mb-1 flex items-center justify-between">
                <span>Nội dung báo cáo kết quả gửi Công dân</span>
                <span className="text-[11px] text-on-surface-variant font-normal">
                  {responseText.length} / 500 ký tự
                </span>
              </label>
              <textarea
                rows={3}
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface-container-low font-body-md text-sm text-on-surface border border-[#E4E7EC] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary leading-relaxed"
                placeholder="Nhập nội dung biên bản và giải pháp đã thực hiện..."
              />
            </div>

            {/* Resolution proof photo upload & preview */}
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm font-semibold text-on-surface">
                Tải lên ảnh đối chứng sau xử lý (Hiện trường hoàn tất)
              </label>
              <div className="grid grid-cols-2 gap-3 items-center">
                {selectedIncident.resolvedImage ? (
                  <div
                    onClick={() => setPreviewImage(selectedIncident.resolvedImage || null)}
                    className="relative rounded-xl overflow-hidden aspect-video group cursor-pointer border border-[#E4E7EC] shadow-xs"
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      src={selectedIncident.resolvedImage}
                      alt="Hiện trường sau xử lý"
                    />
                    <span className="absolute bottom-1 left-1 px-2 py-0.5 rounded-md bg-primary text-on-primary text-[10px] font-bold shadow-xs">
                      Sau xử lý: Đã dập tắt
                    </span>
                  </div>
                ) : (
                  <div className="border border-[#E4E7EC] rounded-xl flex items-center justify-center p-3 text-center aspect-video bg-surface-container-low text-on-surface-variant font-label-sm text-xs">
                    Chưa có ảnh sau xử lý
                  </div>
                )}

                <label className="border-2 border-dashed border-[#E4E7EC] rounded-xl flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:bg-surface-container transition-colors aspect-video">
                  <span className="material-symbols-outlined text-on-surface-variant text-[26px]">
                    add_a_photo
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold mt-1">
                    Thêm ảnh minh chứng
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Hỗ trợ JPG, PNG (max 5MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const url = URL.createObjectURL(e.target.files[0])
                        setSelectedIncident({ ...selectedIncident, resolvedImage: url })
                        setToastMessage('Đã tải lên ảnh hiện trường sau xử lý!')
                        setTimeout(() => setToastMessage(null), 3000)
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Instant notification checkbox */}
            <div className="p-3 rounded-xl bg-surface-container flex items-start gap-2.5 border border-[#E4E7EC]">
              <input
                type="checkbox"
                id="notify-citizen"
                checked={notifyCitizen}
                onChange={(e) => setNotifyCitizen(e.target.checked)}
                className="mt-0.5 accent-primary w-4 h-4 rounded cursor-pointer"
              />
              <label
                htmlFor="notify-citizen"
                className="font-label-sm text-label-sm text-on-surface cursor-pointer leading-tight"
              >
                <span className="font-bold text-primary">Gửi thông báo kết quả tức thì:</span> Đồng
                bộ trạng thái đến Ứng dụng "Công dân số Can Lộc" và gửi tin nhắn SMS tới số thuê
                bao người phản ánh.
              </label>
            </div>
          </form>
        </div>

        {/* Drawer Action Panel / Footer (Fixed at bottom, shrink-0) */}
        <div className="p-4 border-t border-[#E4E7EC] bg-surface-container-low shrink-0 flex items-center gap-2.5">
          <button
            type="submit"
            form="drawer-action-form"
            className="flex-1 h-11 px-4 rounded-xl bg-primary text-on-primary hover:bg-primary-container hover:text-secondary-fixed transition-colors font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Lưu &amp; Phản hồi kết quả</span>
          </button>
          <button
            type="button"
            onClick={() => {
              alert(
                `Đã chuyển tiếp phiếu yêu cầu #${selectedIncident.code} đến Chủ tịch UBND xã xem xét chỉ đạo!`
              )
            }}
            className="h-11 px-3.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md font-semibold flex items-center gap-1.5 border border-[#E4E7EC]"
            title="Chuyển cấp thẩm quyền"
          >
            <span className="material-symbols-outlined text-[18px]">forward</span>
            <span className="hidden sm:inline">Chuyển cấp</span>
          </button>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="h-11 px-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-label-md text-label-md font-semibold"
          >
            Đóng
          </button>
        </div>
      </div>

      {/* Modal: + Tiếp nhận tại Một cửa */}
      {isReceiveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#E4E7EC] animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-primary text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-secondary-container">
                  add_circle
                </span>
                <h3 className="font-title-lg text-lg font-bold">
                  Tiếp nhận phản ánh tại Bộ phận Một cửa
                </h3>
              </div>
              <button
                onClick={() => setIsReceiveModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Họ tên công dân (*)
                  </label>
                  <input
                    type="text"
                    required
                    value={newIncidentForm.senderName}
                    onChange={(e) =>
                      setNewIncidentForm({ ...newIncidentForm, senderName: e.target.value })
                    }
                    placeholder="VD: Bác Lê Văn Hùng"
                    className="w-full h-10 px-3 rounded-xl border border-gray-300 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={newIncidentForm.senderPhone}
                    onChange={(e) =>
                      setNewIncidentForm({ ...newIncidentForm, senderPhone: e.target.value })
                    }
                    placeholder="09xx.xxx.xxx"
                    className="w-full h-10 px-3 rounded-xl border border-gray-300 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Địa bàn Thôn</label>
                  <select
                    value={newIncidentForm.village}
                    onChange={(e) =>
                      setNewIncidentForm({
                        ...newIncidentForm,
                        village: e.target.value as IncidentItem['village'],
                      })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-gray-300 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="phuchau">Thôn Phúc Hậu</option>
                    <option value="tramlac">Thôn Trâm Lạc</option>
                    <option value="hongtrieu">Thôn Hồng Triều</option>
                    <option value="sonha">Thôn Sơn Hà</option>
                    <option value="kimdinh">Thôn Kim Đính</option>
                    <option value="thuongxa">Thôn Thượng Xá</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Lĩnh vực</label>
                  <select
                    value={newIncidentForm.category}
                    onChange={(e) =>
                      setNewIncidentForm({
                        ...newIncidentForm,
                        category: e.target.value as IncidentItem['category'],
                      })
                    }
                    className="w-full h-10 px-3 rounded-xl border border-gray-300 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="env">Vệ sinh môi trường</option>
                    <option value="antt">An ninh trật tự</option>
                    <option value="pccc">Phòng cháy chữa cháy</option>
                    <option value="land">Đất đai - Xây dựng</option>
                    <option value="food">An toàn thực phẩm</option>
                    <option value="noise">Nếp sống văn minh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mức độ ưu tiên
                </label>
                <div className="flex gap-4">
                  {(['Khẩn cấp', 'Bình thường', 'Thấp'] as const).map((pri) => (
                    <label key={pri} className="flex items-center gap-1.5 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="new_priority"
                        checked={newIncidentForm.priority === pri}
                        onChange={() => setNewIncidentForm({ ...newIncidentForm, priority: pri })}
                        className="accent-primary"
                      />
                      <span>{pri}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Tiêu đề phản ánh (*)
                </label>
                <input
                  type="text"
                  required
                  value={newIncidentForm.title}
                  onChange={(e) =>
                    setNewIncidentForm({ ...newIncidentForm, title: e.target.value })
                  }
                  placeholder="Tóm tắt ngắn gọn nội dung sự việc..."
                  className="w-full h-10 px-3 rounded-xl border border-gray-300 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nội dung chi tiết hiện trường
                </label>
                <textarea
                  rows={3}
                  value={newIncidentForm.details}
                  onChange={(e) =>
                    setNewIncidentForm({ ...newIncidentForm, details: e.target.value })
                  }
                  placeholder="Mô tả cụ thể thời gian, vị trí, mức độ ảnh hưởng..."
                  className="w-full p-3 rounded-xl border border-gray-300 text-sm focus:border-primary focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReceiveModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container shadow-xs"
                >
                  Tạo hồ sơ tiếp nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Xuất sổ theo dõi */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-[#E4E7EC] p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">description</span>
              </div>
              <div>
                <h3 className="font-title-lg text-lg font-bold text-primary">
                  Xuất sổ theo dõi tiếp nhận
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Định dạng biểu mẫu công vụ UBND cấp Xã
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Bạn đang chuẩn bị xuất toàn bộ <strong>{incidents.length} hồ sơ phản ánh hiện trường</strong> sang
              file Excel / PDF phục vụ báo cáo giao ban tuần UBND Xã Can Lộc.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  alert('Đang tạo file Excel: So_Theo_Doi_Phan_Anh_Can_Loc_2026.xlsx...')
                  setIsExportModalOpen(false)
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-container transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">table_view</span>
                Xuất file Excel (.xlsx)
              </button>
              <button
                onClick={() => {
                  alert('Đang xuất báo cáo PDF chuẩn công văn...')
                  setIsExportModalOpen(false)
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 border border-[#E4E7EC]"
              >
                <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                Xuất file PDF (.pdf)
              </button>
            </div>

            <div className="text-right">
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl">
            <img src={previewImage} alt="Phóng to ảnh hiện trường" className="w-full h-full object-contain" />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
