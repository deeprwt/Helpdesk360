import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import LayoutShell from '../components/LayoutShell';
import StatCard from '../components/StatCard';
import TicketList from '../components/TicketList';
import Timeline from '../components/Timeline';
import { useTickets } from '../hooks/useTickets';
import { fetchInsights } from '../api/tickets';
import { adminNav } from '../constants/nav';

const AdminDashboard = () => {
  const { data: insights } = useQuery({ queryKey: ['insights'], queryFn: fetchInsights });
  const { data: tickets = [] } = useTickets({ scope: 'admin' });

  const backlog = useMemo(() => insights?.backlog ?? [], [insights]);

  return (
    <LayoutShell
      title="Admin runway"
      subtitle="Track SLA burn-down, orchestrate imports, push broadcast notifications—all mapped from the Helpdesk Automation Tool boards."
      navItems={adminNav}
      accent="amber"
      actions={
        <button
          style={{
            borderRadius: '999px',
            border: 'none',
            padding: '14px 28px',
            background: 'var(--accent-amber)',
            color: '#15182c',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          + New automation
        </button>
      }
    >
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {insights?.stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </section>

      <section style={{ marginTop: '32px', display: 'grid', gap: '24px', gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
            <h2 style={{ margin: 0 }}>Live ticket mix</h2>
            <span style={{ color: 'var(--ink-100)', fontSize: '14px' }}>Synced every 60s</span>
          </div>
          <TicketList tickets={tickets} role="admin" />
        </div>
        <div
          style={{
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '20px',
            background: 'rgba(255,255,255,0.03)'
          }}
        >
          <h3 style={{ marginTop: 0 }}>Backlog pressure</h3>
          <Timeline
            items={backlog.map((ticket) => ({
              label: ticket.title,
              timestamp: new Date(ticket.updatedAt).toLocaleString(),
              meta: `${ticket.team} · ${ticket.status.replace('_', ' ')}`
            }))}
          />
        </div>
      </section>
    </LayoutShell>
  );
};

export default AdminDashboard;
