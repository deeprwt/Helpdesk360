interface TimelineItem {
  label: string;
  timestamp: string;
  meta?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => (
  <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
    {items.map((item) => (
      <li
        key={item.label + item.timestamp}
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '16px',
          alignItems: 'start'
        }}
      >
        <span style={{ fontSize: '12px', color: 'var(--ink-100)' }}>{item.timestamp}</span>
        <div>
          <p style={{ margin: 0, fontWeight: 600 }}>{item.label}</p>
          {item.meta && (
            <p style={{ margin: '4px 0 0', color: 'var(--ink-200)', fontSize: '14px' }}>{item.meta}</p>
          )}
        </div>
      </li>
    ))}
  </ul>
);

export default Timeline;
