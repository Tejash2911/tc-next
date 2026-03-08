import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import reviewService from '@/service/review-service'

export const useReviewsByProductId = productId => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await reviewService.getAll(productId)

      return response.data
    },
    enabled: !!productId,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  })
}

export const useAddReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId, payload }) => {
      const response = await reviewService.add({ id: productId, payload })

      return response.data
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch reviews for this product
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] })
    },
    retry: 1
  })
}

export const useUpvoteReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async reviewId => {
      const response = await reviewService.upvote(reviewId)

      return response.data
    },
    onSuccess: () => {
      // Invalidate all reviews queries to reflect the upvote change
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
    retry: 1
  })
}

export const useAbuseReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async reviewId => {
      const response = await reviewService.abuse(reviewId)

      return response.data
    },
    onSuccess: () => {
      // Invalidate all reviews queries to reflect the abuse report
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
    retry: 1
  })
}
