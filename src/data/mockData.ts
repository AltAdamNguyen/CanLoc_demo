export interface KpiItem {
  id: string
  title: string
  target: string
  current: string
  progress: number
  status: 'completed' | 'in_progress' | 'pending' | 'overdue'
  assignedTo: string
  deadline: string
  department: string
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  leader: string
  department: string
  type: 'ubnd' | 'dang_uy' | 'hdnd' | 'doan_the'
  status: 'upcoming' | 'ongoing' | 'finished'
  participants: string[]
  notes?: string
}

export interface FeedbackItem {
  id: string
  code: string
  citizenName: string
  phone: string
  hamlet: string // Thôn / xóm
  category: 'Đất đai - Xây dựng' | 'Môi trường' | 'An ninh trật tự' | 'Hạ tầng giao thông' | 'Chính sách xã hội'
  content: string
  submittedAt: string
  status: 'Chờ tiếp nhận' | 'Đang xử lý' | 'Đã giải quyết' | 'Quá hạn'
  urgent: boolean
  assignedUnit: string
  response?: string
}

export interface VotingPoll {
  id: string
  title: string
  code: string
  category: 'Nghị quyết HĐND' | 'Ý kiến nhân dân' | 'Dự án đầu tư'
  startDate: string
  endDate: string
  totalVoters: number
  status: 'Đang diễn ra' | 'Đã kết thúc'
  options: {
    id: string
    text: string
    votes: number
    percent: number
  }[]
}

export interface AdminUser {
  id: string
  fullName: string
  username: string
  email: string
  phone: string
  role: 'Chủ tịch UBND' | 'Phó Chủ tịch UBND' | 'Công chức Tư pháp - Hộ tịch' | 'Địa chính - Xây dựng' | 'Văn phòng - Thống kê' | 'Quản trị hệ thống'
  department: string
  status: 'active' | 'inactive'
  lastLogin: string
}

// Mock Data
export const mockOverviewStats = {
  totalRecordsReceived: 1428,
  recordsResolvedEarly: 1120,
  recordsOnTime: 285,
  recordsLate: 23,
  citizenSatisfactionRate: 98.6,
  feedbackResolvedRate: 94.2,
  todayMeetingsCount: 4,
}

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Họp giao ban Thường trực Đảng ủy & Thường trực UBND xã',
    date: '2025-03-10',
    time: '08:00 - 10:30',
    location: 'Phòng họp số 1 - Tầng 2 Trụ sở UBND',
    leader: 'Đ/c Nguyễn Văn A - Bí thư Đảng ủy, Chủ tịch HĐND',
    department: 'Thường trực Đảng ủy',
    type: 'dang_uy',
    status: 'upcoming',
    participants: ['Lãnh đạo UBND', 'Trưởng các đoàn thể', 'Văn phòng Đảng ủy'],
    notes: 'Bàn kế hoạch triển khai chiến dịch xây dựng Nông thôn mới nâng cao đợt 1/2025',
  },
  {
    id: 'evt-2',
    title: 'Tiếp công dân định kỳ của Chủ tịch UBND xã',
    date: '2025-03-10',
    time: '14:00 - 17:00',
    location: 'Phòng Tiếp công dân UBND xã',
    leader: 'Đ/c Trần Văn B - Chủ tịch UBND xã',
    department: 'Thường trực UBND',
    type: 'ubnd',
    status: 'upcoming',
    participants: ['Địa chính - Xây dựng', 'Tư pháp - Hộ tịch', 'Công an xã'],
    notes: 'Giải quyết các vướng mắc về cấp giấy chứng nhận QSDĐ tại Thôn 3 và Thôn 5',
  },
  {
    id: 'evt-3',
    title: 'Kiểm tra thực địa tiến độ thi công tuyến đường hoa nông thôn Thôn 4',
    date: '2025-03-11',
    time: '08:30 - 11:00',
    location: 'Tuyến đường liên thôn Thôn 4',
    leader: 'Đ/c Lê Thị C - Phó Chủ tịch UBND xã',
    department: 'Kinh tế - Nông nghiệp',
    type: 'ubnd',
    status: 'upcoming',
    participants: ['Hội Nông dân', 'Đoàn Thanh niên', 'Ban cán sự Thôn 4'],
  },
  {
    id: 'evt-4',
    title: 'Hội nghị lấy ý kiến cử tri dự thảo quy hoạch phát triển cụm công nghiệp làng nghề',
    date: '2025-03-12',
    time: '09:00 - 11:30',
    location: 'Hội trường lớn UBND xã',
    leader: 'Đ/c Trần Văn B - Chủ tịch UBND xã',
    department: 'Địa chính - Xây dựng',
    type: 'hdnd',
    status: 'upcoming',
    participants: ['Đại biểu HĐND xã', 'Bí thư, Thôn trưởng các thôn', 'Đại diện hộ dân'],
  },
  {
    id: 'evt-5',
    title: 'Tập huấn triển khai chữ ký số và nộp hồ sơ dịch vụ công trực tuyến cho tổ công nghệ số cộng đồng',
    date: '2025-03-13',
    time: '14:00 - 16:30',
    location: 'Hội trường tầng 2',
    leader: 'Đ/c Lê Thị C - Phó Chủ tịch UBND xã',
    department: 'Văn phòng - Thống kê',
    type: 'ubnd',
    status: 'upcoming',
    participants: ['Tổ CNS cộng đồng 8 thôn', 'Đoàn Thanh niên xã'],
  },
]

