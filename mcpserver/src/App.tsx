import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeAndAuthProvider } from './components/ThemeAndAuthProvider';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SchemaJsonLd } from './components/SchemaJsonLd';
import { buildOrganizationSchema, buildWebSiteSchema, buildWebPageSchema } from './lib/schema';
import { SITE_URL } from './lib/constants';
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

function SchemaInjector({ pageSchema }: { pageSchema?: Record<string, unknown> }) {
  const location = useLocation();
  const pathname = location.pathname;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    ...(pathname !== '/' ? [{ name: pathname.split('/')[1] || 'Page', href: pathname }] : []),
  ];

  const webPageSchema = buildWebPageSchema({
    id: `${SITE_URL}${pathname}`,
    title: 'codeMicro',
    description: 'The MCP Server Directory and Developer Platform',
    breadcrumbs,
  });

  const graph = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    webPageSchema,
  ];

  if (pageSchema) {
    graph.push(pageSchema as Record<string, unknown>);
  }

  return <SchemaJsonLd schema={{ '@context': 'https://schema.org', '@graph': graph }} />;
}

function AppLayout({ children, pageSchema }: { children: React.ReactNode; pageSchema?: Record<string, unknown> }) {
  return (
    <div className="min-h-screen bg-brand-bg text-gray-100 flex flex-col">
      <SchemaInjector pageSchema={pageSchema} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeAndAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout pageSchema={undefined}><Home /></AppLayout>} />
          <Route path="/directory" element={<AppLayout><DirectoryPage /></AppLayout>} />
          <Route path="/servers/:slug" element={<AppLayout><ServerPage /></AppLayout>} />
          <Route path="/docs" element={<AppLayout><Docs /></AppLayout>} />
          <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
          <Route path="/about" element={<AppLayout><AboutContact /></AppLayout>} />
          <Route path="/contact" element={<AppLayout><AboutContact /></AppLayout>} />
          <Route path="/auth" element={<AppLayout><AuthPage /></AppLayout>} />
          <Route path="/compare" element={<AppLayout><ComparePage /></AppLayout>} />
          <Route path="/tools" element={<AppLayout><ToolsPage /></AppLayout>} />
          <Route path="/security" element={<AppLayout><Security /></AppLayout>} />
          <Route path="/monitoring" element={<AppLayout><MonitoringPage /></AppLayout>} />
          <Route path="/:slug" element={<AppLayout><LegalPages /></AppLayout>} />
          <Route path="/pillars/:slug" element={<AppLayout><PillarPage /></AppLayout>} />
          <Route path="/topics/:slug" element={<AppLayout><TopicPage /></AppLayout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeAndAuthProvider>
  );
}