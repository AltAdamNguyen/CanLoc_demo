import React, { useState } from 'react'

interface LeaderInfo {
  id: string
  name: string
  role: string
  title: string
  degree: string
  phone: string
  receptionDay: string
  duties: string
  imageUrl: string
  badgeIcon: string
  badgeColor: string
  dutiesList?: string[]
}

const mainLeaders: LeaderInfo[] = [
  {
    id: 'leader-ct',
    name: 'Đ/c Nguyễn Văn A',
    role: 'CHỦ TỊCH UBND XÃ',
    title: 'Phó Bí thư Đảng ủy - Chủ tịch UBND Xã',
    degree: 'Cử nhân Luật • Cao cấp LLCT',
    phone: '0239.3841.115',
    receptionDay: 'Thứ 3 hàng tuần',
    duties: 'Điều hành chung hoạt động UBND, ngân sách, ANTT và CCHC.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDC4eK080asEyuljaJznVBtrFmSJErjNnoB4_lk20eCz587tV3jyKmf1ZRV0F_finZ6Po9E5ehSt4aM1Xf88E3HLSn7dFW0-lxmmweBk9BhqoVXad-shwn90UUNiWUcb9vmxTo65K0MFO-2Nd-Id8dnD9XmD1soQZJIRWkdH8YGfRcbd5aE4DmkqkG6qrmTi1NikBu6nm9-6sGJ-4HDBg6K1sIttUWAAB7Gv9eYtdEXXeCOGsRKjixFEQ',
    badgeIcon: 'shield',
    badgeColor: 'bg-primary text-white',
    dutiesList: [
      'Lãnh đạo, điều hành toàn diện mọi hoạt động của UBND xã theo luật định.',
      'Trực tiếp phụ trách công tác quy hoạch, kế hoạch phát triển KTXH, ngân sách nhà nước.',
      'Trưởng Ban Chỉ đạo Chuyển đổi số & Cải cách hành chính xã Can Lộc.',
      'Chủ trì giải quyết các khiếu nại, tố cáo và tiếp công dân định kỳ.',
    ],
  },
  {
    id: 'leader-pct-kt',
    name: 'Đ/c Lê Văn C.',
    role: 'PHÓ CHỦ TỊCH UBND',
    title: 'Đảng ủy viên - Phó Chủ tịch UBND Phụ trách Kinh tế',
    degree: 'Kỹ sư Quản lý Đất đai',
    phone: '0239.3841.116',
    receptionDay: 'Thứ 5 hàng tuần',
    duties: 'Nông thôn mới kiểu mẫu, Địa chính, Quy hoạch đất & GIS.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLxI_3Aph7iiYvUh3jnjW3SavpD7HI-LSakC6Hd3Np_H484KcmLEUGzg-3dFvic4b8uIAHE5GRLV8IFQm3XFry40yanpC5lWtGlt_rsVijtjBiHR6kyGWQY8QCilBqPLtvOm3585LPbVtOsplirVw-h2FU2ZGhSCUIAWi8MdDW8cY3XWo9JvvqHc36lnw_Hr6x3HDQF6j-IaaeqTtghK2MMXpKBc9W_Xh1I2hRTLKitlSW-BsRm-ptAg',
    badgeIcon: 'landscape',
    badgeColor: 'bg-secondary-container text-on-secondary-container',
    dutiesList: [
      'Phụ trách lĩnh vực Địa chính, Xây dựng, Môi trường, Nông nghiệp và Giao thông.',
      'Trực tiếp chỉ đạo công tác giải phóng mặt bằng, xây dựng Nông thôn mới nâng cao.',
      'Theo dõi và chỉ đạo hoạt động kinh tế của Thôn 1, Thôn 2 và Thôn Hạ Can.',
    ],
  },
  {
    id: 'leader-pct-vh',
    name: 'Đ/c Trần Thị B.',
    role: 'PHÓ CHỦ TỊCH UBND',
    title: 'Đảng ủy viên - Phó Chủ tịch UBND Phụ trách Văn hóa - Xã hội',
    degree: 'Cử nhân Xã hội học',
    phone: '0239.3841.118',
    receptionDay: 'Thứ 6 hàng tuần',
    duties: 'Văn hóa, Y tế, Giáo dục, Người có công & Dịch vụ công số.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDE1lCc3BNOw3B_JF8bBDP8PddR3QLbUi2WxXWEGkNX6VP3uUTiqprIYMrdw30emnJkIEqgz7pSWnGROmIRpiGdj7UB9VexVRVejnSjLWu3kWBJscmNfxUo1UeJJ7IhyuOu-yp5CQLw6nMinNlca831i1yC7L2GAdyXXzeeNiueRBIU7XHePLeBp3yfk9oLwnouowsdZSQL534BSbVSdagsHnTcyQ-dtIS1GdU4WOL60uCZm0hfXUV3Zg',
    badgeIcon: 'family_restroom',
    badgeColor: 'bg-secondary-container text-on-secondary-container',
    dutiesList: [
      'Phụ trách lĩnh vực Giáo dục, Y tế, Văn hóa - Thể thao, Thông tin truyền thông.',
      'Chỉ đạo thực hiện chính sách Người có công, Giảm nghèo, Lao động & Bảo trợ xã hội.',
      'Theo dõi và phụ trách Thôn 3, Thôn Thượng Can và Thôn Đông Can.',
    ],
  },
  {
    id: 'leader-ca',
    name: 'Đ/c Hoàng Đình T.',
    role: 'TRƯỞNG CÔNG AN XÃ',
    title: 'Thiếu tá - Đảng ủy viên - Trưởng Công an Xã',
    degree: 'Thiếu tá • ĐH Cảnh sát ND',
    phone: '0239.3841.113',
    receptionDay: 'Trực ban 24/7',
    duties: 'ANTT, PCCC, Quản lý dân cư, Đề án 06 & Camera 6 thôn.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuACtw3x-lR0d8zswY_5AGQ8oI5rQoFxIpY228ooNIrcjevZkVAt0-fkKEPsrZcqe2hu859wFSTH7vkLhZp8cvdlB6dEHfChyfi1m824OqebeEkdcZ0RAiyh4aEo0l3oIFalhE2zCN7Un4RDd3cnjtOj4EtZ-5FP6jv5v6uytxIBLZhgtb7O1tOI79h_Fow0I6b1AQrzOH6v6sRCtRVZPgtmuOIxb4kzA1cgsskwQ217wP9VIWiF8Gb9Nw',
    badgeIcon: 'security',
    badgeColor: 'bg-red-700 text-white',
    dutiesList: [
      'Bảo đảm an ninh trật tự, trật tự an toàn giao thông trên địa bàn xã.',
      'Tổ chức thực hiện hiệu quả Đề án 06/CP, quản lý cư trú và dữ liệu định danh điện tử VNeID.',
      'Chủ trì công tác phòng cháy, chữa cháy và cứu nạn cứu hộ cấp cơ sở.',
    ],
  },
  {
    id: 'leader-qs',
    name: 'Đ/c Đặng Quốc V.',
    role: 'CHỈ HUY TRƯỞNG QUÂN SỰ',
    title: 'Đảng ủy viên - Chỉ huy trưởng Ban CHQS Xã',
    degree: 'Sĩ quan Quân đội ND',
    phone: '0239.3841.119',
    receptionDay: 'Thứ Sáu hàng tuần',
    duties: 'Quốc phòng, Dân quân tự vệ, Phòng chống lụt bão & CNCH.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTOBn7LqOic_5G5otGmZJo1yfFltPZHXhGUPj-L1azGBQcE4BpIu0dWziJK0nPlvKUaou7HWzGMG1c0UVm_lEAKSsfrRVW_7GRf5yQHml66CdXsAprhchbWNyCTZ9g5qX2-EW1A2KTOCYZQLsDroeFYLXxuFE_zdtGW1tvEwQC_2O4sa2TwoDOrQEdDHapUSLrZ6cJdvi8mp4UFchRSh12a57zHsN_D7pl4adTmHXNBliqCHaUmHsIIQ',
    badgeIcon: 'military_tech',
    badgeColor: 'bg-tertiary-container text-white',
    dutiesList: [
      'Chỉ huy công tác quốc phòng, quân sự địa phương, xây dựng lực lượng dân quân tự vệ.',
      'Tham mưu tuyển chọn và gọi công dân nhập ngũ đạt 100% chỉ tiêu hàng năm.',
      'Sẵn sàng tham gia cứu hộ, phòng chống thiên tai bão lũ và sự cố môi trường.',
    ],
  },
]

