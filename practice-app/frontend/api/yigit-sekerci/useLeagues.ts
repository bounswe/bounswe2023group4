import { useMutation, useQuery } from 'react-query'
import { League } from './types'

type UseLeaguesProps = {
  config?: any
}

const fetchLeagues = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/league_seasons/`, {
    mode: 'cors',
  })
  return response.json()
}

const useLeagues = (props: UseLeaguesProps) => {
  const { config } = props
  return useQuery<League[]>('leagues', fetchLeagues, config)
}

const refreshLeagues = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  await fetch(`${apiBaseUrl}/league_seasons_collect/`, {
    mode: 'cors',
  })
}

const useRefreshLeagues = (props: UseLeaguesProps) => {
  const { config } = props
  return useMutation('leagues', refreshLeagues, config)
}

export default useLeagues
export { useRefreshLeagues }
