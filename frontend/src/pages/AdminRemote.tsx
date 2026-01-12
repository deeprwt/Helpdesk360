import LayoutShell from '../components/LayoutShell';
import PagePlaceholder from '../components/PagePlaceholder';
import { adminNav } from '../constants/nav';

const AdminRemote = () => (
  <LayoutShell
    title="Remote session orchestration"
    subtitle="Take cues from the 'remote page of admin' artboard—session cards, approval prompts, and status chips."
    navItems={adminNav}
    accent="violet"
  >
    <PagePlaceholder
      heading="Session queue"
      body="Back this area with the `remote_sessions` table. Track provider, PIN, state, and tie into approvals to stay faithful to the mockup."
      hint="Admin · Remote"
    />
  </LayoutShell>
);

export default AdminRemote;
