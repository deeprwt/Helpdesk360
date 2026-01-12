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
  amber: 'var(--accent-amber)',
  teal: 'var(--accent-teal)',
  violet: 'var(--accent-violet)'
};

const LayoutShell = ({ title, subtitle, navItems, accent = 'amber', actions, children }: LayoutShellProps) => {
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gradient-sunrise)' }}>
      <div style={{ padding: '32px clamp(24px, 4vw, 56px)' }}>
        <header
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <p style={{
                margin: 0,
                fontSize: '13px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--ink-100)'
              }}>
                Helpdesk Automation
              </p>
              <h1
                style={{
                  margin: 0,
                  fontSize: '40px',
                  letterSpacing: '-0.02em'
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p style={{ marginTop: '8px', color: 'var(--ink-100)', maxWidth: '620px' }}>{subtitle}</p>
              )}
            </div>
            {actions}
          </div>
          <nav
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  padding: '12px 18px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background:
                    item.href === location.pathname
                      ? `linear-gradient(135deg, ${accentMap[accent]}, rgba(255,255,255,0.08))`
                      : 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main
          className={clsx('glass-panel')}
          style={{
            background: 'rgba(8, 12, 32, 0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '32px',
            padding: '32px',
            boxShadow: 'var(--shadow-soft)'
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutShell;
