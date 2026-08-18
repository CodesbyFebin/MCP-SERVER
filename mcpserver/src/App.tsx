import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeAndAuthProvider } from './components/ThemeAndAuthProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { DirectoryPage } from './pages/DirectoryPage';
import { ServerPage } from './pages/ServerPage';
import { Docs } from './pages/Docs';
import { Pricing } from './pages/Pricing';
import { AboutContact } from './pages/AboutContact';
import { AuthPage } from './pages/AuthPage';
import { ComparePage } from './pages/ComparePage';
import { ToolsPage } from './pages/ToolsPage';
import { Security } from './pages/Security';
import { MonitoringPage } from './pages/MonitoringPage';
import { LegalPages } from './pages/LegalPages';
import { PillarPage } from './pages/PillarPage';
import { TopicPage } from './pages/TopicPage';

export default function App() {
  return (
    <ThemeAndAuthProvider>
      <Router>
        <div className="min-h-screen bg-brand-bg text-gray-100 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/servers/:slug" element={<ServerPage />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<AboutContact />} />
              <Route path="/contact" element={<AboutContact />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/security" element={<Security />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/:slug" element={<LegalPages />} />
              <Route path="/pillars/:slug" element={<PillarPage />} />
              <Route path="/topics/:slug" element={<TopicPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeAndAuthProvider>
  );
}