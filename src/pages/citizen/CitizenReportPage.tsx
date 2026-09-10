import React, { useState } from 'react'

interface ReportItem {
  id: string
  code: string
  time: string
  citizenName: string
  phone: string
  title: string
  desc: string
  village: string
  category: string
  status: 'new' | 'processing' | 'resolved' | 'rejected'
  statusLabel: string
  priority?: 'urgent' | 'high' | 'normal'
  imagesCount?: number
  fullQuote?: string
  assignedOfficer?: string
  assignedUnit?: string
  gpsCoord?: string
  responseContent?: string
}

const initialReports: ReportItem[] = [
  {
    id: 'r1',
    code: '#PA-2401',
    time: '08:45 Hôm nay',
    citizenName: 'Bác Trần Đ. Hùng',
    phone: '0982.***.219',
    title: 'Khói lớn & mùi khét bãi phế liệu',
    desc: 'Gần cụm dân cư Xóm 3 trường mầm non...',
    village: 'Thôn Phúc Hậu',
    category: 'Môi trường',
    status: 'processing',
    statusLabel: 'Đang xử lý',
    priority: 'urgent',
    imagesCount: 2,
    fullQuote:
      '"Khoảng 08h20 sáng nay, bãi tập kết thu mua phế liệu tại cuối xóm 3 đốt lượng lớn bao bì, dây điện nhựa tạo khói đen cuồn cuộn bay thẳng vào trường mầm non và cụm dân cư. Mùi khét rất nồng nặc khiến nhiều cháu nhỏ khó thở. Đề nghị UBND xã cử lực lượng can thiệp gấp!"',
    assignedOfficer: 'Nguyễn Văn A (Địa chính - MT)',
    assignedUnit: 'Công an Xã Can Lộc',
    gpsCoord: '18.4521° N, 105.7198° E (Cuối Xóm 3, Phúc Hậu)',
    responseContent:
      'Đã kiểm tra lúc 09h15. Lực lượng Công an xã cùng Cán bộ Môi trường và Đội dân phòng thôn Phúc Hậu đã yêu cầu chủ cơ sở dập tắt đống phế liệu đốt sai quy định, đồng thời lập biên bản xử phạt vi phạm hành chính, cam kết không tái phạm.',
  },
  {
    id: 'r2',
    code: '#PA-2399',
    time: '07:20 Hôm nay',
    citizenName: 'Chị Lê Thị Mai',
    phone: '0913.***.882',
    title: 'Hố ga vỡ nắp ven đường liên xã',
    desc: 'Dễ gây tai nạn cho học sinh đi học',
    village: 'Thôn Sơn Hà',
    category: 'Giao thông - Đô thị',
    status: 'new',
    statusLabel: 'Mới nhận',
    priority: 'normal',
    imagesCount: 1,
    fullQuote:
      '"Nắp hố ga trên đoạn đường liên thôn gần cầu Cây Khế bị nứt vỡ từ tối qua, nhiều phương tiện qua lại rất nguy hiểm. Kính đề nghị bộ phận giao thông xã kiểm tra rào chắn cảnh báo."',
    assignedOfficer: 'Lê Văn C (Giao thông - Thủy lợi)',
    assignedUnit: 'Ban Chỉ huy Thôn Sơn Hà',
    gpsCoord: '18.4610° N, 105.7289° E',
    responseContent: 'Đã tiếp nhận và cử cán bộ căng dây phản quang cảnh báo tạm thời.',
  },
  {
    id: 'r3',
    code: '#PA-2395',
    time: '16:15 Hôm qua',
    citizenName: 'Ông Hoàng Đình T.',
    phone: '0944.***.112',
    title: 'Hát karaoke loa kéo quá giờ',
    desc: 'Gây ồn sau 22h đêm khu vực dân cư',
    village: 'Thôn Trâm Lạc',
    category: 'ANTT & Tiếng ồn',
    status: 'resolved',
    statusLabel: 'Đã giải quyết',
    priority: 'normal',
    imagesCount: 0,
    fullQuote:
      '"Hộ kinh doanh và nhóm thanh niên thường xuyên mở loa kéo công suất lớn đến 23h30 gây mất trật tự ảnh hưởng việc học hành của các cháu nhỏ."',
    assignedOfficer: 'Đ/c Thiếu úy Lê Văn B',
    assignedUnit: 'Công an Xã Can Lộc',
    gpsCoord: '18.4682° N, 105.7410° E',
    responseContent:
      'Công an xã đã tới hiện trường nhắc nhở, lập biên bản cam kết ngừng hoạt động sau 22h theo quy định văn hóa nông thôn mới.',
  },
  {
    id: 'r4',
    code: '#PA-2390',
    time: '14:00 Hôm qua',
    citizenName: 'Nguyễn Thị Hồng',
    phone: '0971.***.554',
    title: 'Lấn chiếm dòng chảy thủy lợi',
    desc: 'Đắp bờ bao gây ngập úng hoa màu',
    village: 'Thôn Hồng Triều',
    category: 'Đất đai - Thủy lợi',
    status: 'resolved',
    statusLabel: 'Đã giải quyết',
    priority: 'normal',
    imagesCount: 1,
    fullQuote:
      '"Đoạn mương dẫn nước tưới tiêu cánh đồng Đội 4 bị đổ đất lấn chiếm khiến dòng chảy bị tắc nghẽn cục bộ khi có mưa rào."',
    assignedOfficer: 'Cán bộ Nông nghiệp & Địa chính',
    assignedUnit: 'Tổ Thủy nông Xã',
    gpsCoord: '18.4550° N, 105.7330° E',
    responseContent: 'Đã huy động máy xúc nạo vét khơi thông dòng chảy hoàn tất vào 17h cùng ngày.',
  },
  {
    id: 'r5',
    code: '#PA-2388',
    time: '10:10 14/05',
    citizenName: 'Phan Văn Đức',
    phone: '0935.***.612',
    title: 'Bảng thông tin cụm thôn bị xiêu vẹo',
    desc: 'Sau cơn giông gió lớn tuần qua',
    village: 'Thôn Kim Đính',
    category: 'Văn hóa - TT',
    status: 'resolved',
    statusLabel: 'Đã giải quyết',
    priority: 'normal',
    imagesCount: 1,
    fullQuote: '"Bảng pa-nô tuyên truyền chính sách tại ngã tư thôn bị gãy trụ sắt nghiêng ra lề đường."',
    assignedOfficer: 'Cán bộ Văn hóa Xã',
    assignedUnit: 'Đoàn Thanh niên Xã Can Lộc',
    gpsCoord: '18.4720° N, 105.7450° E',
    responseContent: 'Đoàn thanh niên xã đã phối hợp hàn gia cố lại cột trụ chắc chắn an toàn.',
  },
]

