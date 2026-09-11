import React from 'react'

export const CitizenFooter: React.FC = () => {
  return (
    <footer
      className="bg-[#700909] text-white border-t-4 border-[#ffd54f] mt-10 pt-8 pb-6 px-4 md:px-6 w-full"
      data-purpose="official-footer"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
        {/* Left Column: Agency Credentials (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-[#ffd54f] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#ffd54f] text-2xl">star</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold uppercase text-white tracking-wide leading-tight">
                Cổng tiếp nhận phản ánh và hỗ trợ người dân
              </h3>
              <p className="text-[11px] text-red-200">
                Cơ quan chủ quản: UBND Xã Can Lộc - Huyện Can Lộc - Tỉnh Hà Tĩnh
              </p>
            </div>
          </div>
          <p className="text-[11px] text-red-100 leading-relaxed">
            Giấy phép xuất bản số: 48/GP-TTĐT do Sở Thông tin và Truyền thông Tỉnh Hà Tĩnh cấp ngày 15/01/2023. Chịu trách nhiệm chính: Ông Nguyễn Văn A - Chủ tịch UBND Xã Can Lộc.
          </p>
          <div className="text-[11px] text-red-200 space-y-1">
            <p className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-[#ffd54f]">location_on</span>
              <span>Địa chỉ: Trụ sở UBND Xã Can Lộc, Huyện Can Lộc, Tỉnh Hà Tĩnh</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-[#ffd54f]">mail</span>
              <span>Email: ubndxacanloc@hatinh.gov.vn</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-[#ffd54f]">call</span>
              <span>Số máy tiếp công dân: (0239) 3.841.115</span>
            </p>
          </div>
        </div>

        {/* Middle Column: Navigation & Public Services (4 cols) */}
        <div className="md:col-span-4 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffd54f] pb-1 border-b border-red-800">
            Hệ thống liên kết chuyên ngành
          </h4>
          <ul className="space-y-1.5 text-[11px] text-red-200">
            <li>
              <a
                className="hover:text-[#ffd54f] hover:underline flex items-center gap-1.5 transition-colors"
                href="https://dichvucong.gov.vn"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span>Cổng Dịch vụ công Quốc gia</span>
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#ffd54f] hover:underline flex items-center gap-1.5 transition-colors"
                href="https://hatinh.gov.vn"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span>Cổng Thông tin điện tử Tỉnh Hà Tĩnh</span>
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#ffd54f] hover:underline flex items-center gap-1.5 transition-colors"
                href="https://canloc.hatinh.gov.vn"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span>Trang thông tin điện tử UBND Huyện Can Lộc</span>
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#ffd54f] hover:underline flex items-center gap-1.5 transition-colors"
                href="https://vbpl.vn"
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span>Cơ sở dữ liệu Quốc gia về Văn bản Pháp luật</span>
              </a>
            </li>
            <li>
              <a
                className="hover:text-[#ffd54f] hover:underline flex items-center gap-1.5 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span>Hệ thống Phản ánh kiến nghị tỉnh Hà Tĩnh</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column: Statistics & QR (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffd54f] pb-1 border-b border-red-800">
            Thống kê truy cập cổng
          </h4>
          <div className="bg-[#5c0808] p-3 rounded-lg border border-red-800 space-y-1.5 text-[11px] text-red-200 shadow-inner">
            <div className="flex justify-between items-center">
              <span>Đang trực tuyến:</span>
              <span className="font-bold text-emerald-400 font-mono text-xs">148</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Hôm nay:</span>
              <span className="font-bold text-white font-mono text-xs">3.412</span>
            </div>
            <div className="flex justify-between items-center border-t border-red-900/80 pt-1.5 mt-1">
              <span>Tổng lượt truy cập:</span>
              <span className="font-extrabold text-[#ffd54f] font-mono text-sm">54.354.354</span>
            </div>
          </div>
          <p className="text-[10px] text-red-300 italic leading-snug">
            Ghi rõ nguồn Cổng TTĐT Xã Can Lộc (canloc.hatinh.gov.vn) khi phát hành lại thông tin từ website này.
          </p>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="max-w-[1440px] mx-auto border-t border-red-900 mt-6 pt-4 text-center text-[11px] text-red-300">
        © 2025 Bản quyền thuộc về Cổng Thông Tin Điện Tử UBND Xã Can Lộc - Tỉnh Hà Tĩnh.
      </div>
    </footer>
  )
}

export default CitizenFooter
