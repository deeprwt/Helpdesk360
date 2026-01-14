import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const PagePlaceholder = ({ heading, body, hint }) => (_jsxs("div", { style: {
        borderRadius: 'var(--radius-large)',
        border: '1px dashed var(--border-strong)',
        padding: '32px',
        background: 'var(--panel-muted)',
        textAlign: 'left'
    }, children: [_jsx("h2", { style: { marginTop: 0 }, children: heading }), _jsx("p", { style: { color: 'var(--ink-500)', maxWidth: '720px' }, children: body }), hint && (_jsx("p", { style: {
                marginTop: '12px',
                fontSize: '12px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--ink-400)'
            }, children: hint }))] }));
export default PagePlaceholder;
