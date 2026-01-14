import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
const StatCard = ({ label, value, trend, variant = 'neutral', icon }) => {
    const variantColor = variant === 'positive' ? 'var(--accent-green)' : variant === 'negative' ? '#ff6b6b' : 'var(--ink-400)';
    return (_jsxs("div", { className: clsx('widget-card'), style: {
            padding: '24px',
            minHeight: '150px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsx("span", { className: "eyebrow", children: label }), icon && (_jsx("span", { style: {
                            width: '36px',
                            height: '36px',
                            borderRadius: '12px',
                            background: 'var(--panel-muted)',
                            display: 'grid',
                            placeItems: 'center',
                            fontSize: '18px'
                        }, children: icon }))] }), _jsxs("div", { style: { display: 'flex', alignItems: 'baseline', gap: '12px' }, children: [_jsx("span", { style: {
                            fontSize: '40px',
                            fontWeight: 600,
                            color: 'var(--ink-900)'
                        }, children: value }), _jsxs("span", { style: { color: variantColor, fontWeight: 600 }, children: [trend > 0 ? '+' : '', trend, "%"] })] })] }));
};
export default StatCard;