export const mockKpis: KpiItem[] = [
  {
    id: 'kpi-1',
    title: 'Tỷ lệ hồ sơ trực tuyến toàn trình cấp xã',
    target: '85.0%',
    current: '88.4%',
    progress: 104,
    status: 'completed',
    assignedTo: 'Bộ phận Một cửa & Văn phòng',
    deadline: '31/12/2025',
    department: 'Một cửa',
  },
  {
    id: 'kpi-2',
    title: 'Tỷ lệ giải quyết hồ sơ đúng hạn và trước hạn',
    target: '98.0%',
    current: '98.5%',
    progress: 100,
    status: 'completed',
    assignedTo: 'Bộ phận Tiếp nhận & Trả kết quả',
    deadline: 'Hàng tháng',
    department: 'Bộ phận Một cửa',
  },
  {
    id: 'kpi-3',
    title: 'Thu ngân sách trên địa bàn xã năm 2025',
    target: '12.5 tỷ VNĐ',
    current: '3.8 tỷ VNĐ (Q1)',
    progress: 30.4,
    status: 'in_progress',
    assignedTo: 'Tài chính - Kế toán & Ban thu ngân sách',
    deadline: '31/12/2025',
    department: 'Tài chính',
  },
  {
    id: 'kpi-4',
    title: 'Số hóa sổ hộ tịch và dữ liệu đất đai',
    target: '100%',
    current: '76.2%',
    progress: 76.2,
    status: 'in_progress',
    assignedTo: 'Tư pháp - Hộ tịch & Địa chính',
    deadline: '30/06/2025',
    department: 'Tư pháp - Địa chính',
  },
  {
    id: 'kpi-5',
    title: 'Xử lý phản ánh, kiến nghị của người dân trong 72h',
    target: '95.0%',
    current: '94.2%',
    progress: 99.1,
    status: 'in_progress',
    assignedTo: 'UBND & Các ban ngành phụ trách',
    deadline: 'Thường xuyên',
    department: 'UBND Xã',
  },
  {
    id: 'kpi-6',
    title: 'Tỷ lệ người dân tham gia BHYT toàn dân',
    target: '96.5%',
    current: '92.1%',
    progress: 95.4,
    status: 'in_progress',
    assignedTo: 'Văn hóa - Xã hội & Trạm Y tế',
    deadline: '31/10/2025',
    department: 'Văn hóa - Xã hội',
  },
]

