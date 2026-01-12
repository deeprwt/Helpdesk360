import { Client } from 'pg';

const client = process.env.DATABASE_URL
  ? new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  : new Client({
      host: 'db.cojrmycyagfosqpxyswd.supabase.co',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'CGBindia!@#123',
      ssl: { rejectUnauthorized: false }
    });

const ticketTitle = 'Autopilot patch window';

try {
  await client.connect();

  const insertTicket = await client.query(
    `INSERT INTO tickets (title, description, category, priority, status, requester_name, site, team, assignee_name)
     VALUES ($1, $2, $3, $4, $5::ticket_status, $6, $7, $8, $9)
     ON CONFLICT DO NOTHING
     RETURNING id`,
    [
      ticketTitle,
      'Schedule Knightfall autopilot patch for APAC kiosks before 02:00 IST.',
      'Software',
      'high',
      'open',
      'Automation Scheduler',
      'Gurgaon Hub',
      'Automation Lab',
      'Neha Gupta'
    ]
  );

  const [{ id: ticketId }] = insertTicket.rowCount
    ? insertTicket.rows
    : (
        await client.query('SELECT id FROM tickets WHERE title = $1 LIMIT 1', [ticketTitle])
      ).rows;

  await client.query(
    `INSERT INTO ticket_comments (ticket_id, author_name, author_role, body, visibility)
     VALUES ($1, $2, $3, $4, 'public')
     ON CONFLICT DO NOTHING`,
    [ticketId, 'Automation bot', 'admin', 'Patch scheduled for 01:30 IST. Waiting on user confirmation.']
  );

  await client.query(
    `INSERT INTO notifications (title, body, audience, ticket_id)
     VALUES ('Patch window scheduled', 'APAC kiosks update rolling tonight.', 'user', $1)
     ON CONFLICT DO NOTHING`,
    [ticketId]
  );

  console.log('Seeded autopilot ticket, comment, and notification.');
} catch (error) {
  console.error('Failed to seed data');
  console.error(error);
  process.exitCode = 1;
} finally {
  await client.end();
}
