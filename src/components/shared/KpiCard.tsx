import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  title: string
  value: string | number
  subtext?: string
  trend?: {
    value: string
    isPositive?: boolean
    label?: string
  }
  icon?: string
  topBorderColor?: string
  className?: string
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtext,
  trend,
  icon,
  topBorderColor = '#fdd355',
  className,
}) => {
  return (
    <Card
      className={cn('transition-all duration-200 hover:shadow-md relative overflow-hidden', className)}
      style={{ borderTop: `4px solid ${topBorderColor}` }}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              {title}
            </p>
            <h3 className="text-2xl lg:text-3xl font-bold text-on-surface tracking-tight">
              {value}
            </h3>
          </div>
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
          )}
        </div>

        {(trend || subtext) && (
          <div className="mt-4 flex items-center gap-2 pt-2 border-t border-gray-100 text-xs">
            {trend && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded',
                  trend.isPositive
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-rose-700 bg-rose-50'
                )}
              >
                <span className="material-symbols-outlined text-sm">
                  {trend.isPositive ? 'trending_up' : 'trending_down'}
                </span>
                {trend.value}
              </span>
            )}
            <span className="text-gray-500">{trend?.label || subtext}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
