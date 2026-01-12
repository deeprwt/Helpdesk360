import { Link } from 'react-router-dom';
import { Ticket } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface TicketListProps {
  tickets: Ticket[];
  role: 'admin' | 'engineer' | 'user';
  compact?: boolean;
}

const statusPalette: Record<Ticket['status'], string> = {
  new: '#95d65c',
  open: '#12c6c2',
  in_progress: '#ffc857',
  waiting_customer: '#ff8f70',
  waiting_vendor: '#a3a1ff',
  remote_required: '#6a64ff',
  closed: '#1dd3b0',
  out_of_sla: '#ff6b6b'
};

const TicketList = ({ tickets, role, compact }: TicketListProps) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: compact ? '680px' : '960px' }}>
      <thead>
        <tr style={{ textAlign: 'left', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.3em', color: 'var(--ink-200)' }}>
          <th style={{ padding: '12px 8px' }}>Ticket</th>
          <th>Requester</th>
          <th>Assignee</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <td style={{ padding: '16px 8px' }}>
              <Link to={`/${role === 'user' ? 'user' : role}/tickets/${ticket.id}`} style={{ fontWeight: 600 }}>
                {ticket.title}
              </Link>
              <p style={{ margin: '4px 0 0', color: 'var(--ink-100)', fontSize: '14px' }}>{ticket.category}</p>
            </td>
            <td>{ticket.requester}</td>
            <td>{ticket.assignee ?? 'Unassigned'}</td>
            <td>
              <span
                style={{
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: `${statusPalette[ticket.status]}22`,
                  color: statusPalette[ticket.status],
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                {ticket.status.replace('_', ' ')}
              </span>
            </td>
            <td style={{ textTransform: 'capitalize' }}>{ticket.priority}</td>
            <td>{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TicketList;
