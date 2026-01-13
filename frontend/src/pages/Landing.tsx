import { Link } from 'react-router-dom';

const Landing = () => (
  <div style={{ background: 'var(--page-bg)', minHeight: '100vh', padding: '48px clamp(24px, 6vw, 80px)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section
        className="glass-panel"
        style={{
          background: 'var(--gradient-hero)',
          borderRadius: '40px',
          padding: '48px',
          textAlign: 'left'
        }}
      >
        <p className="eyebrow">Helpdesk Automation Tool</p>
        <h1>Ops that feel orchestrated</h1>
        <p style={{ marginTop: '12px', color: 'var(--ink-500)', maxWidth: '640px' }}>
          Choose the workspace that mirrors your role. Each surface follows the official Helpdesk UI kit—Inter typography, elevated cards,
          cheerful iconography, and high-contrast alerts that carry across admin, engineer, and requester journeys.
        </p>
        <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
          <Link
            to="/admin"
            style={{
              borderRadius: 'var(--radius-pill)',
              background: 'var(--gradient-pill)',
              color: '#fff',
              padding: '14px 28px',
              fontWeight: 600,
              boxShadow: '0 20px 40px rgba(63, 140, 255, 0.35)'
            }}
          >
            Enter workspace
          </Link>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}
      >
        {[
          {
            path: '/admin',
            label: 'Admin cockpit',
            description: 'Monitor SLA, orchestrate teams, run imports, and push broadcast notifications.',
            accent: 'var(--accent-blue)'
          },
          {
            path: '/engineer',
            label: 'Engineer lane',
            description: 'See handoffs, remote sessions, teammate status, and approvals in one place.',
            accent: 'var(--accent-teal)'
          },
          {
            path: '/user',
            label: 'Requester hub',
            description: 'Raise tickets, follow SLA timers, join remote sessions, and close once resolved.',
            accent: 'var(--accent-blue-strong)'
          }
        ].map((card) => (
          <Link
            key={card.path}
            to={card.path}
            className="glass-panel"
            style={{
              padding: '28px',
              borderRadius: '32px',
              border: '1px solid var(--border-strong)',
              background: '#fff'
            }}
          >
            <p className="eyebrow" style={{ color: card.accent }}>
              {card.label}
            </p>
            <p style={{ marginTop: '12px', color: 'var(--ink-500)' }}>{card.description}</p>
          </Link>
        ))}
      </section>
    </div>
  </div>
);

export default Landing;
