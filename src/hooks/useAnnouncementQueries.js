import { useQuery } from '@tanstack/react-query'
import announcementService from '@/service/announcement-service'

export const useAnnouncement = () => {
  return useQuery({
    queryKey: ['announcement'],
    queryFn: announcementService.get,
    retry: 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    select: response => response.data
  })
}
