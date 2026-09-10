import React, { useState } from 'react'

interface DocumentItem {
  id: string
  code: string
  type: 'Quyết định' | 'Nghị quyết' | 'Kế hoạch' | 'Thông báo' | 'Chỉ thị' | 'Hướng dẫn'
  issuer: 'UBND Xã Can Lộc' | 'HĐND Xã Can Lộc' | 'BCĐ Chuyển đổi số'
  year: string
  date: string
  title: string
  summary: string
  status: 'Hiệu lực thi hành' | 'Hết hiệu lực'
  pdfFile: string
  pdfSize: string
  docFile?: string
  views: number
  aiSummary: string
}

const documentData: DocumentItem[] = [
  {
    id: 'doc-1',
    code: '42/QĐ-UBND',
    type: 'Quyết định',
    issuer: 'UBND Xã Can Lộc',
    year: '2025',
    date: '22/02/2025',
    title: 'Quyết định ban hành Quy chế tiếp công dân và quy trình tiếp nhận, xử lý đơn thư, phản ánh hiện trường trực tuyến của UBND Xã Can Lộc năm 2025',
    summary:
      'Quy định rõ trách nhiệm người đứng đầu, lịch tiếp dân định kỳ thứ 5 hàng tuần của Chủ tịch UBND xã; số hóa việc giải quyết ý kiến cử tri qua cổng dịch vụ công trực tuyến và hệ thống tiếp nhận phản ánh hiện trường cấp xã.',
    status: 'Hiệu lực thi hành',
    pdfFile: '42-QD-UBND.pdf',
    pdfSize: '1.4 MB',
    docFile: 'BanHanh_QuyChe.docx',
    views: 1280,
    aiSummary:
      'Văn bản quy định trách nhiệm Chủ tịch UBND xã trực tiếp tiếp dân vào thứ 5 hàng tuần; thời hạn xử lý phản ánh hiện trường trực tuyến tối đa 48h làm việc; 100% kết quả xử lý phải được công khai trên Cổng thông tin và gửi thông báo qua VNeID cho công dân.',
  },
  {
    id: 'doc-2',
    code: '18/NQ-HĐND',
    type: 'Nghị quyết',
    issuer: 'HĐND Xã Can Lộc',
    year: '2025',
    date: '15/01/2025',
    title: 'Nghị quyết về nhiệm vụ phát triển kinh tế - xã hội, quốc phòng - an ninh năm 2025 xã Can Lộc',
    summary:
      'Quyết nghị mục tiêu thu ngân sách xã đạt 12.5 tỷ đồng; phấn đấu 6/6 thôn giữ vững chuẩn Nông thôn mới kiểu mẫu; tỷ lệ người dân tham gia BHYT đạt trên 96%; tỷ lệ xử lý hồ sơ DVC trực tuyến đạt trên 90%.',
    status: 'Hiệu lực thi hành',
    pdfFile: '18-NQ-HDND.pdf',
    pdfSize: '2.8 MB',
    views: 2450,
    aiSummary:
      'HĐND xã thông qua 18 chỉ tiêu chủ yếu năm 2025: Tăng trưởng giá trị sản xuất 9.5%, thu nhập bình quân đầu người 58 triệu đồng/năm, hoàn thành 100% công tác tuyển quân, xây dựng 2 tuyến đường mẫu văn minh.',
  },
  {
    id: 'doc-3',
    code: '08/KH-UBND',
    type: 'Kế hoạch',
    issuer: 'UBND Xã Can Lộc',
    year: '2025',
    date: '10/02/2025',
    title: 'Kế hoạch triển khai đợt cao điểm tuyên truyền, hỗ trợ kích hoạt tài khoản định danh điện tử VNeID mức 2 cho nhân dân',
    summary:
      'Huy động lực lượng Công an xã, đoàn thanh niên, hội đồng Đội và Tổ công nghệ số cộng đồng trực tiếp đến tận nhà hỗ trợ người cao tuổi, người khuyết tật hoàn thiện tài khoản VNeID và tích hợp giấy tờ.',
    status: 'Hiệu lực thi hành',
    pdfFile: '08-KH-UBND.pdf',
    pdfSize: '950 KB',
    views: 870,
    aiSummary:
      'Kế hoạch chia làm 3 giai đoạn từ 10/02 đến 30/04/2025; mục tiêu đạt 98% công dân đủ điều kiện được kích hoạt tài khoản VNeID mức 2; thành lập 6 tổ lưu động làm việc cả vào buổi tối và thứ Bảy, Chủ nhật.',
  },
  {
    id: 'doc-4',
    code: '05/QĐ-BCĐ',
    type: 'Quyết định',
    issuer: 'BCĐ Chuyển đổi số',
    year: '2025',
    date: '02/02/2025',
    title: 'Quyết định kiện toàn Ban Chỉ đạo Chuyển đổi số và Tổ giúp việc Chuyển đổi số xã Can Lộc giai đoạn 2025 - 2026',
    summary:
      'Phân công nhiệm vụ cụ thể cho từng thành viên ban chỉ đạo phụ trách 6 thôn; gắn kết quả chuyển đổi số với tiêu chí đánh giá thi đua khen thưởng hàng năm của cán bộ, công chức.',
    status: 'Hiệu lực thi hành',
    pdfFile: '05-QD-BCD.pdf',
    pdfSize: '1.1 MB',
    views: 640,
    aiSummary:
      'Đồng chí Chủ tịch UBND xã làm Trưởng ban; 2 Phó Chủ tịch làm Phó ban; quy định chế độ giao ban định kỳ vào thứ Sáu tuần cuối tháng; ban hành quy chế chấm điểm CĐS thôn.',
  },
  {
    id: 'doc-5',
    code: '12/TB-UBND',
    type: 'Thông báo',
    issuer: 'UBND Xã Can Lộc',
    year: '2025',
    date: '20/02/2025',
    title: 'Thông báo về việc công khai bảng giá đất và kế hoạch sử dụng đất năm 2025 trên địa bàn xã Can Lộc',
    summary:
      'Niêm yết công khai trích lục bản đồ địa chính và danh mục các công trình, dự án đăng ký thu hồi đất, chuyển mục đích sử dụng đất trồng lúa sang đất phi nông nghiệp tại trụ sở UBND xã và nhà văn hóa 6 thôn.',
    status: 'Hiệu lực thi hành',
    pdfFile: '12-TB-UBND.pdf',
    pdfSize: '3.2 MB',
    docFile: 'DanhSach_DuAnDat.xlsx',
    views: 3120,
    aiSummary:
      'Thời gian niêm yết công khai 30 ngày từ 20/02 đến 20/03/2025; người dân có quyền gửi ý kiến đóng góp trực tiếp hoặc qua biểu mẫu số hóa trên Cổng DVC xã; bộ phận Địa chính có trách nhiệm tổng hợp giải trình.',
  },
]

