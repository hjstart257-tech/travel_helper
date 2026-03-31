import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MobileContainer } from './components/layout/MobileContainer';
import { BottomNav } from './components/layout/BottomNav';
import { useStore } from './store/useStore';

import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import NewPlanWizard from './pages/NewPlan/Wizard';
import History from './pages/History';
import Templates from './pages/Templates';
import Profile from './pages/Profile';

function Layout() {
  return (
    <MobileContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </MobileContainer>
  );
}

export default function App() {
  const hasSeenOnboarding = useStore(state => state.hasSeenOnboarding);

  return (
    <BrowserRouter>
      <Routes>
        {!hasSeenOnboarding && (
          <Route path="/onboarding" element={<MobileContainer noPadding><Onboarding /></MobileContainer>} />
        )}
        <Route path="/new/*" element={<MobileContainer noPadding><NewPlanWizard /></MobileContainer>} />
        <Route path="/*" element={hasSeenOnboarding ? <Layout /> : <Navigate to="/onboarding" replace />} />
      </Routes>
    </BrowserRouter>
  );
}



