import React, { useState } from 'react'

interface ChatMessage {
  id: string
  sender: 'user' | 'ai'
  text: string
  time: string
}

export const AiAgentPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [historySearch, setHistorySearch] = useState('')

  const historyItems = [
    { id: '1', title: 'Báo cáo tiến độ dự án đường X', time: 'today', active: true },
    { id: '2', title: 'Tóm tắt văn bản số 12/UBND về quản lý đất đai', time: 'today', active: false },
    { id: '3', title: 'Soạn thảo giấy mời họp GPMB', time: 'yesterday', active: false },
    { id: '4', title: 'Quy trình cấp giấy phép xây dựng nhà ở riêng lẻ', time: 'yesterday', active: false },
  ]

  const handleSendMessage = (contentToSend?: string) => {
    const text = contentToSend || inputText
    if (!text.trim()) return

    const newMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, newMsg])
    if (!contentToSend) setInputText('')
    setIsTyping(true)

    setTimeout(() => {
      let reply = ''
      if (text.includes('đường X') || text.includes('tiến độ')) {
        reply = `Dự án nâng cấp, mở rộng đường trục xã (tuyến đường X) có tổng chiều dài 3.2km:\n- Đã hoàn thành GPMB đạt 95% khối lượng.\n- Đơn vị thi công đã thảm bê tông được 2.1km.\n- Dự kiến nghiệm thu và bàn giao đưa vào sử dụng trước ngày 30/10/2026.`
      } else if (text.includes('đất đai') || text.includes('12/UBND')) {
        reply = `Văn bản số 12/UBND về tăng cường công tác quản lý đất đai trên địa bàn:\n1. Tăng cường tuần tra, ngăn chặn tình trạng tự ý chuyển đổi mục đích sử dụng đất nông nghiệp.\n2. Yêu cầu Ban cán sự các thôn báo cáo định kỳ vào ngày 25 hàng tháng.\n3. Xử lý nghiêm các trường hợp lấn chiếm hành lang an toàn giao thông.`
      } else {
        reply = `Tôi đã tiếp nhận yêu cầu: "${text}".\n\nTheo quy định hiện hành và cơ sở dữ liệu số của UBND xã, thủ tục này thuộc thẩm quyền giải quyết của bộ phận Một cửa. Tôi có thể hỗ trợ dự thảo văn bản hoặc tóm tắt tài liệu liên quan cho đồng chí ngay.`
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        },
      ])
      setIsTyping(false)
    }, 600)
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background -m-4 md:-m-6 lg:-m-8">
      {/* Left Panel: Request History */}
      <div className="w-80 border-r border-outline-variant bg-surface-container-lowest flex flex-col shrink-0 hidden lg:flex">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface">
          <h2 className="font-title-lg text-title-lg text-on-surface font-bold">Lịch sử yêu cầu</h2>
          <button
            onClick={() => setMessages([])}
            className="text-primary hover:bg-primary-container hover:text-on-primary-container p-1.5 rounded-full transition-colors"
            title="Cuộc trò chuyện mới"
          >
            <span className="material-symbols-outlined text-sm">edit_square</span>
          </button>
        </div>

        {/* Search History */}
        <div className="p-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-sm">
              search
            </span>
            <input
              className="w-full bg-surface-container pl-9 pr-3 py-2 rounded-md border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-sm font-body-md placeholder:text-on-surface-variant"
              placeholder="Tìm kiếm lịch sử..."
              type="text"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
            />
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1 text-xs">
          <div className="font-label-sm text-on-surface-variant px-2 py-1 mt-2 uppercase tracking-wider font-semibold">
            Hôm nay
          </div>
          <button
            onClick={() => handleSendMessage('Cho tôi xin báo cáo tiến độ dự án đường X.')}
            className="w-full text-left px-3 py-2 rounded-md bg-surface-container-low border border-outline-variant flex items-start gap-2 group cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary text-sm mt-0.5">
              chat_bubble
            </span>
            <span className="font-body-md text-on-surface line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              Báo cáo tiến độ dự án đường X
            </span>
          </button>
          <button
            onClick={() => handleSendMessage('Tóm tắt văn bản số 12/UBND về quản lý đất đai')}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-surface-container-low flex items-start gap-2 group transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-sm mt-0.5">
              chat_bubble
            </span>
            <span className="font-body-md text-on-surface-variant line-clamp-2 leading-tight group-hover:text-on-surface transition-colors">
              Tóm tắt văn bản số 12/UBND về quản lý đất đai
            </span>
          </button>

          <div className="font-label-sm text-on-surface-variant px-2 py-1 mt-4 uppercase tracking-wider font-semibold">
            Hôm qua
          </div>
          <button
            onClick={() => handleSendMessage('Soạn thảo giấy mời họp GPMB tuyến liên thôn')}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-surface-container-low flex items-start gap-2 group transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-sm mt-0.5">
              chat_bubble
            </span>
            <span className="font-body-md text-on-surface-variant line-clamp-2 leading-tight group-hover:text-on-surface transition-colors">
              Soạn thảo giấy mời họp GPMB
            </span>
          </button>
          <button
            onClick={() => handleSendMessage('Quy trình cấp giấy phép xây dựng nhà ở riêng lẻ')}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-surface-container-low flex items-start gap-2 group transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-sm mt-0.5">
              chat_bubble
            </span>
            <span className="font-body-md text-on-surface-variant line-clamp-2 leading-tight group-hover:text-on-surface transition-colors">
              Quy trình cấp giấy phép xây dựng nhà ở riêng lẻ
            </span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-[#F0F7FF] min-w-0">
        {/* Knowledge Base Indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-surface border border-outline-variant shadow-sm rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-label-md text-xs text-on-surface-variant">
              Đã nạp <strong className="text-tertiary">450</strong> văn bản quy phạm pháp luật
            </span>
          </div>
        </div>

        {/* Chat Messages Canvas */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-16 space-y-6">
          {messages.length === 0 ? (
            /* AI Welcome / Intro Screen */
            <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto space-y-8 pb-20">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary to-primary-container shadow-md flex items-center justify-center p-4">
                <span
                  className="material-symbols-outlined text-white text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  smart_toy
                </span>
              </div>
              <div className="text-center space-y-2">
                <h2 className="font-display-lg text-display-lg text-on-surface">
                  Xin chào, tôi là <span className="text-primary">Trợ lý AI</span>
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">
                  Hỗ trợ tra cứu quy định, tóm tắt báo cáo và phân tích dữ liệu hành chính công.
                </p>
              </div>

              {/* Quick Suggestions (Bento Grid Style) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
                <button
                  onClick={() =>
                    handleSendMessage('Tóm tắt các điểm mới của Luật Đất đai 2024 liên quan cấp xã')
                  }
                  className="bg-surface p-4 rounded-xl border border-outline-variant shadow-xs hover:border-primary hover:shadow-md transition-all text-left flex flex-col gap-3 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center group-hover:bg-primary-container transition-colors">
                    <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-sm">
                      summarize
                    </span>
                  </div>
                  <span className="font-title-lg text-sm text-on-surface font-semibold">
                    Tóm tắt văn bản
                  </span>
                </button>

                <button
                  onClick={() =>
                    handleSendMessage('Quy trình tra cứu thủ tục xác nhận tình trạng hôn nhân')
                  }
                  className="bg-surface p-4 rounded-xl border border-outline-variant shadow-xs hover:border-primary hover:shadow-md transition-all text-left flex flex-col gap-3 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center group-hover:bg-primary-container transition-colors">
                    <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-sm">
                      plagiarism
                    </span>
                  </div>
                  <span className="font-title-lg text-sm text-on-surface font-semibold">
                    Tra cứu thủ tục hành chính
                  </span>
                </button>

                <button
                  onClick={() =>
                    handleSendMessage('Phân tích số liệu dân cư và biến động hộ khẩu tháng này')
                  }
                  className="bg-surface p-4 rounded-xl border border-outline-variant shadow-xs hover:border-primary hover:shadow-md transition-all text-left flex flex-col gap-3 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center group-hover:bg-primary-container transition-colors">
                    <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-sm">
                      monitoring
                    </span>
                  </div>
                  <span className="font-title-lg text-sm text-on-surface font-semibold">
                    Phân tích số liệu dân cư
                  </span>
                </button>
              </div>
            </div>
          ) : (
            /* Message List */
            <div className="max-w-3xl mx-auto space-y-4 pb-12">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-sm">smart_toy</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-xl text-sm leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-xs'
                        : 'bg-surface text-on-surface border border-outline-variant rounded-tl-xs whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                    <span
                      className={`text-[10px] mt-1.5 block text-right ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-on-surface-variant italic py-2">
                  <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                  Trợ lý AI đang tra cứu và tổng hợp thông tin...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-surface border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="max-w-4xl mx-auto relative flex items-end gap-2 bg-surface-container-lowest rounded-xl border border-outline-variant focus-within:border-primary focus-within:ring-1 focus-within:ring-primary p-2 transition-all shadow-xs"
          >
            {/* Attach File */}
            <button
              type="button"
              onClick={() => alert('Chọn tài liệu đính kèm (.pdf, .doc, .xlsx)...')}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low rounded-lg shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined">attach_file</span>
            </button>

            {/* Textarea */}
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 py-2 font-body-md text-on-surface placeholder:text-on-surface-variant custom-scrollbar text-sm outline-none"
              placeholder="Nhập yêu cầu của bạn..."
              rows={1}
              style={{ minHeight: '40px' }}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 bg-primary text-on-primary hover:bg-primary/90 transition-colors rounded-lg shrink-0 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                send
              </span>
            </button>
          </form>
          <div className="text-center mt-2">
            <p className="font-label-sm text-on-surface-variant text-[10px]">
              Trợ lý AI có thể mắc lỗi. Vui lòng kiểm tra lại thông tin quan trọng.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
