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

interface FeedbackRow {
  id: string
  code: string
  citizenName: string
  phone: string
  content: string
  date: string
  category: string
  status: 'Mới' | 'Đang xử lý' | 'Đã đóng'
}

export const FeedbackPage: React.FC = () => {
  const [rows, setRows] = useState<FeedbackRow[]>([
    {
      id: '1',
      code: 'PA-1024',
      citizenName: 'Nguyễn Văn A',
      phone: '0901234567',
      content: 'Đèn đường ngõ 42 hỏng đã 1 tuần nay gây nguy hiểm...',
      date: '12/10/2023',
      category: 'Hạ tầng',
      status: 'Mới',
    },
    {
      id: '2',
      code: 'PA-1023',
      citizenName: 'Trần Thị B',
      phone: '0987654321',
      content: 'Rác thải sinh hoạt ùn ứ trước cửa khu tập thể C2...',
      date: '11/10/2023',
      category: 'Môi trường',
      status: 'Đang xử lý',
    },
    {
      id: '3',
      code: 'PA-1022',
      citizenName: 'Lê Văn C',
      phone: '0912345678',
      content: 'Tụ tập đánh bài, gây ồn ào tại quán nước đầu ngõ 15...',
      date: '10/10/2023',
      category: 'An ninh',
      status: 'Đã đóng',
    },
    {
      id: '4',
      code: 'PA-1021',
      citizenName: 'Phạm Thị D',
      phone: '0971234567',
      content: 'Đề nghị cắt tỉa cây xanh trước mùa mưa bão tại phố X...',
      date: '09/10/2023',
      category: 'Hạ tầng',
      status: 'Đã đóng',
    },
  ])

  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRow, setSelectedRow] = useState<FeedbackRow | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [replyText, setReplyText] = useState('')

  const filteredRows = rows.filter((r) => {
    const matchStatus = statusFilter === 'all' || r.status === statusFilter
    const matchCat = categoryFilter === 'all' || r.category === categoryFilter
    const matchSearch =
      r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.citizenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchStatus && matchCat && matchSearch
  })

  return (
    <div className="max-w-container_max_width mx-auto">
      {/* Header & Actions */}
      <div className="flex justify-between items-end mb-stack_lg flex-wrap gap-4">
        <div>
          <h3 className="font-display-lg text-display-lg text-on-surface">Phản ánh người dân</h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Quản lý và xử lý các ý kiến, khiếu nại từ công dân trên địa bàn.
          </p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded font-title-lg text-title-lg flex items-center hover:opacity-90 transition-opacity shadow-sm"
        >
          <span className="material-symbols-outlined mr-2">add</span>
          Tạo phản ánh mới
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-stack_lg">
        <div className="bg-surface p-stack_md rounded-lg border border-outline-variant border-t-4 border-t-secondary shadow-xs">
          <p className="font-label-md text-label-md text-on-surface-variant mb-1">
            Tổng phản ánh (Tháng)
          </p>
          <h4 className="font-headline-md text-headline-md text-primary font-bold">342</h4>
        </div>
        <div className="bg-surface p-stack_md rounded-lg border border-outline-variant border-t-4 border-t-error shadow-xs">
          <p className="font-label-md text-label-md text-on-surface-variant mb-1">Mới tiếp nhận</p>
          <h4 className="font-headline-md text-headline-md text-error font-bold">45</h4>
        </div>
        <div className="bg-surface p-stack_md rounded-lg border border-outline-variant border-t-4 border-t-warning shadow-xs">
          <p className="font-label-md text-label-md text-on-surface-variant mb-1">Đang xử lý</p>
          <h4 className="font-headline-md text-headline-md text-[#B45309] font-bold">112</h4>
        </div>
        <div className="bg-surface p-stack_md rounded-lg border border-outline-variant border-t-4 border-t-success shadow-xs">
          <p className="font-label-md text-label-md text-on-surface-variant mb-1">Đã giải quyết</p>
          <h4 className="font-headline-md text-headline-md text-[#059669] font-bold">185</h4>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface p-stack_md rounded-t-lg border border-outline-variant border-b-0 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-surface-container border border-outline-variant rounded px-4 py-2 pr-8 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Mới">Mới</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đã đóng">Đã đóng</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-on-surface-variant pointer-events-none">
              arrow_drop_down
            </span>
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-surface-container border border-outline-variant rounded px-4 py-2 pr-8 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-48"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="Hạ tầng">Hạ tầng</option>
              <option value="Môi trường">Môi trường</option>
              <option value="An ninh">An ninh</option>
              <option value="Khác">Khác</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-2.5 text-on-surface-variant pointer-events-none">
              arrow_drop_down
            </span>
          </div>

          <div className="relative">
            <input
              className="bg-surface-container border border-outline-variant rounded px-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              type="date"
              defaultValue="2023-10-12"
            />
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-sm">
            search
          </span>
          <input
            className="w-full bg-surface-container border border-outline-variant rounded pl-10 pr-4 py-2 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Tìm kiếm mã, người gửi..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface border border-outline-variant rounded-b-lg overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline-variant">
              <th className="p-4 font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider w-16">
                ID
              </th>
              <th className="p-4 font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
                Người gửi
              </th>
              <th className="p-4 font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider w-1/3">
                Nội dung
              </th>
              <th className="p-4 font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
                Ngày gửi
              </th>
              <th className="p-4 font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
                Phân loại
              </th>
              <th className="p-4 font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="p-4 font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider text-right">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-body-md text-body-md text-on-surface">
            {filteredRows.map((r) => (
              <tr key={r.id} className="hover:bg-surface-container-low transition-colors">
                <td className="p-4 font-mono font-medium">{r.code}</td>
                <td className="p-4">
                  <div className="font-semibold text-primary">{r.citizenName}</div>
                  <div className="text-on-surface-variant text-label-sm">{r.phone}</div>
                </td>
                <td className="p-4 truncate max-w-xs">{r.content}</td>
                <td className="p-4">{r.date}</td>
                <td className="p-4">{r.category}</td>
                <td className="p-4">
                  {r.status === 'Mới' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-error-container text-error font-label-sm text-label-sm font-semibold">
                      <span className="w-2 h-2 rounded-full bg-error mr-1.5"></span> Mới
                    </span>
                  )}
                  {r.status === 'Đang xử lý' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] font-label-sm text-label-sm font-semibold border border-[#FDE68A]">
                      <span className="w-2 h-2 rounded-full bg-[#B45309] mr-1.5"></span> Đang xử lý
                    </span>
                  )}
                  {r.status === 'Đã đóng' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#D1FAE5] text-[#059669] font-label-sm text-label-sm font-semibold border border-[#A7F3D0]">
                      <span className="w-2 h-2 rounded-full bg-[#059669] mr-1.5"></span> Đã đóng
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedRow(r)}
                    className="text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold mr-3 uppercase"
                  >
                    Xem chi tiết
                  </button>
                  {r.status !== 'Đã đóng' && (
                    <button
                      onClick={() => {
                        setSelectedRow(r)
                        setReplyText('')
                      }}
                      className="text-tertiary hover:text-tertiary-container font-label-sm text-label-sm font-semibold uppercase"
                    >
                      {r.status === 'Mới' ? 'Phản hồi' : 'Cập nhật'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <span className="text-on-surface-variant font-body-md text-body-md">
            Hiển thị {filteredRows.length} của 342 phản ánh
          </span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50">
              Trước
            </button>
            <button className="px-3 py-1 bg-primary text-on-primary rounded font-bold">1</button>
            <button className="px-3 py-1 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-container transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-container transition-colors">
              3
            </button>
            <button className="px-3 py-1 border border-outline-variant rounded text-on-surface-variant hover:bg-surface-container transition-colors">
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Detail Dialog */}
      {selectedRow && (
        <Dialog open={!!selectedRow} onOpenChange={() => setSelectedRow(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-primary font-bold">
                Chi tiết phản ánh {selectedRow.code}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-xs">
              <div className="bg-surface-container-low p-3 rounded-lg space-y-1 text-on-surface">
                <p>
                  <strong>Người gửi:</strong> {selectedRow.citizenName} ({selectedRow.phone})
                </p>
                <p>
                  <strong>Thời gian gửi:</strong> {selectedRow.date}
                </p>
                <p>
                  <strong>Lĩnh vực:</strong> {selectedRow.category}
                </p>
                <p>
                  <strong>Trạng thái:</strong> {selectedRow.status}
                </p>
              </div>
              <div>
                <label className="font-bold block mb-1">Nội dung phản ánh:</label>
                <p className="p-3 bg-white border border-outline-variant rounded-md text-sm text-on-surface">
                  {selectedRow.content}
                </p>
              </div>
              <div>
                <label className="font-bold block mb-1">Nội dung phản hồi / Xử lý:</label>
                <textarea
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Nhập nội dung phúc đáp gửi tới người dân..."
                  className="w-full border border-outline-variant rounded-md p-2 text-xs outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setSelectedRow(null)}>
                Đóng
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (replyText.trim()) {
                    setRows(
                      rows.map((item) =>
                        item.id === selectedRow.id ? { ...item, status: 'Đã đóng' } : item
                      )
                    )
                  }
                  setSelectedRow(null)
                }}
                className="bg-primary text-white"
              >
                Lưu kết quả xử lý
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo phản ánh mới từ công dân</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold block mb-1">Họ tên người gửi *</label>
              <Input placeholder="VD: Nguyễn Văn A" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold block mb-1">Số điện thoại</label>
                <Input placeholder="090xxxxxxx" />
              </div>
              <div>
                <label className="font-semibold block mb-1">Lĩnh vực</label>
                <select className="w-full h-10 border border-outline-variant rounded px-2 text-xs bg-white">
                  <option>Hạ tầng</option>
                  <option>Môi trường</option>
                  <option>An ninh</option>
                  <option>Khác</option>
                </select>
              </div>
            </div>
            <div>
              <label className="font-semibold block mb-1">Nội dung phản ánh</label>
              <textarea
                rows={3}
                placeholder="Mô tả chi tiết nội dung phản ánh của người dân..."
                className="w-full border border-outline-variant rounded p-2 text-xs outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
              Hủy
            </Button>
            <Button
              size="sm"
              onClick={() => {
                alert('Đã tiếp nhận phản ánh mới vào hệ thống!')
                setIsCreateOpen(false)
              }}
              className="bg-primary text-white"
            >
              Tiếp nhận phản ánh
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
