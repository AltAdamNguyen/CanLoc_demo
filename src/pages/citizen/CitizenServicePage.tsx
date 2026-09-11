import React, { useState } from 'react'

interface ServiceItem {
  id: string
  code: string
  title: string
  category: 'tu-phap' | 'dat-dai' | 'lao-dong' | 'tai-chinh' | 'nong-nghiep'
  type: 'TOÀN TRÌNH' | 'MỘT PHẦN'
  tag?: string
  fee: string
  duration: string
  authority: string
  rating?: string
  icon: string
  iconColor: string
}

const serviceData: ServiceItem[] = [
  {
    id: '1',
    code: 'TTHC-HT-01',
    title: 'Đăng ký khai sinh và cấp số định danh cá nhân',
    category: 'tu-phap',
    type: 'TOÀN TRÌNH',
    tag: 'Liên thông 02 nhóm DVC',
    fee: 'Miễn phí',
    duration: 'Giải quyết trong ngày',
    authority: 'UBND Xã Can Lộc',
    rating: '100% hài lòng',
    icon: 'child_friendly',
    iconColor: 'bg-primary-fixed text-primary',
  },
  {
    id: '2',
    code: 'TTHC-CT-04',
    title: 'Chứng thực bản sao điện tử từ bản chính',
    category: 'tu-phap',
    type: 'TOÀN TRÌNH',
    tag: 'Ký số điện tử',
    fee: '2.000 đ / trang (từ trang 3: 1.000 đ)',
    duration: 'Trả ngay trong 02 giờ',
    authority: 'Kho Dữ liệu VNeID cá nhân',
    icon: 'verified',
    iconColor: 'bg-tertiary-fixed text-tertiary',
  },
  {
    id: '3',
    code: 'TTHC-DC-08',
    title: 'Xác nhận hiện trạng sử dụng đất nông nghiệp',
    category: 'dat-dai',
    type: 'MỘT PHẦN',
    fee: 'Miễn phí',
    duration: '03 ngày làm việc',
    authority: 'Công chức Địa chính - Xây dựng',
    icon: 'landscape',
    iconColor: 'bg-secondary-fixed text-on-secondary-fixed',
  },
  {
    id: '4',
    code: 'TTHC-LDTBXH-11',
    title: 'Trợ cấp xã hội hàng tháng cho đối tượng bảo trợ xã hội',
    category: 'lao-dong',
    type: 'TOÀN TRÌNH',
    tag: 'Chi trả qua tài khoản',
    fee: 'Miễn phí',
    duration: '07 ngày làm việc',
    authority: 'An sinh xã hội số (VNeID)',
    icon: 'diversity_1',
    iconColor: 'bg-primary-fixed text-primary',
  },
  {
    id: '5',
    code: 'TTHC-HT-02',
    title: 'Đăng ký kết hôn trực tuyến',
    category: 'tu-phap',
    type: 'MỘT PHẦN',
    fee: 'Miễn phí công dân Việt Nam',
    duration: '01 ngày làm việc',
    authority: 'Hai bên có mặt tại UBND Xã',
    icon: 'favorite',
    iconColor: 'bg-surface-container text-primary',
  },
  {
    id: '6',
    code: 'TTHC-HT-03',
    title: 'Cấp giấy xác nhận tình trạng hôn nhân',
    category: 'tu-phap',
    type: 'TOÀN TRÌNH',
    fee: 'Miễn phí',
    duration: '01 ngày làm việc',
    authority: 'Bản điện tử có chữ ký số',
    icon: 'description',
    iconColor: 'bg-primary-fixed text-primary',
  },
]

const categories = [
  { key: 'all', label: 'Tất cả', count: 112 },
  { key: 'tu-phap', label: 'Hộ tịch - Tư pháp', count: 28 },
  { key: 'dat-dai', label: 'Địa chính - Đất đai', count: 34 },
  { key: 'lao-dong', label: 'Lao động - TB & XH', count: 22 },
  { key: 'tai-chinh', label: 'Tài chính - Kế toán', count: 12 },
  { key: 'nong-nghiep', label: 'Nông nghiệp & MT', count: 16 },
]

