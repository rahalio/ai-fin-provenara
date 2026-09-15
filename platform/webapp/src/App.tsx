import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/chrome/AppShell";
import { LoginPage } from "@/features/auth/views/LoginPage";
import { TrustFilesHomePage } from "@/features/home/views/TrustFilesHomePage";
import { TrustFilePage } from "@/features/artworks/views/TrustFilePage";
import { SharesPage } from "@/features/shares/views/SharesPage";
import { RiskHomePage } from "@/features/alerts/views/RiskHomePage";
import { CounterpartiesPage } from "@/features/counterparties/views/CounterpartiesPage";
import { AuditsPage } from "@/features/audits/views/AuditsPage";
import { InvestorPortalPage } from "@/features/investor/views/InvestorPortalPage";
import { getAccessToken } from "@/services/shared/infrastructure";

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!getAccessToken()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<TrustFilesHomePage />} />
        <Route path="artworks/:artworkId" element={<TrustFilePage />} />
        <Route path="shares" element={<SharesPage />} />
        <Route path="risk" element={<RiskHomePage />} />
        <Route path="counterparties" element={<CounterpartiesPage />} />
        <Route path="audits" element={<AuditsPage />} />
        <Route path="investor" element={<InvestorPortalPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
