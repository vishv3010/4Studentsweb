import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Guidelines from './pages/Guidelines'
import Support from './pages/Support'
import NotFound from './pages/NotFound'
import LogoVariations from './pages/LogoVariations'
import CursorTrail from './components/CursorTrail'

function App() {
  return (
    <div className="min-h-screen bg-bg-main text-text-main flex flex-col font-sans selection:bg-brand-purple/20 overflow-clip">
      <CursorTrail />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/support" element={<Support />} />
          <Route path="/logo-variations" element={<LogoVariations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
