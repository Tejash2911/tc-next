import { useQuery } from '@tanstack/react-query'
import productService from '@/service/product-service'

export const useProductById = id => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    select: response => response.data
  })
}

export const useAllProducts = params => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    select: response => response.data.data
  })
}

export const useSearchProducts = searchTerm => {
  return useQuery({
    queryKey: ['search-products', searchTerm],
    queryFn: () => productService.getSearchProducts(searchTerm),
    enabled: !!searchTerm,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    select: response => response.data
  })
}
