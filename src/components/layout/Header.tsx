import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RoleType } from './Sidebar'

interface HeaderProps {
  onOpenMobileMenu: () => void
  role?: RoleType
  onToggleRole?: (role: RoleType) => void
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  role = 'cadre',
  onToggleRole,
}) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Phản ánh mới cần xử lý',
      desc: 'Người dân thôn 2 phản ánh sạt lở kênh mương nội đồng',
      time: '10 phút trước',
      unread: true,
    },
    {
      id: 2,
      title: 'Cuộc họp đột xuất lúc 14:00',
      desc: 'Họp Thường trực Đảng ủy về giải phóng mặt bằng TL-548',
      time: '35 phút trước',
      unread: true,
    },
    {
      id: 3,
      title: 'Hồ sơ Một cửa sắp quá hạn',
      desc: '3 hồ sơ cấp giấy chứng nhận quyền sử dụng đất',
      time: '2 giờ trước',
      unread: false,
    },
  ])

  return (
    <header className="h-16 w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-outline-variant shadow-xs flex justify-between items-center px-4 md:px-6 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Menu Button */}
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden text-primary hover:bg-surface-container p-2 rounded-lg transition-colors shrink-0"
          aria-label="Mở menu điều hướng"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        {/* Title */}
        <div className="text-base md:text-lg font-bold text-on-surface flex items-center gap-2 truncate">
          <span className="truncate">
            {role === 'citizen'
              ? 'Cổng Thông Tin & Dịch Vụ Công Dân'
              : 'Hệ Thống Quản Lý Hành Chính Công'}
          </span>
        </div>

        {/* ROLE TOGGLE SWITCH
        {onToggleRole && (
          <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0 ml-2">
            <button
              onClick={() => onToggleRole('cadre')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                role === 'cadre'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <span className="material-symbols-outlined text-sm">badge</span>
              <span>Cán bộ</span>
            </button>
            <button
              onClick={() => onToggleRole('citizen')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                role === 'citizen'
                  ? 'bg-secondary-fixed text-on-secondary-fixed shadow-xs ring-1 ring-amber-400'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
              }`}
            >
              <span className="material-symbols-outlined text-sm">groups</span>
              <span>Nhân dân</span>
            </button>
          </div>
        )} */}
      </div>

      {/* Search Bar */}
      <div className="hidden lg:flex flex-1 max-w-sm mx-4 relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          search
        </span>
        <input
          type="text"
          placeholder={
            role === 'citizen'
              ? 'Tra cứu TTHC, văn bản, hồ sơ...'
              : 'Tìm kiếm hồ sơ, thủ tục, công văn...'
          }
          className="w-full pl-10 pr-4 py-2 text-xs bg-[#fff8f7] border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface transition-all placeholder:text-gray-400"
        />
      </div>

      {/* Right Action Icons & User Profile */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {/* Mobile Switch button if screen too small */}
        {onToggleRole && (
          <button
            onClick={() => onToggleRole(role === 'cadre' ? 'citizen' : 'cadre')}
            className="sm:hidden flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-red-50 text-primary border border-red-200"
          >
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
            <span>{role === 'cadre' ? 'Dân sinh' : 'Cán bộ'}</span>
          </button>
        )}

        <div className="flex items-center gap-1 relative">
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container relative"
              title="Thông báo"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-outline-variant p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                  <span className="font-semibold text-sm text-on-surface">Thông báo điều hành</span>
                  <button
                    onClick={() =>
                      setNotifications(notifications.map((n) => ({ ...n, unread: false })))
                    }
                    className="text-xs text-primary hover:underline"
                  >
                    Đã đọc tất cả
                  </button>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${n.unread ? 'bg-red-50/70 hover:bg-red-50' : 'hover:bg-gray-50'
                        }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-on-surface">
                        <span>{n.title}</span>
                        {n.unread && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                        )}
                      </div>
                      <p className="text-gray-600 mt-0.5 text-[11px] leading-relaxed">{n.desc}</p>
                      <span className="text-[10px] text-gray-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shortcut to AI Agent */}
          <Link
            to="/ai-agent"
            className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container"
            title="Mở Trợ lý AI"
          >
            <span className="material-symbols-outlined text-xl">smart_toy</span>
          </Link>
        </div>

        {/* Profile Avatar / Status */}
        {role === 'citizen' ? (
          <div className="flex items-center gap-2.5 pl-2 md:pl-3 border-l border-outline-variant">
            <div className="w-8 h-8 rounded-full bg-secondary-fixed border border-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold shadow-xs">
              <span className="material-symbols-outlined text-lg">verified_user</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-primary leading-tight">Công dân Can Lộc</p>
              <p className="text-[10px] text-emerald-600 font-semibold leading-tight flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                VNeID Mức 2
              </p>
            </div>
          </div>
        ) : (
          <Link
            to="/admin"
            className="flex items-center gap-2.5 pl-2 md:pl-3 border-l border-outline-variant hover:opacity-85 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold overflow-hidden shadow-xs">
              <span className="material-symbols-outlined text-lg">person</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-primary leading-tight">Nguyễn Văn A</p>
              <p className="text-[10px] text-gray-500 leading-tight">Chủ tịch UBND</p>
            </div>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
