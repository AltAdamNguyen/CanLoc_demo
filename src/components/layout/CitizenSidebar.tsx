import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { UserRole, setStoredRole, CADRE_HOME, CITIZEN_HOME } from '@/lib/role'

interface CitizenSidebarProps {
  onToggleRole?: (role: UserRole) => void
}

interface NavItem {
  label: string
  path: string
  icon: string
}

const citizenNavItems: NavItem[] = [
  { label: 'Tin tức & chỉ đạo', path: '/citizen/news', icon: 'newspaper' },
  { label: 'Dịch vụ công & TTHC', path: '/citizen/services', icon: 'assignment' },
  { label: 'Lịch công tác', path: '/citizen/schedule', icon: 'calendar_month' },
  { label: 'Văn bản pháp quy', path: '/citizen/documents', icon: 'policy' },
  { label: 'Thông tin lãnh đạo', path: '/citizen/leaders', icon: 'groups' },
  { label: 'Bản đồ số GIS & Điểm nóng', path: '/citizen/map-gis', icon: 'explore' },
  { label: 'Quản lý phản ánh', path: '/citizen/reports', icon: 'campaign' },
  { label: 'Camera an ninh', path: '/citizen/camera', icon: 'videocam' },
]

export const CitizenSidebar: React.FC<CitizenSidebarProps> = ({ onToggleRole }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleRoleSwitch = (newRole: UserRole) => {
    setStoredRole(newRole)
    if (onToggleRole) {
      onToggleRole(newRole)
    } else {
      if (newRole === 'cadre') {
        navigate(CADRE_HOME)
      } else {
        navigate(CITIZEN_HOME)
      }
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate('/citizen/services')
    }
  }

  return (
    <header className="w-full bg-surface-container-lowest shadow-md z-40 sticky top-0">
      {/* 1. TOP RED MICRO-BAR (Identical to citizen/service.html) */}
      <div className="bg-primary text-on-primary text-xs py-2 px-4 md:px-8 border-b border-primary-container/60">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between gap-3">
          {/* Left information */}
          <div className="flex items-center gap-4 flex-wrap text-[11px] md:text-xs">
            <span className="flex items-center gap-1.5 text-secondary-fixed font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
              Hệ thống VNeID trực tuyến
            </span>
            <span className="hidden md:inline text-primary-fixed-dim">|</span>
            <span className="flex items-center gap-1 text-primary-fixed">
              <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                phone_in_talk
              </span>
              Trực ban tiếp dân:{' '}
              <strong className="text-secondary-fixed font-bold font-mono">0239.3841.115</strong>{' '}
              (24/7)
            </span>
            <span className="hidden lg:flex items-center gap-1 text-primary-fixed-dim">
              <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                partly_cloudy_day
              </span>
              Xã Can Lộc: 27°C - Độ ẩm 78%
            </span>
          </div>

          {/* Right actions & ROLE SWITCHER */}
          <div className="flex items-center gap-3">
            {/* ROLE SWITCHER: CÁN BỘ ↔ NHÂN DÂN */}
            <div className="flex items-center bg-black/30 p-0.5 rounded-lg border border-white/20 shadow-inner">
              <button
                type="button"
                onClick={() => handleRoleSwitch('cadre')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-all"
                title="Chuyển sang Hệ thống Điều hành Cán bộ"
              >
                <span className="material-symbols-outlined text-xs">badge</span>
                <span>Cán bộ</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch('citizen')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-secondary-fixed text-on-secondary-fixed shadow-xs ring-1 ring-amber-300 transition-all"
              >
                <span className="material-symbols-outlined text-xs">groups</span>
                <span>Nhân dân</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-primary-container/80 text-secondary-fixed px-2.5 py-0.5 rounded text-[11px]">
              <span className="material-symbols-outlined text-[15px]">campaign</span>
              <span>Tiếp nhận hồ sơ số hóa đợt 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CREST & TITLE & SEARCH BAR (Identical to citizen/service.html) */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-6">
          {/* Emblem & Portal Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shadow shrink-0 ring-2 ring-secondary-fixed/50">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div>
              <div className="text-[11px] tracking-wider uppercase text-secondary font-bold">
                Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam
              </div>
              <div className="text-lg md:text-xl uppercase tracking-tight text-primary font-bold leading-tight">
                UBND Xã Can Lộc
              </div>
              <div className="text-xs text-on-surface-variant font-medium">
                Cổng Dịch Vụ Công Trực Tuyến & Thông Tin Công Dân
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="hidden lg:flex items-center gap-2 max-w-md w-full">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-low text-on-surface-variant w-full border border-outline-variant/40 focus-within:border-primary focus-within:bg-white transition-all">
                <span className="material-symbols-outlined text-[20px] text-primary">search</span>
                <input
                  className="bg-transparent border-none outline-none text-xs md:text-sm w-full text-on-surface placeholder:text-on-surface-variant/70"
                  placeholder="Tra cứu TTHC, số hồ sơ, văn bản..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 3. HORIZONTAL NAVIGATION BAR (Identical to citizen/service.html) */}
      <nav className="bg-primary text-on-primary px-2 sm:px-4 md:px-6 shadow-inner w-full">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-start xl:justify-center gap-3 overflow-x-auto lg:overflow-visible py-1 text-xs xl:text-[13px] scrollbar-none">
          {citizenNavItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded font-semibold transition-colors shrink-0 whitespace-nowrap',
                    isActive
                      ? 'bg-primary-container text-on-primary-container border-b-2 border-secondary-fixed shadow-sm'
                      : 'text-on-primary hover:bg-primary-container hover:text-on-primary-container'
                  )
                }
              >
                <span
                  className={cn(
                    'material-symbols-outlined text-[17px] xl:text-[18px]',
                    isActive ? 'text-secondary-fixed' : ''
                  )}
                  data-weight={isActive ? 'fill' : '0'}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </header>
  )
}

export default CitizenSidebar
