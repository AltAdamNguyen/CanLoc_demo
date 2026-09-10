import React, { useState } from 'react'

interface ScheduleEvent {
  id: string
  dayOfWeek: string
  dayNumber: string
  monthText: string
  session: 'Sáng' | 'Chiều' | 'Cả ngày'
  time: string
  title: string
  desc: string
  location: string
  leaderSlugs: string[] // e.g. ['nguyen-van-a'], or ['all']
  leaderName: string
  leaderRole: string
  attendees: string
  status: 'confirmed' | 'citizen-reception' | 'field' | 'online'
  statusLabel: string
  specialNotice?: string
  hotline?: string
  isAllDayHighlight?: boolean
}

// 6 exact events as structured in citizen/schedule.html
const weeklyEvents: ScheduleEvent[] = [
  // THỨ HAI - SÁNG
  {
    id: 'e1',
    dayOfWeek: 'Thứ Hai',
    dayNumber: '24',
    monthText: 'Tháng 02',
    session: 'Sáng',
    time: '08:00 - 11:30',
    title: 'Giao ban Thường trực UBND Xã Can Lộc',
    desc: 'Đánh giá toàn diện công tác phát triển kinh tế - xã hội tháng 2/2025; kiểm tra tiến độ xử lý hồ sơ thủ tục hành chính tại Bộ phận Một cửa và phương án xử lý các phản ánh hiện trường qua hệ thống GIS.',
    location: 'Phòng họp số 1 - Tầng 2 Trụ sở UBND',
    leaderSlugs: ['nguyen-van-a'],
    leaderName: 'Đ/c Nguyễn Văn A',
    leaderRole: 'Chủ tịch UBND Xã (Chủ trì)',
    attendees: 'Thường trực HĐND, các Phó Chủ tịch, Trưởng các ngành đoàn thể, Công chức chuyên môn.',
    status: 'confirmed',
    statusLabel: 'Đã xác nhận',
  },
  // THỨ HAI - CHIỀU
  {
    id: 'e2',
    dayOfWeek: 'Thứ Hai',
    dayNumber: '24',
    monthText: 'Tháng 02',
    session: 'Chiều',
    time: '14:00 - 17:00',
    title: 'Đi thực địa kiểm tra an toàn đê bao & hệ thống kênh tưới',
    desc: 'Kiểm tra cao điểm ứng phó tưới dưỡng lúa Xuân 2025 và khảo sát các đoạn kênh xung yếu phục vụ nạo vét khơi thông dòng chảy tại địa bàn Thôn Phúc Hậu & Thôn Trâm Lạc.',
    location: 'Thực địa đê kênh Phúc Hậu - Trâm Lạc',
    leaderSlugs: ['le-van-c'],
    leaderName: 'Đ/c Lê Văn C',
    leaderRole: 'Phó Chủ tịch UBND (Chủ trì)',
    attendees: 'Cán bộ Nông nghiệp, Địa chính - Xây dựng, Ban Cán sự 2 thôn.',
    status: 'field',
    statusLabel: 'Hiện trường',
  },

  // THỨ BA - CẢ NGÀY (TIẾP CÔNG DÂN)
  {
    id: 'e3',
    dayOfWeek: 'Thứ Ba',
    dayNumber: '25',
    monthText: 'Tháng 02',
    session: 'Cả ngày',
    time: 'CẢ NGÀY (Sáng: 07:30 - 11:30 | Chiều: 13:30 - 17:00)',
    title: 'Tiếp công dân, đối thoại trực tiếp và giải quyết khiếu nại, tố cáo',
    desc: 'Chủ tịch UBND xã trực tiếp lắng nghe ý kiến đóng góp, tiếp nhận phản ánh kiến nghị của nhân dân về các lĩnh vực: Đất đai, cấp giấy chứng nhận QSDĐ, thủ tục bồi thường GPMB, trật tự xây dựng và phản ánh hiện trường.',
    location: 'Phòng Tiếp công dân (Tầng 1, Trụ sở UBND xã Can Lộc)',
    leaderSlugs: ['nguyen-van-a'],
    leaderName: 'Đ/c Nguyễn Văn A',
    leaderRole: 'Chủ tịch UBND Xã Can Lộc (Chủ trì)',
    attendees: 'Phối hợp tiếp dân: Cán bộ Công chức Địa chính - Xây dựng, Cán bộ Tư pháp - Hộ tịch, Trưởng Công an Xã Can Lộc',
    status: 'citizen-reception',
    statusLabel: 'Định kỳ',
    specialNotice: 'LỊCH TIẾP CÔNG DÂN ĐỊNH KỲ CỦA CHỦ TỊCH UBND XÃ',
    hotline: 'Hotline Ban tiếp dân: 0239.3841.115',
    isAllDayHighlight: true,
  },

  // THỨ TƯ - SÁNG (CĐS)
  {
    id: 'e4',
    dayOfWeek: 'Thứ Tư',
    dayNumber: '26',
    monthText: 'Tháng 02',
    session: 'Sáng',
    time: '08:30 - 11:30',
    title: 'Tập huấn Số hóa hồ sơ chứng thực điện tử & Cấp chữ ký số',
    desc: 'Triển khai nghiệp vụ tạo lập bản sao chứng thực điện tử từ bản chính trên Cổng Dịch vụ công quốc gia; phối hợp VNPT Hà Tĩnh cấp phát chữ ký số miễn phí cho Tổ công nghệ số cộng đồng và nhân dân tại 06 thôn.',
    location: 'Hội trường Lớn Tầng 2 Trụ sở UBND',
    leaderSlugs: ['tran-thi-b'],
    leaderName: 'Đ/c Trần Thị B',
    leaderRole: 'Phó Chủ tịch UBND Khối Văn xã (Chủ trì)',
    attendees: 'Tổ CNTT, Bí thư/Thôn trưởng và Thành viên Tổ CNS cộng đồng 06 thôn.',
    status: 'online',
    statusLabel: 'Chuyển đổi số',
  },

  // THỨ NĂM - CHIỀU (ĐOÀN HUYỆN)
  {
    id: 'e5',
    dayOfWeek: 'Thứ Năm',
    dayNumber: '27',
    monthText: 'Tháng 02',
    session: 'Chiều',
    time: '14:00 - 16:30',
    title: 'Làm việc với Đoàn kiểm tra Ban Chỉ đạo CĐS Huyện Can Lộc',
    desc: 'Đánh giá kết quả thực hiện Bộ chỉ số Cải cách hành chính (PAR INDEX) và Chỉ số Chuyển đổi số (DTI) cấp xã đợt 1 năm 2025; kiểm tra quy trình Một cửa liên thông.',
    location: 'Phòng họp số 1 - Tầng 2 Trụ sở UBND',
    leaderSlugs: ['nguyen-van-a', 'tran-thi-b', 'le-van-c'],
    leaderName: 'Tập thể Thường trực UBND',
    leaderRole: 'Chủ tịch & các Phó Chủ tịch tiếp đoàn',
    attendees: 'Đại diện Phòng Nội vụ, Phòng VH-TT huyện, Cán bộ Một cửa xã Can Lộc.',
    status: 'confirmed',
    statusLabel: 'Đã xác nhận',
  },

  // THỨ SÁU - CHIỀU (HỌP RÀ SOÁT ĐƠN THƯ)
  {
    id: 'e6',
    dayOfWeek: 'Thứ Sáu',
    dayNumber: '28',
    monthText: 'Tháng 02',
    session: 'Chiều',
    time: '15:00 - 17:00',
    title: 'Họp rà soát giải quyết dứt điểm đơn thư & phản ánh tháng 02/2025',
    desc: 'Nghe các bộ phận chuyên môn báo cáo tiến độ xử lý 04 vụ việc đơn thư tồn đọng và kết quả khắc phục các phản ánh về hạ tầng giao thông nông thôn của cử tri.',
    location: 'Phòng Tiếp dân & Phòng họp số 2',
    leaderSlugs: ['nguyen-van-a', 'le-van-c'],
    leaderName: 'Đ/c Nguyễn Văn A',
    leaderRole: 'Chủ tịch UBND Xã (Chủ trì)',
    attendees: 'PCT Lê Văn C, Địa chính, Tư pháp, Trưởng ban Thanh tra nhân dân.',
    status: 'confirmed',
    statusLabel: 'Đã xác nhận',
  },
]

