import React, { useState } from 'react'

interface NewsArticle {
  id: string
  title: string
  summary: string
  category: string
  date: string
  views: number
  imageUrl: string
  author?: string
  content?: string
  badge?: string
  isUrgent?: boolean
}

const featuredNews: NewsArticle = {
  id: 'lead-1',
  title: 'Xã Can Lộc bứt phá tiên phong chuyển đổi số toàn diện và nâng cao chất lượng phục vụ nhân dân năm 2025',
  summary:
    'Sáng ngày 24/02, UBND xã Can Lộc tổ chức Hội nghị tổng kết triển khai mô hình xã thông minh gắn kết xây dựng chuẩn Nông thôn mới kiểu mẫu. Toàn xã đã đạt 19/19 tiêu chí nâng cao, 100% thủ tục hành chính liên thông được số hóa qua hệ thống Cổng Dịch vụ công Quốc gia, 6/6 thôn triển khai thành công mô hình thanh toán không dùng tiền mặt.',
  category: 'Chuyển đổi số & Cải cách hành chính',
  date: '24/02/2025',
  views: 3480,
  badge: 'SỰ KIỆN NỔI BẬT',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDfSnwhVaHvJSmEsx6lhsdvnaIJud_yD-vkvtbbSE9uxW2tlZEnh9PNItPpewzG8OdQJLWxwG7-F-4IogLUCa_8Q5CqNtPlNxRBDWGMsR3ZG-VoDxs-s5ZxwvbmxxmozjQeKSi9yqPKxkxyK6g87UW8jIMHMIBsbdAzcPe-KibkoaWuI-0Stm-G9xaLTsG9d9F3QLrZflWviwxWWf_h7Aq8T77BLvfa2ZI-nD7VnAbIGDnAp_Vgr9o90w',
  author: 'Ban Biên tập Cổng TTĐT Xã Can Lộc',
  content: `
    Sáng ngày 24/02/2025, tại Trung tâm Hội nghị UBND xã Can Lộc đã diễn ra Hội nghị tổng kết công tác chuyển đổi số và cải cách hành chính năm 2024, triển khai phương hướng nhiệm vụ trọng tâm năm 2025.
    
    Tham dự hội nghị có các đồng chí Thường trực Huyện ủy, Lãnh đạo Sở Thông tin và Truyền thông, các đồng chí Thường vụ Đảng ủy, Thường trực HĐND, Lãnh đạo UBND xã cùng đại diện 6 Tổ công nghệ số cộng đồng của các thôn.

    Trong năm qua, xã Can Lộc đã ghi nhận nhiều dấu ấn vượt bậc:
    - 100% văn bản hành chính được ký số và luân chuyển qua trục liên thông văn bản quốc gia.
    - 112/112 thủ tục hành chính được niêm yết công khai và tiếp nhận giải quyết trực tuyến.
    - Tỷ lệ người dân có tài khoản định danh điện tử VNeID mức 2 đạt trên 92%.
    - Cài đặt chữ ký số cá nhân và thanh toán điện tử cho hơn 4.200 hộ dân.

    Phát biểu kết luận hội nghị, đồng chí Chủ tịch UBND xã biểu dương tinh thần trách nhiệm của lực lượng xung kích và yêu cầu tiếp tục phát huy kết quả đạt được, đưa Can Lộc trở thành điển hình chuyển đổi số cấp xã toàn tỉnh.
  `,
}

const leftSubStories: NewsArticle[] = [
  {
    id: 'sub-1',
    title: 'Triển khai mạnh mẽ phong trào thi đua "Toàn dân chung sức xây dựng Nông thôn mới kiểu mẫu 2025"',
    summary: 'Sáng 24/02, UBND xã phát động đợt thi đua cao điểm với nhiều công trình dân sinh trọng điểm...',
    category: 'Nông thôn mới',
    date: '24/02/2025',
    views: 1240,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCbj3HSnEGQ6rLZMfrhLEA9VUbqCV6eX07vBzL55xruTKOrH63xrADvVc1yk6EMcIhkoWyT0f-pfYz-FWhW6L-sYRxwRKASod-lZhWusw2yjUzUMF5tM-blY9ccp9ZUNZHk1Sp7wvr7hrtLcOnjiddBFa_JMldaLaHQeS8b8bWAArCNY9lA4pU8vNjEKkVe2QJhM5pvnPUKgqJoPWLN5hUA2OoHG7UC_YOeLDEyqrvVjHY8k27zSYw8A',
  },
  {
    id: 'sub-2',
    title: 'Tổ công nghệ số cộng đồng 6 thôn hướng dẫn 1.800 người dân cài đặt dịch vụ số',
    summary: 'Đạt 98.4% kế hoạch giao chỉ tiêu đợt 1 năm 2025 theo chỉ đạo của Huyện...',
    category: 'Chuyển đổi số',
    date: '23/02/2025',
    views: 950,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuClDNUqyW3O2AJk8XH1xU2OJdS6psoq3eAw5a8LWP1PCOCEYtlSrZNDBHYyLcxNeL5XFG-c_YXwbSBjpuSPKhFAw2VKoo9uzs7vyXAm1zDbav_i4DP0OIeMftUp3hbX_o9Yj-FXrQsEa6onMdlpoX5CmATsguMr2CViVP_ILOzTC2j8ShTZv9QwyAhgUndEDg8nP3f2MY-msuLsOe4RzKF5KJ-_bWcgYoZd32gYLYVMJqtLQ4UPRB741w',
  },
  {
    id: 'sub-3',
    title: 'HĐND xã Can Lộc khóa XX chuẩn bị kỳ họp chuyên đề về quy hoạch sử dụng đất',
    summary: 'Kỳ họp dự kiến thông qua quy hoạch phát triển vùng sản xuất lúa chất lượng cao...',
    category: 'Chính trị',
    date: '22/02/2025',
    views: 820,
    imageUrl: '',
  },
]

const urgentBulletins = [
  {
    title: 'Công điện số 01/CĐ-PCTT: Chủ động phương án tưới tiêu phòng hạn hán vụ lúa xuân 2025',
    dept: 'Ngày 22/02 - Ban Chỉ huy PCTT xã',
  },
  {
    title: 'UBND xã công bố đường dây nóng giải quyết vướng mắc định danh điện tử VNeID mức 2',
    dept: 'Ngày 21/02 - Công an xã Can Lộc',
  },
  {
    title: 'Thông báo tiêm vắc xin phòng bệnh dại và gia súc gia cầm định kỳ đợt 1/2025',
    dept: 'Ngày 20/02 - Ban Nông nghiệp',
  },
]

