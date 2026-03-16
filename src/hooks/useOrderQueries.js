import { useQuery } from '@tanstack/react-query'
import orderService from '@/service/order-service'

export const useOrdersByUserId = userId => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: () => orderService.getByUserId(userId),
    enabled: !!userId,
    retry: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    select: response => response.data
  })
}
