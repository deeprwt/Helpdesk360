import LayoutShell from '../components/LayoutShell';
import PagePlaceholder from '../components/PagePlaceholder';
import { engineerNav } from '../constants/nav';

const EngineerRemote = () => (
  <LayoutShell
    title="Remote console"
    subtitle="Line up with the engineer remote page—session pin, chat, camera toggles."
    navItems={engineerNav}
    accent="teal"
  >
    <PagePlaceholder
      heading="Session timeline"
      body="Stream entries from `remote_sessions` filtered by assignee or ticket. Trigger start/stop actions as drawn in Figma."
      hint="Engineer · Remote"
    />
  </LayoutShell>
);

export default EngineerRemote;
