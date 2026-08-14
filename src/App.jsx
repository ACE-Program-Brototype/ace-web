import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

import LandingPage from './pages/LandingPage';
import AlumniPage from './pages/AlumniPage';
import PlacementPage from './pages/PlacementPage';
import StudentsPage from './pages/StudentsPage';
import JournalPage from './pages/JournalPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

import { motion } from 'framer-motion';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const noFooterPaths = ['/', '/admin'];
  const showFooter = !noFooterPaths.includes(location.pathname);

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
          <Route path="/alumni" element={<PageWrapper><AlumniPage /></PageWrapper>} />
          <Route path="/outcomes" element={<PageWrapper><PlacementPage /></PageWrapper>} />
          <Route path="/placements" element={<PageWrapper><PlacementPage /></PageWrapper>} />
          <Route path="/directory" element={<PageWrapper><StudentsPage /></PageWrapper>} />
          <Route path="/journal" element={<PageWrapper><JournalPage /></PageWrapper>} />
          <Route path="/handlers" element={<PageWrapper><TeamPage /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      {showFooter && <Footer />}
    </>
  );
}