export const mockFeedbacks: FeedbackItem[] = [
  {
    id: 'fb-01',
    code: 'PA-2025-0089',
    citizenName: 'Ông Phan Trọng Hùng',
    phone: '0912.345.678',
    hamlet: 'Thôn Yên Lạc',
    category: 'Hạ tầng giao thông',
    content: 'Đoạn đường liên thôn qua ngõ 4 bị ổ gà lớn sau đợt mưa to, nước ứ đọng gây nguy hiểm cho học sinh đi học hàng ngày.',
    submittedAt: '08:15 07/03/2025',
    status: 'Đang xử lý',
    urgent: true,
    assignedUnit: 'Địa chính - Xây dựng xã phối hợp Ban cán sự Thôn',
    response: 'UBND xã đã giao Ban Địa chính phối hợp Thôn kiểm tra, lên phương án đổ đá cấp phối dặm vá trong ngày 10/03.',
  },
  {
    id: 'fb-02',
    code: 'PA-2025-0088',
    citizenName: 'Bà Nguyễn Thị Mai',
    phone: '0988.765.432',
    hamlet: 'Thôn Đồng Tiến',
    category: 'Môi trường',
    content: 'Khu vực bãi tập kết rác thải tạm thời gần mương nước xuất hiện mùi hôi, đề nghị đơn vị vệ sinh môi trường tăng tần suất thu gom.',
    submittedAt: '14:20 06/03/2025',
    status: 'Đã giải quyết',
    urgent: false,
    assignedUnit: 'Hợp tác xã Môi trường & Ban Nông nghiệp',
    response: 'Đã yêu cầu tổ thu gom rác dọn sạch trong sáng 07/03 và phun chế phẩm khử khuẩn xử lý mùi.',
  },
  {
    id: 'fb-03',
    code: 'PA-2025-0087',
    citizenName: 'Anh Lê Hoàng Nam',
    phone: '0903.111.222',
    hamlet: 'Thôn Trung Thành',
    category: 'Đất đai - Xây dựng',
    content: 'Gia đình muốn xin cấp trích lục bản đồ địa chính để làm thủ tục chuyển nhượng quyền sử dụng đất, xin hướng dẫn các bước nộp trực tuyến.',
    submittedAt: '09:45 05/03/2025',
    status: 'Đã giải quyết',
    urgent: false,
    assignedUnit: 'Bộ phận Một cửa - Cán bộ Địa chính',
    response: 'Cán bộ Địa chính đã gọi điện hướng dẫn công dân đăng nhập Cổng Dịch vụ công Quốc gia qua VNeID để nộp hồ sơ trực tuyến thành công.',
  },
  {
    id: 'fb-04',
    code: 'PA-2025-0086',
    citizenName: 'Bà Vũ Thị Tuyết',
    phone: '0977.445.566',
    hamlet: 'Thôn Phú Quý',
    category: 'An ninh trật tự',
    content: 'Đề nghị tăng cường tuần tra ban đêm tại khu vực cổng trường THCS vì có nhóm thanh thiếu niên thường xuyên tụ tập gây mất trật tự.',
    submittedAt: '21:10 04/03/2025',
    status: 'Đang xử lý',
    urgent: true,
    assignedUnit: 'Công an xã',
    response: 'Công an xã đã tăng cường lực lượng tổ tuần tra 8394 lập chốt kiểm tra từ 20h đến 23h hàng đêm.',
  },
  {
    id: 'fb-05',
    code: 'PA-2025-0085',
    citizenName: 'Ông Đặng Văn Thắng',
    phone: '0934.888.999',
    hamlet: 'Thôn Vĩnh Lộc',
    category: 'Chính sách xã hội',
    content: 'Hỏi về thời gian chi trả trợ cấp người có công và bảo trợ xã hội qua tài khoản ngân hàng trong tháng 3/2025.',
    submittedAt: '10:00 03/03/2025',
    status: 'Đã giải quyết',
    urgent: false,
    assignedUnit: 'Văn hóa - Xã hội & Bưu điện xã',
    response: 'Tiền trợ cấp đã được kho bạc giải ngân chuyển thẳng vào tài khoản của đối tượng từ ngày 05/03/2025.',
  },
]

