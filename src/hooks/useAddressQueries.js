import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import addressService from '@/service/address-service'

export const useUserAddress = () => {
  return useQuery({
    queryKey: ['userAddress'],
    queryFn: async () => {
      const response = await addressService.getUserAddress()

      return response.data.address
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  })
}

export const useSetUserAddress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async payload => {
      const response = await addressService.setUserAddress(payload)

      return response.data
    },
    onSuccess: () => {
      // Invalidate user address query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['userAddress'] })
    },
    retry: 1
  })
}
