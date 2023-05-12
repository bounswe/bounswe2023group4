import { useMutation, useQuery } from 'react-query'
import { User } from './types'

type UseUserProps = {
  config?: any
}

const fetchUser = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/user-1_collect/`, {
    mode: 'cors',
  })
  return response.json()
}

const useUser = (props: UseUserProps) => {
  const { config } = props
  return useQuery<User>('user', fetchUser, config)
}

type UseMutationUserProps = {
  config?: any
}

const refreshUser = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/user-1_collect/`, {
    mode: 'cors',
    method: 'get',
  })
  return response.json()
}

const useRefreshUser = (props: UseMutationUserProps) => {
  const { config } = props
  return useMutation('refreshUser', refreshUser, config)
}

const deleteUser = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  await fetch(`${apiBaseUrl}/user-1_clearall/`, {
    mode: 'cors',
    method: 'delete',
  })
}

const useDeleteUser = (props: UseMutationUserProps) => {
  const { config } = props
  return useMutation('deleteUser', deleteUser, config)
}

const createUser = async (user: User) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/user-1_new/`, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  return response.json()
}

const useCreateUser = (props: UseMutationUserProps) => {
  const { config } = props
  return useMutation('createUser', createUser, config)
}

export { useUser, useRefreshUser, useDeleteUser, useCreateUser }