export const CitizenReportPage: React.FC = () => {
  const [reports] = useState<ReportItem[]>(initialReports)
  const [selectedReport, setSelectedReport] = useState<ReportItem>(initialReports[0])
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [villageFilter, setVillageFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentStage, setCurrentStage] = useState<string>('completed')
  const [resolutionText, setResolutionText] = useState<string>(initialReports[0].responseContent || '')
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null)

  const handleSelectReport = (rep: ReportItem) => {
    setSelectedReport(rep)
    setResolutionText(rep.responseContent || '')
    if (rep.status === 'resolved') setCurrentStage('completed')
    else if (rep.status === 'processing') setCurrentStage('dispatch')
    else setCurrentStage('verify')
  }

  const handleSaveResolution = () => {
    setAlertSuccess(
      `Đã lưu hồ sơ ${selectedReport.code} và gửi thông báo kết quả qua tin nhắn Zalo OA/SMS cho công dân!`
    )
    setTimeout(() => setAlertSuccess(null), 4000)
  }

  const filteredReports = reports.filter((rep) => {
    if (statusFilter !== 'all' && rep.status !== statusFilter) return false
    if (categoryFilter !== 'all' && !rep.category.toLowerCase().includes(categoryFilter.toLowerCase()))
      return false
    if (villageFilter !== 'all' && !rep.village.toLowerCase().includes(villageFilter.toLowerCase()))
      return false
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      const matchSearch =
        rep.code.toLowerCase().includes(q) ||
        rep.citizenName.toLowerCase().includes(q) ||
        rep.title.toLowerCase().includes(q) ||
        rep.village.toLowerCase().includes(q)
      if (!matchSearch) return false
    }
    return true
  })

  return (
    <div className="flex flex-col w-full space-y-5 pb-10">
      {/* Title & Action Bar */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-[#b91c1c] flex items-center justify-center text-2xl shrink-0">
            <i className="fa-solid fa-bullhorn"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-800 uppercase tracking-tight">
                Quản lý Phản ánh Hiện trường
              </h1>
              <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded border border-amber-300">
                Cấp Xã Can Lộc
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Quy trình số hóa tiếp nhận, kiểm tra thực địa, phân công phối hợp và phản hồi trực tiếp kết quả
              cho công dân địa phương
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 self-end md:self-center">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 flex items-center gap-1.5 transition"
          >
            <i className="fa-solid fa-file-arrow-down text-slate-500"></i> Xuất sổ theo dõi tiếp nhận
          </button>
          <button
            onClick={() => alert('Mở giao diện tiếp nhận hồ sơ phản ánh tại Bộ phận Một cửa')}
            className="px-3.5 py-2 bg-[#b91c1c] hover:bg-red-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
          >
            <i className="fa-solid fa-plus-circle text-amber-300"></i> + Tiếp nhận tại Một cửa
          </button>
        </div>
      </div>

      {alertSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-300 flex items-center justify-between text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-emerald-600 text-base"></i>
            <span>{alertSuccess}</span>
          </div>
          <button onClick={() => setAlertSuccess(null)} className="font-bold text-emerald-800">
            ×
          </button>
        </div>
      )}

      {/* BEGIN: SummaryKPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-purpose="kpi-metrics">
        {/* KPI 1: Tổng tiếp nhận */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold tracking-wider uppercase">
            <span>Tổng tiếp nhận</span>
            <span className="w-8 h-8 rounded-lg bg-red-50 text-[#b91c1c] flex items-center justify-center">
              <i className="fa-regular fa-folder-open"></i>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">156</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
              <i className="fa-solid fa-arrow-trend-up mr-0.5"></i> +8 tuần này
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">Ghi nhận từ người dân qua VNeID &amp; Trực tiếp</div>
          <div className="absolute top-0 left-0 h-1 w-full bg-[#b91c1c]"></div>
        </div>

        {/* KPI 2: Mới tiếp nhận */}
        <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-xs relative overflow-hidden flex flex-col justify-between bg-gradient-to-b from-amber-50/20 to-white">
          <div className="flex items-center justify-between text-amber-700 text-xs font-bold tracking-wider uppercase">
            <span>Mới tiếp nhận</span>
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <i className="fa-regular fa-envelope"></i>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">12</span>
            <span className="text-[11px] font-medium text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
              Cần phân loại ngay
            </span>
          </div>
          <div className="mt-2 text-[11px] text-amber-600 flex items-center">
            <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5 animate-ping"></span> Chờ thẩm tra thực địa
            ban đầu
          </div>
          <div className="absolute top-0 left-0 h-1 w-full bg-amber-500"></div>
        </div>

        {/* KPI 3: Đang xử lý thực địa */}
        <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-700 text-xs font-bold tracking-wider uppercase">
            <span>Đang xử lý thực địa</span>
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-person-digging"></i>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600">28</span>
            <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded">
              Đúng tiến độ 100%
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 font-medium">
            <span className="text-blue-600 font-bold">7 vụ</span> phối hợp cùng Công an Xã
          </div>
          <div className="absolute top-0 left-0 h-1 w-full bg-blue-600"></div>
        </div>

        {/* KPI 4: Đã giải quyết xong */}
        <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-bold tracking-wider uppercase">
            <span>Đã giải quyết xong</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i className="fa-regular fa-circle-check"></i>
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700">116</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
              94.2% đúng hạn
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex justify-between items-center">
            <span>Hài lòng công dân:</span>
            <span className="text-emerald-700 font-bold">96.4% ★★★★★</span>
          </div>
          <div className="absolute top-0 left-0 h-1 w-full bg-emerald-600"></div>
        </div>
      </section>

      {/* BEGIN: FilterBar */}
      <section
        className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs space-y-3"
        data-purpose="filtering-section"
      >
        {/* Tabs filter status */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'Tất cả (156)' },
              { id: 'new', label: 'Mới tiếp nhận (12)' },
              { id: 'processing', label: 'Đang xử lý (28)' },
              { id: 'resolved', label: 'Đã giải quyết (116)' },
              { id: 'rejected', label: 'Trả lại / Không duyệt (0)' },
            ].map((tab) => {
              const isActive = statusFilter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#b91c1c] text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
            <i className="fa-solid fa-clock-rotate-left"></i> Cập nhật lúc:{' '}
            <span className="text-slate-600 font-semibold">10:42 Hôm nay</span>
            <button
              onClick={() => {
                setStatusFilter('all')
                setCategoryFilter('all')
                setVillageFilter('all')
                setSearchTerm('')
              }}
              className="text-blue-600 hover:underline ml-1"
            >
              <i className="fa-solid fa-arrows-rotate"></i> Làm mới
            </button>
          </div>
        </div>

        {/* Dropdown selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Theo Lĩnh vực</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full text-xs rounded-lg border-slate-300 py-1.5 focus:border-red-500 focus:ring-red-500 bg-white"
            >
              <option value="all">Tất cả lĩnh vực</option>
              <option value="Môi trường">Môi trường &amp; Rác thải sinh hoạt</option>
              <option value="ANTT">An ninh trật tự &amp; Tiếng ồn</option>
              <option value="Giao thông">Giao thông - Đô thị - Xây dựng</option>
              <option value="Đất đai">Đất đai - Thủy lợi kênh mương</option>
              <option value="Văn hóa">Văn hóa - Thông tin xã</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Địa bàn Thôn (6 Thôn)</label>
            <select
              value={villageFilter}
              onChange={(e) => setVillageFilter(e.target.value)}
              className="w-full text-xs rounded-lg border-slate-300 py-1.5 focus:border-red-500 focus:ring-red-500 bg-white"
            >
              <option value="all">Toàn bộ 6 Thôn Xã Can Lộc</option>
              <option value="Phúc Hậu">Thôn Phúc Hậu (Kênh tưới)</option>
              <option value="Hồng Triều">Thôn Hồng Triều (Trung tâm hành chính)</option>
              <option value="Trâm Lạc">Thôn Trâm Lạc</option>
              <option value="Sơn Hà">Thôn Sơn Hà</option>
              <option value="Kim Đính">Thôn Kim Đính</option>
              <option value="Thượng Xá">Thôn Thượng Xá</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Mức độ ưu tiên</label>
            <select className="w-full text-xs rounded-lg border-slate-300 py-1.5 focus:border-red-500 focus:ring-red-500 bg-white">
              <option value="all">Tất cả mức độ</option>
              <option value="urgent" className="text-red-600 font-bold">
                Khẩn cấp (Hỏa hoạn/Trật tự)
              </option>
              <option value="high">Ưu tiên cao</option>
              <option value="normal">Bình thường</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Tìm nhanh theo từ khóa</label>
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs rounded-lg border-slate-300 py-1.5 pl-8 focus:border-red-500 focus:ring-red-500"
                placeholder="Tên công dân, số ĐT, địa điểm..."
                type="text"
              />
              <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-2 text-slate-400"></i>
            </div>
          </div>
        </div>
      </section>

      {/* BEGIN: MainContentSplit (Table + Detail Panel) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* LEFT: Case List Table (7 Cols in XL) */}
        <section
          className="xl:col-span-7 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col"
          data-purpose="complaint-list"
        >
          <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-table-list text-[#b91c1c]"></i>
              <h2 className="text-sm font-bold text-slate-800">Danh sách Phản ánh Hiện trường</h2>
            </div>
            <span className="text-xs text-slate-500">
              Hiển thị <b>{filteredReports.length}</b> / {reports.length} hồ sơ
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[550px]">
              <thead className="bg-slate-100/90 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200 text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Mã / Giờ</th>
                  <th className="py-2.5 px-3">Người gửi</th>
                  <th className="py-2.5 px-3">Nội dung tóm tắt</th>
                  <th className="py-2.5 px-3">Địa bàn</th>
                  <th className="py-2.5 px-3">Lĩnh vực</th>
                  <th className="py-2.5 px-3 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {filteredReports.map((item) => {
                  const isSelected = selectedReport.id === item.id
                  return (
                    <tr
                      key={item.id}
                      onClick={() => handleSelectReport(item)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-amber-50/80 border-l-4 border-[#b91c1c]'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#b91c1c]">{item.code}</div>
                        <div className="text-[10px] text-slate-500">{item.time}</div>
                        {item.priority === 'urgent' && (
                          <span className="inline-block mt-0.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                            Khẩn cấp
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-800">{item.citizenName}</div>
                        <div className="text-[11px] text-slate-500">{item.phone}</div>
                      </td>
                      <td className="py-3 px-3 max-w-[200px]">
                        <div className="font-bold text-slate-900 truncate">{item.title}</div>
                        <div className="text-[11px] text-slate-500 truncate">{item.desc}</div>
                        {item.imagesCount ? (
                          <div className="text-[10px] text-blue-600 flex items-center gap-1 mt-0.5 font-semibold">
                            <i className="fa-regular fa-image"></i> {item.imagesCount} hình ảnh đính kèm
                          </div>
                        ) : null}
                      </td>
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                        <span className="bg-slate-100 px-2 py-1 rounded text-slate-800 font-medium">
                          {item.village}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                        <span
                          className={
                            item.category.includes('Môi trường')
                              ? 'text-red-700 font-semibold'
                              : item.category.includes('ANTT')
                              ? 'text-orange-700 font-medium'
                              : ''
                          }
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                            item.status === 'processing'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : item.status === 'resolved'
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : 'bg-red-100 text-red-700 border-red-200'
                          }`}
                        >
                          {item.statusLabel}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="p-3 border-t border-slate-200 flex items-center justify-between bg-slate-50 text-xs">
            <span className="text-slate-500">Hiển thị trang 1 trên 16</span>
            <div className="flex items-center space-x-1">
              <button className="px-2.5 py-1 border border-slate-300 rounded bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-50">
                Trước
              </button>
              <button className="px-2.5 py-1 bg-[#b91c1c] text-white font-bold rounded">1</button>
              <button className="px-2.5 py-1 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-100">
                2
              </button>
              <button className="px-2.5 py-1 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-100">
                3
              </button>
              <button className="px-2.5 py-1 border border-slate-300 rounded bg-white text-slate-600 hover:bg-slate-100">
                Sau
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT: Detailed Case Dossier Panel (5 Cols in XL) */}
        <section
          className="xl:col-span-5 bg-white rounded-xl border border-slate-300 shadow-md overflow-hidden flex flex-col"
          data-purpose="dossier-detail"
        >
          {/* Case Top Header */}
          <div className="bg-[#991b1b] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                Hồ sơ tiếp nhận
              </span>
              <span className="font-mono font-bold text-amber-200 text-base">{selectedReport.code}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => window.print()}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-red-800 text-xs"
                title="In phiếu tiếp nhận"
              >
                <i className="fa-solid fa-print"></i>
              </button>
              <button
                onClick={() => alert(`Mã hồ sơ: ${selectedReport.code}`)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-red-800 text-xs"
                title="Mở trong tab mới"
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4 max-h-[850px] overflow-y-auto">
            {/* Title of Incident */}
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">{selectedReport.title}</h2>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                <span>
                  <i className="fa-regular fa-clock mr-1"></i>
                  {selectedReport.time}
                </span>
                <span>•</span>
                <span className="text-[#b91c1c] font-semibold">
                  <i className="fa-solid fa-circle-exclamation mr-1"></i>
                  Lĩnh vực: {selectedReport.category}
                </span>
              </div>
            </div>

            {/* Citizen info Card */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 font-black flex items-center justify-center text-sm border border-amber-300">
                  {selectedReport.citizenName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    {selectedReport.citizenName}
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-semibold">
                      <i className="fa-solid fa-check"></i> VNeID Định danh
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Công dân cư trú tại: {selectedReport.village}
                  </div>
                </div>
              </div>
              <a
                className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-700 font-semibold hover:bg-slate-100 flex items-center gap-1 text-[11px]"
                href={`tel:${selectedReport.phone.replace(/[^0-9]/g, '')}`}
              >
                <i className="fa-solid fa-phone text-emerald-600"></i> {selectedReport.phone}
              </a>
            </div>

            {/* Content Description & Quotes */}
            <div className="text-xs text-slate-700 bg-amber-50/40 p-3 rounded-lg border border-amber-200/60 leading-relaxed italic">
              {selectedReport.fullQuote || selectedReport.desc}
            </div>

            {/* Submitted Photos */}
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                <span>Hình ảnh phản ánh từ người dân:</span>
                <span className="text-[11px] text-blue-600 cursor-pointer hover:underline">
                  Xem ảnh gốc ({selectedReport.imagesCount || 1})
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 h-28 group">
                  <img
                    alt="Ảnh 1: Hiện trường phản ánh"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxfdIRbHWL6nHJLpl73NhVoF97V7nYrN-KHj25siu7k676NXyY6U0tmbgh_-zDkN4si-dn0NUldrlraiIpAzBLgV8Dw8WGS7cnYlrdEeA-vhouTqE3TUhe1bdLMdJ_j_s5w0vAxyv_O9jCFBXTkHeORWrVmKt2xsDM9Apcikdk2Hw0CELRe17Rt29KfXAIZ0Hh3wp5bOW24GPlmJk4J4z1W4H1Q024KP7DQlPrhncK3cOYSoAZAFbv8g"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                    Ảnh 1: Cột khói đen
                  </span>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 h-28 group">
                  <img
                    alt="Ảnh 2: Điểm rác thải thực tế"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ4cM4aiYk8sNzKIMhhTT2M5QLGXW97NHMPwlN9eNya2qEAegatns5vrYjEGH2lZmwCJpVSnOQQ5QqlCBfSOs7Z-2j7R1x3uCRBXk7pEqMIGAJk8rGN3UE8OT31aXb2jx3NaFVOOUXHSYrcySNkBTRjfcnTfpzsTgRM2PxsyfyIuvcJdAsJ47a3ag47ZakhCJ9t54NF42PNuV5ZX6BfxKSZRYNnYNUYoTm8cCVHqT5vPZAjQURypmKow"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                    Ảnh 2: Điểm đốt rác thải
                  </span>
                </div>
              </div>
            </div>

            {/* Location GPS Tag */}
            <div className="bg-slate-100 p-2.5 rounded-lg text-xs flex items-center justify-between border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700 truncate">
                <i className="fa-solid fa-location-dot text-red-600"></i>
                <span className="truncate">
                  <b>Định vị:</b> {selectedReport.gpsCoord || '18.4521° N, 105.7198° E'}
                </span>
              </div>
              <button
                onClick={() => alert(`Xem tọa độ: ${selectedReport.gpsCoord}`)}
                className="text-blue-700 hover:text-blue-800 font-bold whitespace-nowrap text-[11px] flex items-center gap-1"
              >
                <i className="fa-solid fa-map"></i> Bản đồ GIS
              </button>
            </div>

            <hr className="border-slate-200" />

            {/* UPDATE STATUS WORKFLOW (Interactive Form) */}
            <div className="space-y-3" data-purpose="status-update-workflow">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center justify-between">
                <span>
                  <i className="fa-solid fa-sliders text-[#b91c1c] mr-1"></i> Cập nhật trạng thái xử lý
                </span>
                <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.2 rounded font-bold">
                  Thực địa Can Lộc
                </span>
              </div>

              {/* Radio stage options */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'verify', label: 'Đang xác minh thực địa' },
                  { id: 'dispatch', label: 'Đang cử lực lượng' },
                  { id: 'minutes', label: 'Lập biên bản xử lý' },
                  { id: 'completed', label: 'Đã dập tắt & Hoàn thành' },
                ].map((stg) => {
                  const isChecked = currentStage === stg.id
                  return (
                    <label
                      key={stg.id}
                      onClick={() => setCurrentStage(stg.id)}
                      className={`border rounded-lg p-2 flex items-center gap-2 cursor-pointer transition ${
                        isChecked
                          ? 'border-2 border-emerald-500 bg-emerald-50/50 text-emerald-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dossier_stage"
                        checked={isChecked}
                        onChange={() => setCurrentStage(stg.id)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{stg.label}</span>
                    </label>
                  )
                })}
              </div>

              {/* Assignee Selection */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Cán bộ xử lý chính</label>
                  <div className="p-2 bg-slate-50 rounded border border-slate-300 flex items-center gap-2">
                    <i className="fa-solid fa-id-badge text-[#b91c1c]"></i>
                    <span className="font-bold text-slate-800 truncate">
                      {selectedReport.assignedOfficer || 'Nguyễn Văn A (Địa chính - MT)'}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Đơn vị phối hợp thực thi</label>
                  <div className="p-2 bg-slate-50 rounded border border-slate-300 flex items-center gap-2">
                    <i className="fa-solid fa-shield-halved text-blue-600"></i>
                    <span className="font-bold text-slate-800 truncate">
                      {selectedReport.assignedUnit || 'Công an Xã Can Lộc'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resolution report textarea */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Nội dung báo cáo kết quả gửi Công dân
                  </label>
                  <span className="text-[10px] text-slate-400">Tối đa 500 ký tự</span>
                </div>
                <textarea
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  className="w-full text-xs rounded-lg border-slate-300 p-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nhập chi tiết biện pháp xử lý để hệ thống tự động đồng bộ sang Zalo OA/SMS cho người dân..."
                  rows={3}
                ></textarea>
              </div>

              {/* Post-resolution Proof Photos Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tải lên ảnh đối chứng sau xử lý (Hiện trường hoàn tất)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative h-20 rounded-lg overflow-hidden border border-emerald-400">
                    <img
                      alt="Hiện trường sau khi dập tắt và xử phạt"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_nib6VjdZWzKH-Ea-UIIsPX5NAfVcrhvit9tD5N8KDu3Nd9DEkHI5JjSeIyjOsJ3pLmti3HVKd6gK6l8Dq6p9EMMbwKiaWkM6EDYW7oGu8p0u4Os2nq0oSZVNK15tcPpCh1aCGJnJbmVjZnVf6vK0ylGC2NF5vkgy74z7GeCAhWd4Clq-4H9F3H1HZ9Cm3b7WSxiKpLO2VbkK8gXNaKpyrPlQJnvOTohPc1yQK9eEe23Z_tuNpgEOJw"
                    />
                    <div className="absolute inset-0 bg-emerald-950/20 flex items-center justify-center">
                      <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                        Đã khắc phục ✓
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={() => alert('Chọn tệp ảnh minh chứng hiện trường sau xử lý')}
                    className="border-2 border-dashed border-slate-300 hover:border-[#b91c1c] rounded-lg h-20 flex flex-col items-center justify-center text-slate-500 hover:text-[#b91c1c] cursor-pointer transition p-2 text-center bg-slate-50"
                  >
                    <i className="fa-solid fa-camera text-base mb-1"></i>
                    <span className="text-[10px] font-medium">Thêm ảnh minh chứng</span>
                  </div>
                </div>
              </div>

              {/* Final Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={handleSaveResolution}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition"
                >
                  <i className="fa-solid fa-paper-plane"></i> Lưu hồ sơ &amp; Gửi thông báo Zalo/SMS cho dân
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CitizenReportPage
