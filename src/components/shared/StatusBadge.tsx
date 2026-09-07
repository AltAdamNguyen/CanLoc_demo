import React from 'react'
import { Badge } from '@/components/ui/badge'

export type StatusType =
  | 'completed'
  | 'in_progress'
  | 'pending'
  | 'overdue'
  | 'urgent'
  | 'approved'
  | 'rejected'

interface StatusBadgeProps {
  status: StatusType | string
  label?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  switch (status) {
    case 'completed':
    case 'Đã giải quyết':
    case 'Đã hoàn thành':
    case 'Hoàn thành':
      return (
        <Badge variant="success" className="gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          {label || status}
        </Badge>
      )
    case 'in_progress':
    case 'Đang xử lý':
    case 'Đang thực hiện':
      return (
        <Badge variant="info" className="gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          {label || status}
        </Badge>
      )
    case 'pending':
    case 'Chờ tiếp nhận':
    case 'Chưa thực hiện':
    case 'Chờ xử lý':
      return (
        <Badge variant="warning" className="gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          {label || status}
        </Badge>
      )
    case 'overdue':
    case 'Quá hạn':
    case 'Trễ hạn':
      return (
        <Badge variant="destructive" className="gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          {label || status}
        </Badge>
      )
    case 'urgent':
    case 'Khẩn cấp':
      return (
        <Badge variant="destructive" className="gap-1 animate-pulse font-bold">
          <span className="material-symbols-outlined text-xs">priority_high</span>
          {label || status}
        </Badge>
      )
    default:
      return <Badge variant="outline">{label || status}</Badge>
  }
}
