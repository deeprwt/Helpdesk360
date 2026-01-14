import { apiClient } from './client';
export const fetchTickets = (params) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return apiClient.get(`/api/tickets${query}`);
};
export const fetchTicket = (ticketId) => apiClient.get(`/api/tickets/${ticketId}`);
export const fetchTicketComments = (ticketId) => apiClient.get(`/api/tickets/${ticketId}/comments`);
export const createTicket = (payload) => apiClient.post('/api/tickets', payload);
export const updateTicketStatus = (ticketId, status) => apiClient.patch(`/api/tickets/${ticketId}/status`, { status });
export const addTicketComment = (ticketId, body, visibility) => apiClient.post(`/api/tickets/${ticketId}/comments`, { body, visibility });
export const fetchInsights = () => apiClient.get(`/api/metrics/dashboard`);
