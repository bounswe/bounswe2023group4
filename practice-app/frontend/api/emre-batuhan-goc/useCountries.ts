import { useQuery } from 'react-query'
import { Country } from './types'

const fetchCountries = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/countries/`, {
    mode: 'cors',
  })
  console.log(response.body)
  return response.json()
}

const useCountries = () => {
  return useQuery<Country[]>('countries', fetchCountries)
}

export { useCountries }
