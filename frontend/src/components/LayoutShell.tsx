import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

interface NavItem {
  label: string;
  href: string;
}

interface LayoutShellProps {
  title: string;
  subtitle?: string;
  navItems: NavItem[];
  accent?: 'amber' | 'teal' | 'violet';
  actions?: ReactNode;
  children: ReactNode;
}

const accentMap: Record<NonNullable<LayoutShellProps['accent']>, string> = {
  amber: 'linear-gradient(90deg, #ffcc00 0%, #f6b73c 100%)',
  teal: 'linear-gradient(90deg, #12c6c2 0%, #1a7a5e 100%)',
  violet: 'linear-gradient(90deg, #3f8cff 0%, #006dc7 100%)'
};

const accentShadow: Record<NonNullable<LayoutShellProps['accent']>, string> = {
  amber: 'rgba(255, 204, 0, 0.35)',
  teal: 'rgba(18, 198, 194, 0.35)',
  violet: 'rgba(63, 140, 255, 0.35)'
};

const LayoutShell = ({ title, subtitle, navItems, accent = 'amber', actions, children }: LayoutShellProps) => {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--page-bg)' }}>
      <div style={{ padding: '32px clamp(20px, 4vw, 64px)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}
        >
          <header
            style={{
              background: 'var(--gradient-hero)',
              borderRadius: '32px',
              padding: '32px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-panel)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <p className="eyebrow">Helpdesk Automation</p>
                <h1 style={{ marginTop: '4px' }}>{title}</h1>
                {subtitle && (
                  <p style={{ marginTop: '8px', color: 'var(--ink-500)', maxWidth: '640px' }}>{subtitle}</p>
                )}
              </div>
              {actions && (
                <div style={{ display: 'flex', alignItems: 'center' }}>{actions}</div>
              )}
            </div>
            <nav style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {navItems.map((item) => {
                const active = item.href === location.pathname;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    style={{
                      padding: '12px 20px',
                      borderRadius: 'var(--radius-pill)',
                      border: `1px solid ${active ? 'transparent' : 'var(--border-light)'}`,
                      background: active ? accentMap[accent] : 'transparent',
                      color: active ? '#fff' : 'var(--ink-600)',
                      fontWeight: 600,
                      fontSize: '14px',
                      boxShadow: active ? `0 12px 30px ${accentShadow[accent]}` : 'none'
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </header>
          <main className={clsx('glass-panel')} style={{ padding: '32px', background: 'var(--panel-bg)' }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutShell;
