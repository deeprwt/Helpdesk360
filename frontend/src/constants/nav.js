export const adminNav = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/imports', label: 'Imports' },
    { href: '/admin/people', label: 'People' },
    { href: '/admin/reports', label: 'Reports' }
];
export const adminDetailNav = (ticketId) => [
    { href: `/admin/tickets/${ticketId}`, label: 'Overview' },
    { href: '/admin/remote', label: 'Remote session' },
    { href: '/admin/notifications', label: 'Notifications' }
];
export const engineerNav = [
    { href: '/engineer', label: 'Tickets' },
    { href: '/engineer/team', label: 'Team' },
    { href: '/engineer/remote', label: 'Remote' }
];
export const engineerDetailNav = (ticketId) => [
    { href: `/engineer/tickets/${ticketId}`, label: 'Timeline' },
    { href: '/engineer/remote', label: 'Remote' },
    { href: '/engineer/approvals', label: 'Approvals' }
];
export const userNav = [
    { href: '/user', label: 'Open tickets' },
    { href: '/user/tickets/new', label: 'New ticket' },
    { href: '/user/notifications', label: 'Notifications' }
];
