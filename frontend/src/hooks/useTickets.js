import { useQuery } from '@tanstack/react-query';
import { fetchTicket, fetchTickets } from '../api/tickets';
export const useTickets = (params) => useQuery({
    queryKey: ['tickets', params],
    queryFn: () => fetchTickets(params?.scope ? { scope: params.scope } : undefined),
    staleTime: 5 * 60 * 1000
});
export const useTicket = (ticketId) => useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => {
        if (!ticketId) {
            throw new Error('Missing ticket id');
        }
        return fetchTicket(ticketId);
    },
    enabled: Boolean(ticketId)
});
