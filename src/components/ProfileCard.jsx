import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cardHover } from '../utils/animations';
// import styles from './ProfileCard.module.css';

/**
 * ProfileCard — 3D tilt card with spring physics on mouse move.
 * 
 * Props:
 *   - name, role, company, avatar (URL), tags (array)
 *   - onClick
 */
export default function ProfileCard({ name, role, company, avatar, tags = [], batch }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="profile-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      initial="rest"
      whileHover="hover"
      variants={cardHover}
    >
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {/* Avatar */}
        <div className="profile-card__avatar">
          {avatar ? (
            <img src={avatar} alt={name} loading="lazy" />
          ) : (
            <div className="profile-card__avatar-fallback">
              {name?.charAt(0)}
            </div>
          )}
          {batch && (
            <motion.span
              className="badge profile-card__batch"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
            >
              {batch}
            </motion.span>
          )}
        </div>

        {/* Info */}
        <div className="profile-card__info">
          <h3 className="headline-md">{name}</h3>
          <p className="body-md text-secondary" style={{ marginTop: 4 }}>{role}</p>
          {company && (
            <p className="label text-muted" style={{ marginTop: 4 }}>{company}</p>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="profile-card__tags">
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="badge"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, type: 'spring', stiffness: 300 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Subtle shimmer overlay on hover */}
      <motion.div
        className="profile-card__shimmer"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