export const mockVotingPolls: VotingPoll[] = [
  {
    id: 'poll-1',
    title: 'Lấy ý kiến nhân dân về Đề án mở rộng, nâng cấp Nghĩa trang liệt sĩ xã giai đoạn 2025-2027',
    code: 'BQ-2025-01',
    category: 'Ý kiến nhân dân',
    startDate: '01/03/2025',
    endDate: '25/03/2025',
    totalVoters: 2450,
    status: 'Đang diễn ra',
    options: [
      { id: 'opt-1', text: 'Hoàn toàn nhất trí với phương án mở rộng 1.2 ha', votes: 2180, percent: 88.9 },
      { id: 'opt-2', text: 'Nhất trí nhưng đề nghị bổ sung khuôn viên cây xanh', votes: 215, percent: 8.8 },
      { id: 'opt-3', text: 'Có ý kiến khác', votes: 55, percent: 2.3 },
    ],
  },
  {
    id: 'poll-2',
    title: 'Biểu quyết thông qua Nghị quyết phân bổ dự toán ngân sách xã bổ sung năm 2025',
    code: 'NQ-HDND-03',
    category: 'Nghị quyết HĐND',
    startDate: '05/03/2025',
    endDate: '15/03/2025',
    totalVoters: 28,
    status: 'Đang diễn ra',
    options: [
      { id: 'opt-a', text: 'Tán thành', votes: 26, percent: 92.8 },
      { id: 'opt-b', text: 'Không tán thành', votes: 0, percent: 0 },
      { id: 'opt-c', text: 'Chưa có ý kiến', votes: 2, percent: 7.2 },
    ],
  },
  {
    id: 'poll-3',
    title: 'Khảo sát sự hài lòng của tổ chức, công dân đối với dịch vụ hành chính công cấp xã quý I/2025',
    code: 'KS-DVC-01',
    category: 'Ý kiến nhân dân',
    startDate: '15/02/2025',
    endDate: '31/03/2025',
    totalVoters: 1320,
    status: 'Đang diễn ra',
    options: [
      { id: 'opt-r1', text: 'Rất hài lòng (Thủ tục nhanh chóng, cán bộ tận tình)', votes: 1150, percent: 87.1 },
      { id: 'opt-r2', text: 'Hài lòng (Đạt yêu cầu quy định)', votes: 145, percent: 11.0 },
      { id: 'opt-r3', text: 'Bình thường / Chưa hài lòng', votes: 25, percent: 1.9 },
    ],
  },
]

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'usr-1',
    fullName: 'Nguyễn Văn A',
    username: 'nguyenvana',
    email: 'nguyenvana.ubnd@canloc.hatinh.gov.vn',
    phone: '0912.888.777',
    role: 'Chủ tịch UBND',
    department: 'Lãnh đạo UBND',
    status: 'active',
    lastLogin: '07/03/2025 08:30',
  },
  {
    id: 'usr-2',
    fullName: 'Trần Thị B',
    username: 'tranthib',
    email: 'tranthib.ubnd@canloc.hatinh.gov.vn',
    phone: '0983.666.555',
    role: 'Phó Chủ tịch UBND',
    department: 'Lãnh đạo UBND',
    status: 'active',
    lastLogin: '07/03/2025 09:15',
  },
  {
    id: 'usr-3',
    fullName: 'Lê Văn C',
    username: 'levanc',
    email: 'levanc.tpht@canloc.hatinh.gov.vn',
    phone: '0904.333.222',
    role: 'Công chức Tư pháp - Hộ tịch',
    department: 'Tư pháp - Hộ tịch',
    status: 'active',
    lastLogin: '07/03/2025 07:45',
  },
  {
    id: 'usr-4',
    fullName: 'Hoàng Đình D',
    username: 'hoangdinhd',
    email: 'hoangdinhd.dcxd@canloc.hatinh.gov.vn',
    phone: '0975.222.111',
    role: 'Địa chính - Xây dựng',
    department: 'Địa chính - Môi trường',
    status: 'active',
    lastLogin: '06/03/2025 17:00',
  },
  {
    id: 'usr-5',
    fullName: 'Phạm Thị Mai',
    username: 'phamthimai',
    email: 'phamthimai.vp@canloc.hatinh.gov.vn',
    phone: '0936.999.888',
    role: 'Văn phòng - Thống kê',
    department: 'Văn phòng HĐND & UBND',
    status: 'active',
    lastLogin: '07/03/2025 08:00',
  },
  {
    id: 'usr-6',
    fullName: 'Nguyễn Hữu Tài',
    username: 'admin.canloc',
    email: 'it.admin@canloc.hatinh.gov.vn',
    phone: '0909.123.456',
    role: 'Quản trị hệ thống',
    department: 'Trung tâm CNTT & Viễn thông',
    status: 'active',
    lastLogin: '07/03/2025 10:20',
  },
]
