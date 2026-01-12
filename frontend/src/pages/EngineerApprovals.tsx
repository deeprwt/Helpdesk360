import LayoutShell from '../components/LayoutShell';
import PagePlaceholder from '../components/PagePlaceholder';
import { engineerNav } from '../constants/nav';

const EngineerApprovals = () => (
  <LayoutShell
    title="Approvals"
    subtitle="Replicate the approve task pop-up flows—highlight approvals required before remote work proceeds."
    navItems={engineerNav}
    accent="teal"
  >
    <PagePlaceholder
      heading="Pending decisions"
      body="Use the `ticket_approvals` table to render cards grouped by state. Show CTA buttons for Approve / Reject as in the mock."
      hint="Engineer · Approvals"
    />
  </LayoutShell>
);

export default EngineerApprovals;
