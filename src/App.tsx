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
import { Home } from '@/pages/Home'

// Citizen Pages
import { CitizenNewsPage } from '@/pages/citizen/CitizenNewsPage'
import { CitizenServicePage } from '@/pages/citizen/CitizenServicePage'
import { CitizenSchedulePage } from '@/pages/citizen/CitizenSchedulePage'
import { CitizenDocumentPage } from '@/pages/citizen/CitizenDocumentPage'
import { CitizenLeaderPage } from '@/pages/citizen/CitizenLeaderPage'
import { CitizenMapGisPage } from '@/pages/citizen/CitizenMapGisPage'
import { CitizenReportPage } from '@/pages/citizen/CitizenReportPage'
import { CitizenCameraPage } from '@/pages/citizen/CitizenCameraPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Cán Bộ (Administrative) Routes */}
          <Route index element={<Home />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="map" element={<GisMapPage />} />
          <Route path="report-scene" element={<SceneReportPage />} />
          <Route path="camera" element={<CameraPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="kpi" element={<KpiPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="voting" element={<VotingPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="ai-agent" element={<AiAgentPage />} />
          <Route path="admin" element={<AdminPage />} />

          {/* Nhân Dân (Citizen) Routes */}
          <Route path="citizen" element={<Navigate to="/citizen/services" replace />} />
          <Route path="citizen/news" element={<CitizenNewsPage />} />
          <Route path="citizen/services" element={<CitizenServicePage />} />
          <Route path="citizen/service" element={<Navigate to="/citizen/services" replace />} />
          <Route path="citizen/schedule" element={<CitizenSchedulePage />} />
          <Route path="citizen/documents" element={<CitizenDocumentPage />} />
          <Route path="citizen/document" element={<Navigate to="/citizen/documents" replace />} />
          <Route path="citizen/leaders" element={<CitizenLeaderPage />} />
          <Route path="citizen/leader" element={<Navigate to="/citizen/leaders" replace />} />
          <Route path="citizen/map-gis" element={<CitizenMapGisPage />} />
          <Route path="citizen/map" element={<Navigate to="/citizen/map-gis" replace />} />
          <Route path="citizen/reports" element={<CitizenReportPage />} />
          <Route path="citizen/report" element={<Navigate to="/citizen/reports" replace />} />
          <Route path="citizen/camera" element={<CitizenCameraPage />} />
          <Route path="citizen/cameras" element={<Navigate to="/citizen/camera" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
