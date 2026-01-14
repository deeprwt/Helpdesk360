import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '../api/operations';
export const useNotifications = (audience) => useQuery({
    queryKey: ['notifications', audience],
    queryFn: () => fetchNotifications(audience),
    staleTime: 60 * 1000
});
