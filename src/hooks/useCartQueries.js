import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import cartService from '@/service/cart-service'

export const useCartSize = currentUser => {
  return useQuery({
    queryKey: ['cartSize'],
    queryFn: async () => {
      const response = await cartService.getCartSize()

      return response.data.size
    },
    enabled: !!currentUser, // Only run when user is authenticated
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000 // 5 minutes
  })
}

export const useCartByUserId = userId => {
  return useQuery({
    queryKey: ['cart', userId],
    queryFn: async () => {
      const response = await cartService.getById(userId)

      return response.data
    },
    enabled: !!userId,
    staleTime: 3 * 60 * 1000, // 3 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async payload => {
      const response = await cartService.add(payload)

      return response.data
    },
    onSuccess: () => {
      // Invalidate cart size and cart info queries
      queryClient.invalidateQueries({ queryKey: ['cartSize'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    retry: 1
  })
}

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async payload => {
      const response = await cartService.updateCartQtyById(payload)

      return response.data
    },
    onSuccess: () => {
      // Invalidate cart size and cart info queries
      queryClient.invalidateQueries({ queryKey: ['cartSize'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    retry: 1
  })
}

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async id => {
      const response = await cartService.deleteById(id)

      return response.data
    },
    onSuccess: () => {
      // Invalidate cart size and cart info queries
      queryClient.invalidateQueries({ queryKey: ['cartSize'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    retry: 1
  })
}