export const CitizenDocumentPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedIssuer, setSelectedIssuer] = useState('ALL')
  const [selectedYear, setSelectedYear] = useState('ALL')
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null)
  const [aiDoc, setAiDoc] = useState<DocumentItem | null>(null)

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedType('ALL')
    setSelectedIssuer('ALL')
    setSelectedYear('ALL')
  }

  const filteredDocs = documentData.filter((d) => {
    const matchType = selectedType === 'ALL' || d.type === selectedType
    const matchIssuer = selectedIssuer === 'ALL' || d.issuer === selectedIssuer
    const matchYear = selectedYear === 'ALL' || d.year === selectedYear
    const matchSearch =
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchType && matchIssuer && matchYear && matchSearch
  })

  return (
    <div className="flex flex-col w-full gap-6 pb-12">
      {/* 1. HERO HEADER */}
      <section className="bg-primary text-white rounded-2xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[200px]">policy</span>
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold uppercase mb-2">
            <span className="material-symbols-outlined text-base">gavel</span>
            Hệ Thống Văn Bản Điện Tử Cấp Xã
          </div>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-2">
            Văn Bản Quy Phạm Pháp Luật & Chỉ Đạo Điều Hành
          </h1>
          <p className="text-xs md:text-sm text-primary-fixed leading-relaxed">
            Tra cứu công khai, minh bạch các Nghị quyết HĐND, Quyết định, Kế hoạch và Thông báo của chính quyền xã Can Lộc. Tích hợp tóm tắt thông minh bằng AI.
          </p>
        </div>
      </section>

      {/* 2. FILTER CONTROLS */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2 font-bold text-sm text-on-surface">
            <span className="material-symbols-outlined text-primary text-xl">tune</span>
            <span>Bộ Lọc Tìm Kiếm Văn Bản</span>
          </div>
          <button
            onClick={resetFilters}
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            <span>Đặt lại bộ lọc</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
          {/* Search input */}
          <div className="md:col-span-5 relative">
            <label className="block font-semibold text-gray-700 mb-1">
              Từ khóa / Số hiệu / Trích yếu nội dung
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-gray-400 text-lg">
                search
              </span>
              <input
                className="w-full bg-gray-50 border border-gray-200 pl-10 pr-4 py-2 rounded-lg text-xs text-on-surface placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
                placeholder="Nhập số ký hiệu (42/QĐ-UBND) hoặc trích yếu..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Doc Type */}
          <div className="md:col-span-3">
            <label className="block font-semibold text-gray-700 mb-1">Loại văn bản</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-xs text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="ALL">Tất cả loại văn bản</option>
              <option value="Nghị quyết">Nghị quyết HĐND</option>
              <option value="Quyết định">Quyết định UBND</option>
              <option value="Kế hoạch">Kế hoạch</option>
              <option value="Thông báo">Thông báo</option>
            </select>
          </div>

          {/* Issuer */}
          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Cơ quan ban hành</label>
            <select
              value={selectedIssuer}
              onChange={(e) => setSelectedIssuer(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-xs text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="ALL">Tất cả cơ quan</option>
              <option value="UBND Xã Can Lộc">UBND Xã Can Lộc</option>
              <option value="HĐND Xã Can Lộc">HĐND Xã Can Lộc</option>
              <option value="BCĐ Chuyển đổi số">BCĐ Chuyển đổi số</option>
            </select>
          </div>

          {/* Year */}
          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Năm ban hành</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-xs text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="ALL">Tất cả các năm</option>
              <option value="2025">Năm 2025</option>
              <option value="2024">Năm 2024</option>
              <option value="2023">Năm 2023</option>
            </select>
          </div>
        </div>

        {/* Filter tags strip */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-gray-500">
          <span className="font-semibold">Đang lọc theo:</span>
          <span className="px-2.5 py-1 bg-red-50 text-primary font-semibold rounded-full text-[11px]">
            Năm: {selectedYear === 'ALL' ? 'Tất cả' : selectedYear}
          </span>
          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-[11px]">
            Trạng thái: Còn hiệu lực
          </span>
          <span className="ml-auto text-gray-500">
            Tìm thấy <strong className="text-primary">{filteredDocs.length}</strong> văn bản phù hợp
          </span>
        </div>
      </section>

      {/* 3. MAIN DOCUMENTS LIST & AUXILIARY SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document list (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 bg-gray-50 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2 font-bold text-sm text-on-surface">
                <span className="material-symbols-outlined text-primary text-xl">folder_special</span>
                <span>Danh Mục Văn Bản Quy Phạm & Chỉ Đạo Mới Ban Hành</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Đang xuất danh mục văn bản Excel...')}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold flex items-center gap-1 border border-gray-200 transition-colors shadow-xs"
                >
                  <span className="material-symbols-outlined text-sm text-secondary">table_view</span>
                  <span>Xuất Excel</span>
                </button>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100 flex flex-col text-xs">
              {filteredDocs.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                  <span className="material-symbols-outlined text-4xl mb-2">find_in_page</span>
                  <p>Không tìm thấy văn bản nào theo tiêu chí đã chọn.</p>
                </div>
              ) : (
                filteredDocs.map((doc) => (
                  <article
                    key={doc.id}
                    className="p-5 hover:bg-red-50/25 transition-colors flex flex-col gap-2.5 group"
                  >
                    {/* Top tags */}
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-primary text-white font-bold tracking-wide text-[11px]">
                          {doc.code}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-semibold text-[11px]">
                          {doc.type}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[11px]">
                          {doc.issuer}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-[11px] font-semibold">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          {doc.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-[11px] whitespace-nowrap">
                        <span className="material-symbols-outlined text-xs">calendar_today</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h3
                        onClick={() => setPreviewDoc(doc)}
                        className="text-sm md:text-base font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer mb-1 leading-snug"
                      >
                        {doc.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed line-clamp-2">{doc.summary}</p>
                    </div>

                    {/* Footer attachments and actions */}
                    <div className="flex flex-wrap items-center justify-between pt-2 gap-3 border-t border-gray-50">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-gray-400 font-medium">Tệp đính kèm:</span>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            alert(`Bắt đầu tải tệp ${doc.pdfFile}`)
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-50 hover:bg-primary hover:text-white text-primary font-semibold transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                          <span>{doc.pdfFile} ({doc.pdfSize})</span>
                        </a>
                        {doc.docFile && (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              alert(`Bắt đầu tải tệp ${doc.docFile}`)
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm text-tertiary">description</span>
                            <span>{doc.docFile}</span>
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setAiDoc(doc)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-50 text-tertiary hover:bg-blue-100 font-semibold transition-colors shadow-xs"
                        >
                          <span className="material-symbols-outlined text-sm">psychology</span>
                          <span>Tóm tắt AI</span>
                        </button>
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Auxiliary sidebar (4 cols) matching citizen/document.html */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* 1. AI Assistant Document Briefing Card */}
          <div className="rounded-xl bg-gradient-to-b from-blue-50 to-white p-5 shadow-xs border border-blue-100 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow">
                  <span className="material-symbols-outlined text-base">smart_toy</span>
                </span>
                <span className="font-bold text-primary text-sm">Trợ Lý AI Tóm Tắt VB</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-white text-[11px] font-semibold">
                Trực tuyến
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Hỗ trợ người dân giải thích ngôn ngữ hành chính, quyền lợi, nghĩa vụ và hạn nộp hồ sơ theo văn bản một cách dễ hiểu.
            </p>
            <div className="bg-white rounded-xl p-3.5 shadow-xs border border-gray-100 text-xs mb-3">
              <div className="flex items-center gap-1.5 text-primary font-bold uppercase mb-1.5 text-[11px]">
                <span className="material-symbols-outlined text-sm">lightbulb</span>
                <span>Tóm tắt nhanh văn bản 42/QĐ-UBND:</span>
              </div>
              <ul className="list-disc pl-4 text-gray-700 flex flex-col gap-1 text-[11px] leading-relaxed">
                <li>
                  Lịch tiếp công dân: <strong>Thứ 5 hàng tuần</strong> tại Phòng Tiếp dân UBND Xã.
                </li>
                <li>
                  Người dân có thể gửi phản ánh qua <strong>Cổng dịch vụ công</strong> hoặc <strong>Zalo OA xã</strong>.
                </li>
                <li>
                  Thời hạn xử lý và trả lời ý kiến: Không quá <strong>05 ngày làm việc</strong>.
                </li>
              </ul>
            </div>
            <div className="relative flex items-center">
              <input
                className="w-full bg-white pl-3 pr-9 py-2 rounded-lg text-xs border border-gray-200 focus:outline-none focus:border-primary text-gray-800"
                placeholder="Hỏi AI về thủ tục, văn bản này..."
                type="text"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    alert('Trợ lý AI đang tra cứu cơ sở dữ liệu văn bản...')
                  }
                }}
              />
              <button
                onClick={() => alert('Trợ lý AI đang tra cứu cơ sở dữ liệu văn bản...')}
                className="absolute right-2 text-primary hover:text-primary-container"
              >
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </div>
          </div>

          {/* 2. External Portals & Legal Bridges */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <span className="material-symbols-outlined text-lg">public</span>
              <h3>Liên kết CSDL Pháp Luật</h3>
            </div>
            <div className="flex flex-col gap-2.5 text-xs">
              <a
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                href="https://vbpl.vn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs">
                    VBPL
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                      Cơ sở dữ liệu Quốc gia VBPL
                    </span>
                    <span className="text-[11px] text-gray-500">vbpl.vn - Bộ Tư pháp</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-base">
                  open_in_new
                </span>
              </a>

              <a
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                href="https://hatinh.gov.vn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                    HTG
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                      Cổng TTĐT Tỉnh Hà Tĩnh
                    </span>
                    <span className="text-[11px] text-gray-500">Văn bản chỉ đạo UBND Tỉnh</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-base">
                  open_in_new
                </span>
              </a>

              <a
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                href="https://canloc.hatinh.gov.vn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                    HCL
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                      Cổng TTĐT Huyện Can Lộc
                    </span>
                    <span className="text-[11px] text-gray-500">Quyết định, Thông báo Huyện</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-base">
                  open_in_new
                </span>
              </a>
            </div>
          </div>

          {/* 3. Administrative Contacts Card */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <span className="material-symbols-outlined text-lg">support_agent</span>
              <h3>Bộ phận Văn phòng - Thống kê</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Mọi thắc mắc về trích sao lục văn bản quy phạm, cấp chứng thực bản sao văn bản gốc xin liên hệ trực tiếp:
            </p>
            <div className="p-3 bg-gray-50 rounded-xl flex flex-col gap-2 text-xs border border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Phụ trách lưu trữ:</span>
                <strong className="text-gray-800">Đ/c Nguyễn Văn Cương</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Điện thoại nội bộ:</span>
                <strong className="text-primary font-mono">0239.3841.115 (Máy lẻ 102)</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Email công vụ:</span>
                <strong className="text-tertiary">vp.canloc@hatinh.gov.vn</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: AI SUMMARY */}
      {aiDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="bg-tertiary text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed">psychology</span>
                <span className="font-bold text-sm">Trợ Lý AI Tóm Tắt Văn Bản</span>
              </div>
              <button
                onClick={() => setAiDoc(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div>
                <span className="px-2 py-0.5 rounded bg-primary text-white font-bold text-[10px]">
                  {aiDoc.code}
                </span>
                <h3 className="font-bold text-sm text-on-surface mt-1.5">{aiDoc.title}</h3>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 space-y-2">
                <div className="font-bold text-tertiary flex items-center gap-1.5 text-xs">
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                  <span>Điểm cốt lõi công dân cần lưu ý:</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{aiDoc.aiSummary}</p>
              </div>

              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  onClick={() => setAiDoc(null)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                >
                  Đóng tóm tắt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PREVIEW DOCUMENT */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed">description</span>
                <span className="font-bold text-sm">Chi Tiết Văn Bản {previewDoc.code}</span>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-gray-700">
              <div className="flex items-center justify-between gap-2 flex-wrap border-b border-gray-100 pb-3">
                <div>
                  <span className="font-bold text-primary text-sm">{previewDoc.code}</span>
                  <span className="text-gray-400 ml-2">Ban hành ngày {previewDoc.date}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                  {previewDoc.status}
                </span>
              </div>

              <h2 className="text-base font-bold text-on-surface leading-snug">
                {previewDoc.title}
              </h2>

              <div className="p-3 bg-gray-50 rounded-xl space-y-1 text-gray-600">
                <div><strong>Cơ quan ban hành:</strong> {previewDoc.issuer}</div>
                <div><strong>Loại văn bản:</strong> {previewDoc.type}</div>
                <div><strong>Người ký:</strong> Chủ tịch UBND Xã Can Lộc</div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-1">Trích yếu nội dung văn bản:</h4>
                <p className="leading-relaxed bg-red-50/30 p-3 rounded-xl border border-red-50 text-gray-700">
                  {previewDoc.summary}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-3xl text-red-600">picture_as_pdf</span>
                  <div>
                    <div className="font-bold text-on-surface">{previewDoc.pdfFile}</div>
                    <div className="text-[11px] text-gray-400">Dung lượng: {previewDoc.pdfSize} • Đã quét chữ ký số</div>
                  </div>
                </div>
                <button
                  onClick={() => alert(`Đang tải xuống ${previewDoc.pdfFile}`)}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-white font-semibold flex items-center gap-1.5 shadow"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>Tải bản PDF</span>
                </button>
              </div>

              <div className="flex justify-end pt-3 border-t border-gray-100">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
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

export default CitizenDocumentPage
