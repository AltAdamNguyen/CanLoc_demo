import React from 'react'

export const AdminPage: React.FC = () => {
  const aiLogs = [
    {
      time: '10:42:15',
      user: 'Nguyễn Văn A (Chủ tịch)',
      model: 'Local LLM (Qwen-72B)',
      action: 'Tóm tắt báo cáo tiến độ dự án đường X',
      latency: '1.2s',
      status: 'Thành công',
    },
    {
      time: '10:35:02',
      user: 'Lê Văn B (Địa chính)',
      model: 'Local LLM (Embedding + RAG)',
      action: 'Tra cứu Luật Đất đai 2024 Điều 125',
      latency: '0.8s',
      status: 'Thành công',
    },
    {
      time: '10:15:48',
      user: 'Trần Thị C (Tư pháp)',
      model: 'Cloud Gateway (Filtered)',
      action: 'Dự thảo mẫu biên bản hòa giải cơ sở',
      latency: '2.1s',
      status: 'Thành công',
    },
    {
      time: '09:50:11',
      user: 'Hệ thống tự động',
      model: 'Vector Sync',
      action: 'Đồng bộ 14 văn bản chỉ đạo mới từ Tỉnh',
      latency: '4.5s',
      status: 'Hoàn thành',
    },
  ]

  return (
    <div className="max-w-container_max_width mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="font-display-lg text-display-lg text-on-background font-bold">QUẢN TRỊ AI</h2>
        <p className="text-on-surface-variant font-body-lg mt-1 text-sm">
          Giám sát và điều phối hạ tầng Trí tuệ Nhân tạo hệ thống Hành chính Công
        </p>
      </div>

      {/* Security Callout Banner */}
      <div className="bg-error-container border border-error/20 rounded-lg p-4 flex items-start gap-4">
        <span className="material-symbols-outlined text-error mt-0.5">warning</span>
        <div>
          <h4 className="font-title-lg text-title-lg text-on-error-container mb-1 font-bold">
            Cảnh báo Bảo mật Dữ liệu
          </h4>
          <p className="font-body-md text-on-error-container/90 text-sm leading-relaxed">
            Dữ liệu Nội bộ, Mật/Hạn chế và thông tin cá nhân không được phép gửi tới Cloud AI. Mọi vi
            phạm sẽ được ghi nhận vào nhật ký kiểm toán hệ thống.
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* LEFT COLUMN (Span 8) */}
        <div className="xl:col-span-8 space-y-gutter">
          {/* AI Architecture Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-surface rounded-lg border border-outline-variant p-4 relative overflow-hidden group shadow-xs">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-surface-container rounded-md">
                  <span className="material-symbols-outlined text-primary text-[20px]">dns</span>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-200">
                  Hoạt động
                </span>
              </div>
              <h4 className="font-label-md text-label-md text-on-surface-variant uppercase mt-3">
                Hạ tầng
              </h4>
              <p className="font-title-lg text-title-lg text-on-surface mt-1 font-bold">Local AI</p>
            </div>

            {/* Card 2 */}
            <div className="bg-surface rounded-lg border border-outline-variant p-4 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-surface-container rounded-md">
                  <span className="material-symbols-outlined text-primary text-[20px]">database</span>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-200">
                  Hoạt động
                </span>
              </div>
              <h4 className="font-label-md text-label-md text-on-surface-variant uppercase mt-3">
                Lưu trữ
              </h4>
              <p className="font-title-lg text-title-lg text-on-surface mt-1 font-bold">Vector DB</p>
            </div>

            {/* Card 3 */}
            <div className="bg-surface rounded-lg border border-outline-variant p-4 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-surface-container rounded-md">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    cloud_sync
                  </span>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-green-200">
                  Hoạt động
                </span>
              </div>
              <h4 className="font-label-md text-label-md text-on-surface-variant uppercase mt-3">
                Gateway
              </h4>
              <p className="font-title-lg text-title-lg text-on-surface mt-1 font-bold">Cloud AI</p>
            </div>

            {/* Card 4 */}
            <div className="bg-surface rounded-lg border-t-4 border-secondary border-l border-r border-b border-outline-variant p-4 shadow-xs">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-secondary-container/30 rounded-md">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    library_books
                  </span>
                </div>
              </div>
              <h4 className="font-label-md text-label-md text-on-surface-variant uppercase mt-3">
                Knowledge Base
              </h4>
              <p className="font-title-lg text-title-lg text-primary mt-1 font-bold">
                2.486 <span className="text-sm font-normal text-on-surface-variant">tài liệu</span>
              </p>
            </div>
          </div>

          {/* Routing Flow Visualization */}
          <div className="bg-surface border border-outline-variant rounded-xl p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">account_tree</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Sơ đồ định tuyến (Routing Flow)
              </h3>
            </div>
            <div className="relative w-full overflow-x-auto pb-4">
              <div className="min-w-[700px] flex items-center justify-between gap-2">
                {/* Node 1 */}
                <div className="flex flex-col items-center bg-surface-container-low border border-outline-variant rounded-lg p-3 w-32 text-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">
                    person_search
                  </span>
                  <span className="font-label-md text-label-md font-semibold">Yêu cầu</span>
                </div>
                <span className="material-symbols-outlined text-outline">arrow_right_alt</span>

                {/* Node 2 */}
                <div className="flex flex-col items-center bg-[#F0F7FF] border border-blue-200 rounded-lg p-3 w-32 text-center shrink-0">
                  <span className="material-symbols-outlined text-blue-600 mb-1">category</span>
                  <span className="font-label-md text-label-md text-blue-900 font-semibold">
                    Phân loại dữ liệu
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline">arrow_right_alt</span>

                {/* Node 3 */}
                <div className="flex flex-col items-center bg-surface-container-low border border-outline-variant rounded-lg p-3 w-32 text-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">gavel</span>
                  <span className="font-label-md text-label-md font-semibold">Kiểm tra quyền</span>
                </div>
                <span className="material-symbols-outlined text-outline">arrow_right_alt</span>

                {/* Node 4 */}
                <div className="flex flex-col items-center bg-surface-container-low border border-outline-variant rounded-lg p-3 w-32 text-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">
                    manage_search
                  </span>
                  <span className="font-label-md text-label-md font-semibold">RAG</span>
                </div>
                <span className="material-symbols-outlined text-outline">arrow_right_alt</span>

                {/* Node 5 & Routing */}
                <div className="flex flex-col items-center gap-4 shrink-0">
                  <div className="flex flex-col items-center bg-primary-container border border-primary/30 rounded-lg p-3 w-32 text-center">
                    <span className="material-symbols-outlined text-primary mb-1">router</span>
                    <span className="font-label-md text-label-md text-primary font-bold">
                      AI Gateway
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center bg-surface border-2 border-green-500/50 rounded-lg p-2 w-28 text-center shadow-xs">
                      <span className="material-symbols-outlined text-green-600 text-[18px]">dns</span>
                      <span className="font-label-sm text-label-sm mt-1 font-semibold">Local AI</span>
                    </div>
                    <div className="flex flex-col items-center bg-surface border border-outline-variant rounded-lg p-2 w-28 text-center shadow-xs opacity-70">
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                        cloud
                      </span>
                      <span className="font-label-sm text-label-sm mt-1 font-semibold">Cloud AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Model Routing Policy Table */}
          <div className="bg-surface border border-outline-variant rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-outline-variant bg-surface-container-lowest flex justify-between items-center">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-primary">policy</span>
                Định tuyến mô hình AI
              </h3>
              <button
                onClick={() => alert('Cấu hình định tuyến mô hình AI')}
                className="text-primary hover:text-primary-container font-label-md text-label-md flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span> Chỉnh sửa
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-outline-variant">
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant font-bold w-1/3">
                      Cấp độ Dữ liệu
                    </th>
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant font-bold w-1/3">
                      Mô hình cho phép
                    </th>
                    <th className="p-4 font-label-md text-label-md text-on-surface-variant font-bold w-1/3">
                      Trạng thái (Status)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant font-body-md">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-4 text-on-surface font-medium">Công khai</td>
                    <td className="p-4 text-on-surface-variant">Local AI / Cloud AI</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Allowed
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                    <td className="p-4 text-on-surface font-medium">Nội bộ</td>
                    <td className="p-4 text-on-surface-variant">Local AI</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Local preferred
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="p-4 text-error font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">lock</span> Mật / Hạn chế
                    </td>
                    <td className="p-4 font-bold text-on-surface">Local AI ONLY</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-error-container text-on-error-container border border-error/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <span className="material-symbols-outlined text-[14px]">block</span>
                        Cloud blocked
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors">
                    <td className="p-4 text-error font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">badge</span> PII / Dữ liệu công dân
                    </td>
                    <td className="p-4 font-bold text-on-surface">Local AI ONLY</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-error-container text-on-error-container border border-error/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                        <span className="material-symbols-outlined text-[14px]">block</span>
                        Cloud blocked
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Span 4) */}
        <div className="xl:col-span-4 space-y-gutter">
          {/* AI Models Cards Section */}
          <div className="bg-surface border border-outline-variant rounded-xl shadow-xs p-5">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-primary">memory</span>
              Mô hình AI đang chạy
            </h3>
            <div className="space-y-4">
              {/* Local Model Card */}
              <div className="border border-outline-variant rounded-lg p-4 bg-surface-container-lowest hover:border-primary transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">dns</span>
                    </div>
                    <div>
                      <h4 className="font-title-lg text-title-lg text-on-surface font-semibold">
                        Local LLM
                      </h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Hosting: Internal Server
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                  </span>
                </div>
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-on-surface-variant font-label-md">
                        Tải GPU (GPU Usage)
                      </span>
                      <span className="text-on-surface font-bold font-label-md">48%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-outline-variant/50 text-xs">
                    <span className="text-on-surface-variant">Yêu cầu hôm nay:</span>
                    <span className="text-on-surface font-bold">1,248</span>
                  </div>
                </div>
              </div>

              {/* Cloud Model Card */}
              <div className="border border-outline-variant rounded-lg p-4 bg-surface-container-lowest opacity-90 hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined">cloud</span>
                    </div>
                    <div>
                      <h4 className="font-title-lg text-title-lg text-on-surface font-semibold">
                        Cloud LLM
                      </h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        Provider: External API
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-blue-600">
                    <span className="material-symbols-outlined text-[14px]">link</span> Connected
                  </span>
                </div>
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-on-surface-variant font-label-md">Quota Usage</span>
                      <span className="text-on-surface font-bold font-label-md">11.7%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '11.7%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-outline-variant/50 text-xs">
                    <span className="text-on-surface-variant">Yêu cầu hôm nay:</span>
                    <span className="text-on-surface font-bold">146</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions or System Info */}
          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-5 shadow-xs">
            <h4 className="font-title-lg text-title-lg text-on-surface mb-3 font-bold">
              Cập nhật hệ thống
            </h4>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              Bản vá bảo mật v2.4.1 đã sẵn sàng để cài đặt cho Local AI.
            </p>
            <button
              onClick={() => alert('Đã bắt đầu tiến trình cài đặt bản vá bảo mật v2.4.1!')}
              className="w-full py-2 bg-surface text-primary border border-primary rounded-lg font-label-md font-semibold hover:bg-primary-container transition-colors shadow-xs"
            >
              Cập nhật ngay
            </button>
          </div>
        </div>
      </div>

      {/* Full Width Section: AI Logs */}
      <div className="bg-surface border border-outline-variant rounded-xl shadow-xs overflow-hidden mb-8">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-primary">list_alt</span>
            Nhật ký AI (AI Logs)
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => alert('Bộ lọc nhật ký AI')}
              className="px-3 py-1.5 border border-outline-variant rounded-md text-sm text-on-surface-variant hover:bg-surface-container-low flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[16px]">filter_list</span> Lọc
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F9FAFB] text-on-surface-variant border-b border-outline-variant font-semibold text-xs uppercase">
              <tr>
                <th className="p-3.5 px-4">Thời gian</th>
                <th className="p-3.5 px-4">Người dùng</th>
                <th className="p-3.5 px-4">Mô hình</th>
                <th className="p-3.5 px-4">Hành động / Yêu cầu</th>
                <th className="p-3.5 px-4 text-center">Độ trễ</th>
                <th className="p-3.5 px-4 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {aiLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3.5 px-4 font-mono text-xs text-gray-500">{log.time}</td>
                  <td className="p-3.5 px-4 font-semibold text-on-surface">{log.user}</td>
                  <td className="p-3.5 px-4 text-primary font-medium text-xs">{log.model}</td>
                  <td className="p-3.5 px-4 text-gray-700">{log.action}</td>
                  <td className="p-3.5 px-4 text-center font-mono text-xs text-gray-500">
                    {log.latency}
                  </td>
                  <td className="p-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
