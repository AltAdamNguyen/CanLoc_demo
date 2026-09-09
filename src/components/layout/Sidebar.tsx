import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpenMobile?: boolean
  onCloseMobile?: () => void
}

interface NavSubItem {
  label: string
  path: string
  icon: string
}

interface NavItem {
  label: string
  path: string
  icon: string
  children?: NavSubItem[]
}

const navItems: NavItem[] = [
  { label: 'Trang chủ', path: '/', icon: 'home' },
  {
    label: 'Tổng quan',
    path: '/overview',
    icon: 'dashboard',
    children: [
      { label: 'Bản đồ GIS', path: '/map', icon: 'map' },
      { label: 'Phản ánh hiện trường', path: '/report-scene', icon: 'campaign' },
      { label: 'Camera an ninh', path: '/camera', icon: 'videocam' },
    ],
  },
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
  const location = useLocation()

  // Track expanded state for menu items with children
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    navItems.forEach((item) => {
      if (item.children) {
        const isCurrentOrChild =
          location.pathname === item.path ||
          item.children.some((c) => location.pathname === c.path)
        initial[item.path] = isCurrentOrChild
      }
    })
    return initial
  })

  // Auto-expand if the route changes to one of the child items or parent item
  useEffect(() => {
    navItems.forEach((item) => {
      if (item.children) {
        const isCurrentOrChild =
          location.pathname === item.path ||
          item.children.some((c) => location.pathname === c.path)
        if (isCurrentOrChild) {
          setExpandedMenus((prev) => ({ ...prev, [item.path]: true }))
        }
      }
    })
  }, [location.pathname])

  const toggleMenu = (path: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setExpandedMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }))
  }

  const handleParentClick = (item: NavItem) => {
    // When clicking parent: expand the dropdown and navigate to item.path (/overview)
    setExpandedMenus((prev) => ({
      ...prev,
      [item.path]: true,
    }))
    if (onCloseMobile) {
      onCloseMobile()
    }
  }

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
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0)
            const isExpanded = !!expandedMenus[item.path]
            const isParentActive = location.pathname === item.path
            const isChildActive = Boolean(
              hasChildren &&
                item.children!.some((c) => location.pathname === c.path)
            )

            // Standard menu item (without children)
            if (!hasChildren) {
              return (
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
              )
            }

            // Parent menu item with children (dropdown expand/collapse)
            return (
              <div key={item.path} className="space-y-1">
                <div
                  className={cn(
                    'group flex items-center justify-between rounded-lg transition-all duration-150',
                    isParentActive
                      ? 'bg-secondary-container text-on-secondary-container font-semibold border-l-4 border-secondary shadow-sm'
                      : isChildActive
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/80 hover:text-white hover:bg-primary-container'
                  )}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => handleParentClick(item)}
                    className="flex items-center gap-3 px-3.5 py-2.5 flex-1 min-w-0"
                  >
                    <span
                      className="material-symbols-outlined text-xl shrink-0"
                      data-weight={isParentActive || isChildActive ? 'fill' : '0'}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate text-sm">{item.label}</span>
                  </NavLink>

                  <button
                    type="button"
                    onClick={(e) => toggleMenu(item.path, e)}
                    className="p-2 mr-1 rounded hover:bg-black/10 dark:hover:bg-white/10 text-inherit opacity-80 hover:opacity-100 transition-opacity shrink-0"
                    title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
                    aria-label={isExpanded ? 'Thu gọn' : 'Mở rộng'}
                  >
                    <span
                      className={cn(
                        'material-symbols-outlined text-lg transition-transform duration-200 block',
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      )}
                    >
                      keyboard_arrow_down
                    </span>
                  </button>
                </div>

                {/* Submenu Children */}
                {isExpanded && (
                  <div className="ml-3 pl-2.5 border-l-2 border-white/20 space-y-1 pt-0.5 pb-1 transition-all duration-200">
                    {item.children!.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={onCloseMobile}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150',
                            isActive
                              ? 'bg-secondary-container text-on-secondary-container font-semibold border-l-4 border-secondary shadow-xs'
                              : 'text-white/75 hover:text-white hover:bg-white/10'
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className="material-symbols-outlined text-lg shrink-0"
                              data-weight={isActive ? 'fill' : '0'}
                            >
                              {child.icon}
                            </span>
                            <span className="truncate">{child.label}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
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
