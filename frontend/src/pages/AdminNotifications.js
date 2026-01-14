import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import LayoutShell from '../components/LayoutShell';
import { adminNav } from '../constants/nav';
import { useNotifications } from '../hooks/useNotifications';
const channels = ['All', 'SLA', 'Remote', 'Imports', 'People'];
const AdminNotifications = () => {
    const [activeChannel, setActiveChannel] = useState('All');
    const { data: notifications = [], isLoading } = useNotifications('admin');
    const normalized = useMemo(() => notifications.map((notification) => {
        const lowerTitle = notification.title.toLowerCase();
        let channel = 'People';
        if (lowerTitle.includes('import'))
            channel = 'Imports';
        else if (lowerTitle.includes('remote'))
            channel = 'Remote';
        else if (notification.audience === 'admin')
            channel = 'SLA';
        else if (notification.audience === 'engineer')
            channel = 'Remote';
        return {
            id: notification.id,
            title: notification.title,
            detail: notification.body,
            channel,
            timestamp: new Date(notification.createdAt).toLocaleString()
        };
    }), [notifications]);
    const filler = isLoading && !normalized.length ? Array.from({ length: 3 }, (_, i) => ({ id: `placeholder-${i}`, title: 'Loading', detail: 'Fetching notifications…', channel: 'People', timestamp: '' })) : [];
    const filtered = (normalized.length ? normalized : filler).filter((item) => activeChannel === 'All' || item.channel === activeChannel);
    return (_jsxs(LayoutShell, { title: "Notifications", subtitle: "Matches the admin broadcast board: filter pills, alert cards, and send buttons.", navItems: adminNav, accent: "amber", children: [_jsxs("section", { className: "glass-panel", style: { padding: '24px', marginBottom: '24px' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }, children: [_jsxs("div", { children: [_jsx("h2", { style: { margin: 0 }, children: "Ops alerts" }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: "Drive push/email announcements directly from here." })] }), _jsx("button", { type: "button", style: {
                                    borderRadius: 'var(--radius-pill)',
                                    border: 'none',
                                    padding: '12px 20px',
                                    background: 'var(--gradient-pill)',
                                    color: '#fff',
                                    fontWeight: 600
                                }, children: "Compose alert" })] }), _jsx("div", { style: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }, children: channels.map((channel) => (_jsx("button", { type: "button", onClick: () => setActiveChannel(channel), className: "pill", style: {
                                border: '1px solid var(--border-strong)',
                                background: activeChannel === channel ? 'var(--accent-amber)' : 'transparent',
                                color: activeChannel === channel ? '#15182c' : 'var(--ink-600)',
                                cursor: 'pointer'
                            }, children: channel }, channel))) })] }), _jsx("section", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }, children: filtered.map((item) => (_jsxs("div", { className: "glass-panel", style: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx("span", { className: "pill", style: { background: 'var(--panel-highlight)', color: 'var(--ink-600)' }, children: item.channel }), _jsx("h3", { style: { margin: 0 }, children: item.title }), _jsx("p", { style: { color: 'var(--ink-500)', fontSize: '14px' }, children: item.detail }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }, children: [_jsx("span", { style: { color: 'var(--ink-400)', fontSize: '12px' }, children: item.timestamp }), _jsx("button", { type: "button", style: {
                                        borderRadius: 'var(--radius-pill)',
                                        border: '1px solid var(--border-strong)',
                                        padding: '8px 14px',
                                        background: 'transparent',
                                        fontWeight: 600,
                                        color: 'var(--ink-600)'
                                    }, children: "Send now" })] })] }, item.id))) })] }));
};
export default AdminNotifications;
