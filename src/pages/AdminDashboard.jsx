import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportConfig, scaleIn } from '../utils/animations';
import StatCounter from '../components/StatCounter';
import {
  RiDashboardLine, RiGroupLine, RiArticleLine, RiSettings3Line,
  RiBriefcase2Line, RiNotificationLine, RiArrowUpLine, RiArrowDownLine,
} from 'react-icons/ri';

const NAV_ITEMS = [
  { icon: RiDashboardLine, label: 'Overview', id: 'overview' },
  { icon: RiGroupLine, label: 'Students', id: 'students' },
  { icon: RiBriefcase2Line, label: 'Placements', id: 'placements' },
  { icon: RiArticleLine, label: 'Journal', id: 'journal' },
  { icon: RiNotificationLine, label: 'Notifications', id: 'notifications' },
  { icon: RiSettings3Line, label: 'Settings', id: 'settings' },
];

const CARD_STATS = [
  { label: 'Total Students', value: 2400, suffix: '', change: '+12%', up: true },
  { label: 'Active Mentors', value: 218, suffix: '', change: '+8%', up: true },
  { label: 'Placed This Month', value: 94, suffix: '', change: '+3%', up: true },
  { label: 'Journal Articles', value: 47, suffix: '', change: '-2%', up: false },
];

const RECENT_ACTIVITY = [
  { name: 'Aarav Shah', action: 'Placed at Google', time: '2h ago', status: 'success' },
  { name: 'Diya Patel', action: 'Submitted journal article', time: '4h ago', status: 'info' },
  { name: 'Rohan Mehta', action: 'Completed mentorship session', time: '6h ago', status: 'info' },
  { name: 'Meera Iyer', action: 'Placed at OpenAI', time: '1d ago', status: 'success' },
  { name: 'Karan Gupta', action: 'Application submitted', time: '1d ago', status: 'pending' },
  { name: 'Ananya Krishnan', action: 'Alumni profile verified', time: '2d ago', status: 'success' },
];

const STATUS_COLORS = {
  success: '#2d6a4f',
  info: 'var(--color-secondary)',
  pending: '#6b4226',
};

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <motion.aside
        className="admin-sidebar"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ marginBottom: 32 }}>
          <p className="label text-muted" style={{ marginBottom: 8 }}>Navigation</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map((item, i) => {
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--color-secondary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 500 : 400,
                  cursor: 'pointer',
                  border: 'none',
                  textAlign: 'left',
                  position: 'relative',
                  transition: 'color 0.2s',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 8,
                      background: 'var(--color-primary)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <item.icon style={{ fontSize: 18 }} />
                {item.label}
              </motion.button>
            );
          })}
        </nav>
      </motion.aside>

      {/* Main content */}
      <main className="admin-content">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 32 }}
        >
          <h1 className="headline-lg">Admin Dashboard</h1>
          <p className="body-md text-muted" style={{ marginTop: 6 }}>Overview · August 2026</p>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 36 }}
        >
          {CARD_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
              transition={{ duration: 0.25 }}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-outline)',
                borderRadius: 12,
                padding: '24px 20px',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 12, fontWeight: 500 }}>{stat.label}</div>
              <StatCounter value={stat.value} suffix={stat.suffix} duration={1.8 + i * 0.2} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginTop: 10,
                fontSize: '0.8rem',
                color: stat.up ? '#2d6a4f' : '#ba1a1a',
                fontWeight: 500,
              }}>
                {stat.up ? <RiArrowUpLine /> : <RiArrowDownLine />}
                {stat.change} vs last month
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-outline)',
              borderRadius: 12,
              padding: '28px 24px',
            }}
          >
            <h2 className="headline-md" style={{ marginBottom: 24 }}>Recent Activity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {RECENT_ACTIVITY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 0',
                    borderBottom: i < RECENT_ACTIVITY.length - 1 ? '1px solid var(--color-outline)' : 'none',
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: `hsl(${item.name.charCodeAt(0) * 7}, 20%, 38%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}>
                    {item.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: 2 }}>{item.action}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.07, type: 'spring' }}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: STATUS_COLORS[item.status],
                      }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            {/* Placement Gauge */}
            <div style={{
              background: 'var(--color-primary)',
              borderRadius: 12,
              padding: '28px 24px',
              color: '#fff',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: 12, fontWeight: 500 }}>
                PLACEMENT RATE · 2026
              </p>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                <svg width={140} height={80} viewBox="0 0 140 80">
                  <path d="M10 70 A60 60 0 0 1 130 70" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={10} strokeLinecap="round" />
                  <motion.path
                    d="M10 70 A60 60 0 0 1 130 70"
                    fill="none"
                    stroke="white"
                    strokeWidth={10}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.94 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  />
                </svg>
                <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                  <StatCounter value={94} suffix="%" duration={2} />
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>of graduates placed within 90 days</p>
            </div>

            {/* Domain breakdown */}
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-outline)',
              borderRadius: 12,
              padding: '24px 20px',
              flex: 1,
            }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 500, marginBottom: 20 }}>By Domain</h3>
              {[
                { label: 'Full Stack', pct: 43, color: 'var(--color-primary)' },
                { label: 'Data / ML', pct: 28, color: 'var(--color-secondary)' },
                { label: 'DevOps', pct: 18, color: 'var(--color-muted)' },
                { label: 'Other', pct: 11, color: 'var(--color-surface-dim)' },
              ].map((d, i) => (
                <div key={d.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 5 }}>
                    <span>{d.label}</span>
                    <span style={{ color: 'var(--color-muted)' }}>{d.pct}%</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--color-surface-high)', borderRadius: 2, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${d.pct}%` }}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{ height: '100%', background: d.color, borderRadius: 2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <style>{`
        .stat-counter { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        @media (max-width: 1024px) {
          .admin-layout { flex-direction: column; }
          .admin-sidebar { width: 100%; height: auto; position: static; display: flex; flex-direction: row; flex-wrap: wrap; gap: 8px; padding: 16px; border-right: none; border-bottom: 1px solid var(--color-outline); }
        }
        @media (max-width: 768px) {
          .admin-content > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .admin-content > div[style*="grid-template-columns: 1.5fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
