import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import cartService from '@/service/cart-service'

export const useCartSize = currentUser => {
  return useQuery({
    queryKey: ['cartSize'],
    queryFn: cartService.getCartSize,
    enabled: !!currentUser, // Only run when user is authenticated
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    select: response => response.data.size
  })
}

export const useCartByUserId = userId => {
  return useQuery({
    queryKey: ['cart', userId],
    queryFn: () => cartService.getById(userId),
    enabled: !!userId,
    staleTime: 3 * 60 * 1000, // 3 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    select: response => response.data
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: payload => cartService.add(payload),
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
    mutationFn: payload => cartService.updateCartQtyById(payload),
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
    mutationFn: id => cartService.deleteById(id),
    onSuccess: () => {
      // Invalidate cart size and cart info queries
      queryClient.invalidateQueries({ queryKey: ['cartSize'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    retry: 1
  })
}
