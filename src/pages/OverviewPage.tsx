import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-container_max_width mx-auto">
      {/* Breadcrumbs & Header */}
      <div className="mb-stack_lg">
        <div className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant mb-2">
          <span className="material-symbols-outlined text-sm">home</span>
          <Link to="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary font-medium">Tổng quan</span>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-surface">
              Chào buổi sáng, Chủ tịch Nguyễn Văn A
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
              Thứ Năm, 24 Tháng 10, 2024
            </p>
          </div>
          <button
            onClick={() => navigate('/report')}
            className="hidden md:flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-md font-label-md text-label-md font-bold hover:bg-primary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter mb-stack_lg">
        {/* Card 1 */}
        <div className="enterprise-card kpi-card p-4 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="font-title-lg text-title-lg text-on-surface-variant">
              Hồ sơ chờ xử lý
            </h3>
            <span className="material-symbols-outlined text-on-surface-variant bg-surface-container-low p-1.5 rounded-md">
              folder_open
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-display-lg text-on-surface">124</span>
            <span className="font-label-sm text-label-sm text-[#059669] flex items-center bg-[#D1FAE5] px-1.5 py-0.5 rounded-xs">
              <span className="material-symbols-outlined text-[10px]">arrow_upward</span> 12%
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="enterprise-card kpi-card p-4 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="font-title-lg text-title-lg text-on-surface-variant">
              Tỷ lệ giải quyết đúng hạn
            </h3>
            <span className="material-symbols-outlined text-on-surface-variant bg-surface-container-low p-1.5 rounded-md">
              check_circle
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-display-lg text-on-surface">98.5%</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="enterprise-card kpi-card p-4 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="font-title-lg text-title-lg text-on-surface-variant">
              Phản ánh mới
            </h3>
            <span className="material-symbols-outlined text-on-surface-variant bg-surface-container-low p-1.5 rounded-md">
              record_voice_over
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-display-lg text-on-surface">45</span>
            <span className="font-label-sm text-label-sm text-error flex items-center bg-error-container px-1.5 py-0.5 rounded-xs">
              +5 hnay
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="enterprise-card kpi-card p-4 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <h3 className="font-title-lg text-title-lg text-on-surface-variant">
              Công việc hoàn thành
            </h3>
            <span className="material-symbols-outlined text-on-surface-variant bg-surface-container-low p-1.5 rounded-md">
              task_alt
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-display-lg text-on-surface">
              89
              <span className="text-title-lg text-on-surface-variant font-normal">/110</span>
            </span>
          </div>
          <div className="w-full bg-surface-container-high rounded-full h-1.5 mt-2">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Chart Column (Takes up 2 cols on lg) */}
        <div className="lg:col-span-2 space-y-gutter">
          {/* Chart Card */}
          <div className="enterprise-card p-6 h-96 flex flex-col shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Biểu đồ xử lý hồ sơ (7 ngày qua)
              </h3>
              <button
                onClick={() => navigate('/report')}
                className="text-primary font-label-md text-label-md hover:underline"
              >
                Xem chi tiết
              </button>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-md border border-outline-variant border-dashed flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
              {/* Interactive bars */}
              <div className="w-full h-full p-6 flex items-end justify-between relative z-10 gap-3">
                {[
                  { day: 'T2', val: '25%', h: '25%', count: 18 },
                  { day: 'T3', val: '50%', h: '50%', count: 35 },
                  { day: 'T4', val: '35%', h: '35%', count: 24 },
                  { day: 'T5', val: '75%', h: '75%', count: 52 },
                  { day: 'T6', val: '65%', h: '65%', count: 44 },
                  { day: 'T7', val: '100%', h: '100%', count: 68 },
                  { day: 'CN', val: '80%', h: '80%', count: 56 },
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                    <span className="text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                      {bar.count} hs
                    </span>
                    <div
                      className="w-full bg-primary hover:bg-primary-container rounded-t-sm transition-all duration-300 relative cursor-pointer"
                      style={{ height: bar.h }}
                      title={`${bar.day}: ${bar.count} hồ sơ`}
                    ></div>
                    <span className="text-xs font-medium text-on-surface-variant mt-2">
                      {bar.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Assistant Summary (Bento Style) */}
          <div className="enterprise-card p-6 bg-[#F0F7FF] border-[#bed9ff] relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-6xl text-primary">smart_toy</span>
            </div>
            <div className="relative z-10 flex gap-4">
              <div className="bg-white p-3 rounded-full h-fit border border-[#bed9ff] shadow-xs shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">smart_toy</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-tertiary-fixed-variant mb-2 font-semibold">
                  Trợ lý AI phân tích
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4 max-w-2xl leading-relaxed">
                  Dựa trên dữ liệu hôm nay, số lượng hồ sơ lĩnh vực Đất đai tăng 15%. Đề xuất tăng cường
                  nhân sự hỗ trợ tại bộ phận Một cửa để đảm bảo tiến độ xử lý.
                </p>
                <button
                  onClick={() => navigate('/ai-agent')}
                  className="bg-primary text-on-primary px-4 py-2 rounded-md font-label-md text-label-md font-bold hover:bg-primary-container transition-colors shadow-xs"
                >
                  Xem đề xuất chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (List) */}
        <div className="space-y-gutter">
          {/* Phản ánh gần đây */}
          <div className="enterprise-card p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Phản ánh gần đây
              </h3>
            </div>
            <div className="space-y-4">
              {/* List Item 1 */}
              <div
                onClick={() => navigate('/feedback')}
                className="p-3 bg-surface-bright rounded-md border border-outline-variant hover:border-primary transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-label-sm text-label-sm text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full border border-[#FDE68A]">
                    Đang xử lý
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    10 phút trước
                  </span>
                </div>
                <h4 className="font-title-lg text-title-lg text-on-surface mb-1 truncate font-semibold">
                  Rác thải ùn ứ tại tổ dân phố 3
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant truncate">
                  Lĩnh vực: Môi trường
                </p>
              </div>

              {/* List Item 2 */}
              <div
                onClick={() => navigate('/feedback')}
                className="p-3 bg-surface-bright rounded-md border border-outline-variant hover:border-primary transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-label-sm text-label-sm text-error bg-error-container px-2 py-0.5 rounded-full border border-surface-variant font-medium">
                    Chờ duyệt
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    1 giờ trước
                  </span>
                </div>
                <h4 className="font-title-lg text-title-lg text-on-surface mb-1 truncate font-semibold">
                  Lấn chiếm vỉa hè đường Lê Lợi
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant truncate">
                  Lĩnh vực: Trật tự đô thị
                </p>
              </div>

              {/* List Item 3 */}
              <div
                onClick={() => navigate('/feedback')}
                className="p-3 bg-surface-bright rounded-md border border-outline-variant hover:border-primary transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-label-sm text-label-sm text-[#059669] bg-[#D1FAE5] px-2 py-0.5 rounded-full border border-[#A7F3D0] font-medium">
                    Đã xong
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    3 giờ trước
                  </span>
                </div>
                <h4 className="font-title-lg text-title-lg text-on-surface mb-1 truncate font-semibold">
                  Sửa chữa đèn chiếu sáng hẻm 12
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant truncate">
                  Lĩnh vực: Giao thông
                </p>
              </div>

              <button
                onClick={() => navigate('/feedback')}
                className="w-full mt-2 py-2 border border-outline-variant text-primary font-label-md text-label-md rounded-md hover:bg-surface-container-low transition-colors font-semibold"
              >
                Xem tất cả phản ánh
              </button>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="enterprise-card p-6 shadow-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">
              Lịch họp trong ngày
            </h3>
            <div className="relative pl-6 border-l-2 border-surface-variant space-y-6">
              <div className="relative">
                <span className="absolute -left-[31px] bg-primary w-4 h-4 rounded-full border-4 border-white shadow-xs"></span>
                <p className="font-label-sm text-label-sm text-primary mb-1 font-bold">
                  08:00 - 09:30
                </p>
                <p className="font-title-lg text-title-lg text-on-surface font-semibold">
                  Giao ban thường kỳ
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-1 text-xs">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  Phòng họp số 1
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] bg-surface-variant w-4 h-4 rounded-full border-4 border-white shadow-xs"></span>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-1 font-bold">
                  14:00 - 15:30
                </p>
                <p className="font-title-lg text-title-lg text-on-surface font-semibold">
                  Họp ban chỉ đạo CĐS
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-1 text-xs">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  Phòng trực tuyến
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
