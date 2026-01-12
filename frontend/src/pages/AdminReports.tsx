import LayoutShell from '../components/LayoutShell';
import PagePlaceholder from '../components/PagePlaceholder';
import { adminNav } from '../constants/nav';

const AdminReports = () => (
  <LayoutShell
    title="Reports & statistics"
    subtitle="Mirror the 'report statistics' and 'report user' boards—stack KPIs, SLA deltas, and export buttons."
    navItems={adminNav}
    accent="amber"
  >
    <PagePlaceholder
      heading="Metrics grid"
      body="Hook this section up to `/api/metrics/dashboard` or direct SQL to render charts (e.g., using Recharts) for SLA, backlog, and team velocity."
      hint="Admin · Reports"
    />
  </LayoutShell>
);

export default AdminReports;