export const CitizenServicePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [trackCode, setTrackCode] = useState('HSO-2025-0284')
  const [trackedResult, setTrackedResult] = useState<boolean>(true)
  const [applyModalItem, setApplyModalItem] = useState<ServiceItem | null>(null)
  const [guideModalItem, setGuideModalItem] = useState<ServiceItem | null>(null)
  const [appliedSuccess, setAppliedSuccess] = useState(false)

  const filteredServices = serviceData.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="flex flex-col w-full gap-6 pb-12">
      {/* 1. HERO SEARCH BANNER */}
      <section className="relative overflow-hidden rounded-2xl bg-primary text-white p-6 md:p-8 shadow-md">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[240px]">account_balance</span>
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-base">verified_user</span>
            Cổng Dịch Vụ Công Điện Tử Cấp Xã
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2 uppercase">
            Hệ Thống Dịch Vụ Công Trực Tuyến
          </h1>
          <p className="text-sm md:text-base text-primary-fixed mb-6 max-w-2xl leading-relaxed">
            Minh bạch, thuận tiện, giảm thời gian đi lại cho người dân và doanh nghiệp xã Can Lộc. Hiện diện trực tuyến 24/7 với 112 thủ tục hành chính công khai.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-xl p-2 shadow-lg flex flex-col md:flex-row items-center gap-2">
            <div className="flex items-center gap-3 px-3 py-2 w-full text-on-surface">
              <span className="material-symbols-outlined text-primary text-2xl">search</span>
              <input
                className="w-full bg-transparent outline-none text-sm text-on-surface placeholder:text-gray-400"
                placeholder="Nhập tên thủ tục, mã thủ tục (ví dụ: khai sinh, chứng thực, cấp đất...)"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <button
                onClick={() => { }}
                className="w-full md:w-auto px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white font-semibold text-sm flex items-center justify-center gap-2 shadow transition-colors"
              >
                <span className="material-symbols-outlined text-lg">manage_search</span>
                <span>Tra cứu</span>
              </button>
            </div>
          </div>

          {/* Hot Keywords */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-primary-fixed-dim text-xs">
            <span className="text-secondary-fixed font-medium">Từ khóa phổ biến:</span>
            {['Khai sinh', 'Chứng thực điện tử', 'Xác nhận hôn nhân', 'Trợ cấp người cao tuổi'].map((kw) => (
              <button
                key={kw}
                onClick={() => setSearchQuery(kw)}
                className="px-2.5 py-1 rounded bg-primary-container/80 text-white hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STATS OVERVIEW CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-fixed"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Hồ sơ trực tuyến</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">cloud_upload</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-on-surface tracking-tight mb-1">1.420</div>
          <div className="flex items-center gap-1.5 text-xs text-secondary font-medium">
            <span className="material-symbols-outlined text-base">trending_up</span>
            <span>Tăng 24.8% so với cùng kỳ</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-fixed"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Đúng & trước hạn</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-800">
              <span className="material-symbols-outlined text-xl">task_alt</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary tracking-tight mb-1">98.6%</div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>Chỉ số hài lòng: <strong>4.92 / 5.0</strong></span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-fixed"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Thời gian trả kết quả</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-xl">timer</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-tertiary tracking-tight mb-1">
            1.2 <span className="text-sm font-normal text-gray-500">ngày</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="material-symbols-outlined text-base text-tertiary">bolt</span>
            <span>Nhanh hơn 0.8 ngày so với định mức</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-fixed"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Mức độ cung cấp</span>
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">devices</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold text-on-surface">45</span>
            <span className="text-xs text-gray-500">Toàn trình</span>
            <span className="text-xl text-gray-300 font-light">|</span>
            <span className="text-xl font-bold text-on-surface">67</span>
            <span className="text-xs text-gray-500">Một phần</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden flex">
            <div className="bg-primary h-full" style={{ width: '40%' }}></div>
            <div className="bg-secondary h-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT: PROCEDURES LIST & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of services (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Category tabs */}
          <div className="bg-white rounded-xl p-4 shadow-xs border border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <div className="text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">category</span>
                <span>Lĩnh vực thủ tục hành chính</span>
              </div>
              <span className="text-xs bg-red-50 text-primary font-medium px-2.5 py-1 rounded-full border border-red-100">
                Tổng cộng: 112 TTHC công khai
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.key
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-primary-container text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* List items */}
          <div className="flex flex-col gap-3.5">
            {filteredServices.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
                <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">find_in_page</span>
                <p>Không tìm thấy thủ tục hành chính nào phù hợp với từ khóa.</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="mt-3 text-xs text-primary font-semibold hover:underline"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            ) : (
              filteredServices.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 shadow-xs border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.iconColor}`}
                      >
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.type === 'TOÀN TRÌNH'
                              ? 'bg-primary text-white'
                              : 'bg-secondary text-white'
                              }`}
                          >
                            DVC {item.type}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600">
                            Mã: {item.code}
                          </span>
                          {item.tag && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed text-on-secondary-fixed">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        onClick={() => setGuideModalItem(item)}
                        className="px-3.5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">help_outline</span>
                        <span>Hướng dẫn</span>
                      </button>
                      {/* <button
                        onClick={() => setApplyModalItem(item)}
                        className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">touch_app</span>
                        <span>Nộp trực tuyến</span>
                      </button> */}
                    </div>
                  </div>

                  {/* Metadata info strip */}
                  <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-gray-600 text-xs bg-red-50/40 px-3 py-2 rounded-lg border border-red-50">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-secondary">payments</span>
                      <span>
                        Lệ phí: <strong className="text-on-surface">{item.fee}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-tertiary">schedule</span>
                      <span>
                        Thời gian: <strong className="text-on-surface">{item.duration}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-primary">apartment</span>
                      <span>
                        Thẩm quyền: <strong className="text-on-surface">{item.authority}</strong>
                      </span>
                    </div>
                    {item.rating && (
                      <div className="flex items-center gap-1.5 ml-auto text-secondary font-medium">
                        <span className="material-symbols-outlined text-base">thumb_up</span>
                        <span>{item.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination bar */}
          <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-xs border border-gray-100 text-gray-500 text-xs">
            <span>Hiển thị {filteredServices.length} trong số 112 thủ tục hành chính</span>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200">
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded bg-primary text-white font-bold">1</button>
              <button className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">2</button>
              <button className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">3</button>
              <span className="px-1 text-gray-400">...</span>
              <button className="w-8 h-8 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">19</button>
              <button className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200">
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Tracking & Assistance (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Progress Tracking Card */}
          <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">search_check</span>
              </div>
              <h2 className="text-base font-bold text-on-surface">Tra cứu tiến độ hồ sơ</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Nhập mã biên nhận hồ sơ được cấp tại bộ phận Một cửa hoặc mã tra cứu qua tin nhắn VNeID / SMS.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                setTrackedResult(true)
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mã hồ sơ hành chính:
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">
                    pin
                  </span>
                  <input
                    className="w-full pl-10 pr-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-200 text-on-surface uppercase font-mono tracking-wider focus:outline-none focus:border-primary focus:bg-white transition-all"
                    placeholder="VD: HSO-2025-0284"
                    type="text"
                    value={trackCode}
                    onChange={(e) => setTrackCode(e.target.value)}
                  />
                </div>
              </div>
              <button
                className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white text-sm font-semibold flex items-center justify-center gap-2 shadow transition-colors"
                type="submit"
              >
                <span className="material-symbols-outlined text-lg">query_builder</span>
                <span>Kiểm tra tiến độ</span>
              </button>
            </form>

            {/* Tracking Result Box */}
            {trackedResult && (
              <div className="mt-4 p-4 rounded-xl bg-red-50/50 border border-red-100 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase font-bold text-gray-600">
                    Mã: {trackCode || 'HSO-2025-0284'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-yellow-200 text-yellow-900 text-[10px] font-bold">
                    Đang xử lý
                  </span>
                </div>
                <div className="text-sm font-bold text-primary mb-1">
                  Đăng ký khai sinh liên thông
                </div>
                <div className="text-xs text-gray-600 mb-3">
                  Người nộp: <strong>Nguyễn Văn Thành</strong> (Thôn Hạ Can)
                </div>

                <div className="relative pl-6 space-y-4 text-xs border-l-2 border-primary/20 ml-2">
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
                    <div className="font-bold text-on-surface">Tiếp nhận hồ sơ hợp lệ</div>
                    <div className="text-[11px] text-gray-400">08:15 - 24/10/2025 (Bộ phận Một cửa)</div>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-100"></span>
                    <div className="font-bold text-on-surface">Phê duyệt số định danh & Ký duyệt</div>
                    <div className="text-[11px] text-gray-400">10:40 - 24/10/2025 (Chủ tịch UBND Xã)</div>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-gray-300"></span>
                    <div className="font-medium text-gray-500">Đóng dấu điện tử & Chuyển trả kết quả</div>
                    <div className="text-[11px] text-gray-400">Dự kiến hoàn thành: 16:00 Hôm nay</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4 Steps Guide Card */}
          {/* <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">how_to_reg</span>
              </div>
              <h2 className="text-base font-bold text-on-surface">4 Bước nộp hồ sơ trực tuyến</h2>
            </div>
            <div className="space-y-3">
              {[
                {
                  step: 1,
                  title: 'Đăng nhập tài khoản VNeID',
                  desc: 'Sử dụng tài khoản định danh điện tử mức 2 đã tích hợp căn cước.',
                },
                {
                  step: 2,
                  title: 'Chọn thủ tục & Điền tờ khai',
                  desc: 'Hệ thống tự động điền sẵn các trường thông tin từ Cơ sở dữ liệu quốc gia.',
                },
                {
                  step: 3,
                  title: 'Đính kèm tệp & Nộp lệ phí',
                  desc: 'Chụp ảnh giấy tờ liên quan và nộp phí trực tuyến tiện lợi qua tài khoản ngân hàng.',
                },
                {
                  step: 4,
                  title: 'Nhận kết quả số hóa',
                  desc: 'Kết quả có ký số được trả về kho cá nhân hoặc chuyển phát tận nhà.',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-50 hover:bg-red-50/40 transition-colors"
                >
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {s.step}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-on-surface">{s.title}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Community Digital Transformation Support Team */}
          <div className="bg-gradient-to-br from-primary-container to-primary rounded-xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="text-base font-bold mb-1">Tổ Chuyển Đổi Số Cộng Đồng</div>
            <p className="text-xs text-primary-fixed mb-4 leading-relaxed">
              Người cao tuổi, người gặp khó khăn khi thao tác trên điện thoại vui lòng liên hệ Tổ hỗ trợ thôn hoặc đến trực tiếp Điểm Hỗ Trợ Số UBND Xã Can Lộc.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-secondary-fixed">support_agent</span>
                <span>
                  Đ/c Lê Hồng Phong (Phụ trách DVC): <strong className="text-secondary-fixed">0912.456.789</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-secondary-fixed">schedule</span>
                <span>Tiếp nhận: Thứ 2 - Thứ 6 (07h00 - 17h00)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: NỘP HỒ SƠ TRỰC TUYẾN */}
      {applyModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-secondary-fixed">assignment</span>
                <span className="font-bold text-base">Nộp Hồ Sơ Trực Tuyến</span>
              </div>
              <button
                onClick={() => {
                  setApplyModalItem(null)
                  setAppliedSuccess(false)
                }}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6">
              {!appliedSuccess ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setAppliedSuccess(true)
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="p-3 bg-red-50/70 rounded-xl border border-red-100">
                    <div className="text-[10px] uppercase font-bold text-primary mb-0.5">
                      Thủ tục đăng ký:
                    </div>
                    <div className="font-bold text-sm text-on-surface">{applyModalItem.title}</div>
                    <div className="text-gray-500 mt-1">Mã TTHC: {applyModalItem.code} | Thẩm quyền: {applyModalItem.authority}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Họ và tên người nộp *</label>
                      <input
                        required
                        defaultValue="Nguyễn Thị Mai"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Số Căn cước / VNeID *</label>
                      <input
                        required
                        defaultValue="042198001234"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Số điện thoại liên hệ *</label>
                      <input
                        required
                        defaultValue="0987.654.321"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Thôn / Cụm cư trú *</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary">
                        <option>Thôn 1 - Xã Can Lộc</option>
                        <option>Thôn 2 - Xã Can Lộc</option>
                        <option>Thôn 3 - Xã Can Lộc</option>
                        <option>Thôn Hạ Can - Xã Can Lộc</option>
                        <option>Thôn Thượng Can - Xã Can Lộc</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Tệp đính kèm (Ảnh chụp CCCD, giấy tờ gốc)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-primary transition-colors cursor-pointer bg-gray-50">
                      <span className="material-symbols-outlined text-3xl text-gray-400">upload_file</span>
                      <p className="text-gray-600 mt-1">Kéo thả tệp hoặc bấm vào đây để chọn ảnh chụp giấy tờ</p>
                      <span className="text-[10px] text-gray-400">Hỗ trợ PDF, JPG, PNG (tối đa 25MB)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setApplyModalItem(null)}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white font-semibold flex items-center gap-1.5 shadow"
                    >
                      <span className="material-symbols-outlined text-base">send</span>
                      <span>Gửi hồ sơ ngay</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">task_alt</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface">Nộp hồ sơ thành công!</h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    Mã hồ sơ của bạn là <strong className="text-primary font-mono text-sm">HSO-2025-0399</strong>. Thông báo tiến độ xử lý đã được gửi qua tin nhắn VNeID và SMS.
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={() => {
                        setApplyModalItem(null)
                        setAppliedSuccess(false)
                      }}
                      className="px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-semibold shadow"
                    >
                      Hoàn tất & Đóng
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: HƯỚNG DẪN THỦ TỤC */}
      {guideModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-secondary-fixed">menu_book</span>
                <span className="font-bold text-base">Hướng Dẫn Thủ Tục Hành Chính</span>
              </div>
              <button
                onClick={() => setGuideModalItem(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="font-bold text-base text-primary">{guideModalItem.title}</div>
              <div className="space-y-3 text-gray-700">
                <div>
                  <h4 className="font-bold text-on-surface mb-1">1. Trình tự thực hiện:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Người nộp chuẩn bị hồ sơ đầy đủ theo quy định hoặc thực hiện nộp trực tuyến qua Cổng DVC.</li>
                    <li>Công chức bộ phận Một cửa kiểm tra tính hợp lệ và xuất biên nhận điện tử.</li>
                    <li>Lãnh đạo UBND xem xét, ký số giấy tờ và cấp kết quả về kho VNeID.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">2. Thành phần hồ sơ:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Tờ khai điện tử theo mẫu tương ứng.</li>
                    <li>Bản sao hoặc hình ảnh giấy tờ xác thực nhân thân (CCCD / VNeID mức 2).</li>
                    <li>Các tài liệu minh chứng kèm theo (nếu có).</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">3. Phí & Lệ phí:</h4>
                  <p className="text-gray-600 font-semibold">{guideModalItem.fee}</p>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-gray-100 gap-2">
                <button
                  onClick={() => setGuideModalItem(null)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    const item = guideModalItem
                    setGuideModalItem(null)
                    setApplyModalItem(item)
                  }}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-white font-semibold flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">touch_app</span>
                  <span>Nộp hồ sơ ngay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CitizenServicePage
