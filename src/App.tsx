import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { OverviewPage } from '@/pages/OverviewPage'
import { GisMapPage } from '@/pages/GisMapPage'
import { CameraPage } from '@/pages/CameraPage'
import { SceneReportPage } from '@/pages/SceneReportPage'
import { CalendarPage } from '@/pages/CalendarPage'
import { KpiPage } from '@/pages/KpiPage'
import { FeedbackPage } from '@/pages/FeedbackPage'
import { VotingPage } from '@/pages/VotingPage'
import { ReportPage } from '@/pages/ReportPage'
import { AiAgentPage } from '@/pages/AiAgentPage'
import { AdminPage } from '@/pages/AdminPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="map" element={<GisMapPage />} />
          <Route path="phan-anh-hien-truong" element={<SceneReportPage />} />
          <Route path="report-scene" element={<SceneReportPage />} />
          <Route path="camera" element={<CameraPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="kpi" element={<KpiPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="voting" element={<VotingPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="ai-agent" element={<AiAgentPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