const partyGovArticles: NewsArticle[] = [
  {
    id: 'party-1',
    title: 'Đảng ủy xã Can Lộc ban hành Nghị quyết chuyên đề về nâng cao chất lượng sinh hoạt chi bộ tại 6 thôn',
    summary:
      'Quán triệt sâu sắc các chủ trương của Tỉnh ủy Hà Tĩnh và Huyện ủy Can Lộc, Ban Thường vụ Đảng ủy xã Can Lộc đã tiến hành kiểm tra công tác sinh hoạt chi bộ, yêu cầu gắn việc học tập Nghị quyết với giải quyết việc làm thiết thực của bà con nông dân.',
    category: 'XÂY DỰNG ĐẢNG & HỆ THỐNG CHÍNH TRỊ',
    date: '23/02/2025',
    views: 1100,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCJ2SofFW5xdRHV61jXCf9horuTuvqasz0TCkogzkc4ztQ0G1AaR9Fa33tC4UyQYWlyzQo5Ljc-ak3sh8f6y9h6dIxmLt48hOCx0Vl4TnClpGx4yu0XwNG3SrsBH064H3yhmafuv6jTnTiF0GyHjPR1UpAz97f9Y7AX5KZU5O_24EjDGUdE3MXUlmauiRZl2E5hInjrhSho5F1cvcWLOBi231xj-F1-6Te2b4tnrPqxZ_jvdstDD-eYg',
  },
  {
    id: 'party-2',
    title: 'Thường trực HĐND xã giám sát chuyên đề tiến độ giải ngân vốn NTM kiểu mẫu',
    summary: 'Đoàn giám sát đã làm việc trực tiếp tại thôn Thượng Xá và thôn Kim Đính...',
    category: 'Giám sát HĐND',
    date: '22/02/2025',
    views: 680,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRcTCXd5BRc_0pNyDFnpupGEPHyvq-5_eGIL1jaEg2TBtkSm-bQPzMrFt6kfpd0FntHz0t6skoWrNaagQyaAnW6WX6zDFdBHAEALcvC6DuvEsudTR-LRLrpIZVsCWgefUdQ8yKz9zitozxQDTPPGdf4QZ9U7-FzhanH5XdL3tKi14TXdxYXFIkAacufTw_V0mU9C5FvV3LSMlK7-sD05sC-D_K9sjcuGiNbw0s5WP_UjkDv2fE0TR7HQ',
  },
  {
    id: 'party-3',
    title: 'Chủ tịch UBND xã duy trì lịch tiếp công dân định kỳ ngày thứ 5 hàng tuần',
    summary: 'Giải quyết dứt điểm 100% các kiến nghị về đất đai, thủ tục hộ tịch trên địa bàn...',
    category: 'Tiếp công dân',
    date: '21/02/2025',
    views: 940,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAedovspBk4ZcRzk8DBnOC5WTGnp8rMx_xbFW-gmM-0jJ3K-_-yBdNdeInhtBpWzvYVZ86Hcu69AlFtDnxQYJ7iogJUJ0YrFqP6xRcWGBKES3CqqU8XVq-PwhMhFxZsWKoFuWb9kTKgqRuIf8wMvAvzQaJVCfiKf9ud2q59rt8nG06Of5Jy-LJAKIoHHXPOWuJiygJHRr8vME7KBWMgazDv4RJISeRFIIFwqiKul_uRFgSsHJ4dNnI95g',
  },
  {
    id: 'party-4',
    title: 'UBND xã kiểm tra công tác phòng trừ sâu bệnh trên trà lúa xuân 2025',
    summary: 'Khuyến cáo bà con chủ động điều tiết nước hợp lý, tuyệt đối không lơ là ốc bươu vàng...',
    category: 'Nông nghiệp',
    date: '20/02/2025',
    views: 730,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCk6-gvxn0op7kq_e0LbsxFwTZUjpyKDkTXh_UHP2Bb3ZzCq4sg9bH1mdGkDbDQAQkbVMkhVTFOGUugor00XAGroqv-lQtmBbiVzgryu-os9YiX-Nn4qB8FhN000V3Sp8uVnlIvNuaziPXdnJ3nwSJhCB0G4d4_MiY0jR_rzgGPl0u8vXxGK9z7bzXncVpN9Leg9OVttDC1wELjrt0FyvWrCZ2S9O42FmMhdSVdHK9IlUEz0iCuoQAXA',
  },
  {
    id: 'party-5',
    title: 'Bộ phận Một cửa xã Can Lộc đạt tỷ lệ 99.2% hồ sơ trả đúng và trước hẹn',
    summary: 'Chỉ số hài lòng của người dân và doanh nghiệp tiếp tục dẫn đầu khối xã thị trấn...',
    category: 'Dịch vụ công',
    date: '19/02/2025',
    views: 1420,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBAvI76A1qwnt2EebebLljE-prROqPLm4QKljkgGE6w51sVNvG56oXCpUNo693DNkaNJhcGQ25bprMB-iY-VKasHyDsvCbrC6js7fZ1bGHZuH2pbrqW5OqS3-eSNXIMWR0T3_hTloujAeMAvpEgph3m819fAZgS1VfSgyy3hczg-lSBrS6OTVmkAZHbSpJYrITbYVrlt9ghcXV8C_J9jfnHdB_YQpDxe82xGsKqmD7t57-TpKLBJZ47XA',
  },
]

