import LayoutShell from '../components/LayoutShell';
import TicketList from '../components/TicketList';
import { useTickets } from '../hooks/useTickets';
import { engineerNav } from '../constants/nav';

const EngineerDashboard = () => {
  const { data: tickets = [] } = useTickets({ scope: 'engineer' });

  return (
    <LayoutShell
      title="Engineer runway"
      subtitle="Blend remote approvals, teammate visibility, and SLA guardrails. The layout mirrors the engineer prototype: vertical tickets, teammate chips, and remote session callouts."
      navItems={engineerNav}
      accent="teal"
      actions={
        <button
          style={{
            borderRadius: '999px',
            border: 'none',
            padding: '12px 22px',
            background: 'var(--accent-teal)',
            color: '#041421',
            fontWeight: 600
          }}
        >
          Start remote assist
        </button>
      }
    >
      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
        <div>
          <h2>My live tickets</h2>
          <TicketList tickets={tickets} role="engineer" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,0.12)', padding: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Teammate pulse</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Anika · Networking', 'Prakash · Field', 'Rita · Apps'].map((mate) => (
                <li key={mate} style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <span>{mate}</span>
                  <span style={{ color: 'var(--accent-teal)' }}>online</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,0.12)', padding: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Notifications</h3>
            <p style={{ color: 'var(--ink-100)', fontSize: '14px' }}>Shift handoffs, approvals, and SLA breaches land here just like the Figma alerts.</p>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
};

export default EngineerDashboard;
