import React, { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { CitizenSidebar } from './CitizenSidebar'
import { CitizenFooter } from './CitizenFooter'
import { Header } from './Header'
import { UserRole, getStoredRole, setStoredRole, CADRE_HOME, CITIZEN_HOME } from '@/lib/role'

export const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [citizenAiOpen, setCitizenAiOpen] = useState(false)
  const aiPopupRef = useRef<HTMLDivElement>(null)
  const aiButtonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  // Close AI popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        citizenAiOpen &&
        aiPopupRef.current &&
        !aiPopupRef.current.contains(event.target as Node) &&
        aiButtonRef.current &&
        !aiButtonRef.current.contains(event.target as Node)
      ) {
        setCitizenAiOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [citizenAiOpen])

  // Track role state initialized from localStorage, or URL if first visit
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = getStoredRole()
    if (saved) return saved
    const initial: UserRole = location.pathname.startsWith('/citizen') ? 'citizen' : 'cadre'
    setStoredRole(initial)
    return initial
  })

  // Sync role state when localStorage changes across tabs or components
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = getStoredRole()
      if (saved && saved !== currentRole) {
        setCurrentRole(saved)
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [currentRole])

  // ROLE GUARD: Redirect automatically if user visits routes of the other role
  useEffect(() => {
    const activeRole = getStoredRole() || currentRole
    const isCitizenPath = location.pathname.startsWith('/citizen')

    // Role Nhân dân trying to access Cadre links -> redirect to /citizen/news
    if (activeRole === 'citizen' && !isCitizenPath) {
      navigate(CITIZEN_HOME, { replace: true })
    }
    // Role Cán bộ trying to access Citizen links -> redirect to /overview
    else if (activeRole === 'cadre' && isCitizenPath) {
      navigate(CADRE_HOME, { replace: true })
    }
  }, [location.pathname, navigate, currentRole])

  const handleToggleRole = (newRole: UserRole) => {
    setStoredRole(newRole)
    setCurrentRole(newRole)
    if (newRole === 'citizen') {
      navigate(CITIZEN_HOME)
    } else {
      navigate(CADRE_HOME)
    }
  }

  // Prevent flash of unauthorized content before redirect completes
  const isCitizenPath = location.pathname.startsWith('/citizen')
  const isUnauthorized =
    (currentRole === 'citizen' && !isCitizenPath) || (currentRole === 'cadre' && isCitizenPath)

  if (isUnauthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fff8f7]">
        <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow-lg border border-red-100">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-700">Đang chuyển hướng về trang chủ...</p>
        </div>
      </div>
    )
  }

  // CITIZEN MODE: Full top navigation
  if (currentRole === 'citizen') {
    return (
      <div className="flex flex-col min-h-screen w-full bg-[#fff8f7]">
        {/* Top Navigation / Header */}
        <CitizenSidebar onToggleRole={handleToggleRole} />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 py-6 flex flex-col">
          <Outlet />
        </main>

        {/* Common Citizen Footer */}
        <CitizenFooter />

        {/* Citizen AI Assistant Popup Modal */}
        {citizenAiOpen && (
          <div
            ref={aiPopupRef}
            className="fixed bottom-6 right-20 z-50 w-[330px] sm:w-[370px] max-w-[calc(100vw-6rem)] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="bg-[#ea8c16] text-white px-4 py-3 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-2xl text-white">smart_toy</span>
                <div>
                  <h4 className="font-bold text-[14px] leading-tight text-white">Trợ lý AI Can Lộc 24/7</h4>
                  <p className="text-[10px] text-amber-100 font-normal mt-0.5">Hỗ trợ tra cứu & Dịch vụ công</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCitizenAiOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-black/10 flex items-center justify-center text-white text-base transition-colors cursor-pointer"
                title="Đóng"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3.5 text-xs text-slate-700 bg-white">
              <div className="p-3 bg-[#FFF9EE] rounded-xl border border-[#FDE68A] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#D97706] text-xl shrink-0 mt-0.5">
                  info
                </span>
                <p className="leading-relaxed text-slate-700 text-xs">
                  Xin chào quý công dân! Tôi có thể giải đáp nhanh về các thủ tục hành chính, lịch tiếp
                  dân, văn bản mới hoặc hướng dẫn nộp phản ánh hiện trường.
                </p>
              </div>

              <div className="space-y-2 pt-0.5">
                <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">
                  GỢI Ý CÂU HỎI PHỔ BIẾN:
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCitizenAiOpen(false)
                    navigate('/citizen/services')
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-900 text-xs font-medium transition-all cursor-pointer block shadow-2xs"
                >
                  Thủ tục cấp Giấy chứng nhận quyền sử dụng đất
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCitizenAiOpen(false)
                    navigate('/citizen/reports')
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-900 text-xs font-medium transition-all cursor-pointer block shadow-2xs"
                >
                  Cách thức gửi phản ánh hiện trường trực tuyến
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCitizenAiOpen(false)
                    navigate('/citizen/schedule')
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-900 text-xs font-medium transition-all cursor-pointer block shadow-2xs"
                >
                  Lịch tiếp công dân của Lãnh đạo xã
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Quick Action Buttons: Chat, Zalo, Facebook, Youtube */}
        <aside aria-label="Kênh hỗ trợ trực tuyến" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5">
          {/* Chatbot AI Support */}
          <button
            ref={aiButtonRef}
            type="button"
            onClick={() => setCitizenAiOpen((prev) => !prev)}
            className="w-11 h-11 rounded-full bg-[#ea8c16] hover:bg-[#d97d0d] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border border-amber-300 relative group cursor-pointer focus:outline-none"
            title="Trợ lý ảo AI Can Lộc 24/7"
            aria-label="Trợ lý ảo AI Can Lộc 24/7"
          >
            <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Trợ lý AI 24/7
            </span>
          </button>


          {/* Zalo OA */}
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-xl flex items-center justify-center transition-transform hover:scale-110 relative group"
            title="Zalo Official Account Xã Can Lộc"
          >
            <span>Zalo</span>
            <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Zalo OA Xã Can Lộc
            </span>
          </a>

          {/* Facebook Fanpage */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-[#1877F2] hover:opacity-90 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 relative group text-base font-bold"
            title="Fanpage UBND Xã Can Lộc"
          >
            <i className="fa-brands fa-facebook-f"></i>
            <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Fanpage UBND Xã
            </span>
          </a>

          {/* YouTube Video Channel */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 relative group text-base"
            title="Kênh Truyền thanh - Truyền hình Xã Can Lộc"
          >
            <i className="fa-brands fa-youtube"></i>
            <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Kênh Truyền hình Xã
            </span>
          </a>
        </aside>
      </div>
    )
  }

  // CADRE MODE: Vertical left sidebar layout
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f9fafb]">
      {/* Cadre Left Sidebar */}
      <Sidebar
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onToggleRole={handleToggleRole}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <Header
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          role={currentRole}
          onToggleRole={handleToggleRole}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col min-h-0 bg-[#fff8f7]">
          <div className="w-full flex-1 flex flex-col min-h-0 max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
