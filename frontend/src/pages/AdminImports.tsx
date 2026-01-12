import LayoutShell from '../components/LayoutShell';
import PagePlaceholder from '../components/PagePlaceholder';
import { adminNav } from '../constants/nav';

const AdminImports = () => (
  <LayoutShell
    title="Bulk data imports"
    subtitle="Exactly like the Figma Import Data sheet—stage CSV, validate asset counts, and publish inventory updates."
    navItems={adminNav}
    accent="amber"
  >
    <PagePlaceholder
      heading="Staging area"
      body="Wire this block to the Supabase table `import_batches` to list draft/running/completed jobs. Attach upload controls and error review panes as needed."
      hint="Admin · Imports"
    />
  </LayoutShell>
);

export default AdminImports;
