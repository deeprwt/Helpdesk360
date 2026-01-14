import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Timeline = ({ items }) => (_jsx("ul", { style: { display: 'flex', flexDirection: 'column', gap: '18px', padding: 0 }, children: items.map((item) => (_jsxs("li", { style: {
            display: 'flex',
            gap: '16px',
            position: 'relative'
        }, children: [_jsx("div", { style: {
                    width: '8px',
                    borderRadius: '999px',
                    background: 'var(--accent-blue-strong)',
                    flexShrink: 0,
                    marginTop: '4px'
                } }), _jsxs("div", { style: {
                    background: 'var(--panel-muted)',
                    borderRadius: 'var(--radius-medium)',
                    padding: '12px 16px',
                    border: '1px solid var(--border-strong)',
                    flex: 1
                }, children: [_jsx("p", { style: { margin: 0, fontWeight: 600 }, children: item.label }), item.meta && _jsx("p", { style: { margin: '6px 0 0', color: 'var(--ink-400)' }, children: item.meta }), _jsx("p", { style: { marginTop: '6px', fontSize: '12px', color: 'var(--ink-400)' }, children: item.timestamp })] })] }, item.label + item.timestamp))) }));
export default Timeline;
