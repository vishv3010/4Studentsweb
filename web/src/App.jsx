import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'

// Home is what almost every visitor lands on, so it stays in the main bundle —
// lazy-loading it would only add a round trip before the hero could paint.
import Home from './pages/Home'

// The rest are rarely visited (footer links, a 404, an internal logo review
// page). Splitting them out keeps their code from being downloaded and parsed
// by every student who only ever sees the landing page.
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Guidelines = lazy(() => import('./pages/Guidelines'))
const Support = lazy(() => import('./pages/Support'))
const NotFound = lazy(() => import('./pages/NotFound'))
const LogoVariations = lazy(() => import('./pages/LogoVariations'))

// These pages arrive in a few milliseconds on any real connection, so the
// fallback only needs to hold the layout open and stop the footer jumping up.
// It is deliberately blank rather than a spinner, which would flash and look
// like a fault on a fast load.
const PageFallback = () => <div className="min-h-[60vh]" aria-busy="true" />

function App() {
  return (
    <div className="min-h-screen bg-bg-main text-text-main flex flex-col font-sans selection:bg-brand-purple/20 overflow-clip">

      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/support" element={<Support />} />
            <Route path="/logo-variations" element={<LogoVariations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
