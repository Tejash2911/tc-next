import { useQuery } from '@tanstack/react-query'
import productService from '@/service/product-service'

export const useProductById = id => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await productService.getById(id)

      return response.data
    },
    enabled: !!id,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  })
}

export const useAllProducts = params => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await productService.getAll(params)

      return response.data.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  })
}

export const useSearchProducts = searchTerm => {
  return useQuery({
    queryKey: ['search-products', searchTerm],
    queryFn: async () => {
      const response = await productService.getSearchProducts(searchTerm)

      return response.data
    },
    enabled: !!searchTerm,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000 // 5 minutes
  })
}
