import LayoutShell from '../components/LayoutShell';
import PagePlaceholder from '../components/PagePlaceholder';
import { adminNav } from '../constants/nav';

const AdminNotifications = () => (
  <LayoutShell
    title="Notifications"
    subtitle="Use the Notifications.jpg references—card stack of SLA pings, approvals, and announcements."
    navItems={adminNav}
    accent="amber"
  >
    <PagePlaceholder
      heading="Broadcast center"
      body="Drive content from the `notifications` table filtered by `audience = 'admin'`. Add toggles for push/email once wiring is ready."
      hint="Admin · Notifications"
    />
  </LayoutShell>
);

export default AdminNotifications;