const villageUnits = [
  {
    id: '01',
    name: 'Thôn Trâm Lạc',
    tag: 'Thôn NTM kiểu mẫu',
    partySecretary: 'Đ/c Nguyễn Văn K.',
    chief: 'Đ/c Trần Bá Q.',
    phone: '0981.xxx.111',
    stats: '480 hộ • 1.620 khẩu',
    facility: 'Nhà VH số 1',
  },
  {
    id: '02',
    name: 'Thôn Hồng Triều',
    tag: 'Thôn NTM thông minh',
    partySecretary: 'Đ/c Lê Đình M.',
    chief: 'Đ/c Nguyễn Doãn H.',
    phone: '0981.xxx.222',
    stats: '512 hộ • 1.780 khẩu',
    facility: 'Cụm thanh số 02',
  },
  {
    id: '03',
    name: 'Thôn Sơn Hà',
    tag: 'Làng Văn hóa tiêu biểu',
    partySecretary: 'Đ/c Phan Doãn T.',
    chief: 'Đ/c Lê Trọng V.',
    phone: '0981.xxx.333',
    stats: '430 hộ • 1.490 khẩu',
    facility: 'Tổ an ninh số 3',
  },
  {
    id: '04',
    name: 'Thôn Phúc Hậu',
    tag: 'Thôn NTM kiểu mẫu',
    partySecretary: 'Đ/c Bùi Xuân D.',
    chief: 'Đ/c Phạm Văn D.',
    phone: '0981.xxx.444',
    stats: '465 hộ • 1.580 khẩu',
    facility: 'Vườn mẫu OCOP',
  },
  {
    id: '05',
    name: 'Thôn Kim Đính',
    tag: 'NTM Nông nghiệp sạch',
    partySecretary: 'Đ/c Đặng Hữu S.',
    chief: 'Đ/c Đinh Xuân K.',
    phone: '0981.xxx.555',
    stats: '470 hộ • 1.610 khẩu',
    facility: 'Tổ công nghệ số',
  },
  {
    id: '06',
    name: 'Thôn Thượng Xá',
    tag: 'Làng nghề truyền thống',
    partySecretary: 'Đ/c Hoàng Viết N.',
    chief: 'Đ/c Võ Hữu T.',
    phone: '0981.xxx.666',
    stats: '488 hộ • 1.540 khẩu',
    facility: 'Bưu điện văn hóa',
  },
]

