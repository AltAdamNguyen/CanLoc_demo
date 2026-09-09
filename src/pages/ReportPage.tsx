import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend
)

export const ReportPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Line Chart Data
  const lineData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
    datasets: [
      {
        label: 'Tỷ lệ hoàn thành (%)',
        data: [78, 82, 85, 80, 88, 92, 89, 91],
        borderColor: '#91000a',
        backgroundColor: 'rgba(145, 0, 10, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  }

  // Doughnut Chart Data
  const doughnutData = {
    labels: ['Hoàn thành', 'Đang thực hiện', 'Quá hạn'],
    datasets: [
      {
        data: [312, 15, 15],
        backgroundColor: ['#00875A', '#0060a4', '#ba1a1a'],
        borderWidth: 1,
      },
    ],
  }

  // Bar Chart Data
  const barData = {
    labels: ['Văn phòng', 'Tư pháp', 'Địa chính', 'Văn hóa', 'Công an'],
    datasets: [
      {
        label: 'Điểm KPI (%)',
        data: [92, 88, 78, 85, 90],
        backgroundColor: ['#91000a', '#0060a4', '#d97706', '#00875A', '#745b00'],
        borderRadius: 4,
      },
    ],
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header & Global Filters */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary mb-2 font-bold">
            BÁO CÁO ĐIỀU HÀNH
          </h1>
          <p className="font-body-md text-on-surface-variant text-sm">
            Tổng hợp dữ liệu và đánh giá hiệu suất hoạt động tháng 8/2026.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select className="bg-surface border border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary py-2 px-3">
            <option>Tháng 8 / 2026</option>
            <option>Tháng 7 / 2026</option>
            <option>Tháng 6 / 2026</option>
          </select>
          <select className="bg-surface border border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary py-2 px-3">
            <option>Tất cả đơn vị</option>
            <option>Địa chính - Xây dựng</option>
            <option>Tư pháp - Hộ tịch</option>
          </select>
          <select className="bg-surface border border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary py-2 px-3">
            <option>Tất cả lĩnh vực</option>
            <option>Trật tự đô thị</option>
            <option>An ninh</option>
          </select>
          <div className="flex gap-2 ml-2">
            <button
              onClick={() => alert('Đang xuất file PDF...')}
              className="bg-surface border border-primary text-primary hover:bg-primary-container hover:text-on-primary transition-colors py-2 px-4 rounded-lg font-label-md text-sm flex items-center gap-1 shadow-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span> Xuất PDF
            </button>
            <button
              onClick={() => alert('Đang xuất file Excel (.xlsx)...')}
              className="bg-surface border border-primary text-primary hover:bg-primary-container hover:text-on-primary transition-colors py-2 px-4 rounded-lg font-label-md text-sm flex items-center gap-1 shadow-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">table_view</span> Xuất Excel
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="border-b border-outline-variant">
        <nav className="flex gap-6">
          {[
            { id: 'overview', label: 'Tổng quan' },
            { id: 'tasks', label: 'Công việc' },
            { id: 'kpi', label: 'KPI' },
            { id: 'feedback', label: 'Phản ánh' },
            { id: 'voting', label: 'Biểu quyết' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 font-title-lg text-sm font-semibold transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="glass-card rounded-xl p-5 border-t-4 border-t-secondary-container shadow-xs flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <h3 className="font-label-md text-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Tổng nhiệm vụ
            </h3>
            <span className="material-symbols-outlined text-outline">assignment</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-on-surface">342</span>
            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12%
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-card rounded-xl p-5 border-t-4 border-t-primary shadow-xs flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <h3 className="font-label-md text-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Tỷ lệ hoàn thành
            </h3>
            <span className="material-symbols-outlined text-outline">check_circle</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-primary">91%</span>
            <div className="w-24 h-2 bg-surface-container-high rounded-full overflow-hidden mb-2">
              <div className="w-[91%] h-full bg-primary rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-card rounded-xl p-5 border-t-4 border-t-error shadow-xs flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <h3 className="font-label-md text-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Công việc quá hạn
            </h3>
            <span className="material-symbols-outlined text-error/70">warning</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-error">15</span>
            <span className="text-sm font-semibold text-error bg-error-container px-2 py-1 rounded flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_down</span> -3
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-card rounded-xl p-5 border-t-4 border-t-tertiary-container shadow-xs flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <h3 className="font-label-md text-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Phản ánh chưa xử lý
            </h3>
            <span className="material-symbols-outlined text-outline">forum</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-on-surface">07</span>
            <span className="text-sm font-semibold text-on-surface-variant bg-surface-container-high px-2 py-1 rounded flex items-center">
              Trật tự đô thị
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Chart Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-5 shadow-xs">
              <h3 className="font-title-lg text-sm mb-4 font-bold">
                Tỷ lệ hoàn thành công việc theo tháng
              </h3>
              <div className="h-60 relative w-full flex items-center justify-center">
                <Line
                  data={lineData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 shadow-xs">
              <h3 className="font-title-lg text-sm mb-4 font-bold">Trạng thái công việc</h3>
              <div className="h-60 relative w-full flex items-center justify-center">
                <Doughnut
                  data={doughnutData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom' } },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Chart Row 2 */}
          <div className="glass-card rounded-xl p-5 shadow-xs">
            <h3 className="font-title-lg text-sm mb-4 font-bold">KPI theo đơn vị trực thuộc</h3>
            <div className="h-64 relative w-full flex items-center justify-center">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: AI Summary & Small Chart */}
        <div className="flex flex-col gap-6">
          {/* AI Summary Card */}
          <div className="glass-card rounded-xl shadow-xs border-l-4 border-l-primary bg-gradient-to-br from-[#fff0ee] to-[#fff8f7] overflow-hidden">
            <div className="p-5 border-b border-outline-variant/30 flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                smart_toy
              </span>
              <h3 className="font-title-lg text-sm font-bold text-primary">AI TÓM TẮT TÌNH HÌNH</h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Tình hình tháng 8/2026 nhìn chung đạt kế hoạch.{' '}
                <strong className="text-primary">91%</strong> nhiệm vụ được hoàn thành đúng hạn. Tuy
                nhiên, <strong>Địa chính - Xây dựng</strong> có tỷ lệ hoàn thành 78%, thấp hơn trung
                bình toàn đơn vị 9 điểm phần trăm. <strong className="text-error">07</strong> phản
                ánh đang quá hạn, tập trung chủ yếu ở lĩnh vực trật tự đô thị.
              </p>
              <div>
                <h4 className="font-label-md text-xs uppercase tracking-wider text-on-surface-variant mb-2 font-bold">
                  Đề xuất hành động
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary-fixed-dim text-[16px] mt-0.5">
                      priority_high
                    </span>
                    <span className="font-body-md text-sm text-on-surface">
                      Ưu tiên xử lý 3 nhiệm vụ Địa chính có thời hạn trong 7 ngày.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-error text-[16px] mt-0.5">
                      error
                    </span>
                    <span className="font-body-md text-sm text-on-surface">
                      Rà soát 7 phản ánh quá hạn.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary-container text-[16px] mt-0.5">
                      monitoring
                    </span>
                    <span className="font-body-md text-sm text-on-surface">
                      Theo dõi KPI của 2 cán bộ đang dưới 70%.
                    </span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/ai-agent')}
                className="w-full mt-2 py-2 border border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-on-primary transition-colors shadow-xs"
              >
                Yêu cầu AI phân tích chi tiết
              </button>
            </div>
          </div>

          {/* Mini Chart: Phản ánh theo lĩnh vực */}
          <div className="glass-card rounded-xl p-5 shadow-xs space-y-3">
            <h3 className="font-title-lg text-sm font-bold">Phản ánh theo lĩnh vực</h3>
            <div className="space-y-3">
              {[
                { label: 'Hạ tầng giao thông', percent: 45, color: 'bg-primary' },
                { label: 'Môi trường & Rác thải', percent: 30, color: 'bg-secondary' },
                { label: 'Trật tự đô thị', percent: 15, color: 'bg-amber-600' },
                { label: 'Khác', percent: 10, color: 'bg-gray-400' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-on-surface">{item.label}</span>
                    <span className="font-bold">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
