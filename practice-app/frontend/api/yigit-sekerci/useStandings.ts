import { useQuery } from 'react-query'
import { Standing } from './types'

type FetchStandingsProps = {
  leagueId?: number
}

type UseCountriesProps = FetchStandingsProps & {
  config?: any
}

const fetchStandings = async (props: FetchStandingsProps) => {
  const { leagueId } = props
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(
    `${apiBaseUrl}/standings?league_id=${leagueId}`,
    {
      mode: 'cors',
    }
  )
  return response.json()
}

const useStandings = (props: UseCountriesProps) => {
  const { config, leagueId } = props
  return useQuery<Standing[]>(
    ['standings', leagueId],
    () => fetchStandings({ leagueId }),
    config
  )
}

export default useStandings
