export type TicketStatus =
  | 'new'
  | 'open'
  | 'in_progress'
  | 'waiting_customer'
  | 'waiting_vendor'
  | 'remote_required'
  | 'closed'
  | 'out_of_sla';

export interface Ticket {
  id: string;
  title: string;
  requester: string;
  assignee?: string;
  team: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: TicketStatus;
  slaEndsAt?: string;
  updatedAt: string;
  category: string;
  site: string;
}

export interface Comment {
  id: string;
  ticket_id: string;
  author: string;
  role: 'admin' | 'engineer' | 'user';
  body: string;
  visibility: 'public' | 'internal';
  created_at: Date;
}
