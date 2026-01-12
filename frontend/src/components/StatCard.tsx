import clsx from 'clsx';
import { InsightStat } from '../types';

interface StatCardProps extends InsightStat {
  icon?: string;
}

const StatCard = ({ label, value, trend, variant = 'neutral', icon }: StatCardProps) => (
  <div
    className={clsx('stat-card')}
    style={{
      background: 'var(--gradient-card)',
      border: '1px solid rgba(255,255,255,0.14)',
      borderRadius: '24px',
      padding: '20px',
      minHeight: '160px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {icon && (
      <span style={{ fontSize: '28px', lineHeight: 1, opacity: 0.85 }}>{icon}</span>
    )}
    <p style={{ margin: '8px 0 4px', color: 'var(--ink-100)', fontSize: '14px' }}>{label}</p>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
      <span style={{ fontSize: '42px', fontWeight: 600 }}>{value}</span>
      <span
        style={{
          color: variant === 'positive' ? 'var(--accent-lime)' : variant === 'negative' ? 'var(--accent-coral)' : '#fff',
          fontSize: '14px'
        }}
      >
        {trend > 0 ? '+' : ''}
        {trend}%
      </span>
    </div>
  </div>
);

export default StatCard;
