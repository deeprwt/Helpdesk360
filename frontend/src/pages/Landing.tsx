import { Link } from 'react-router-dom';

const Landing = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px'
    }}
  >
    <div
      style={{
        maxWidth: '960px',
        width: '100%',
        background: 'rgba(8, 12, 32, 0.65)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '40px',
        padding: '48px',
        textAlign: 'center'
      }}
    >
      <p style={{ letterSpacing: '0.35em', textTransform: 'uppercase', fontSize: '12px', color: 'var(--ink-200)' }}>
        Helpdesk Automation Tool
      </p>
      <h1 style={{ fontSize: '56px', margin: '12px 0', letterSpacing: '-0.04em' }}>Ops that feel orchestrated</h1>
      <p style={{ color: 'var(--ink-100)', maxWidth: '640px', margin: '0 auto 32px' }}>
        Choose the workspace that mirrors your role. Each surface is crafted from the provided Figma system—bold cards, layered gradients,
        and motion-ready components are already wired to live data.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '32px' }}>
        {[
          { path: '/admin', label: 'Admin cockpit', accent: 'var(--accent-amber)', body: 'Monitor SLA, orchestrate teams, import assets.' },
          { path: '/engineer', label: 'Engineer lane', accent: 'var(--accent-teal)', body: 'See handoffs, remote sessions, swarming context.' },
          { path: '/user', label: 'Requester hub', accent: 'var(--accent-violet)', body: 'Raise new tickets, watch SLA, follow remote fixes.' }
        ].map((card) => (
          <Link
            key={card.path}
            to={card.path}
            style={{
              borderRadius: '28px',
              border: '1px solid rgba(255,255,255,0.14)',
              padding: '24px',
              textAlign: 'left',
              background: 'rgba(255,255,255,0.04)',
              transition: 'transform 0.2s ease, border 0.2s ease'
            }}
          >
            <span style={{ fontSize: '13px', letterSpacing: '0.2em', color: card.accent }}>{card.label}</span>
            <p style={{ fontSize: '18px', marginTop: '12px', color: 'var(--ink-100)' }}>{card.body}</p>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Landing;