export const CitizenSchedulePage: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<string>('all')
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false)

  // Booking Form States
  const [citizenName, setCitizenName] = useState('')
  const [citizenPhone, setCitizenPhone] = useState('')
  const [citizenCccd, setCitizenCccd] = useState('')
  const [citizenHamlet, setCitizenHamlet] = useState('Thôn Phúc Hậu')
  const [bookingDate, setBookingDate] = useState('2025-02-25')
  const [bookingContent, setBookingContent] = useState('')

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSuccess(true)
  }

  const filteredEvents = weeklyEvents.filter((ev) => {
    if (selectedLeader === 'all') return true
    return ev.leaderSlugs.includes(selectedLeader)
  })

  // Group events by dayOfWeek for rendering with rowspan
  const uniqueDays = Array.from(new Set(filteredEvents.map((e) => e.dayOfWeek)))

  return (
    <div className="flex flex-col w-full gap-6 pb-12">
      {/* 1. TOP COMMAND RIBBON */}
      <section className="bg-surface-container-lowest p-6 rounded-xl shadow-xs flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md shrink-0">
              <span className="material-symbols-outlined text-[28px]">calendar_month</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  LỊCH ĐIỀU HÀNH CHÍNH THỨC
                </span>
                <span className="text-label-sm font-label-sm text-on-surface-variant tracking-wider uppercase">
                  Cập nhật: 07:30, 24/02/2025
                </span>
              </div>
              <h1 className="text-headline-md font-headline-md text-on-surface tracking-tight uppercase">
                LỊCH CÔNG TÁC TUẦN THƯỜNG TRỰC UBND XÃ CAN LỘC
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() =>
                alert('Đã gửi liên kết đồng bộ iCal/Google Calendar vào tài khoản VNeID của bạn!')
              }
              id="btn-sync-cal"
              className="flex items-center gap-2 bg-surface-container-low hover:bg-surface-container text-on-surface px-4 py-2 rounded-lg text-label-md font-label-md transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary">sync_alt</span>
              <span>Đồng bộ Lịch cá nhân</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-4 py-2 rounded-lg text-label-md font-label-md transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Xuất PDF / In Lịch</span>
            </button>
          </div>
        </div>

        {/* Week Selector and Filter Toolbar */}
        <div className="bg-surface-container-low p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface transition-colors shadow-xs"
              title="Tuần trước"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-surface-container-lowest rounded-lg shadow-xs">
              <span className="material-symbols-outlined text-[20px] text-primary">date_range</span>
              <span className="font-title-lg text-title-lg text-on-surface">
                Tuần 09 (24/02/2025 - 28/02/2025)
              </span>
            </div>
            <button
              className="p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface transition-colors shadow-xs"
              title="Tuần sau"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-label-md font-label-md text-on-surface-variant transition-colors shadow-xs ml-2">
              Tuần hiện tại
            </button>
          </div>

          {/* Leader Filter Badges */}
          <div className="flex flex-wrap items-center gap-2" id="leader-filter-container">
            <span className="text-label-md font-label-md text-on-surface-variant mr-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Lọc theo:
            </span>
            {[
              { id: 'all', label: 'Tất cả lãnh đạo' },
              { id: 'nguyen-van-a', label: 'Đ/c Nguyễn Văn A (Chủ tịch)' },
              { id: 'le-van-c', label: 'Đ/c Lê Văn C (PCT Kinh tế)' },
              { id: 'tran-thi-b', label: 'Đ/c Trần Thị B (PCT Văn hóa)' },
            ].map((chip) => {
              const isActive = selectedLeader === chip.id
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedLeader(chip.id)}
                  className={`px-3 py-1.5 rounded-full text-label-md font-label-md transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {chip.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* 2. KPI METRIC OVERVIEW FOR THE WEEK */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-fixed"></div>
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-label-md font-label-md uppercase">Tổng sự kiện tuần</span>
            <span className="material-symbols-outlined text-[20px] text-tertiary">event_note</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg font-display-lg text-primary font-bold">14</span>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              cuộc họp &amp; đi cơ sở
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-label-md font-label-md uppercase">Tiếp công dân định kỳ</span>
            <span className="material-symbols-outlined text-[20px] text-primary">record_voice_over</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg font-display-lg text-primary font-bold">01</span>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              ngày trọn vẹn (Thứ Ba)
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary"></div>
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-label-md font-label-md uppercase">Làm việc ngoại kiểm / Huyện</span>
            <span className="material-symbols-outlined text-[20px] text-tertiary">corporate_fare</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg font-display-lg text-tertiary font-bold">02</span>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              phiên phối hợp CĐS
            </span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-secondary-fixed"></div>
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-label-md font-label-md uppercase">Kiểm tra hiện trường GIS</span>
            <span className="material-symbols-outlined text-[20px] text-secondary">explore</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-display-lg font-display-lg text-on-surface font-bold">03</span>
            <span className="text-label-sm font-label-sm text-on-surface-variant">
              thôn trọng điểm
            </span>
          </div>
        </div>
      </section>

      {/* 3. WEEKLY TIMETABLE LAYOUT */}
      <section className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden flex flex-col">
        {/* Header of the Table */}
        <div className="bg-surface-container-low px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">view_timeline</span>
            <span className="font-title-lg text-title-lg text-on-surface">
              CHƯƠNG TRÌNH LỊCH CHI TIẾT THEO NGÀY
            </span>
          </div>
          <div className="flex items-center gap-3 text-label-sm font-label-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <span>Đã xác nhận</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
              <span>Tiếp công dân</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              <span>Trực tuyến / CĐS</span>
            </span>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                <th className="py-3 px-4 w-40">Thứ / Ngày</th>
                <th className="py-3 px-4 w-36">Thời gian</th>
                <th className="py-3 px-6">Nội dung công tác &amp; Địa điểm</th>
                <th className="py-3 px-4 w-72">Thành phần tham dự &amp; Chủ trì</th>
                <th className="py-3 px-4 w-36 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              {uniqueDays.map((day) => {
                const dayEvents = filteredEvents.filter((ev) => ev.dayOfWeek === day)

                return dayEvents.map((ev, index) => {
                  const isFirstOfDay = index === 0

                  // Row background matching schedule.html (Thứ Ba is special highlight)
                  const rowClass = ev.isAllDayHighlight
                    ? 'bg-surface-container/50 hover:bg-surface-container transition-colors cursor-pointer'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer'

                  return (
                    <tr
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className={`schedule-row ${rowClass}`}
                    >
                      {/* Day Column with Rowspan */}
                      {isFirstOfDay && (
                        <td
                          rowSpan={dayEvents.length}
                          className={`py-4 px-4 align-top ${
                            ev.isAllDayHighlight
                              ? 'bg-surface-container-low/60'
                              : 'bg-surface-container-low/40'
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-lowest shadow-xs">
                            <span className="text-label-sm font-label-sm font-bold uppercase text-primary">
                              {ev.dayOfWeek}
                            </span>
                            <span className="text-display-lg font-display-lg font-bold text-on-surface leading-tight">
                              {ev.dayNumber}
                            </span>
                            <span className="text-label-sm font-label-sm text-on-surface-variant">
                              {ev.monthText}
                            </span>
                          </div>
                        </td>
                      )}

                      {/* Time Column */}
                      <td className="py-4 px-4 align-top">
                        {ev.isAllDayHighlight ? (
                          <>
                            <div className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-primary bg-primary px-3 py-1.5 rounded-lg shadow-xs font-bold">
                              <span className="material-symbols-outlined text-[18px]">
                                event_available
                              </span>
                              CẢ NGÀY
                            </div>
                            <div className="text-label-sm font-label-sm text-on-surface-variant mt-2">
                              Sáng: 07:30 - 11:30
                              <br />
                              Chiều: 13:30 - 17:00
                            </div>
                          </>
                        ) : ev.status === 'field' ? (
                          <div className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface font-semibold bg-surface-container px-2.5 py-1 rounded">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            {ev.time}
                          </div>
                        ) : ev.status === 'online' ? (
                          <div className="inline-flex items-center gap-1.5 font-label-md text-label-md text-tertiary font-semibold bg-tertiary-fixed/40 px-2.5 py-1 rounded">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            {ev.time}
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary font-semibold bg-primary-fixed/30 px-2.5 py-1 rounded">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            {ev.time}
                          </div>
                        )}
                      </td>

                      {/* Content & Location Column */}
                      <td className="py-4 px-6 align-top">
                        {ev.specialNotice && (
                          <div className="inline-block px-2.5 py-1 mb-2 rounded bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold uppercase tracking-wider">
                            {ev.specialNotice}
                          </div>
                        )}
                        <div
                          className={`${
                            ev.isAllDayHighlight
                              ? 'font-headline-sm text-headline-sm text-on-surface mb-2 font-bold'
                              : 'font-title-lg text-title-lg text-on-surface mb-1.5'
                          }`}
                        >
                          {ev.title}
                        </div>
                        <p
                          className={`text-body-md font-body-md ${
                            ev.isAllDayHighlight ? 'text-on-surface mb-3' : 'text-on-surface-variant mb-2'
                          }`}
                        >
                          {ev.desc}
                        </p>

                        <div
                          className={`flex flex-wrap items-center gap-2 text-label-sm font-label-sm ${
                            ev.status === 'field'
                              ? 'text-secondary'
                              : ev.isAllDayHighlight
                              ? 'text-primary gap-3'
                              : 'text-tertiary'
                          }`}
                        >
                          {ev.isAllDayHighlight ? (
                            <>
                              <span className="flex items-center gap-1 bg-surface-container-lowest px-2.5 py-1 rounded shadow-xs">
                                <span className="material-symbols-outlined text-[16px]">room</span>
                                {ev.location}
                              </span>
                              {ev.hotline && (
                                <span className="flex items-center gap-1 text-on-surface-variant bg-surface-container-lowest px-2.5 py-1 rounded shadow-xs">
                                  <span className="material-symbols-outlined text-[16px]">call</span>
                                  {ev.hotline}
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-[16px]">
                                {ev.status === 'field'
                                  ? 'location_on'
                                  : ev.status === 'online'
                                  ? 'laptop_mac'
                                  : ev.id === 'e5'
                                  ? 'apartment'
                                  : 'meeting_room'}
                              </span>
                              <span>Địa điểm: {ev.location}</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Leadership and Attendees Column */}
                      <td className="py-4 px-4 align-top">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`material-symbols-outlined text-[18px] ${
                                ev.isAllDayHighlight
                                  ? 'text-primary text-[20px]'
                                  : ev.status === 'online'
                                  ? 'text-tertiary'
                                  : ev.status === 'field'
                                  ? 'text-on-surface'
                                  : 'text-primary'
                              }`}
                            >
                              {ev.isAllDayHighlight
                                ? 'gavel'
                                : ev.id === 'e5'
                                ? 'groups'
                                : 'person'}
                            </span>
                            <span
                              className={`font-body-md text-body-md font-semibold ${
                                ev.isAllDayHighlight
                                  ? 'text-title-lg font-title-lg font-bold text-primary'
                                  : ev.status === 'field'
                                  ? 'text-on-surface'
                                  : 'text-primary'
                              }`}
                            >
                              {ev.leaderName}
                            </span>
                          </div>
                          <span
                            className={`text-label-sm font-label-sm text-on-surface-variant ${
                              ev.isAllDayHighlight ? 'pl-7 font-semibold' : 'pl-6'
                            }`}
                          >
                            {ev.leaderRole}
                          </span>

                          <div
                            className={`text-label-sm font-label-sm text-on-surface-variant p-2 rounded mt-1 ${
                              ev.isAllDayHighlight
                                ? 'bg-surface-container-lowest p-2.5 rounded-lg shadow-xs'
                                : 'bg-surface-container-low'
                            }`}
                          >
                            {ev.isAllDayHighlight ? (
                              <>
                                <strong>Phối hợp tiếp dân:</strong>
                                <br />
                                • Cán bộ Công chức Địa chính - Xây dựng
                                <br />
                                • Cán bộ Tư pháp - Hộ tịch
                                <br />• Trưởng Công an Xã Can Lộc
                              </>
                            ) : (
                              <>
                                <strong>Thành phần:</strong> {ev.attendees.replace(/^Thành phần:\s*/, '')}
                              </>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="py-4 px-4 align-top text-center">
                        {ev.isAllDayHighlight ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm bg-primary text-on-primary font-bold shadow-xs animate-pulse">
                            <span className="material-symbols-outlined text-[16px]">
                              assignment_turned_in
                            </span>
                            {ev.statusLabel}
                          </span>
                        ) : ev.status === 'field' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm bg-secondary-fixed text-on-secondary-fixed font-semibold">
                            <span className="material-symbols-outlined text-[14px]">travel_explore</span>
                            {ev.statusLabel}
                          </span>
                        ) : ev.status === 'online' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm bg-tertiary/10 text-tertiary font-medium">
                            <span className="material-symbols-outlined text-[14px]">cell_tower</span>
                            {ev.statusLabel}
                          </span>
                        ) : ev.id === 'e5' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm bg-primary/10 text-primary font-medium">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            {ev.statusLabel}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-sm font-label-sm bg-primary/10 text-primary font-medium">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            {ev.statusLabel}
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. CITIZENS RECEPTION PORTAL & APPOINTMENT REGISTRATION (Lines 435-576 of schedule.html) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Regulation Table Card (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-xl shadow-xs flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">gavel</span>
              </div>
              <div>
                <h2 className="text-title-lg font-title-lg text-on-surface">
                  LỊCH TIẾP CÔNG DÂN ĐỊNH KỲ NĂM 2025
                </h2>
                <p className="text-label-sm font-label-sm text-on-surface-variant">
                  Thực hiện theo Luật Tiếp công dân số 42/2013/QH13 của Thường trực Xã
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-surface-container text-label-sm font-label-sm text-on-surface font-semibold shrink-0">
              Công khai 24/7
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase">
                  <th className="py-2.5 px-3">Lãnh đạo phụ trách</th>
                  <th className="py-2.5 px-3">Chức vụ</th>
                  <th className="py-2.5 px-3">Lịch tiếp định kỳ</th>
                  <th className="py-2.5 px-3">Địa điểm</th>
                </tr>
              </thead>
              <tbody className="text-body-md font-body-md text-on-surface divide-y divide-surface-container-low">
                <tr className="hover:bg-surface-container-low/40">
                  <td className="py-3 px-3 font-semibold text-primary">Đ/c Phan Đình Đ</td>
                  <td className="py-3 px-3 text-label-md font-label-md">Bí thư Đảng ủy Xã</td>
                  <td className="py-3 px-3 font-semibold text-on-surface">Ngày 10 &amp; 25 hàng tháng</td>
                  <td className="py-3 px-3 text-label-sm font-label-sm text-on-surface-variant">
                    Phòng Tiếp dân UBND
                  </td>
                </tr>
                <tr className="bg-surface-container-low/30 hover:bg-surface-container-low">
                  <td className="py-3 px-3 font-semibold text-primary">Đ/c Nguyễn Văn A</td>
                  <td className="py-3 px-3 text-label-md font-label-md">Chủ tịch UBND Xã</td>
                  <td className="py-3 px-3 font-semibold text-primary">Thứ Ba hàng tuần</td>
                  <td className="py-3 px-3 text-label-sm font-label-sm text-on-surface-variant">
                    Phòng Tiếp dân UBND
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/40">
                  <td className="py-3 px-3 font-semibold text-on-surface">Đ/c Lê Văn C</td>
                  <td className="py-3 px-3 text-label-md font-label-md">Phó Chủ tịch UBND (Kinh tế)</td>
                  <td className="py-3 px-3">Thứ Năm tuần thứ 2 &amp; 4</td>
                  <td className="py-3 px-3 text-label-sm font-label-sm text-on-surface-variant">
                    Phòng Tiếp dân UBND
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/40">
                  <td className="py-3 px-3 font-semibold text-on-surface">Đ/c Trần Thị B</td>
                  <td className="py-3 px-3 text-label-md font-label-md">Phó Chủ tịch UBND (Văn xã)</td>
                  <td className="py-3 px-3">Thứ Sáu tuần thứ 1 &amp; 3</td>
                  <td className="py-3 px-3 text-label-sm font-label-sm text-on-surface-variant">
                    Phòng Tiếp dân UBND
                  </td>
                </tr>
                <tr className="bg-surface-container-low/20">
                  <td className="py-3 px-3 font-semibold text-on-surface">Bộ phận Thường trực</td>
                  <td className="py-3 px-3 text-label-md font-label-md">Cán bộ Tiếp dân chuyên trách</td>
                  <td className="py-3 px-3 font-semibold text-secondary">Tất cả các ngày làm việc</td>
                  <td className="py-3 px-3 text-label-sm font-label-sm text-on-surface-variant">
                    Phòng Tiếp công dân
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-lg bg-surface-container-low flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">info</span>
            <p className="text-label-sm font-label-sm text-on-surface-variant">
              <strong>Lưu ý công dân:</strong> Trong trường hợp trùng lịch họp đột xuất khẩn cấp của
              Tỉnh/Huyện, UBND xã sẽ bố trí Phó Chủ tịch trực thay hoặc thông báo dời lịch trên Cổng thông
              tin và gửi SMS tới các công dân đã đặt lịch trước.
            </p>
          </div>
        </div>

        {/* Citizen Appointment Booking Form (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-xl shadow-xs flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">edit_calendar</span>
            </div>
            <div>
              <h2 className="text-title-lg font-title-lg text-on-surface">ĐĂNG KÝ TIẾP DÂN TRỰC TUYẾN</h2>
              <p className="text-label-sm font-label-sm text-on-surface-variant">
                Gửi trước hồ sơ để Lãnh đạo nghiên cứu xử lý chu đáo
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleBookingSubmit}>
            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-1">
                Họ và tên công dân / Đại diện (*)
              </label>
              <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-lg">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">badge</span>
                <input
                  className="w-full bg-transparent border-none outline-none text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50"
                  placeholder="Nguyễn Văn A"
                  required
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant mb-1">
                  Số điện thoại (*)
                </label>
                <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-lg">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">phone</span>
                  <input
                    className="w-full bg-transparent border-none outline-none text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50"
                    placeholder="0912.xxx.xxx"
                    required
                    type="tel"
                    value={citizenPhone}
                    onChange={(e) => setCitizenPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant mb-1">
                  Số CCCD / VNeID (*)
                </label>
                <div className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-lg">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">fingerprint</span>
                  <input
                    className="w-full bg-transparent border-none outline-none text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50"
                    placeholder="0420xxxxxx"
                    required
                    type="text"
                    value={citizenCccd}
                    onChange={(e) => setCitizenCccd(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant mb-1">
                  Thôn / Cụm cư trú
                </label>
                <select
                  value={citizenHamlet}
                  onChange={(e) => setCitizenHamlet(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded-lg text-body-md font-body-md text-on-surface outline-none"
                >
                  <option>Thôn Phúc Hậu</option>
                  <option>Thôn Trâm Lạc</option>
                  <option>Thôn Đông Nam</option>
                  <option>Thôn Yên Bình</option>
                  <option>Thôn Vĩnh Phú</option>
                  <option>Thôn Cát Mộng</option>
                  <option>Địa phương khác</option>
                </select>
              </div>

              <div>
                <label className="block text-label-md font-label-md text-on-surface-variant mb-1">
                  Ngày mong muốn tiếp
                </label>
                <input
                  className="w-full bg-surface-container-low px-3 py-2 rounded-lg text-body-md font-body-md text-on-surface outline-none"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-1">
                Lĩnh vực &amp; Tóm tắt nội dung kiến nghị (*)
              </label>
              <textarea
                className="w-full bg-surface-container-low p-2.5 rounded-lg text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 outline-none resize-none"
                placeholder="Tóm tắt ngắn gọn nội dung cần phản ánh, khiếu nại hoặc đối thoại trực tiếp..."
                required
                rows={2}
                value={bookingContent}
                onChange={(e) => setBookingContent(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-label-md font-label-md text-on-surface-variant mb-1">
                Tài liệu đính kèm (nếu có)
              </label>
              <div className="bg-surface-container-low border border-dashed border-outline-variant p-3 rounded-lg flex items-center justify-center gap-2 text-on-surface-variant cursor-pointer hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[20px] text-primary">upload_file</span>
                <span className="text-label-sm font-label-sm">
                  Bấm để tải tệp PDF, ảnh giấy chứng nhận hoặc đơn kiến nghị
                </span>
              </div>
            </div>

            {bookingSuccess && (
              <div className="p-3 rounded-lg bg-surface-container-highest text-on-surface flex items-center gap-2 animate-in fade-in duration-200">
                <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                <span className="text-label-sm font-label-sm font-semibold">
                  Đăng ký thành công! Mã tiếp nhận: <strong className="text-primary">TD-2025-092</strong>. Ban
                  Tiếp dân sẽ liên hệ xác nhận trong 2h.
                </span>
              </div>
            )}

            <button
              className="w-full bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container py-2.5 rounded-lg text-label-md font-label-md font-semibold transition-colors shadow-xs flex items-center justify-center gap-2"
              type="submit"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Gửi Phiếu Đăng Ký Tiếp Dân</span>
            </button>
          </form>
        </div>
      </section>

      {/* 5. MODAL: EVENT DETAILS */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-surface-container-high animate-in zoom-in-95 duration-150">
            <div className="bg-primary text-on-primary px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed">calendar_month</span>
                <span className="font-bold text-sm">Chi Tiết Lịch Công Tác</span>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-on-primary/80 hover:text-on-primary p-1 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-xs text-on-surface">
              {selectedEvent.specialNotice && (
                <div className="inline-block px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold uppercase">
                  {selectedEvent.specialNotice}
                </div>
              )}
              <div className="font-bold text-base text-on-surface">{selectedEvent.title}</div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container-high">
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase font-bold">
                    Thời gian:
                  </span>
                  <span className="font-semibold text-primary text-xs">
                    {selectedEvent.dayOfWeek}, {selectedEvent.time}
                  </span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[10px] uppercase font-bold">
                    Trạng thái:
                  </span>
                  <span className="font-semibold text-on-surface text-xs">
                    {selectedEvent.statusLabel}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-on-surface block mb-1">Địa điểm:</span>
                <p className="text-on-surface bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high font-medium">
                  {selectedEvent.location}
                </p>
              </div>

              <div>
                <span className="font-bold text-on-surface block mb-1">Nội dung chi tiết:</span>
                <p className="text-on-surface-variant leading-relaxed">{selectedEvent.desc}</p>
              </div>

              <div>
                <span className="font-bold text-on-surface block mb-1">
                  Lãnh đạo chủ trì &amp; Thành phần:
                </span>
                <div className="text-on-surface space-y-1 bg-surface-container-low p-2.5 rounded-lg">
                  <div>
                    Chủ trì: <strong>{selectedEvent.leaderName}</strong> ({selectedEvent.leaderRole})
                  </div>
                  <div>Thành phần: {selectedEvent.attendees}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-container-high flex justify-end">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold"
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

export default CitizenSchedulePage
