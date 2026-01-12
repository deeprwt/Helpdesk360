import LayoutShell from '../components/LayoutShell';
import PagePlaceholder from '../components/PagePlaceholder';
import { engineerNav } from '../constants/nav';

const EngineerTeam = () => (
  <LayoutShell
    title="Team mates"
    subtitle="Matches the 'team members' + 'Team mate details' mockups—presence dots, skill tags, and escalation buttons."
    navItems={engineerNav}
    accent="teal"
  >
    <PagePlaceholder
      heading="Live roster"
      body="Query `team_memberships` joined with `users` to show who is online, assign swarms, and request approvals."
      hint="Engineer · Team"
    />
  </LayoutShell>
);

export default EngineerTeam;
