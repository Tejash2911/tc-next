import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import addressService from '@/service/address-service'

export const useUserAddress = () => {
  return useQuery({
    queryKey: ['userAddress'],
    queryFn: addressService.getUserAddress,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    select: response => response.data.address
  })
}

export const useSetUserAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: payload => addressService.setUserAddress(payload),
    onSuccess: () => {
      // Invalidate user address query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['userAddress'] })
    },
    retry: 1
  })
}
