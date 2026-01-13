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
    <table
      style={{
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: 0,
        minWidth: compact ? '680px' : '960px'
      }}
    >
      <thead>
        <tr style={{ textAlign: 'left', fontSize: '12px', color: 'var(--ink-400)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {['Ticket', 'Requester', 'Assignee', 'Status', 'Priority', 'Updated'].map((heading) => (
            <th key={heading} style={{ padding: '0 12px 12px' }} className="eyebrow">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr
            key={ticket.id}
            style={{
              background: 'var(--panel-bg)',
              borderRadius: 'var(--radius-medium)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-widget)'
            }}
          >
            <td style={{ padding: '18px 12px' }}>
              <Link to={`/${role === 'user' ? 'user' : role}/tickets/${ticket.id}`} style={{ fontWeight: 600 }}>
                {ticket.title}
              </Link>
              <p style={{ margin: '4px 0 0', color: 'var(--ink-400)', fontSize: '14px' }}>{ticket.category}</p>
            </td>
            <td style={{ padding: '18px 12px' }}>{ticket.requester}</td>
            <td style={{ padding: '18px 12px' }}>{ticket.assignee ?? 'Unassigned'}</td>
            <td style={{ padding: '18px 12px' }}>
              <span
                className="pill"
                style={{
                  background: `${statusPalette[ticket.status]}22`,
                  color: statusPalette[ticket.status]
                }}
              >
                {ticket.status.replace('_', ' ')}
              </span>
            </td>
            <td style={{ padding: '18px 12px', textTransform: 'capitalize' }}>{ticket.priority}</td>
            <td style={{ padding: '18px 12px', color: 'var(--ink-400)' }}>
              {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TicketList;
