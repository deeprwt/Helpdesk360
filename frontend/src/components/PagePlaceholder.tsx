interface PagePlaceholderProps {
  heading: string;
  body: string;
  hint?: string;
}

const PagePlaceholder = ({ heading, body, hint }: PagePlaceholderProps) => (
  <div
    style={{
      borderRadius: '24px',
      border: '1px dashed rgba(255,255,255,0.25)',
      padding: '32px',
      background: 'rgba(255,255,255,0.02)',
      textAlign: 'left'
    }}
  >
    <h2 style={{ marginTop: 0 }}>{heading}</h2>
    <p style={{ color: 'var(--ink-100)', maxWidth: '720px' }}>{body}</p>
    {hint && (
      <p style={{
        marginTop: '12px',
        fontSize: '13px',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'var(--ink-300)'
      }}>
        {hint}
      </p>
    )}
  </div>
);

export default PagePlaceholder;
