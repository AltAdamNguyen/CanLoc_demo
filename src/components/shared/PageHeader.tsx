import React from 'react'
import { Button } from '@/components/ui/button'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actionLabel?: string
  actionIcon?: string
  onAction?: () => void
  children?: React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  actionIcon,
  onAction,
  children,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        {children}
        {actionLabel && (
          <Button
            onClick={onAction}
            className="flex items-center gap-2 shadow-sm font-medium"
          >
            {actionIcon && (
              <span className="material-symbols-outlined text-lg">{actionIcon}</span>
            )}
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
