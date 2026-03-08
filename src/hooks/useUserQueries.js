import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import userService from '@/service/user-service'
import { getCurrentUser } from '@/lib/auth'

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.register,
    onSuccess: response => {
      localStorage.setItem('user', JSON.stringify(response.data))
      queryClient.setQueryData(['currentUser'], response.data)
    },
    retry: 1
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.login,
    onSuccess: response => {
      localStorage.setItem('user', JSON.stringify(response.data.data))
      queryClient.setQueryData(['currentUser'], response.data.data)
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.logout,
    onSuccess: () => {
      localStorage.removeItem('user')
      queryClient.clear()
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.updateUser,
    onSuccess: updatedUser => {
      queryClient.setQueryData(['currentUser'], updatedUser)
    }
  })
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5,
    enabled: typeof window !== 'undefined',
    initialData: getCurrentUser
  })
}
