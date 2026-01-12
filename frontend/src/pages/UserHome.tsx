import { Link } from 'react-router-dom';
import LayoutShell from '../components/LayoutShell';
import TicketList from '../components/TicketList';
import { useTickets } from '../hooks/useTickets';
import { userNav } from '../constants/nav';

const UserHome = () => {
  const { data: tickets = [] } = useTickets({ scope: 'user' });

  return (
    <LayoutShell
      title="Requester control room"
      subtitle="Exactly like the requester prototype: new ticket composer, open/in-progress/closed tabs, plus SLA-friendly messaging."
      navItems={userNav}
      accent="violet"
      actions={
        <Link
          to="/user/tickets/new"
          style={{
            borderRadius: '999px',
            border: 'none',
            padding: '12px 24px',
            background: 'var(--accent-violet)',
            color: '#0f1025',
            fontWeight: 600
          }}
        >
          Raise ticket
        </Link>
      }
    >
      <TicketList tickets={tickets} role="user" compact />
    </LayoutShell>
  );
};

export default UserHome;
