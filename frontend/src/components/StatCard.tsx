import clsx from 'clsx';
import { InsightStat } from '../types';

interface StatCardProps extends InsightStat {
  icon?: string;
}

const StatCard = ({ label, value, trend, variant = 'neutral', icon }: StatCardProps) => {
  const variantColor =
    variant === 'positive' ? 'var(--accent-green)' : variant === 'negative' ? '#ff6b6b' : 'var(--ink-400)';

  return (
    <div
      className={clsx('widget-card')}
      style={{
        padding: '24px',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="eyebrow">{label}</span>
        {icon && (
          <span
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'var(--panel-muted)',
              display: 'grid',
              placeItems: 'center',
              fontSize: '18px'
            }}
          >
            {icon}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
        <span
          style={{
            fontSize: '40px',
            fontWeight: 600,
            color: 'var(--ink-900)'
          }}
        >
          {value}
        </span>
        <span style={{ color: variantColor, fontWeight: 600 }}>{trend > 0 ? '+' : ''}{trend}%</span>
      </div>
    </div>
  );
};

export default StatCard;
