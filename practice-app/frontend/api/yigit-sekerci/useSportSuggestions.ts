import { useMutation, useQuery } from 'react-query'
import { SportSuggestions } from './types'

type UseSportSuggestionsProps = {
  config?: any
}

const fetchSportSuggestions = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/sport_suggestions/`, {
    mode: 'cors',
  })
  return response.json()
}

const useSportSuggestions = (props: UseSportSuggestionsProps) => {
  const { config } = props
  return useQuery<SportSuggestions[]>(
    'fetchSportSuggestions',
    fetchSportSuggestions,
    config
  )
}

const createSportSuggestions = async (sportSuggestion: SportSuggestions) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/sport_suggestions/`, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sportSuggestion),
  })
  return response.json()
}

const useCreateSportSuggestions = (props: UseSportSuggestionsProps) => {
  const { config } = props
  return useMutation('createSportSuggestions', createSportSuggestions, config)
}

export default useSportSuggestions
export { useCreateSportSuggestions }
