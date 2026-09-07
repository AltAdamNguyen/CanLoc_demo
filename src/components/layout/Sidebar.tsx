import React from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpenMobile?: boolean
  onCloseMobile?: () => void
}

const navItems = [
  { label: 'Tổng quan', path: '/', icon: 'dashboard' },
  { label: 'Lịch công tác', path: '/calendar', icon: 'calendar_today' },
  { label: 'KPI & Công việc', path: '/kpi', icon: 'assignment' },
  { label: 'Phản ánh người dân', path: '/feedback', icon: 'forum' },
  { label: 'Biểu quyết', path: '/voting', icon: 'how_to_vote' },
  { label: 'Báo cáo', path: '/report', icon: 'analytics' },
  { label: 'Quản trị hệ thống', path: '/admin', icon: 'settings' },
]

export const Sidebar: React.FC<SidebarProps> = ({
  isOpenMobile = false,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 md:w-[260px] bg-primary border-r border-outline-variant flex flex-col h-full py-6 px-3 transition-transform duration-300 md:static md:translate-x-0',
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header / Commune Emblem */}
        <div className="flex items-center gap-3 px-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md shrink-0 border border-amber-300 overflow-hidden">
            <span className="material-symbols-outlined text-primary text-2xl" data-weight="fill">
              account_balance
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-white text-base leading-tight truncate">
              UBND Cấp Xã
            </h1>
            <p className="text-xs text-white/80 truncate">Hệ thống điều hành số</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container font-semibold border-l-4 border-secondary shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-primary-container'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className="material-symbols-outlined text-xl shrink-0"
                    data-weight={isActive ? 'fill' : '0'}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* AI Assistant Button at bottom */}
        <div className="mt-auto pt-4 px-1">
          <NavLink
            to="/ai-agent"
            onClick={onCloseMobile}
            className={({ isActive }) =>
              cn(
                'w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md',
                isActive
                  ? 'bg-yellow-400 text-amber-950 ring-2 ring-white'
                  : 'bg-secondary-container text-on-secondary-container hover:opacity-95'
              )
            }
          >
            <span className="material-symbols-outlined text-xl" data-weight="fill">
              smart_toy
            </span>
            <span>Trợ lý AI</span>
          </NavLink>
        </div>
      </aside>
    </>
  )
}
