import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const VotingPage: React.FC = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  const [votes, setVotes] = useState({
    agree: 16,
    disagree: 1,
    other: 1,
    pending: 3,
  })
  const [hasVoted, setHasVoted] = useState(false)

  const handleCastVote = (type: 'agree' | 'disagree' | 'other') => {
    if (hasVoted) return
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
      pending: Math.max(0, prev.pending - 1),
    }))
    setHasVoted(true)
  }

  const totalVoted = votes.agree + votes.disagree + votes.other
  const totalReps = totalVoted + votes.pending
  const percentVoted = Math.round((totalVoted / totalReps) * 100)

  const agreePercent = Math.round((votes.agree / totalVoted) * 100) || 0
  const disagreePercent = Math.round((votes.disagree / totalVoted) * 100) || 0
  const otherPercent = 100 - agreePercent - disagreePercent

  return (
    <div className="w-full space-y-gutter">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-background">Biểu quyết</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Quản lý các cuộc biểu quyết, lấy ý kiến đại biểu HĐND và nhân dân
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => alert('Đang tải xuống biên bản biểu quyết...')}
            className="px-4 py-2 border border-primary text-primary font-label-md text-label-md rounded hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center gap-2 bg-surface shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">download</span> Xuất biên bản
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span> Tạo biểu quyết
          </button>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-lg border border-outline-variant p-6 border-t-4 border-t-secondary relative overflow-hidden group shadow-xs">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <span className="material-symbols-outlined text-9xl">pending_actions</span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-2 font-semibold">
            Đang diễn ra
          </p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-primary">03</span>
            <span className="text-label-sm text-on-surface-variant mb-1">Phiên</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-outline-variant p-6 border-t-4 border-t-outline relative overflow-hidden group shadow-xs">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <span className="material-symbols-outlined text-9xl">hourglass_empty</span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-2 font-semibold">
            Chờ biểu quyết
          </p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-on-background">05</span>
            <span className="text-label-sm text-on-surface-variant mb-1">Phiên</span>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-outline-variant p-6 border-t-4 border-t-[#00875A] relative overflow-hidden group shadow-xs">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <span className="material-symbols-outlined text-9xl">task_alt</span>
          </div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-2 font-semibold">
            Đã hoàn thành
          </p>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold text-on-background">48</span>
            <span className="text-label-sm text-on-surface-variant mb-1">Phiên (Năm nay)</span>
          </div>
        </div>
      </div>

      {/* Featured Active & Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Left Column: Featured Active + List */}
        <div className="lg:col-span-2 space-y-gutter">
          {/* Featured Active Voting Card (Bento Style) */}
          <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-xs">
            <div className="bg-surface-variant px-6 py-4 border-b border-outline-variant flex justify-between items-center">
              <div className="flex items-center gap-2 text-primary font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined animate-pulse text-sm">
                  radio_button_checked
                </span>
                <span>PHIÊN BIỂU QUYẾT TRỌNG ĐIỂM</span>
              </div>
              <span className="bg-[#E3FCEF] text-[#006644] px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span> Đủ điều kiện biểu
                quyết
              </span>
            </div>

            <div className="p-6">
              <h3 className="font-headline-md text-headline-md text-on-background mb-2 font-bold">
                Thông qua Kế hoạch Chuyển đổi số năm 2027
              </h3>
              <div className="flex items-center gap-4 text-on-surface-variant font-body-md mb-6 text-xs">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span> Hạn chót:
                  16:30 - 28/08/2026
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">gavel</span> Chủ tọa: Đ/c
                  Nguyễn Văn A
                </span>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Tiến độ tham gia ({totalVoted}/{totalReps} đại biểu)
                  </span>
                  <span className="font-title-lg text-title-lg text-primary font-bold">
                    {percentVoted}%
                  </span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentVoted}%` }}
                  ></div>
                </div>
              </div>

              {/* 4 Interactive vote boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                  onClick={() => handleCastVote('agree')}
                  className="bg-surface-container p-4 rounded text-center border border-outline-variant/50 hover:border-[#00875A] cursor-pointer transition-all hover:scale-102"
                >
                  <div className="text-2xl font-bold text-[#00875A] mb-1">{votes.agree}</div>
                  <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    Đồng ý
                  </div>
                </div>
                <div
                  onClick={() => handleCastVote('disagree')}
                  className="bg-surface-container p-4 rounded text-center border border-outline-variant/50 hover:border-error cursor-pointer transition-all hover:scale-102"
                >
                  <div className="text-2xl font-bold text-error mb-1">{votes.disagree}</div>
                  <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    Không đồng ý
                  </div>
                </div>
                <div
                  onClick={() => handleCastVote('other')}
                  className="bg-surface-container p-4 rounded text-center border border-outline-variant/50 hover:border-secondary cursor-pointer transition-all hover:scale-102"
                >
                  <div className="text-2xl font-bold text-secondary mb-1">{votes.other}</div>
                  <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    Ý kiến khác
                  </div>
                </div>
                <div className="bg-surface-container p-4 rounded text-center border border-outline-variant/50 opacity-60">
                  <div className="text-2xl font-bold text-on-surface mb-1">{votes.pending}</div>
                  <div className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    Chưa biểu quyết
                  </div>
                </div>
              </div>

              {hasVoted && (
                <p className="text-xs text-emerald-700 font-bold mt-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Hệ thống đã ghi nhận biểu quyết của đồng chí thành công!
                </p>
              )}
            </div>
          </div>

          {/* Voting List Table */}
          <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden shadow-xs">
            <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-[#F9FAFB]">
              <h3 className="font-title-lg text-title-lg text-on-background font-bold">
                Danh sách biểu quyết
              </h3>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="text-sm border border-outline-variant rounded py-1 pl-3 pr-8 bg-surface focus:ring-primary focus:border-primary"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Đang diễn ra</option>
                  <option value="finished">Đã kết thúc</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#F9FAFB] text-on-surface-variant font-label-md uppercase border-b border-outline-variant">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Nội dung</th>
                    <th className="px-6 py-3 font-semibold">Thời hạn</th>
                    <th className="px-6 py-3 font-semibold text-center">Tham gia</th>
                    <th className="px-6 py-3 font-semibold">Trạng thái</th>
                    <th className="px-6 py-3 font-semibold">Kết quả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant text-on-background font-body-md">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium max-w-xs truncate" title="Quyết định phân bổ ngân sách xã 6 tháng cuối năm">
                        Quyết định phân bổ ngân sách xã 6 tháng cuối năm
                      </div>
                      <div className="text-xs text-on-surface-variant">Tạo bởi: Văn phòng UBND</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>17:00</div>
                      <div className="text-xs text-on-surface-variant">Hôm nay</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium">21/21</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E3FCEF] text-[#006644]">
                        Đã kết thúc
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#00875A] font-semibold">Thông qua (100%)</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors bg-primary-fixed/20">
                    <td className="px-6 py-4 border-l-4 border-primary">
                      <div className="font-medium max-w-xs truncate text-primary font-bold" title="Thông qua Kế hoạch Chuyển đổi số năm 2027">
                        Thông qua Kế hoạch Chuyển đổi số năm 2027
                      </div>
                      <div className="text-xs text-on-surface-variant">Tạo bởi: Ban CĐS</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>16:30</div>
                      <div className="text-xs text-on-surface-variant">28/08/2026</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium">{totalVoted}/{totalReps}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DEEBFF] text-[#0747A6]">
                        Đang diễn ra
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-on-surface-variant italic">Đang cập nhật...</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium max-w-xs truncate" title="Quy hoạch sử dụng đất khu vực Thôn 3">
                        Quy hoạch sử dụng đất khu vực Thôn 3
                      </div>
                      <div className="text-xs text-on-surface-variant">Tạo bởi: Địa chính</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>08:00</div>
                      <div className="text-xs text-on-surface-variant">05/09/2026</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium">0/21</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFFAE6] text-[#FF8B00]">
                        Chờ phê duyệt
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-on-surface-variant">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Result Detail View */}
        <div className="lg:col-span-1 space-y-gutter">
          <div className="bg-surface border border-outline-variant rounded-lg flex flex-col h-full shadow-xs">
            <div className="px-6 py-4 border-b border-outline-variant bg-[#F9FAFB]">
              <h3 className="font-title-lg text-title-lg text-on-background font-bold">
                Kết quả biểu quyết chi tiết
              </h3>
              <p className="text-xs text-on-surface-variant mt-1 truncate">
                Kế hoạch CĐS năm 2027
              </p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              {/* Donut Chart (CSS Conic Gradient) */}
              <div className="flex justify-center items-center py-4 mb-6">
                <div
                  className="relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: `conic-gradient(#00875A 0% ${agreePercent}%, #ba1a1a ${agreePercent}% ${
                      agreePercent + disagreePercent
                    }%, #745b00 ${agreePercent + disagreePercent}% 100%)`,
                  }}
                >
                  <div className="absolute inset-0 m-4 bg-surface rounded-full flex flex-col items-center justify-center shadow-inner">
                    <span className="text-2xl font-bold text-on-background">{totalVoted}</span>
                    <span className="text-xs text-on-surface-variant">Tổng phiếu</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#00875A]"></div> Đồng ý
                  </div>
                  <span className="font-medium">
                    {votes.agree} ({agreePercent}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-error"></div> Không đồng ý
                  </div>
                  <span className="font-medium">
                    {votes.disagree} ({disagreePercent}%)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div> Ý kiến khác
                  </div>
                  <span className="font-medium">
                    {votes.other} ({otherPercent}%)
                  </span>
                </div>
              </div>

              <h4 className="font-label-md text-label-md text-on-surface-variant uppercase mb-3 font-semibold">
                Lịch sử bỏ phiếu (Gần nhất)
              </h4>
              <div className="space-y-3 flex-1 overflow-y-auto pr-2 text-xs">
                <div className="flex items-start justify-between pb-3 border-b border-outline-variant/50">
                  <div>
                    <p className="font-medium text-on-background">Lê Văn B</p>
                    <p className="text-xs text-on-surface-variant">Phó Chủ tịch</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[#00875A] font-medium block">Đồng ý</span>
                    <span className="text-xs text-on-surface-variant">14:05</span>
                  </div>
                </div>
                <div className="flex items-start justify-between pb-3 border-b border-outline-variant/50">
                  <div>
                    <p className="font-medium text-on-background">Trần Thị C</p>
                    <p className="text-xs text-on-surface-variant">Trưởng phòng Tài chính</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[#00875A] font-medium block">Đồng ý</span>
                    <span className="text-xs text-on-surface-variant">14:02</span>
                  </div>
                </div>
                <div className="flex items-start justify-between pb-3 border-b border-outline-variant/50">
                  <div>
                    <p className="font-medium text-on-background">Phạm Văn D</p>
                    <p className="text-xs text-on-surface-variant">Trưởng Công an</p>
                  </div>
                  <div className="text-right">
                    <span className="text-secondary font-medium block">Ý kiến khác</span>
                    <span className="text-xs text-on-surface-variant">13:58</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-variant px-4 py-3 rounded-b-lg border-t border-outline-variant text-center">
              <p className="text-[10px] text-on-surface-variant font-medium flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[12px]">lock</span>
                Hệ thống ghi nhận bằng chữ ký số • Thời gian thực • Minh bạch
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo phiên biểu quyết mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold block mb-1">Nội dung biểu quyết *</label>
              <textarea
                rows={3}
                placeholder="VD: Thông qua Kế hoạch phát triển kinh tế - xã hội..."
                className="w-full border border-outline-variant rounded p-2 text-xs outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold block mb-1">Thời hạn kết thúc</label>
                <Input type="date" defaultValue="2026-08-28" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Giờ kết thúc</label>
                <Input defaultValue="16:30" />
              </div>
            </div>
            <div>
              <label className="font-semibold block mb-1">Chủ tọa phiên họp</label>
              <Input defaultValue="Đ/c Nguyễn Văn A - Chủ tịch UBND" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
              Hủy
            </Button>
            <Button
              size="sm"
              onClick={() => {
                alert('Đã khởi tạo phiên biểu quyết mới thành công!')
                setIsCreateOpen(false)
              }}
              className="bg-primary text-white"
            >
              Phát động biểu quyết
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
