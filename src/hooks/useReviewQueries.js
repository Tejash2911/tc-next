import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import reviewService from '@/service/review-service'

export const useReviewsByProductId = productId => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => reviewService.getAll(productId),
    enabled: !!productId,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    select: response => response.data
  })
}

export const useAddReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ productId, payload }) => reviewService.add({ id: productId, payload }),
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
    mutationFn: reviewId => reviewService.upvote(reviewId),
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
    mutationFn: reviewId => reviewService.abuse(reviewId),
    onSuccess: () => {
      // Invalidate all reviews queries to reflect the abuse report
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
    retry: 1
  })
}
