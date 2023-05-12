import { useMutation, useQuery } from 'react-query'
import { ExchangeRate } from './types'

type UseExchangeRateProps = {
  config?: any
}

const fetchExchangeRate = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/exchange_rates/`, {
    mode: 'cors',
  })
  return response.json()
}

const useExchangeRate = (props: UseExchangeRateProps) => {
  const { config } = props
  return useQuery<ExchangeRate[]>('ExchangeRate', fetchExchangeRate, config)
}

type UseMutationExchangeRateProps = {
  config?: any
}

const refreshExchangeRate = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/exchange_rate_collect/`, {
    mode: 'cors',
    method: 'get',
  })
  return response.json()
}

const useRefreshExchangeRate = (props: UseMutationExchangeRateProps) => {
  const { config } = props
  return useMutation('refreshExchangeRate', refreshExchangeRate, config)
}

const deleteExchangeRate = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  await fetch(`${apiBaseUrl}/exchange_rate_clear/`, {
    mode: 'cors',
    method: 'delete',
  })
}

const useDeleteExchangeRate = (props: UseMutationExchangeRateProps) => {
  const { config } = props
  return useMutation('deleteExchangeRate', deleteExchangeRate, config)
}

const createExchangeRate = async (exchange_rate: ExchangeRate) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/exchange_rate_new/`, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exchange_rate),
  })
  return response.json()
}

const useCreateExchangeRate = (props: UseMutationExchangeRateProps) => {
  const { config } = props
  return useMutation('createExchangeRate', createExchangeRate, config)
}

export {
  useExchangeRate,
  useRefreshExchangeRate,
  useDeleteExchangeRate,
  useCreateExchangeRate,
}
