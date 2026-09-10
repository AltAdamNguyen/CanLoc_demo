import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { CitizenSidebar } from './CitizenSidebar'
import { CitizenFooter } from './CitizenFooter'
import { Header } from './Header'

export const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Sync role state with URL path
  const isCitizenPath = location.pathname.startsWith('/citizen')
  const currentRole: 'cadre' | 'citizen' = isCitizenPath ? 'citizen' : 'cadre'

  const handleToggleRole = (newRole: 'cadre' | 'citizen') => {
    if (newRole === 'citizen') {
      navigate('/citizen/services')
    } else {
      navigate('/')
    }
  }

  // CITIZEN MODE: Full top navigation (No left sidebar, header across the top like service.html)
  if (currentRole === 'citizen') {
    return (
      <div className="flex flex-col min-h-screen w-full bg-[#fff8f7]">
        {/* Top Navigation / Header identical to service.html */}
        <CitizenSidebar onToggleRole={handleToggleRole} />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 py-6 flex flex-col">
          <Outlet />
        </main>

        {/* Common Citizen Footer */}
        <CitizenFooter />

        {/* Floating Quick Action Buttons: Chat, Zalo, Facebook, Youtube */}
        <aside aria-label="Kênh hỗ trợ trực tuyến" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5">
          {/* Chatbot AI Support */}
          <Link
            to="/ai-agent"
            className="w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 border border-amber-300 relative group"
            title="Trợ lý ảo AI Can Lộc 24/7"
          >
            <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Trợ lý AI 24/7
            </span>
          </Link>

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
