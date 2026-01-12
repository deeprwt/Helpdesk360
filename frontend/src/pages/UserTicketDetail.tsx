import { useParams } from 'react-router-dom';
import LayoutShell from '../components/LayoutShell';
import { useTicket } from '../hooks/useTickets';
import { userNav } from '../constants/nav';

const UserTicketDetail = () => {
  const { ticketId } = useParams();
  const { data: ticket } = useTicket(ticketId);

  if (!ticket) {
    return null;
  }

  const readableStatus = ticket.status.replace(/_/g, ' ');

  return (
    <LayoutShell title={ticket.title} subtitle={`Status · ${readableStatus}`} navItems={userNav} accent="violet">
      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          <h2>Timeline</h2>
          <p style={{ color: 'var(--ink-100)' }}>
            Admin + engineer updates will stack exactly like the Figma “User open ticket” screen. Connect this block to `/api/tickets/:id/comments` when real data is ready.
          </p>
        </div>
        <div style={{ borderRadius: '24px', border: '1px solid rgba(255,255,255,0.12)', padding: '20px' }}>
          <h3 style={{ marginTop: 0 }}>SLA</h3>
          <p style={{ color: 'var(--accent-amber)', fontSize: '36px', margin: '12px 0' }}>04h 22m</p>
          <p style={{ color: 'var(--ink-100)' }}>We mirror the “User out of SLA” alerts when timers cross thresholds.</p>
        </div>
      </section>
    </LayoutShell>
  );
};

export default UserTicketDetail;