export const CitizenNewsPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className="flex flex-col w-full gap-6 pb-12">
      {/* 1. EMERGENCY TICKER BAR */}
      <div className="bg-primary text-white px-4 py-2 rounded-xl shadow-xs flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-medium overflow-hidden">
          <span className="bg-white text-primary font-bold text-[10px] uppercase px-2 py-0.5 rounded shrink-0 animate-pulse">
            Chỉ đạo khẩn
          </span>
          <span className="truncate">
            Công điện số 02/CĐ-UBND: Tăng cường các biện pháp cấp bách phòng cháy, chữa cháy rừng mùa khô năm 2025 tại địa bàn xã Can Lộc
          </span>
        </div>
        <div className="text-[11px] text-red-200 shrink-0 font-mono hidden sm:flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">schedule</span>
          <span>24/02/2025 | 15:30</span>
        </div>
      </div>

      {/* 2. HERO FEATURED NEWS (Classic 3-Column Portal Pattern) */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Col Left: 3 Sub-stories (3 cols) */}
          <div className="lg:col-span-3 space-y-4 divide-y divide-gray-100">
            {leftSubStories.map((story, idx) => (
              <article
                key={story.id}
                onClick={() => setSelectedArticle(story)}
                className={`group cursor-pointer ${idx > 0 ? 'pt-4' : ''}`}
              >
                {story.imageUrl && (
                  <div className="overflow-hidden rounded-lg mb-2 h-28 bg-gray-100">
                    <img
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={story.imageUrl}
                    />
                  </div>
                )}
                <h3 className="text-xs font-bold text-gray-800 group-hover:text-primary leading-snug transition-colors">
                  {story.title}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{story.summary}</p>
                <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">calendar_today</span>
                  <span>{story.date}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Col Center: Lead Hero Story (6 cols) */}
          <div className="lg:col-span-6 lg:border-x lg:border-gray-100 lg:px-4">
            <article
              onClick={() => setSelectedArticle(featuredNews)}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-xl mb-3 h-72 w-full bg-gray-100 relative shadow-xs">
                <img
                  alt={featuredNews.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  src={featuredNews.imageUrl}
                />
                <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded shadow">
                  {featuredNews.badge}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span className="text-primary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">folder</span>
                  {featuredNews.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  {featuredNews.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  {featuredNews.views} lượt xem
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-primary leading-tight mb-2 transition-colors">
                {featuredNews.title}
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-3">
                {featuredNews.summary}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <span className="text-[11px] text-gray-400 italic">{featuredNews.author}</span>
                <span className="text-primary font-semibold hover:underline flex items-center gap-1">
                  Đọc toàn văn <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </article>
          </div>

          {/* Col Right: Quick News Bulletins (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-red-50/60 border border-red-100 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 pb-2 border-b border-red-100 text-primary font-bold text-xs uppercase">
                <span className="material-symbols-outlined text-base">bolt</span>
                <h4>Thông tin chỉ đạo nhanh</h4>
              </div>
              <ul className="divide-y divide-red-100 text-xs mt-1">
                {urgentBulletins.map((item, i) => (
                  <li key={i} className="py-2.5 first:pt-2">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedArticle({
                          id: `urgent-${i}`,
                          title: item.title,
                          summary: item.title,
                          category: 'Chỉ đạo khẩn',
                          date: '22/02/2025',
                          views: 450,
                          imageUrl: '',
                          content: item.title,
                        })
                      }}
                      className="font-semibold text-gray-800 hover:text-primary line-clamp-2 leading-snug transition-colors"
                    >
                      {item.title}
                    </a>
                    <span className="text-[10px] text-primary block mt-1">{item.dept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Side Photo Story */}
            <article
              onClick={() =>
                setSelectedArticle({
                  id: 'side-photo',
                  title: 'Bà con thôn Hồng Triều tự nguyện hiến 1.200m² đất mở rộng trục đường liên thôn',
                  summary: 'Phong trào xây dựng NTM kiểu mẫu tiếp tục lan tỏa sâu rộng trong toàn thể nhân dân xã Can Lộc...',
                  category: 'Đời sống - Dân sinh',
                  date: '20/02/2025',
                  views: 1540,
                  imageUrl:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDDECVe4i3bX3ykfm0vNW79iac_OOfKUYMsSzVCn9SkUJOA1DwK9AU03M1CI61MS01_XRAC1lBxi_Q6ruxqjOt7o6qKLy_Ze3j9wS6bryrhRHYx7Tazoi6QS0LF9yXrdsItA0XwfYhq2Ip5bwh6t8BXEZFMksRdzWW1jubpSXGtyYXOd4oII9gAxViTcwZvYP_42ISavkTh1KNL9Kzq6eQgpks_KmExoOsYzr9ChBLOjhPFh2r8ofw8tw',
                })
              }
              className="group cursor-pointer bg-gray-50 p-3 rounded-xl border border-gray-100"
            >
              <div className="overflow-hidden rounded-lg h-28 bg-gray-200 mb-2">
                <img
                  alt="Hiến đất mở đường"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDECVe4i3bX3ykfm0vNW79iac_OOfKUYMsSzVCn9SkUJOA1DwK9AU03M1CI61MS01_XRAC1lBxi_Q6ruxqjOt7o6qKLy_Ze3j9wS6bryrhRHYx7Tazoi6QS0LF9yXrdsItA0XwfYhq2Ip5bwh6t8BXEZFMksRdzWW1jubpSXGtyYXOd4oII9gAxViTcwZvYP_42ISavkTh1KNL9Kzq6eQgpks_KmExoOsYzr9ChBLOjhPFh2r8ofw8tw"
                />
              </div>
              <h4 className="text-xs font-bold text-gray-800 group-hover:text-primary leading-snug transition-colors">
                Bà con thôn Hồng Triều tự nguyện hiến 1.200m² đất mở rộng trục đường liên thôn
              </h4>
            </article>
          </div>
        </div>
      </section>

      {/* 3. PARTY & GOVERNMENT ACTIVITIES */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100">
        <div className="flex items-center justify-between border-b-2 border-primary pb-2.5 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white p-1 rounded">
              <span className="material-symbols-outlined text-sm">flag</span>
            </span>
            <h2 className="text-sm md:text-base font-bold uppercase tracking-wide text-primary">
              Hoạt động chỉ đạo của Đảng ủy - HĐND - UBND
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs font-medium text-gray-500">
            {['all', 'nghi-quyet', 'hanh-chinh', 'de-an-06'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`hover:text-primary transition-colors ${
                  activeTab === t ? 'text-primary font-bold underline' : ''
                }`}
              >
                {t === 'all'
                  ? 'Tất cả'
                  : t === 'nghi-quyet'
                  ? 'Nghị quyết HĐND'
                  : t === 'hanh-chinh'
                  ? 'Cải cách hành chính'
                  : 'Đề án 06'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Big Story Left (5 cols) */}
          <article
            onClick={() => setSelectedArticle(partyGovArticles[0])}
            className="lg:col-span-5 group cursor-pointer"
          >
            <div className="overflow-hidden rounded-xl mb-2.5 h-52 bg-gray-100 shadow-xs">
              <img
                alt={partyGovArticles[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={partyGovArticles[0].imageUrl}
              />
            </div>
            <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
              {partyGovArticles[0].category}
            </span>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary leading-snug mt-1 mb-1.5 transition-colors">
              {partyGovArticles[0].title}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
              {partyGovArticles[0].summary}
            </p>
            <span className="text-[10px] text-gray-400 block mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">calendar_today</span>
              {partyGovArticles[0].date}
            </span>
          </article>

          {/* 4 Item Sub-grid Right (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {partyGovArticles.slice(1).map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className="group cursor-pointer flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100 shadow-xs">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.imageUrl}
                  />
                </div>
                <div className="min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 group-hover:text-primary leading-snug line-clamp-2 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-1">{item.summary}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">calendar_today</span>
                    {item.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AN NINH TRẬT TỰ - PHÒNG CHỐNG TỘI PHẠM & PCCC */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100" data-purpose="security-order-section">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b-2 border-primary pb-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-primary text-white p-1 rounded">
              <span className="material-symbols-outlined text-xs">shield</span>
            </span>
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-primary">
              An ninh trật tự - Phòng chống tội phạm & PCCC
            </h2>
          </div>
          <span className="text-xs text-gray-500">
            Đường dây nóng Công an Xã: <strong className="text-primary">0239.3841.115</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Featured Big Story Left (Col 1-5) */}
          <article
            onClick={() =>
              setSelectedArticle({
                id: 'sec-1',
                title: 'Công an xã Can Lộc kịp thời ngăn chặn vụ việc lừa đảo công nghệ cao, bảo vệ hơn 120 triệu đồng cho người dân',
                summary:
                  'Khoảng 14h ngày 22/02, nhận được tin báo của nhân viên Bưu cục về việc cụ bà N.T.T (74 tuổi, thôn Phúc Hậu) yêu cầu rút gấp sổ tiết kiệm để chuyển vào tài khoản lạ do đối tượng xưng là cán bộ Viện Kiểm sát dọa dẫm, Công an xã đã nhanh chóng có mặt giải thích và ngăn chặn kịp thời.',
                category: 'GƯƠNG CHIẾN CÔNG CÔNG AN',
                date: '22/02/2025',
                views: 2150,
                imageUrl:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAUOeRO7wf00w5IC-tzRTS0mhF71ApFcTAV7OMr1W-vD45E-YVmY835Fz41i_iZS_Ne1oasc48keYnwPgXN_ZY7K9YiYPbmukW9-ffx-KE_VwSfb32bni1raQYZEdLk6dUOjZfqRIcq_oqjLGp5LVrjie64G3S7pu9CnPXbJHvc0lWWLX_U9niU4ssPyNMUPCl2kmvMofXG4TJStbMwMi62VWq8R0hLkTXGKQjF81q5iUlRnrrPliBTDA',
              })
            }
            className="lg:col-span-5 group cursor-pointer"
          >
            <div className="overflow-hidden rounded-lg mb-2.5 h-60 bg-gray-100 relative shadow-xs">
              <img
                alt="Công an xã ngăn chặn lừa đảo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUOeRO7wf00w5IC-tzRTS0mhF71ApFcTAV7OMr1W-vD45E-YVmY835Fz41i_iZS_Ne1oasc48keYnwPgXN_ZY7K9YiYPbmukW9-ffx-KE_VwSfb32bni1raQYZEdLk6dUOjZfqRIcq_oqjLGp5LVrjie64G3S7pu9CnPXbJHvc0lWWLX_U9niU4ssPyNMUPCl2kmvMofXG4TJStbMwMi62VWq8R0hLkTXGKQjF81q5iUlRnrrPliBTDA"
              />
              <span className="absolute bottom-2 left-2 bg-primary/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                GƯƠNG CHIẾN CÔNG CÔNG AN
              </span>
            </div>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary leading-snug mb-1 transition-colors">
              Công an xã Can Lộc kịp thời ngăn chặn vụ việc lừa đảo công nghệ cao, bảo vệ hơn 120 triệu đồng cho người dân
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
              Khoảng 14h ngày 22/02, nhận được tin báo của nhân viên Bưu cục về việc cụ bà N.T.T (74 tuổi, thôn Phúc Hậu) yêu cầu rút gấp sổ tiết kiệm để chuyển vào tài khoản lạ do đối tượng xưng là cán bộ Viện Kiểm sát dọa dẫm, Công an xã đã nhanh chóng có mặt giải thích...
            </p>
            <span className="text-[10px] text-gray-400 block mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">schedule</span>22/02/2025
            </span>
          </article>

          {/* 3 Sub-stories Right (Col 6-12) */}
          <div className="lg:col-span-7 space-y-3">
            <article
              onClick={() =>
                setSelectedArticle({
                  id: 'sec-2',
                  title: 'Tập huấn nghiệp vụ PCCC và CNCH cho 6 đội xung kích cơ sở các thôn Phúc Hậu, Trâm Lạc',
                  summary: 'Trang bị kỹ năng dập lửa ban đầu, phương án 4 tại chỗ trong mùa khô hanh...',
                  category: 'Phòng cháy chữa cháy 2025',
                  date: '21/02/2025',
                  views: 890,
                  imageUrl:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAEbnBXabnmtNEA7BIg6bV38hWzozvcyJHDwmrCEvJD1H8-tttbjdhpuxrTnIV0_jaB4F0nKGOXvmkq8qlgKoV7ie1ADBBuuB_1fib2i26VUmFROum1SIWPrFDmeK_utzcQtjxPCzYzEpwrhh2_g1lVsuFXQos5hIwKxl9JvYvqh3l8AsqeGfP95DKqUXpL-17GFqC-J7dnnJq67sBtUdRyNhkgYt1CCE3IxjXCbfGdDN5kYWeGvoMeCQ',
                })
              }
              className="p-2.5 rounded-lg border border-gray-100 hover:border-red-200 hover:bg-red-50/20 transition-all flex gap-3 group cursor-pointer"
            >
              <div className="w-32 h-20 rounded overflow-hidden shrink-0 bg-gray-100">
                <img
                  alt="Tập huấn PCCC"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEbnBXabnmtNEA7BIg6bV38hWzozvcyJHDwmrCEvJD1H8-tttbjdhpuxrTnIV0_jaB4F0nKGOXvmkq8qlgKoV7ie1ADBBuuB_1fib2i26VUmFROum1SIWPrFDmeK_utzcQtjxPCzYzEpwrhh2_g1lVsuFXQos5hIwKxl9JvYvqh3l8AsqeGfP95DKqUXpL-17GFqC-J7dnnJq67sBtUdRyNhkgYt1CCE3IxjXCbfGdDN5kYWeGvoMeCQ"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-amber-700 uppercase">Phòng cháy chữa cháy 2025</span>
                <h4 className="text-xs font-bold text-gray-800 group-hover:text-primary leading-snug line-clamp-2 mt-0.5">
                  Tập huấn nghiệp vụ PCCC và CNCH cho 6 đội xung kích cơ sở các thôn Phúc Hậu, Trâm Lạc
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                  Trang bị kỹ năng dập lửa ban đầu, phương án 4 tại chỗ trong mùa khô hanh...
                </p>
              </div>
            </article>

            <article
              onClick={() =>
                setSelectedArticle({
                  id: 'sec-3',
                  title: 'Lực lượng Công an và Quân sự xã phối hợp tuần tra khép kín địa bàn ban đêm',
                  summary: 'Xử lý nghiêm các đối tượng thanh thiếu niên vi phạm tốc độ và trật tự an toàn giao thông...',
                  category: 'Tuần tra vũ trang',
                  date: '20/02/2025',
                  views: 1120,
                  imageUrl:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuAxtN9EXixTppXe3vVZ_x6LNoe1bL5FqYq3DUag9sN_H7y2rrHJtJ4nvnxNJaexlcFhL--J8oPGPoa2Z7OE3zvPWvsswrURteDlgantRMGN1Opz7d8mGzMpobqDE2KP-OPaYvn0YjrjzmFPJH_Yl7H1P5hOlJ1vEY3Na8lzCKCgKVRo_7mGme3nHbeCLq18iE7QthPoF9_5X3Hc-SJhhGMjGPtRXqp2Ihl1mMgDuJBJa4TQdcdEpxkDNg',
                })
              }
              className="p-2.5 rounded-lg border border-gray-100 hover:border-red-200 hover:bg-red-50/20 transition-all flex gap-3 group cursor-pointer"
            >
              <div className="w-32 h-20 rounded overflow-hidden shrink-0 bg-gray-100">
                <img
                  alt="Tuần tra đêm"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxtN9EXixTppXe3vVZ_x6LNoe1bL5FqYq3DUag9sN_H7y2rrHJtJ4nvnxNJaexlcFhL--J8oPGPoa2Z7OE3zvPWvsswrURteDlgantRMGN1Opz7d8mGzMpobqDE2KP-OPaYvn0YjrjzmFPJH_Yl7H1P5hOlJ1vEY3Na8lzCKCgKVRo_7mGme3nHbeCLq18iE7QthPoF9_5X3Hc-SJhhGMjGPtRXqp2Ihl1mMgDuJBJa4TQdcdEpxkDNg"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Tuần tra vũ trang</span>
                <h4 className="text-xs font-bold text-gray-800 group-hover:text-primary leading-snug line-clamp-2 mt-0.5">
                  Lực lượng Công an và Quân sự xã phối hợp tuần tra khép kín địa bàn ban đêm
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                  Xử lý nghiêm các đối tượng thanh thiếu niên vi phạm tốc độ và trật tự an toàn giao thông...
                </p>
              </div>
            </article>

            <article
              onClick={() =>
                setSelectedArticle({
                  id: 'sec-4',
                  title: 'Cảnh báo thủ đoạn giả danh công an gọi điện yêu cầu kích hoạt định danh mức 2',
                  summary: 'Không cung cấp mã OTP, thông tin tài khoản ngân hàng và không cài file .APK lạ...',
                  category: 'Cảnh giác tội phạm',
                  date: '19/02/2025',
                  views: 1840,
                  imageUrl:
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuD5X50sFd8qNUPrzxX4jWR6DFZVRe1ZBzFkC5EYjUmFFjzoR-bBLbdbmb2cCfDpgDrbtNccbR2wwCT2NFxtjcKdp0b6-uMCFqjQrrhJTYNSZZihbv22AyG4XViRVJ91X7bpKrimROquo5vxsDJMxK2KPlXPbcnqYUIpIuA4koRu3X7w0tPJIny3XWDxiVSd0A8csPGVbf1S1Ed2RU4TChzMjEaOi-Mkj1ra9kzhZ8ugmjnLzTTpeit0VQ',
                })
              }
              className="p-2.5 rounded-lg border border-gray-100 hover:border-red-200 hover:bg-red-50/20 transition-all flex gap-3 group cursor-pointer"
            >
              <div className="w-32 h-20 rounded overflow-hidden shrink-0 bg-gray-100">
                <img
                  alt="Cảnh báo tội phạm"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5X50sFd8qNUPrzxX4jWR6DFZVRe1ZBzFkC5EYjUmFFjzoR-bBLbdbmb2cCfDpgDrbtNccbR2wwCT2NFxtjcKdp0b6-uMCFqjQrrhJTYNSZZihbv22AyG4XViRVJ91X7bpKrimROquo5vxsDJMxK2KPlXPbcnqYUIpIuA4koRu3X7w0tPJIny3XWDxiVSd0A8csPGVbf1S1Ed2RU4TChzMjEaOi-Mkj1ra9kzhZ8ugmjnLzTTpeit0VQ"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Cảnh giác tội phạm</span>
                <h4 className="text-xs font-bold text-gray-800 group-hover:text-primary leading-snug line-clamp-2 mt-0.5">
                  Cảnh báo thủ đoạn giả danh công an gọi điện yêu cầu kích hoạt định danh mức 2
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                  Không cung cấp mã OTP, thông tin tài khoản ngân hàng và không cài file .APK lạ...
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5. POLITICAL PROPAGANDA BANNER */}
      <section className="rounded-2xl overflow-hidden shadow-xs border border-red-300" data-purpose="political-propaganda-banner">
        <div className="bg-gradient-to-r from-[#880e0e] via-primary to-[#880e0e] text-white p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-[#ffd54f]/20 border border-[#ffd54f] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#ffd54f] text-2xl">award_star</span>
            </div>
            <div>
              <p className="text-[#ffd54f] uppercase text-xs font-bold tracking-widest mb-0.5">
                Phong trào thi đua yêu nước
              </p>
              <h3 className="text-sm md:text-base font-extrabold uppercase text-white leading-tight">
                Thi đua lập thành tích xuất sắc chào mừng xã Can Lộc đạt chuẩn nông thôn mới kiểu mẫu - chuyển đổi số toàn diện
              </h3>
            </div>
          </div>
          <button
            onClick={() => alert('Chức năng tiếp nhận đăng ký phong trào thi đua năm 2025 đang được kết nối với Cổng DVC.')}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-[#ffd54f] hover:bg-yellow-400 text-[#700909] font-extrabold text-xs rounded-lg shadow uppercase tracking-wide transition-colors"
          >
            <span>Đăng ký thi đua</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* 6. GOOD PEOPLE & LOCAL MOVEMENT (6 THÔN) */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100" data-purpose="good-deeds-section">
        <div className="flex items-center justify-between border-b-2 border-primary pb-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-primary text-white p-1 rounded">
              <span className="material-symbols-outlined text-xs">favorite</span>
            </span>
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-primary">
              Người tốt việc tốt & Phong trào cơ sở 6 thôn
            </h2>
          </div>
          <span className="text-xs text-gray-500 hover:text-primary cursor-pointer flex items-center gap-1">
            Xem tất cả 48 bài viết <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Good Deed 1 */}
          <article
            onClick={() =>
              setSelectedArticle({
                id: 'deed-1',
                title: 'Gia đình ông Phan Văn Đức tự nguyện đập bỏ tường rào kiên cố, hiến 150m² đất mở rộng ngõ xóm',
                summary: 'Nghĩa cử cao đẹp tạo điều kiện thuận lợi cho việc đổ bê tông tuyến đường trục thôn Hồng Triều rộng 5.5m...',
                category: 'Người tốt việc tốt',
                date: '21/02/2025',
                views: 1280,
                imageUrl:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBmcW17fCVQzxuoXH3dBJtP97JS1ncCgEO0fLMjVvc7DTyQZl63uawYVh9twJATgmFNFmsjv94j3VyC3ZwegEad4rh_Mk1VIW2F-2avScVJpO0pt6zvKjGVZ7s153CqBHlMvaALk3jlsEl7hFAUiIn_XpfEj8UDTvDfOSOrv0FxVpxrvF7N6jDzGjw3lQL4lYAsyJmqWRhEB1hVjmfPev6bAoEUweUBtFIbLP4VtBEAKBox1jQM-09VWA',
              })
            }
            className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="h-40 overflow-hidden bg-gray-100">
              <img
                alt="Hiến đất làm đường"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmcW17fCVQzxuoXH3dBJtP97JS1ncCgEO0fLMjVvc7DTyQZl63uawYVh9twJATgmFNFmsjv94j3VyC3ZwegEad4rh_Mk1VIW2F-2avScVJpO0pt6zvKjGVZ7s153CqBHlMvaALk3jlsEl7hFAUiIn_XpfEj8UDTvDfOSOrv0FxVpxrvF7N6jDzGjw3lQL4lYAsyJmqWRhEB1hVjmfPev6bAoEUweUBtFIbLP4VtBEAKBox1jQM-09VWA"
              />
            </div>
            <div className="p-3.5">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Thôn Hồng Triều
              </span>
              <h3 className="text-xs font-bold text-gray-800 group-hover:text-primary mt-2 leading-snug">
                Gia đình ông Phan Văn Đức tự nguyện đập bỏ tường rào kiên cố, hiến 150m² đất mở rộng ngõ xóm
              </h3>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                Nghĩa cử cao đẹp tạo điều kiện thuận lợi cho việc đổ bê tông tuyến đường trục thôn...
              </p>
              <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span>Thôn Hồng Triều
                </span>
                <span>21/02/2025</span>
              </div>
            </div>
          </article>

          {/* Good Deed 2 */}
          <article
            onClick={() =>
              setSelectedArticle({
                id: 'deed-2',
                title: 'Chị Lê Thị Mai nhặt được ví tiền có 15 triệu đồng cùng giấy tờ đã nhờ Công an xã trả lại người đánh rơi',
                summary: 'Hành động trung thực, lan tỏa tinh thần người tốt việc tốt trong phong trào toàn dân...',
                category: 'Người tốt việc tốt',
                date: '20/02/2025',
                views: 1420,
                imageUrl:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDK9VBmfnJ8Vp6TKo223hXNnMfhOX6P-i1Ef_Di2LgukagVrJcGjjZfjsvEGSvLWaOlG5ZL9IJhLymINGLU_sBc2G_te7IdbWiKI21clPuEe3ICpsoBRRr5BqSSoei5lIpTYPH03qJblAIJKZrMlRFPY1DQWZq3IhAiOhR6CeFCJ2Rggxx39kmtoIr8_9xhOMhMqMD1C7UCm9SSvPVWDObfVRcCyYf8TZccDROmIGArh8QDc-a8tqJZnQ',
              })
            }
            className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="h-40 overflow-hidden bg-gray-100">
              <img
                alt="Trả lại tài sản"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK9VBmfnJ8Vp6TKo223hXNnMfhOX6P-i1Ef_Di2LgukagVrJcGjjZfjsvEGSvLWaOlG5ZL9IJhLymINGLU_sBc2G_te7IdbWiKI21clPuEe3ICpsoBRRr5BqSSoei5lIpTYPH03qJblAIJKZrMlRFPY1DQWZq3IhAiOhR6CeFCJ2Rggxx39kmtoIr8_9xhOMhMqMD1C7UCm9SSvPVWDObfVRcCyYf8TZccDROmIGArh8QDc-a8tqJZnQ"
              />
            </div>
            <div className="p-3.5">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                Thôn Sơn Hà
              </span>
              <h3 className="text-xs font-bold text-gray-800 group-hover:text-primary mt-2 leading-snug">
                Chị Lê Thị Mai nhặt được ví tiền có 15 triệu đồng cùng giấy tờ đã nhờ Công an xã trả lại người đánh rơi
              </h3>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                Hành động trung thực, lan tỏa tinh thần người tốt việc tốt trong phong trào toàn dân...
              </p>
              <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span>Thôn Sơn Hà
                </span>
                <span>20/02/2025</span>
              </div>
            </div>
          </article>

          {/* Good Deed 3 */}
          <article
            onClick={() =>
              setSelectedArticle({
                id: 'deed-3',
                title: 'Chi hội Phụ nữ thôn Kim Đính gây quỹ trao tặng 5 con bò giống cho hộ nghèo vươn lên thoát nghèo',
                summary: 'Mô hình biến rác thải tái chế thành sinh kế đã hỗ trợ thiết thực cho 12 hội viên...',
                category: 'Người tốt việc tốt',
                date: '18/02/2025',
                views: 970,
                imageUrl:
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAOGyEuKUcqQrm7hmt7aUIC9XR4LilFxQuVlLMV4xrkLvCMx5o28VN1awlsalt9WK6uJTOZtq63RYPxotk8JcKnWqzlN2ZJqwOuubUvp4fhtY7GW1SpgW-tyLe1APlUR11YGt0t1om4HWMrM_9pvCmHgqgVkKalkTIMX_9b0s9fr93wyt3rN5hCBn0x_9vO5dowojNfkOAYWXx5g8LEkuTIqJoCDR8N63Ra3436mbSFub5iAn5VpvV_jQ',
              })
            }
            className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="h-40 overflow-hidden bg-gray-100">
              <img
                alt="Hội phụ nữ hỗ trợ"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOGyEuKUcqQrm7hmt7aUIC9XR4LilFxQuVlLMV4xrkLvCMx5o28VN1awlsalt9WK6uJTOZtq63RYPxotk8JcKnWqzlN2ZJqwOuubUvp4fhtY7GW1SpgW-tyLe1APlUR11YGt0t1om4HWMrM_9pvCmHgqgVkKalkTIMX_9b0s9fr93wyt3rN5hCBn0x_9vO5dowojNfkOAYWXx5g8LEkuTIqJoCDR8N63Ra3436mbSFub5iAn5VpvV_jQ"
              />
            </div>
            <div className="p-3.5">
              <span className="text-[10px] font-bold text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded">
                Thôn Kim Đính
              </span>
              <h3 className="text-xs font-bold text-gray-800 group-hover:text-primary mt-2 leading-snug">
                Chi hội Phụ nữ thôn Kim Đính gây quỹ trao tặng 5 con bò giống cho hộ nghèo vươn lên thoát nghèo
              </h3>
              <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                Mô hình biến rác thải tái chế thành sinh kế đã hỗ trợ thiết thực cho 12 hội viên...
              </p>
              <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">location_on</span>Thôn Kim Đính
                </span>
                <span>18/02/2025</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 7. MULTIMEDIA & BROADCASTING SECTION */}
      <section className="bg-[#111827] text-white rounded-2xl p-5 shadow-lg" data-purpose="multimedia-broadcasting">
        <div className="flex items-center justify-between border-b border-gray-700 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-primary text-white p-1 rounded">
              <span className="material-symbols-outlined text-xs">movie</span>
            </span>
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-white">
              Multimedia - Truyền hình cơ sở & Truyền thanh số 4.0
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Phát thanh 6 cụm thôn trực tiếp
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Main Video Feature Left (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video group cursor-pointer border border-gray-700 shadow-md">
              <img
                alt="Phim phóng sự xã Can Lộc"
                className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6B0uT7qMry6UKcoj5_0AH_fqXYTfaETf8V6vLWWZngqzAj_8tMweAkAaJr7oEL4Ev9zwvBFaL_CGh1TsyMNcJ33RFE3JhI-iUsFuWCRwJMhSfoZOgD5vmhvqtg1ghcf10w86rTThHwNnTZHlKgR1XjDpsAabIAPYTz3M4LPBF1iHsw-hhmdJj3aVdGKZU39Reu2kXpOcWQCc0AAcMefPEs-BYQpYkH4-oGOuvrH9uAyZuce2teCb9GQ"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <span className="material-symbols-outlined text-2xl ml-0.5">play_arrow</span>
                </div>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Phóng sự đặc biệt
                </span>
                <h3 className="text-sm font-bold text-white mt-1">
                  Hành trình xã Can Lộc về đích nông thôn mới nâng cao và chuyển đổi số năm 2025
                </h3>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  Thời lượng: 14:28 • Thực hiện: Ban Biên tập Truyền hình cơ sở xã Can Lộc
                </p>
              </div>
            </div>
          </div>

          {/* Live Radio Player and Gallery Right (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Smart Digital Radio 4.0 Player Widget */}
            <div className="bg-[#1f2937] p-3.5 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffd54f] text-base">radio</span>
                  <span className="text-xs font-bold text-white uppercase">Truyền thanh thông minh 4.0</span>
                </div>
                <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded font-mono">
                  LIVE 17:00
                </span>
              </div>
              <p className="text-xs text-gray-300 font-medium mb-2 truncate">
                Bản tin thông báo thời vụ xuân và tuyên truyền Luật Đất đai mới
              </p>
              {/* Audio Player Mock Controls */}
              <div className="flex items-center gap-3 bg-gray-900/80 p-2.5 rounded-lg border border-gray-700">
                <button
                  onClick={() => alert('Đang phát kênh phát thanh số xã Can Lộc')}
                  className="w-8 h-8 rounded-full bg-primary hover:bg-primary-container text-white flex items-center justify-center shrink-0 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">pause</span>
                </button>
                <div className="flex-1">
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#ffd54f] h-full w-2/5"></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-gray-400 mt-1 font-mono">
                    <span>06:15</span>
                    <span>15:00</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400 text-base">volume_up</span>
              </div>
              {/* Cluster Status */}
              <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-center text-[9px]">
                <span className="bg-emerald-900/60 border border-emerald-600 text-emerald-300 py-1 rounded">
                  Thôn Phúc Hậu: Tốt
                </span>
                <span className="bg-emerald-900/60 border border-emerald-600 text-emerald-300 py-1 rounded">
                  Thôn Trâm Lạc: Tốt
                </span>
                <span className="bg-emerald-900/60 border border-emerald-600 text-emerald-300 py-1 rounded">
                  Thôn Thượng Xá: Tốt
                </span>
                <span className="bg-emerald-900/60 border border-emerald-600 text-emerald-300 py-1 rounded">
                  Thôn Đông Vĩnh: Tốt
                </span>
                <span className="bg-emerald-900/60 border border-emerald-600 text-emerald-300 py-1 rounded">
                  Thôn Minh Hải: Tốt
                </span>
                <span className="bg-emerald-900/60 border border-emerald-600 text-emerald-300 py-1 rounded">
                  Thôn Kim Đính: Tốt
                </span>
              </div>
            </div>

            {/* Photo Gallery Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 border border-gray-700 hover:opacity-80 cursor-pointer">
                <img
                  alt="Album ảnh hoạt động 1"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwmvnWX5BUA-_D-Tn5979dmQqxpaverckdETlXl7Jh6OhZtJ8kTHHiOExxFJeSk7QWu2Jra90cKeANTejsTaRXUft8ftq8eso1XL2u-VcohvKNqMpwj3XkTIvTjgRlRUtTKsn4RWDjzOKhYU0qoOWaIgjfbkvIphKETGxgx4tk_d_Yozv2s3ZVluOccIGu4q2SI6RX1wgQorg_a6dGMQ2oQKcjd5TumRtsP2trI7ziO3mqNwDRKtJWKg"
                />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 border border-gray-700 hover:opacity-80 cursor-pointer">
                <img
                  alt="Album ảnh hoạt động 2"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_KmTH3qp2ilNeqo23Wb1ttuBWir3huy2K7X_UBFiwifxjfjqpH5l8fJQ5XgzmSPICbZVVi_aYM4x20qFGqIFNKWfiTMoafrZmvXL_fmLHNmOqlVJ-enDIapdiaGCrAIgM20eHCFSAhUrW2rcFB0x4veDW9a1y0CrXmgKdnjSAcolHYwk3-d0GBJLDWWGFP6JkoU2U2IbKWjANjx73tod_kdV6qTnbX_ECPL1AdIxSuUxHTc70M06yuQ"
                />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 border border-gray-700 hover:opacity-80 cursor-pointer relative">
                <img
                  alt="Album ảnh hoạt động 3"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc_Nm7qpjZ5Uwk6TCarSXbKNVzho7B3tPp4JSgEGnU9mzD30TyPswqdsnYAIw9IUPLcql6hBF17uPDME5n4izc2AmMl_iFWYMqO6sEonxUd5Fj32G28gGfD4gH6wTFFxbPShW3alRH2_HseyWDsu_UjaBo0jLiFpzOovwtRjKr4RIf-t72QrwJyGDzMkIzfP8QFGQxj7z5fqFTCcPy7TblCkZAVytzJJ1eULq8MkCBVjhWLKfqQf7jlg"
                />
                <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-[11px] font-bold text-[#ffd54f]">
                  +24 ảnh
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DIRECTIVE LEGAL DOCUMENTS (4 COLUMNS BY DOMAIN) */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100" data-purpose="legal-directives-section">
        <div className="flex items-center justify-between border-b-2 border-primary pb-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-primary text-white p-1 rounded">
              <span className="material-symbols-outlined text-xs">balance</span>
            </span>
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-primary">
              Văn bản chỉ đạo mới ban hành & Hướng dẫn chính sách
            </h2>
          </div>
          <a className="text-xs text-primary font-semibold hover:underline flex items-center gap-1" href="/citizen/documents">
            Xem toàn bộ kho văn bản <span className="material-symbols-outlined text-xs">chevron_right</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1: Tư pháp - Hộ tịch */}
          <div className="border border-gray-200 rounded-xl p-3 bg-gray-50/40">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200 text-blue-800 font-bold text-xs uppercase">
              <span className="material-symbols-outlined text-sm">book</span>
              <span>Tư pháp - Hộ tịch</span>
            </div>
            <ul className="divide-y divide-gray-200 text-xs mt-2">
              <li className="py-2 first:pt-0">
                <a className="font-medium text-gray-800 hover:text-primary line-clamp-2 leading-snug" href="/citizen/documents">
                  Kế hoạch số 12/KH-UBND: Triển khai đăng ký khai sinh, thường trú liên thông đợt 1
                </a>
                <span className="text-[10px] text-gray-400 block mt-1">Số 12/KH-UBND • 22/02</span>
              </li>
              <li className="py-2">
                <a className="font-medium text-gray-800 hover:text-primary line-clamp-2 leading-snug" href="/citizen/documents">
                  Hướng dẫn số hóa dữ liệu hộ tịch lịch sử theo Đề án 06
                </a>
                <span className="text-[10px] text-gray-400 block mt-1">HD-TP • 20/02</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Đất đai - Địa chính */}
          <div className="border border-gray-200 rounded-xl p-3 bg-gray-50/40">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200 text-emerald-800 font-bold text-xs uppercase">
              <span className="material-symbols-outlined text-sm">map</span>
              <span>Địa chính - Đất đai</span>
            </div>
            <ul className="divide-y divide-gray-200 text-xs mt-2">
              <li className="py-2 first:pt-0">
                <a className="font-medium text-gray-800 hover:text-primary line-clamp-2 leading-snug" href="/citizen/documents">
                  Thông báo công khai danh sách cấp đổi Giấy chứng nhận QSD đất tại thôn Kim Đính
                </a>
                <span className="text-[10px] text-gray-400 block mt-1">TB số 09/TB-UBND • 21/02</span>
              </li>
              <li className="py-2">
                <a className="font-medium text-gray-800 hover:text-primary line-clamp-2 leading-snug" href="/citizen/documents">
                  Kế hoạch kiểm tra việc sử dụng đất nông nghiệp vượt hạn mức năm 2025
                </a>
                <span className="text-[10px] text-gray-400 block mt-1">KH số 05/KH-UBND • 18/02</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Lao động - Thương binh - Xã hội */}
          <div className="border border-gray-200 rounded-xl p-3 bg-gray-50/40">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200 text-amber-800 font-bold text-xs uppercase">
              <span className="material-symbols-outlined text-sm">diversity_3</span>
              <span>Lao động - Xã hội</span>
            </div>
            <ul className="divide-y divide-gray-200 text-xs mt-2">
              <li className="py-2 first:pt-0">
                <a className="font-medium text-gray-800 hover:text-primary line-clamp-2 leading-snug" href="/citizen/documents">
                  Quyết định chi trả trợ cấp người có công và bảo trợ xã hội qua tài khoản ngân hàng
                </a>
                <span className="text-[10px] text-gray-400 block mt-1">QĐ số 35/QĐ-UBND • 19/02</span>
              </li>
              <li className="py-2">
                <a className="font-medium text-gray-800 hover:text-primary line-clamp-2 leading-snug" href="/citizen/documents">
                  Thông báo rà soát hộ nghèo, cận nghèo phát sinh quý I năm 2025
                </a>
                <span className="text-[10px] text-gray-400 block mt-1">TB số 07/TB-LĐTBXH • 17/02</span>
              </li>
            </ul>
          </div>

          {/* Column 4: An ninh quốc phòng */}
          <div className="border border-gray-200 rounded-xl p-3 bg-gray-50/40">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200 text-primary font-bold text-xs uppercase">
              <span className="material-symbols-outlined text-sm">security</span>
              <span>Quân sự - An ninh</span>
            </div>
            <ul className="divide-y divide-gray-200 text-xs mt-2">
              <li className="py-2 first:pt-0">
                <a className="font-medium text-gray-800 hover:text-primary line-clamp-2 leading-snug" href="/citizen/documents">
                  Lệnh gọi công dân nhập ngũ và tham gia nghĩa vụ Công an nhân dân năm 2025
                </a>
                <span className="text-[10px] text-gray-400 block mt-1">BCH QS Xã • 16/02</span>
              </li>
              <li className="py-2">
                <a className="font-medium text-gray-800 hover:text-primary line-clamp-2 leading-snug" href="/citizen/documents">
                  Kế hoạch bảo vệ các mục tiêu trọng điểm và sự kiện chính trị đầu năm
                </a>
                <span className="text-[10px] text-gray-400 block mt-1">CA Xã • 15/02</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9. STANDARD NEWS PAGINATION BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-gray-200 text-xs text-gray-600 shadow-xs">
        <div>
          Đang xem trang <strong className="text-primary">1</strong> trong tổng số <strong>8</strong> trang (Hiển thị 12 tin mới nhất)
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40" disabled>
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="w-8 h-8 rounded bg-primary text-white font-bold">1</button>
          <button className="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50">2</button>
          <button className="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50">3</button>
          <span className="px-1 text-gray-400">...</span>
          <button className="w-8 h-8 rounded border border-gray-200 hover:bg-gray-50">8</button>
          <button className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>

      {/* MODAL: CHI TIẾT BÀI VIẾT */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="material-symbols-outlined text-secondary-fixed">newspaper</span>
                <span className="font-semibold uppercase tracking-wider text-secondary-fixed">
                  {selectedArticle.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-gray-700">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-gray-400 text-[11px] pb-3 border-b border-gray-100">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">calendar_month</span>
                  {selectedArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">visibility</span>
                  {selectedArticle.views} lượt xem
                </span>
                <span className="ml-auto italic text-gray-500">
                  {selectedArticle.author || 'UBND Xã Can Lộc'}
                </span>
              </div>

              {selectedArticle.imageUrl && (
                <div className="rounded-xl overflow-hidden max-h-72 bg-gray-100">
                  <img
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    src={selectedArticle.imageUrl}
                  />
                </div>
              )}

              <p className="font-semibold text-gray-800 text-sm leading-normal">
                {selectedArticle.summary}
              </p>

              <div className="space-y-3 whitespace-pre-line text-gray-600 leading-relaxed">
                {selectedArticle.content ||
                  'Nội dung chi tiết đang được cập nhật từ Ban Biên tập Cổng Thông tin Điện tử Xã Can Lộc... Quý công dân và bạn đọc vui lòng theo dõi các bản tin tiếp theo trên Cổng thông tin.'}
              </div>

              {/* Share & actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-gray-400 text-[11px]">Nguồn: Trang Thông tin điện tử Xã Can Lộc</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                >
                  Đóng bài viết
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CitizenNewsPage
