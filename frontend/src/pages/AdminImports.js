import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LayoutShell from '../components/LayoutShell';
import { adminNav } from '../constants/nav';
import { useImportBatches } from '../hooks/useOperations';
const placeholder = Array.from({ length: 3 }, (_, index) => ({
    id: `batch-skeleton-${index}`,
    source: 'Loading...',
    schedule: '--',
    status: 'draft',
    recordsTotal: 0,
    recordsSuccess: 0,
    errors: 0,
    createdAt: ''
}));
const AdminImports = () => {
    const { data: batches = [], isLoading } = useImportBatches();
    const displayCards = batches.length ? batches : placeholder;
    const formatSchedule = (schedule, createdAt) => {
        if (schedule) {
            return schedule;
        }
        if (!createdAt) {
            return '—';
        }
        return new Date(createdAt).toLocaleString();
    };
    return (_jsxs(LayoutShell, { title: "Imports", subtitle: "Matches the Import Data board: batch cards, timeline of refreshes, and audit table for error counts.", navItems: adminNav, accent: "amber", children: [_jsx("section", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }, children: displayCards.map((batch) => (_jsxs("div", { className: "widget-card", style: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx("p", { className: "eyebrow", style: { color: 'var(--accent-blue-strong)' }, children: batch.id }), _jsx("h3", { style: { margin: 0 }, children: batch.source }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: formatSchedule(batch.schedule, batch.createdAt) }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', fontWeight: 600 }, children: [_jsx("span", { style: { color: batch.errors ? '#ff6b6b' : 'var(--accent-teal)' }, children: batch.status }), _jsxs("span", { children: [batch.recordsTotal ?? 0, " rows"] })] })] }, batch.id))) }), _jsxs("section", { className: "glass-panel", style: { marginTop: '24px', padding: '24px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px', gap: '12px', flexWrap: 'wrap' }, children: [_jsx("h2", { style: { margin: 0 }, children: "Recent refreshes" }), _jsx("button", { type: "button", style: {
                                    borderRadius: 'var(--radius-pill)',
                                    border: '1px solid var(--border-strong)',
                                    padding: '10px 18px',
                                    background: 'transparent',
                                    fontWeight: 600,
                                    color: 'var(--ink-600)'
                                }, children: "Upload file" })] }), _jsxs("table", { style: { width: '100%', borderCollapse: 'collapse' }, children: [_jsx("thead", { children: _jsx("tr", { style: { textAlign: 'left', color: 'var(--ink-400)', fontSize: '12px' }, children: ['Batch', 'Source', 'Started', 'Records', 'Errors', 'Status'].map((heading) => (_jsx("th", { className: "eyebrow", style: { paddingBottom: '8px' }, children: heading }, heading))) }) }), _jsx("tbody", { children: (isLoading && !batches.length ? placeholder : batches).map((batch) => (_jsxs("tr", { style: { borderTop: '1px solid var(--border-strong)' }, children: [_jsx("td", { style: { padding: '12px 0' }, children: batch.id }), _jsx("td", { style: { padding: '12px 0' }, children: batch.source }), _jsx("td", { style: { padding: '12px 0', color: 'var(--ink-500)' }, children: formatSchedule(batch.schedule, batch.createdAt) }), _jsx("td", { style: { padding: '12px 0' }, children: batch.recordsTotal ?? 0 }), _jsx("td", { style: { padding: '12px 0', color: batch.errors ? '#ff6b6b' : 'var(--ink-600)' }, children: batch.errors }), _jsx("td", { style: { padding: '12px 0' }, children: _jsx("span", { className: "pill", style: { background: `${batch.errors ? '#ff6b6b22' : 'var(--accent-teal)22'}`, color: batch.errors ? '#ff6b6b' : 'var(--accent-teal)' }, children: batch.status }) })] }, `${batch.id}-row`))) })] })] })] }));
};
export default AdminImports;
