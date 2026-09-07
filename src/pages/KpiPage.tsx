import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const KpiPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header & Breadcrumb */}
      <div>
        <nav className="flex text-sm text-on-surface-variant mb-2 items-center gap-1">
          <Link to="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span className="mx-1">&gt;</span>
          <span className="text-on-surface font-medium">KPI &amp; Công việc</span>
        </nav>
        <h1 className="text-2xl font-bold text-on-surface">KPI &amp; THEO DÕI CÔNG VIỆC</h1>
      </div>

      {/* Filters */}
      <div className="bg-surface border border-outline-variant rounded-lg p-4 flex flex-wrap gap-4 items-end shadow-xs">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
            Kỳ đánh giá
          </label>
          <select className="w-full border border-outline-variant rounded-md text-sm py-2 px-3 bg-white focus:ring-1 focus:ring-primary focus:border-primary">
            <option>Tháng 08/2026</option>
            <option>Tháng 07/2026</option>
            <option>Quý II/2026</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
            Đơn vị
          </label>
          <select className="w-full border border-outline-variant rounded-md text-sm py-2 px-3 bg-white focus:ring-1 focus:ring-primary focus:border-primary">
            <option>Tất cả đơn vị</option>
            <option>Văn phòng UBND</option>
            <option>Tư pháp - Hộ tịch</option>
            <option>Địa chính - Xây dựng</option>
            <option>Văn hóa - Xã hội</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
            Cán bộ
          </label>
          <select className="w-full border border-outline-variant rounded-md text-sm py-2 px-3 bg-white focus:ring-1 focus:ring-primary focus:border-primary">
            <option>Tất cả cán bộ</option>
            <option>Lê Văn B</option>
            <option>Trần Thị C</option>
            <option>Nguyễn Văn A</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">
            Trạng thái
          </label>
          <select className="w-full border border-outline-variant rounded-md text-sm py-2 px-3 bg-white focus:ring-1 focus:ring-primary focus:border-primary">
            <option>Tất cả trạng thái</option>
            <option>Hoàn thành</option>
            <option>Đang thực hiện</option>
            <option>Quá hạn</option>
          </select>
        </div>
        <button
          onClick={() => alert('Đã lọc danh sách KPI theo điều kiện.')}
          className="bg-primary text-on-primary px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-container transition-colors shadow-xs"
        >
          Lọc kết quả
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-outline-variant border-t-4 border-t-secondary rounded-lg p-5 shadow-xs">
          <p className="text-sm text-on-surface-variant font-medium mb-1">KPI bình quân</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-on-surface">87%</h3>
            <span className="text-green-600 text-sm font-medium flex items-center mb-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span> +2.4%
            </span>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-xs">
          <p className="text-sm text-on-surface-variant font-medium mb-1">Hoàn thành đúng hạn</p>
          <h3 className="text-3xl font-bold text-green-600">91%</h3>
        </div>

        <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-xs">
          <p className="text-sm text-on-surface-variant font-medium mb-1">Công việc quá hạn</p>
          <h3 className="text-3xl font-bold text-primary">08</h3>
        </div>

        <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-xs">
          <p className="text-sm text-on-surface-variant font-medium mb-1">Có nguy cơ không đạt</p>
          <h3 className="text-3xl font-bold text-[#d97706]">12</h3>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Table Area (Span 2) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Kết quả KPI theo đơn vị */}
          <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden shadow-xs">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
              <h3 className="font-bold text-lg text-on-surface">Kết quả KPI theo đơn vị</h3>
              <button
                onClick={() => navigate('/report')}
                className="text-primary text-sm font-medium hover:underline"
              >
                Xem chi tiết
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full data-table text-sm">
                <thead>
                  <tr>
                    <th>Đơn vị</th>
                    <th className="text-center">Tổng chỉ tiêu</th>
                    <th className="text-center">Hoàn thành</th>
                    <th className="text-center">Đang thực hiện</th>
                    <th className="text-center">Quá hạn</th>
                    <th>Điểm KPI</th>
                    <th>Xếp loại</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-medium">Văn phòng UBND</td>
                    <td className="text-center">24</td>
                    <td className="text-center text-green-600 font-bold">20</td>
                    <td className="text-center">3</td>
                    <td className="text-center text-primary font-bold">1</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="w-8 font-medium">92%</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Tốt
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Tư pháp - Hộ tịch</td>
                    <td className="text-center">18</td>
                    <td className="text-center text-green-600 font-bold">15</td>
                    <td className="text-center">2</td>
                    <td className="text-center text-primary font-bold">1</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="w-8 font-medium">88%</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Tốt
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Văn hóa - Xã hội</td>
                    <td className="text-center">22</td>
                    <td className="text-center text-green-600 font-bold">17</td>
                    <td className="text-center">4</td>
                    <td className="text-center text-primary font-bold">1</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="w-8 font-medium">85%</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Khá
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Địa chính - Xây dựng</td>
                    <td className="text-center">26</td>
                    <td className="text-center text-green-600 font-bold">18</td>
                    <td className="text-center">5</td>
                    <td className="text-center text-primary font-bold">3</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="w-8 font-medium">78%</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Khá
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Công việc có nguy cơ chậm tiến độ */}
          <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden shadow-xs">
            <div className="p-4 border-b border-outline-variant bg-surface-container-lowest">
              <h3 className="font-bold text-lg text-on-surface">
                Công việc có nguy cơ chậm tiến độ
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-outline-variant rounded-md hover:bg-gray-50 transition-colors gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-on-surface">
                      Hoàn thiện hồ sơ cấp GCNQSDĐ xóm 4
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Phụ trách: Lê Văn B (Địa chính)
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-right">
                      <p className="text-xs text-on-surface-variant">Hạn chót</p>
                      <p className="text-sm font-medium text-primary font-bold">15/08/2026</p>
                    </div>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                      Rủi ro cao
                    </span>
                    <button
                      onClick={() => alert('Chi tiết hồ sơ cấp GCNQSDĐ xóm 4')}
                      className="text-primary text-sm font-medium border border-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors"
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-outline-variant rounded-md hover:bg-gray-50 transition-colors gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-on-surface">
                      Báo cáo tình hình an ninh trật tự tháng 8
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Phụ trách: Trần Thị C (Công an)
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-right">
                      <p className="text-xs text-on-surface-variant">Hạn chót</p>
                      <p className="text-sm font-medium text-gray-800 font-bold">18/08/2026</p>
                    </div>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                      Rủi ro TB
                    </span>
                    <button
                      onClick={() => alert('Chi tiết báo cáo an ninh trật tự')}
                      className="text-primary text-sm font-medium border border-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition-colors"
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel: Trợ lý AI */}
        <div className="xl:col-span-1">
          <div className="bg-[#F0F7FF] border border-[#B8DAFF] rounded-lg p-5 sticky top-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#00487d]">
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
              <h3 className="font-bold text-lg">Trợ lý AI phân tích</h3>
            </div>
            <div className="bg-white p-4 rounded-md border border-[#D0E2FF] shadow-xs mb-6 relative">
              <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l border-t border-[#D0E2FF] transform -rotate-45"></div>
              <p className="text-sm text-gray-800 leading-relaxed font-medium">
                "Địa chính - Xây dựng có <span className="text-primary font-bold">3 nhiệm vụ</span>{' '}
                có khả năng quá hạn trong 7 ngày tới do khối lượng hồ sơ tồn đọng tăng 15% so với
                tuần trước."
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/ai-agent')}
                className="w-full bg-primary text-white py-2 px-4 rounded-md font-medium text-sm hover:bg-primary-container transition-colors flex justify-center items-center gap-2 shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">insights</span>
                Xem phân tích chi tiết
              </button>
              <button
                onClick={() => alert('Đã gửi thông báo giao việc đôn đốc tới phòng Địa chính!')}
                className="w-full bg-white text-primary border border-primary py-2 px-4 rounded-md font-medium text-sm hover:bg-red-50 transition-colors flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">assignment_add</span>
                Giao việc đôn đốc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
