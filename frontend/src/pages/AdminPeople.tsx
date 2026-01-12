import LayoutShell from '../components/LayoutShell';
import PagePlaceholder from '../components/PagePlaceholder';
import { adminNav } from '../constants/nav';

const AdminPeople = () => (
  <LayoutShell
    title="People & permissions"
    subtitle="Bring in the 'Add user and engineer' + 'Team mate details' layouts—manage personas, reset access, and trigger remote invites."
    navItems={adminNav}
    accent="amber"
  >
    <PagePlaceholder
      heading="Directory module"
      body="Bind this view to the `users` + `team_memberships` tables. You can render cards, filters, and avatars based on Supabase rows."
      hint="Admin · People"
    />
  </LayoutShell>
);

export default AdminPeople;
