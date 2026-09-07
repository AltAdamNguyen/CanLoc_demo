import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface EventItem {
  id: string
  title: string
  time: string
  location: string
  category: string
  leader: string
  status: string
  dayIndex: number // 0: Mon, 1: Tue, etc.
  top: string
  height: string
  bgClass: string
  borderClass: string
  textClass: string
  note?: string
}

export const CalendarPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'day' | 'week' | 'month'>('week')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const events: EventItem[] = [
    {
      id: 'e1',
      title: 'Họp giao ban UBND',
      time: '08:00 - 09:30',
      location: 'Phòng họp số 1',
      category: 'Lịch Lãnh Đạo',
      leader: 'Đ/c Nguyễn Văn A - Chủ tịch UBND',
      status: 'Đã xác nhận',
      dayIndex: 0,
      top: '0rem',
      height: '4.5rem',
      bgClass: 'bg-error-container/30 hover:bg-error-container/50',
      borderClass: 'border-l-4 border-primary',
      textClass: 'text-primary',
      note: 'Đánh giá công tác chỉ đạo điều hành tuần 36 và triển khai nhiệm vụ trọng tâm tuần 37.',
    },
    {
      id: 'e2',
      title: 'Tiếp công dân định kỳ',
      time: '10:00 - 11:30',
      location: 'Phòng Tiếp Dân',
      category: 'Tiếp công dân',
      leader: 'Đ/c Nguyễn Văn A - Chủ tịch UBND',
      status: 'Đã xác nhận',
      dayIndex: 0,
      top: '6rem',
      height: '4rem',
      bgClass: 'bg-tertiary-fixed/30 hover:bg-tertiary-fixed/50',
      borderClass: 'border-l-4 border-tertiary-container',
      textClass: 'text-tertiary',
      note: 'Giải quyết phản ánh về đất đai khu vực Thôn 3.',
    },
    {
      id: 'e3',
      title: 'Ban Chỉ đạo CĐS',
      time: '14:00 - 15:30',
      location: 'Phòng trực tuyến',
      category: 'Chuyển đổi số',
      leader: 'Đ/c Lê Văn B - Phó Chủ tịch',
      status: 'Đã xác nhận',
      dayIndex: 0,
      top: '18rem',
      height: '4rem',
      bgClass: 'bg-secondary-fixed/30 hover:bg-secondary-fixed/50',
      borderClass: 'border-l-4 border-secondary',
      textClass: 'text-secondary',
      note: 'Kiểm tra tỷ lệ số hóa hồ sơ thủ tục hành chính.',
    },
    {
      id: 'e4',
      title: 'Kiểm tra TT Đô thị',
      time: '16:00 - 17:00',
      location: 'Tuyến đường Lê Lợi',
      category: 'Trật tự đô thị',
      leader: 'Công an & Đô thị',
      status: 'Đã xác nhận',
      dayIndex: 0,
      top: '24rem',
      height: '3rem',
      bgClass: 'bg-surface-container-high hover:bg-surface-container',
      borderClass: 'border border-outline-variant border-l-4 border-outline',
      textClass: 'text-on-surface',
    },
    {
      id: 'e5',
      title: 'Làm việc với Phòng TNMT',
      time: '09:00 - 10:30',
      location: 'Phòng họp số 2',
      category: 'Chuyên môn',
      leader: 'Đ/c Nguyễn Văn A & Cán bộ ĐC',
      status: 'Đã xác nhận',
      dayIndex: 1,
      top: '3rem',
      height: '4rem',
      bgClass: 'bg-error-container/30 hover:bg-error-container/50',
      borderClass: 'border-l-4 border-primary',
      textClass: 'text-primary',
    },
    {
      id: 'e6',
      title: 'Hội nghị triển khai kế hoạch tháng 9',
      time: '14:30 - 16:30',
      location: 'Hội trường lớn',
      category: 'Toàn thể cơ quan',
      leader: 'Thường trực Đảng ủy & UBND',
      status: 'Đã xác nhận',
      dayIndex: 1,
      top: '19.5rem',
      height: '5rem',
      bgClass: 'bg-secondary-fixed/30 hover:bg-secondary-fixed/50',
      borderClass: 'border-l-4 border-secondary',
      textClass: 'text-secondary',
    },
  ]

  const openEventDrawer = (evt: EventItem) => {
    setSelectedEvent(evt)
    setIsDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb & Header Title */}
      <div className="flex flex-col gap-1">
        <nav className="flex items-center text-xs text-on-surface-variant font-medium">
          <Link to="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-on-surface">Lịch công tác</span>
        </nav>
        <div className="flex justify-between items-end flex-wrap gap-4 mt-2">
          <h1 className="font-display-lg text-display-lg text-on-surface">
            Lịch công tác tuần 37
          </h1>
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Đã đồng bộ lịch với máy chủ điều hành thành công!')}
              className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary-container hover:text-on-primary-container rounded-lg font-label-md text-label-md transition-colors bg-surface shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">sync</span>
              Đồng bộ lịch
            </button>
            <button
              onClick={() => alert('Đang tải xuống lịch công tác tuần 37 (file PDF)...')}
              className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary-container hover:text-on-primary-container rounded-lg font-label-md text-label-md transition-colors bg-surface shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Xuất lịch
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold hover:bg-primary-container shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Tạo lịch công tác
            </button>
          </div>
        </div>
      </div>

      {/* Content Area Layout: Sidebar Filters + Calendar View */}
      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-[600px]">
        {/* Left Filter Sidebar */}
        <div className="w-full xl:w-64 shrink-0 flex flex-col gap-6">
          {/* Mini Calendar */}
          <div className="bg-surface rounded-xl border border-outline-variant p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="font-title-lg text-title-lg text-on-surface font-bold">
                Tháng 9, 2023
              </span>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-surface-variant rounded text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button className="p-1 hover:bg-surface-variant rounded text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-on-surface-variant font-medium">
              <div>T2</div>
              <div>T3</div>
              <div>T4</div>
              <div>T5</div>
              <div>T6</div>
              <div>T7</div>
              <div>CN</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              <div className="p-1 text-on-surface-variant/50">28</div>
              <div className="p-1 text-on-surface-variant/50">29</div>
              <div className="p-1 text-on-surface-variant/50">30</div>
              <div className="p-1 text-on-surface-variant/50">31</div>
              <div className="p-1 hover:bg-surface-variant rounded cursor-pointer">1</div>
              <div className="p-1 hover:bg-surface-variant rounded cursor-pointer">2</div>
              <div className="p-1 hover:bg-surface-variant rounded cursor-pointer text-error">3</div>
              <div className="p-1 hover:bg-surface-variant rounded cursor-pointer">4</div>
              <div className="p-1 hover:bg-surface-variant rounded cursor-pointer">5</div>
              <div className="p-1 hover:bg-surface-variant rounded cursor-pointer">6</div>
              <div className="p-1 hover:bg-surface-variant rounded cursor-pointer">7</div>
              <div className="p-1 hover:bg-surface-variant rounded cursor-pointer">8</div>
              <div className="p-1 hover:bg-surface-variant rounded cursor-pointer">9</div>
              <div className="p-1 hover:bg-surface-variant rounded cursor-pointer text-error">10</div>
              {/* Active Week Row */}
              <div className="p-1 bg-secondary-container text-on-secondary-container rounded font-bold">
                11
              </div>
              <div className="p-1 bg-secondary-container text-on-secondary-container rounded font-bold">
                12
              </div>
              <div className="p-1 bg-secondary-container text-on-secondary-container rounded font-bold relative">
                13
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
              </div>
              <div className="p-1 bg-secondary-container text-on-secondary-container rounded font-bold">
                14
              </div>
              <div className="p-1 bg-secondary-container text-on-secondary-container rounded font-bold">
                15
              </div>
              <div className="p-1 bg-secondary-container text-on-secondary-container rounded font-bold">
                16
              </div>
              <div className="p-1 bg-secondary-container text-on-secondary-container rounded font-bold text-error">
                17
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="bg-surface rounded-xl border border-outline-variant p-4 shadow-sm flex-1">
            <h3 className="font-title-lg text-title-lg text-on-surface mb-4 font-bold">
              Lọc theo phòng ban
            </h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 p-2 hover:bg-surface-variant rounded-lg cursor-pointer transition-colors">
                <input
                  defaultChecked
                  className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                  type="checkbox"
                />
                <span className="font-body-md text-body-md text-on-surface font-medium">
                  Lịch của tôi
                </span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-surface-variant rounded-lg cursor-pointer transition-colors">
                <input
                  defaultChecked
                  className="w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary"
                  type="checkbox"
                />
                <span className="font-body-md text-body-md text-on-surface">Lãnh đạo UBND</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-surface-variant rounded-lg cursor-pointer transition-colors">
                <input
                  defaultChecked
                  className="w-4 h-4 text-tertiary-container rounded border-outline-variant focus:ring-tertiary-container"
                  type="checkbox"
                />
                <span className="font-body-md text-body-md text-on-surface">Văn phòng</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-surface-variant rounded-lg cursor-pointer transition-colors">
                <input
                  className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                  type="checkbox"
                />
                <span className="font-body-md text-body-md text-on-surface">Tư pháp - Hộ tịch</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-surface-variant rounded-lg cursor-pointer transition-colors">
                <input
                  className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                  type="checkbox"
                />
                <span className="font-body-md text-body-md text-on-surface">Văn hóa - Xã hội</span>
              </label>
              <label className="flex items-center gap-3 p-2 hover:bg-surface-variant rounded-lg cursor-pointer transition-colors">
                <input
                  className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
                  type="checkbox"
                />
                <span className="font-body-md text-body-md text-on-surface">Địa chính - Xây dựng</span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Calendar Canvas */}
        <div className="flex-1 bg-surface rounded-xl border border-outline-variant shadow-sm flex flex-col overflow-hidden relative">
          {/* Calendar Header Controls */}
          <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-[#F9FAFB]">
            <div className="flex items-center gap-4">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                11 - 17 Tháng 9, 2023
              </h2>
              <div className="flex rounded-md shadow-xs" role="group">
                <button
                  onClick={() => setActiveView('day')}
                  className={`px-4 py-1.5 text-sm font-medium border border-outline-variant rounded-l-lg transition-colors ${
                    activeView === 'day'
                      ? 'bg-primary-container/10 text-primary font-bold'
                      : 'bg-surface text-on-surface-variant hover:bg-surface-variant'
                  }`}
                  type="button"
                >
                  Ngày
                </button>
                <button
                  onClick={() => setActiveView('week')}
                  className={`px-4 py-1.5 text-sm font-bold border-t border-b border-outline-variant relative ${
                    activeView === 'week'
                      ? 'text-primary bg-primary-container/10'
                      : 'bg-surface text-on-surface-variant hover:bg-surface-variant'
                  }`}
                  type="button"
                >
                  Tuần
                  {activeView === 'week' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveView('month')}
                  className={`px-4 py-1.5 text-sm font-medium border border-outline-variant rounded-r-lg transition-colors ${
                    activeView === 'month'
                      ? 'bg-primary-container/10 text-primary font-bold'
                      : 'bg-surface text-on-surface-variant hover:bg-surface-variant'
                  }`}
                  type="button"
                >
                  Tháng
                </button>
              </div>
            </div>
            <button
              onClick={() => alert('Đã quay về hôm nay')}
              className="text-sm font-medium text-primary hover:underline"
            >
              Hôm nay
            </button>
          </div>

          {/* Calendar Grid (Weekly View) */}
          <div className="flex-1 overflow-auto flex relative min-h-[520px]">
            {/* Time Column */}
            <div className="w-16 shrink-0 border-r border-outline-variant flex flex-col bg-surface-container-lowest">
              <div className="h-12 border-b border-outline-variant"></div>
              {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'].map((time, idx) => (
                <div
                  key={idx}
                  className="h-24 border-b border-outline-variant/30 text-xs text-on-surface-variant text-right pr-2 pt-2 relative"
                >
                  <span className="absolute -top-3 right-2 bg-surface px-1">{time}</span>
                </div>
              ))}
            </div>

            {/* Days Columns (7 days) */}
            <div className="flex-1 grid grid-cols-7 min-w-[800px]">
              {/* Monday 11 */}
              <div className="border-r border-outline-variant flex flex-col relative">
                <div className="h-12 border-b border-outline-variant flex flex-col items-center justify-center bg-[#F9FAFB]">
                  <span className="text-xs text-on-surface-variant uppercase font-semibold">T2</span>
                  <span className="font-headline-sm text-headline-sm font-bold">11</span>
                </div>
                <div className="flex-1 relative">
                  <div className="absolute w-full border-b border-outline-variant/10 top-24"></div>
                  <div className="absolute w-full border-b border-outline-variant/10 top-48"></div>
                  <div className="absolute w-full border-b border-outline-variant/10 top-[18rem]"></div>

                  {/* Monday Events */}
                  {events
                    .filter((e) => e.dayIndex === 0)
                    .map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => openEventDrawer(evt)}
                        className={`absolute left-1 right-1 rounded shadow-xs p-2 text-xs overflow-hidden hover:shadow-md transition-all cursor-pointer group ${evt.bgClass} ${evt.borderClass}`}
                        style={{ top: evt.top, height: evt.height }}
                      >
                        <div className={`font-semibold truncate group-hover:underline ${evt.textClass}`}>
                          {evt.title}
                        </div>
                        <div className="text-on-surface-variant mt-1 flex items-center gap-1 text-[11px]">
                          <span className="material-symbols-outlined text-[12px]">schedule</span>
                          {evt.time}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Tuesday 12 */}
              <div className="border-r border-outline-variant flex flex-col relative bg-surface-variant/20">
                <div className="h-12 border-b border-outline-variant flex flex-col items-center justify-center bg-[#F9FAFB]">
                  <span className="text-xs text-on-surface-variant uppercase font-semibold">T3</span>
                  <span className="font-headline-sm text-headline-sm font-bold">12</span>
                </div>
                <div className="flex-1 relative">
                  {events
                    .filter((e) => e.dayIndex === 1)
                    .map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => openEventDrawer(evt)}
                        className={`absolute left-1 right-1 rounded shadow-xs p-2 text-xs overflow-hidden hover:shadow-md transition-all cursor-pointer group ${evt.bgClass} ${evt.borderClass}`}
                        style={{ top: evt.top, height: evt.height }}
                      >
                        <div className={`font-semibold line-clamp-2 leading-tight ${evt.textClass}`}>
                          {evt.title}
                        </div>
                        <div className="text-on-surface-variant mt-0.5 text-[11px]">{evt.time}</div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Wednesday 13 (Today) */}
              <div className="border-r border-outline-variant flex flex-col relative bg-secondary-container/10">
                <div className="h-12 border-b border-outline-variant flex flex-col items-center justify-center bg-[#F9FAFB] relative">
                  <span className="text-xs text-primary uppercase font-bold">T4</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">13</span>
                  <span className="absolute bottom-1 w-8 h-1 bg-primary rounded-full"></span>
                </div>
                <div className="flex-1 relative">
                  {/* Current Time Indicator Line */}
                  <div className="absolute w-full border-t-2 border-primary top-[10rem] z-10 flex items-center">
                    <span className="absolute -left-1.5 w-3 h-3 bg-primary rounded-full shadow-xs"></span>
                  </div>
                </div>
              </div>

              {/* Thursday 14 */}
              <div className="border-r border-outline-variant flex flex-col relative">
                <div className="h-12 border-b border-outline-variant flex flex-col items-center justify-center bg-[#F9FAFB]">
                  <span className="text-xs text-on-surface-variant uppercase font-semibold">T5</span>
                  <span className="font-headline-sm text-headline-sm font-bold">14</span>
                </div>
                <div className="flex-1 relative"></div>
              </div>

              {/* Friday 15 */}
              <div className="border-r border-outline-variant flex flex-col relative">
                <div className="h-12 border-b border-outline-variant flex flex-col items-center justify-center bg-[#F9FAFB]">
                  <span className="text-xs text-on-surface-variant uppercase font-semibold">T6</span>
                  <span className="font-headline-sm text-headline-sm font-bold">15</span>
                </div>
                <div className="flex-1 relative"></div>
              </div>

              {/* Saturday 16 */}
              <div className="border-r border-outline-variant flex flex-col relative bg-surface-variant/30">
                <div className="h-12 border-b border-outline-variant flex flex-col items-center justify-center bg-surface-variant/50">
                  <span className="text-xs text-on-surface-variant uppercase font-semibold">T7</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface-variant font-bold">
                    16
                  </span>
                </div>
                <div className="flex-1 relative"></div>
              </div>

              {/* Sunday 17 */}
              <div className="flex flex-col relative bg-surface-variant/30">
                <div className="h-12 border-b border-outline-variant flex flex-col items-center justify-center bg-surface-variant/50">
                  <span className="text-xs text-error uppercase font-semibold">CN</span>
                  <span className="font-headline-sm text-headline-sm text-error font-bold">17</span>
                </div>
                <div className="flex-1 relative"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Drawer (Overlay) */}
      {isDrawerOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          ></div>

          <div className="relative w-[400px] max-w-full bg-surface shadow-[-4px_0_24px_rgba(0,0,0,0.15)] border-l border-outline-variant flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-outline-variant flex justify-between items-start bg-primary text-on-primary">
              <div>
                <div className="flex gap-2 items-center mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 border border-white/30 text-white">
                    {selectedEvent.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                    {selectedEvent.status}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold mt-1 leading-tight text-white">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                <div>
                  <p className="font-bold text-on-surface text-sm">{selectedEvent.time}</p>
                  <p className="text-gray-500">Thứ Hai, ngày 11/09/2023</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                <div>
                  <p className="font-bold text-on-surface text-sm">{selectedEvent.location}</p>
                  <p className="text-gray-500">Trụ sở HĐND & UBND Cấp Xã</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-lg">person</span>
                <div>
                  <p className="font-bold text-on-surface text-sm">Chủ trì cuộc họp</p>
                  <p className="text-gray-700">{selectedEvent.leader}</p>
                </div>
              </div>

              {selectedEvent.note && (
                <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                  <span className="font-bold block mb-1 text-on-surface">Nội dung ghi chú:</span>
                  <p className="text-gray-600 leading-relaxed">{selectedEvent.note}</p>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-outline-variant flex justify-end gap-2 bg-[#F9FAFB]">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2 border border-outline-variant rounded-md text-xs font-semibold hover:bg-gray-100"
              >
                Đóng
              </button>
              <button
                onClick={() => alert('Đã sao chép liên kết cuộc họp!')}
                className="px-4 py-2 bg-primary text-white rounded-md text-xs font-semibold hover:bg-primary-container"
              >
                Chia sẻ lịch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo lịch công tác tuần</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold block mb-1">Tiêu đề cuộc họp / công tác *</label>
              <Input placeholder="VD: Họp giao ban thường kỳ..." />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold block mb-1">Ngày làm việc</label>
                <Input type="date" defaultValue="2023-09-11" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Thời gian</label>
                <Input defaultValue="08:00 - 09:30" />
              </div>
            </div>
            <div>
              <label className="font-semibold block mb-1">Địa điểm</label>
              <Input defaultValue="Phòng họp số 1 - Tầng 2" />
            </div>
            <div>
              <label className="font-semibold block mb-1">Người chủ trì</label>
              <Input defaultValue="Đ/c Nguyễn Văn A - Chủ tịch UBND" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Hủy
            </Button>
            <Button
              size="sm"
              onClick={() => {
                alert('Đã tạo lịch công tác thành công!')
                setIsCreateModalOpen(false)
              }}
              className="bg-primary text-white"
            >
              Lưu & Phát hành
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
