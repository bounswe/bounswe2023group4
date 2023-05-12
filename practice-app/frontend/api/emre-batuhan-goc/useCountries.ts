import { useMutation, useQuery } from 'react-query'
import { Country } from './types'

const fetchCountries = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/countries/`, {
    mode: 'cors',
  })
  return response.json()
}

type UseCountriesProps = {
  config?: any
}

const useCountries = (props: UseCountriesProps) => {
  const { config } = props
  return useQuery<Country[]>('countries', fetchCountries, config)
}

type UseMutationCountriesProps = {
  config?: any
}

const refreshCountries = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/countries_collect/`, {
    mode: 'cors',
    method: 'get',
  })
  return response.json()
}

const useRefreshCountries = (props: UseMutationCountriesProps) => {
  const { config } = props
  return useMutation('refreshCountries', refreshCountries, config)
}

const deleteCountries = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  await fetch(`${apiBaseUrl}/countries_clearall/`, {
    mode: 'cors',
    method: 'delete',
  })
}

const useDeleteCountries = (props: UseMutationCountriesProps) => {
  const { config } = props
  return useMutation('deleteCountries', deleteCountries, config)
}

const createCountry = async (country: Country) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/countries/`, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(country),
  })
  return response.json()
}

const useCreateCountry = (props: UseMutationCountriesProps) => {
  const { config } = props
  return useMutation('createCountry', createCountry, config)
}

export {
  useCountries,
  useRefreshCountries,
  useDeleteCountries,
  useCreateCountry,
}
