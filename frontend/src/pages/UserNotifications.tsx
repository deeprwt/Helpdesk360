import LayoutShell from '../components/LayoutShell';
import PagePlaceholder from '../components/PagePlaceholder';
import { userNav } from '../constants/nav';

const UserNotifications = () => (
  <LayoutShell
    title="Notifications"
    subtitle="Matches the user notification sheet—SLA reminders, remote session invites, closure summaries."
    navItems={userNav}
    accent="violet"
  >
    <PagePlaceholder
      heading="Inbox"
      body="Filter the `notifications` table by `audience = 'user'` (and optionally the requester id) to display cards with CTA chips."
      hint="User · Notifications"
    />
  </LayoutShell>
);

export default UserNotifications;