export const CitizenLeaderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mot-cua' | 'can-su-thon' | 'lich-tiep-dan'>('can-su-thon')
  const [selectedLeader, setSelectedLeader] = useState<LeaderInfo | null>(null)
  const [appointmentModal, setAppointmentModal] = useState<LeaderInfo | null>(null)
  const [appointmentSuccess, setAppointmentSuccess] = useState(false)
  const [showOrgModal, setShowOrgModal] = useState(false)

  return (
    <div className="flex flex-col w-full space-y-8 pb-12">
      {/* 1. HERO SPOTLIGHT BANNER - SECRETARY / KEY LEADER */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-primary text-on-primary shadow-xl border border-primary/30">
        <div className="absolute inset-0 bg-[radial-gradient(#ffe08b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary-fixed/15 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 -top-24 w-80 h-80 rounded-full bg-primary-fixed/10 blur-2xl pointer-events-none"></div>

        {/* Header Crest & National Label */}
        <div className="relative z-10 pt-6 pb-2 px-6 sm:px-10 flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary-fixed text-primary shadow-lg ring-4 ring-secondary-fixed/20 mb-2">
            <span className="material-symbols-outlined text-[32px]">stars</span>
          </div>
          <span className="font-label-md text-label-md tracking-wider uppercase text-secondary-fixed font-bold">
            CƠ QUAN HÀNH CHÍNH NHÀ NƯỚC • ĐẢNG BỘ XÃ CAN LỘC
          </span>
          <h1 className="font-headline-md text-headline-md lg:font-display-lg lg:text-display-lg font-bold tracking-tight text-on-primary uppercase mt-1">
            BAN LÃNH ĐẠO CHỦ CHỐT XÃ CAN LỘC
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-12 h-0.5 bg-secondary-fixed-dim/60"></span>
            <span className="text-secondary-fixed text-[14px]">★ ★ ★</span>
            <span className="w-12 h-0.5 bg-secondary-fixed-dim/60"></span>
          </div>
        </div>

        {/* Spotlight 3-Column Visual Layout */}
        <div className="relative z-10 px-6 sm:px-10 pb-8 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Leader Title & Mandate */}
          <div className="lg:col-span-4 flex flex-col gap-3 text-left lg:pr-4 order-2 lg:order-1">
            <div className="inline-flex items-center gap-1.5 bg-surface-container-lowest/15 backdrop-blur-md px-3 py-1 rounded-full text-secondary-fixed font-label-md text-label-md w-fit">
              <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
              <span>Lãnh Đạo Toàn Diện</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm lg:text-[28px] font-bold text-on-primary leading-tight">
              Đồng chí
              <br />
              <span className="text-secondary-fixed uppercase tracking-wide">Trần Văn H.</span>
            </h2>
            <p className="font-body-md text-body-md text-primary-fixed leading-relaxed">
              Bí thư Đảng ủy - Chủ tịch Hội đồng Nhân dân Xã Can Lộc. Thạc sĩ Quản lý công • Cao cấp Lý luận chính trị.
            </p>
            <div className="pt-2 flex flex-col gap-2 font-label-md text-label-md">
              <div className="flex items-center gap-2 bg-surface-container-lowest/10 px-3 py-2 rounded-lg">
                <span className="material-symbols-outlined text-[18px] text-secondary-fixed">phone_in_talk</span>
                <span>
                  Công vụ: <strong className="text-on-primary">0239.3841.112</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest/10 px-3 py-2 rounded-lg">
                <span className="material-symbols-outlined text-[18px] text-secondary-fixed">event_available</span>
                <span>
                  Tiếp công dân: <strong className="text-secondary-fixed">Ngày 15 & 30 hàng tháng</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Center Column: Portrait Image */}
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-t from-secondary-fixed to-primary-fixed rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl bg-surface-container-high border-2 border-secondary-fixed/50">
                <img
                  alt="Chân dung chính thức Bí thư Đảng ủy Trần Văn H."
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCACb1-nsOenph3UvwNoXi-3cAbFREZ8NsCcIYnfprV_yJbDmS8cQuxaJQf8USoVQ5v433JdyvnJQEaoyBHN_jUQHAmHRwdxxWYF2dQx74TPLJ-HvWGMXjDjY0twDkLn5KcDdIbAZ9CmG_lmwJDBTD7fg9IuIwwG0kHZQnCXZlnfKi79sQ3WFTQMeRO-F_uT2NPUK4CqkBFEZWZcITmtg-RfFK-1AedmXugJ3j19Wm2cWQjCtTqrndtfw"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent p-4 text-center">
                  <span className="inline-block font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed font-bold">
                    BÍ THƯ ĐẢNG ỦY XÃ
                  </span>
                  <div className="font-title-lg text-title-lg font-bold text-on-primary">Đ/c Trần Văn H.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Brief Intro & Action Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-3 text-left lg:pl-4 order-3">
            <div className="bg-surface-container-lowest/15 backdrop-blur-md rounded-xl p-4 border border-surface-container-lowest/20">
              <h3 className="font-title-lg text-title-lg font-bold text-secondary-fixed flex items-center gap-1.5 mb-2">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                <span>NHIỆM VỤ TRỌNG TÂM</span>
              </h3>
              <p className="font-body-md text-body-md text-on-primary leading-relaxed">
                Phụ trách chung, chịu trách nhiệm lãnh đạo toàn diện công tác Đảng bộ; Định hướng chiến lược phát triển kinh tế - xã hội, bảo đảm an ninh chính trị, trật tự an toàn cơ sở và chuyển đổi số địa phương.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container hover:text-on-secondary-fixed px-4 py-2.5 rounded-lg font-label-md text-label-md font-bold transition-all shadow-md"
                href="tel:02393841112"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Gọi Trực Tiếp</span>
              </a>
              <button
                className="flex-1 inline-flex items-center justify-center gap-2 bg-surface-container-lowest/20 hover:bg-surface-container-lowest/30 text-on-primary px-4 py-2.5 rounded-lg font-label-md text-label-md font-semibold transition-all border border-surface-container-lowest/25"
                onClick={() => setShowOrgModal(true)}
              >
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
                <span>Sơ Đồ Tổ Chức</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: BAN LÃNH ĐẠO THƯỜNG TRỰC (5 LEADER CARDS) */}
      <section className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-surface-container-highest pb-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-7 bg-primary rounded-full"></div>
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface uppercase">
                LÃNH ĐẠO HỘI ĐỒNG NHÂN DÂN - ỦY BAN NHÂN DÂN & VŨ TRANG
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Thường trực chỉ đạo điều hành thực thi nhiệm vụ công vụ xã Can Lộc
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-secondary font-semibold font-label-md text-label-md bg-secondary-fixed/20 px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Nhiệm kỳ 2021 - 2026</span>
          </div>
        </div>

        {/* 5-Leader Visual Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {mainLeaders.map((leader) => (
            <div
              key={leader.id}
              className="group bg-surface-container-lowest rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col border border-surface-container-high hover:border-primary/40"
            >
              <div className="relative h-56 overflow-hidden bg-surface-container-high">
                <img
                  alt={leader.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  src={leader.imageUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-2.5 left-3 right-3 text-on-primary">
                  <span className="font-label-sm text-label-sm text-secondary-fixed font-bold uppercase tracking-wider block">
                    {leader.role}
                  </span>
                  <h3 className="font-title-lg text-title-lg font-bold truncate">{leader.name}</h3>
                </div>
                <span className={`absolute top-2.5 right-2.5 ${leader.badgeColor} p-1 rounded-full shadow`}>
                  <span className="material-symbols-outlined text-[16px]">{leader.badgeIcon}</span>
                </span>
              </div>
              <div className="p-3.5 flex flex-col flex-1 justify-between gap-3 text-body-md">
                <div className="space-y-1.5">
                  <p className="text-on-surface-variant font-label-sm text-label-sm">{leader.degree}</p>
                  <p className="text-on-surface text-[13px] leading-snug">
                    <strong className="text-primary">Phụ trách:</strong> {leader.duties}
                  </p>
                </div>
                <div className="space-y-1 pt-2 border-t border-surface-container-high">
                  <div className="flex items-center justify-between text-label-sm font-label-sm">
                    <span className="text-on-surface-variant">Điện thoại:</span>
                    <a className="text-primary font-bold hover:underline" href={`tel:${leader.phone}`}>
                      {leader.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-label-sm font-label-sm">
                    <span className="text-on-surface-variant">Lịch tiếp dân:</span>
                    <span className="text-secondary font-semibold">{leader.receptionDay}</span>
                  </div>
                </div>
                <div className="pt-2 flex gap-1.5">
                  <button
                    onClick={() => setSelectedLeader(leader)}
                    className="flex-1 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
                  >
                    Chi tiết
                  </button>
                  <button
                    onClick={() => setAppointmentModal(leader)}
                    className="px-2.5 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-white text-xs font-semibold"
                    title="Đặt lịch tiếp dân"
                  >
                    <span className="material-symbols-outlined text-xs">calendar_month</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE DIRECTORY TABS (MỘT CỬA - CÁN SỰ THÔN - LỊCH TIẾP DÂN) */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-xs border border-surface-container-high overflow-hidden">
        {/* Tab Navigation Header */}
        <div className="flex flex-wrap border-b border-surface-container-high bg-surface-container-low px-6 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('can-su-thon')}
            className={`px-4 py-3 font-title-lg text-title-lg border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'can-su-thon'
                ? 'border-primary text-primary font-bold bg-surface-container-lowest rounded-t-lg'
                : 'border-transparent text-on-surface-variant font-semibold hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-base">holiday_village</span>
            <span>Ban Cán Sự 6 Thôn</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
              06
            </span>
          </button>

          <button
            onClick={() => setActiveTab('mot-cua')}
            className={`px-4 py-3 font-title-lg text-title-lg border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'mot-cua'
                ? 'border-primary text-primary font-bold bg-surface-container-lowest rounded-t-lg'
                : 'border-transparent text-on-surface-variant font-semibold hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-base">badge</span>
            <span>Bộ Phận Một Cửa & Chuyên Môn</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold">
              18
            </span>
          </button>

          <button
            onClick={() => setActiveTab('lich-tiep-dan')}
            className={`px-4 py-3 font-title-lg text-title-lg border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'lich-tiep-dan'
                ? 'border-primary text-primary font-bold bg-surface-container-lowest rounded-t-lg'
                : 'border-transparent text-on-surface-variant font-semibold hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span>Lịch Tiếp Dân Định Kỳ</span>
          </button>
        </div>

        {/* TAB 1: BỘ PHẬN MỘT CỬA & CÁN BỘ CHUYÊN MÔN */}
        {activeTab === 'mot-cua' && (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-red-50/50 border border-red-100">
                <div className="font-bold text-primary mb-1 text-sm">Bộ Phận Một Cửa & Hộ Tịch</div>
                <p className="text-gray-500 mb-2.5 text-[11px]">Tiếp nhận và số hóa hồ sơ TTHC</p>
                <div className="text-[12px] text-gray-700 space-y-1.5">
                  <div>• CC Tư pháp - Hộ tịch: <strong>Trần Văn T.</strong> (0912.111.xxx)</div>
                  <div>• CC Văn phòng - Thống kê: <strong>Lê Thị M.</strong> (0912.222.xxx)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-yellow-50/50 border border-yellow-100">
                <div className="font-bold text-amber-900 mb-1 text-sm">Địa Chính - Đất Đai - MT</div>
                <p className="text-gray-500 mb-2.5 text-[11px]">Đo đạc, quy hoạch và xây dựng</p>
                <div className="text-[12px] text-gray-700 space-y-1.5">
                  <div>• CC Địa chính: <strong>Nguyễn Khắc Đ.</strong> (0913.333.xxx)</div>
                  <div>• CC Nông nghiệp - MT: <strong>Vũ Đình K.</strong> (0913.444.xxx)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="font-bold text-tertiary mb-1 text-sm">Tài Chính - Kế Toán - LĐ</div>
                <p className="text-gray-500 mb-2.5 text-[11px]">Chế độ trợ cấp và ngân sách xã</p>
                <div className="text-[12px] text-gray-700 space-y-1.5">
                  <div>• CC Kế toán trưởng: <strong>Phan Thị H.</strong> (0914.555.xxx)</div>
                  <div>• CC Lao động - TB&XH: <strong>Đặng Văn N.</strong> (0914.666.xxx)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div className="font-bold text-emerald-900 mb-1 text-sm">Lực Lượng Vũ Trang & Trật Tự</div>
                <p className="text-gray-500 mb-2.5 text-[11px]">An ninh cơ sở & Quốc phòng</p>
                <div className="text-[12px] text-gray-700 space-y-1.5">
                  <div>• Trực ban Công an xã: <strong>0239.3841.113</strong></div>
                  <div>• Trực ban Quân sự xã: <strong>0239.3841.114</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CÁN SỰ 6 THÔN */}
        {activeTab === 'can-su-thon' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {villageUnits.map((vill) => (
                <div
                  key={vill.id}
                  className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high flex flex-col justify-between gap-3 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-label-md flex items-center justify-center">
                        {vill.id}
                      </span>
                      <div>
                        <h4 className="font-title-lg text-title-lg font-bold text-on-surface">{vill.name}</h4>
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">
                          {vill.tag}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline">holiday_village</span>
                  </div>

                  <div className="space-y-1.5 text-label-sm text-on-surface bg-white p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Bí thư Chi bộ:</span>
                      <span className="font-semibold">{vill.partySecretary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Trưởng thôn:</span>
                      <span className="font-bold text-primary">{vill.chief}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Điện thoại:</span>
                      <a className="font-bold text-tertiary hover:underline" href={`tel:${vill.phone}`}>
                        {vill.phone}
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-surface-container-highest text-label-sm text-on-surface-variant flex justify-between">
                    <span>{vill.stats}</span>
                    <span className="text-secondary font-semibold">{vill.facility}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LỊCH TIẾP DÂN */}
        {activeTab === 'lich-tiep-dan' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-md text-body-md min-w-[700px]">
                <thead className="bg-surface-container text-on-surface font-label-md text-label-md uppercase">
                  <tr>
                    <th className="py-3 px-4">Lãnh đạo tiếp dân</th>
                    <th className="py-3 px-4">Chức vụ</th>
                    <th className="py-3 px-4">Lịch tiếp định kỳ</th>
                    <th className="py-3 px-4">Địa điểm tiếp công dân</th>
                    <th className="py-3 px-4 text-center">Đăng ký hẹn trước</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high text-xs">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-primary">Đ/c Trần Văn H.</td>
                    <td className="py-3.5 px-4">Bí thư Đảng ủy - Chủ tịch HĐND</td>
                    <td className="py-3.5 px-4 font-semibold text-secondary">Ngày 15 & 30 hàng tháng</td>
                    <td className="py-3.5 px-4">Phòng Tiếp công dân (Tầng 1 UBND)</td>
                    <td className="py-3.5 px-4 text-center">
                      <a
                        className="bg-primary text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-primary-container inline-block shadow-xs"
                        href="tel:02393841112"
                      >
                        Gọi 0239.3841.112
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-primary">Đ/c Nguyễn Văn A</td>
                    <td className="py-3.5 px-4">Chủ tịch UBND Xã</td>
                    <td className="py-3.5 px-4 font-semibold text-secondary">Thứ Ba hàng tuần</td>
                    <td className="py-3.5 px-4">Phòng Tiếp công dân (Tầng 1 UBND)</td>
                    <td className="py-3.5 px-4 text-center">
                      <a
                        className="bg-primary text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-primary-container inline-block shadow-xs"
                        href="tel:02393841115"
                      >
                        Gọi 0239.3841.115
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-secondary">Đ/c Lê Văn C.</td>
                    <td className="py-3.5 px-4">Phó Chủ tịch UBND (Kinh tế)</td>
                    <td className="py-3.5 px-4 font-semibold text-secondary">Thứ Năm hàng tuần</td>
                    <td className="py-3.5 px-4">Phòng Tiếp công dân (Tầng 1 UBND)</td>
                    <td className="py-3.5 px-4 text-center">
                      <a
                        className="bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded text-xs font-semibold hover:bg-secondary-fixed inline-block shadow-xs"
                        href="tel:02393841116"
                      >
                        Gọi 0239.3841.116
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-secondary">Đ/c Trần Thị B.</td>
                    <td className="py-3.5 px-4">Phó Chủ tịch UBND (Văn hóa - Xã hội)</td>
                    <td className="py-3.5 px-4 font-semibold text-secondary">Thứ Sáu hàng tuần</td>
                    <td className="py-3.5 px-4">Phòng Tiếp công dân (Tầng 1 UBND)</td>
                    <td className="py-3.5 px-4 text-center">
                      <a
                        className="bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded text-xs font-semibold hover:bg-secondary-fixed inline-block shadow-xs"
                        href="tel:02393841118"
                      >
                        Gọi 0239.3841.118
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-red-700">Đ/c Hoàng Đình T.</td>
                    <td className="py-3.5 px-4">Trưởng Công an Xã</td>
                    <td className="py-3.5 px-4 font-semibold text-red-700">Tiếp nhận xử lý 24/24 giờ</td>
                    <td className="py-3.5 px-4">Trực ban Công an Xã Can Lộc</td>
                    <td className="py-3.5 px-4 text-center">
                      <a
                        className="bg-red-700 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-red-800 inline-block shadow-xs"
                        href="tel:02393841113"
                      >
                        Đường dây nóng
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* MODAL: SƠ ĐỒ CƠ CẤU BỘ MÁY TỔ CHỨC */}
      {showOrgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col gap-4 border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[26px]">account_tree</span>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface">
                  Sơ Đồ Cơ Cấu Bộ Máy Tổ Chức Xã Can Lộc
                </h3>
              </div>
              <button
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
                onClick={() => setShowOrgModal(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="text-body-md font-body-md text-on-surface space-y-3 text-xs leading-relaxed">
              <div className="p-3.5 rounded-xl bg-primary-fixed text-on-primary-fixed">
                <strong>1. Đảng ủy Xã:</strong> Cơ quan lãnh đạo toàn diện mọi mặt đời sống chính trị, KT-XH - Ban Chấp hành gồm 15 Ủy viên.
              </div>
              <div className="p-3.5 rounded-xl bg-secondary-fixed text-on-secondary-fixed">
                <strong>2. Hội đồng Nhân dân Xã:</strong> Cơ quan quyền lực nhà nước tại địa phương - 25 Đại biểu HĐND khóa 2021-2026.
              </div>
              <div className="p-3.5 rounded-xl bg-surface-container-low text-on-surface border border-surface-container-high">
                <strong>3. Ủy ban Nhân dân Xã:</strong> Cơ quan chấp hành của HĐND, cơ quan hành chính nhà nước ở địa phương (Chủ tịch, 02 Phó Chủ tịch, Ủy viên CA, Ủy viên QS).
              </div>
              <div className="p-3.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
                <strong>4. Khối Cơ sở & Đoàn thể:</strong> 06 Thôn dân cư, Mặt trận Tổ quốc và các tổ chức chính trị - xã hội Can Lộc.
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                className="px-5 py-2 bg-primary text-white rounded-lg font-label-md text-label-md font-bold hover:bg-primary-container transition-colors shadow-xs"
                onClick={() => setShowOrgModal(false)}
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ĐĂNG KÝ TIẾP DÂN */}
      {appointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed">event_available</span>
                <span className="font-bold text-sm">Đăng Ký Tiếp Dân & Gặp Lãnh Đạo</span>
              </div>
              <button
                onClick={() => {
                  setAppointmentModal(null)
                  setAppointmentSuccess(false)
                }}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6">
              {!appointmentSuccess ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setAppointmentSuccess(true)
                  }}
                  className="space-y-3.5 text-xs"
                >
                  <div className="p-3 rounded-xl bg-red-50 text-gray-800 border border-red-100">
                    <span className="text-[10px] uppercase font-bold text-primary block">
                      Đăng ký gặp:
                    </span>
                    <div className="font-bold text-sm text-primary">{appointmentModal.name}</div>
                    <div className="text-gray-500">{appointmentModal.role} • Lịch định kỳ: {appointmentModal.receptionDay}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Họ tên công dân *</label>
                      <input
                        required
                        placeholder="VD: Trần Văn Bình"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Số điện thoại *</label>
                      <input
                        required
                        placeholder="0912.xxx.xxx"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Địa chỉ thôn / cư trú *</label>
                    <input
                      required
                      placeholder="Thôn Trâm Lạc, xã Can Lộc"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Nội dung kiến nghị / công việc cần phản ánh *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tóm tắt rõ nội dung cần giải quyết hoặc phản ánh..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-primary"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setAppointmentModal(null)}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-white font-semibold flex items-center gap-1.5 shadow"
                    >
                      <span className="material-symbols-outlined text-sm">send</span>
                      <span>Gửi đăng ký</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-2xl">check_circle</span>
                  </div>
                  <h4 className="font-bold text-base text-on-surface">Đăng ký tiếp dân thành công!</h4>
                  <p className="text-xs text-gray-600">
                    Ban Tiếp công dân xã Can Lộc đã tiếp nhận thông tin của bạn và sẽ liên hệ xác nhận giờ hẹn chính xác qua tin nhắn SMS / VNeID.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setAppointmentModal(null)
                        setAppointmentSuccess(false)
                      }}
                      className="px-6 py-2 rounded-lg bg-primary text-white text-xs font-semibold shadow"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CHI TIẾT LÃNH ĐẠO */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed">badge</span>
                <span className="font-bold text-sm">Lý Lịch Trích Ngang Lãnh Đạo</span>
              </div>
              <button
                onClick={() => setSelectedLeader(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-gray-700">
              <div className="flex items-center gap-4">
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <img
                    alt={selectedLeader.name}
                    className="w-full h-full object-cover"
                    src={selectedLeader.imageUrl}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-base text-primary">{selectedLeader.name}</h3>
                  <div className="text-xs font-semibold text-gray-800">{selectedLeader.title}</div>
                  <div className="text-gray-500 mt-1">{selectedLeader.degree}</div>
                  <div className="text-primary font-bold mt-1">SĐT: {selectedLeader.phone}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-1">Phân công nhiệm vụ chi tiết:</h4>
                <p className="text-gray-600 leading-relaxed mb-2">{selectedLeader.duties}</p>
                {selectedLeader.dutiesList && (
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {selectedLeader.dutiesList.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <strong className="text-on-surface">Lịch tiếp công dân: </strong>
                <span className="text-primary font-semibold">{selectedLeader.receptionDay}</span>
              </div>

              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  onClick={() => setSelectedLeader(null)}
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

export default CitizenLeaderPage
