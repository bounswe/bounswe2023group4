'use client'
import { League, Standing } from '@/api/yigit-sekerci/types'
import useLeagues, { useRefreshLeagues } from '@/api/yigit-sekerci/useLeagues'
import useStandings from '@/api/yigit-sekerci/useStandings'
import LeagueSelection from '@/components/yigit-sekerci/LeagueSelection'
import StandingsCard from '@/components/yigit-sekerci/StandingsCard'
import { useEffect, useState } from 'react'

const Page = () => {
  const [activeLeague, setActiveLeague] = useState<League | null>(null)
  const onLeagueChange = (league: League) => {
    setActiveLeague(league)
  }

  const { mutate } = useRefreshLeagues({
    config: {
      onSuccess: () => {
        refetchLeagues()
      },
    },
  })

  const { data: leagues, refetch: refetchLeagues } = useLeagues({
    config: {
      onSuccess: (data: League[]) => {
        if (data.length > 0) {
          setActiveLeague(data[0])
        } else {
          mutate()
        }
      },
    },
  })

  const { data: standings } = useStandings({
    leagueId: activeLeague?.id,
    config: {
      enabled: activeLeague !== null,
    },
  })

  return (
    <div className="py-4 flex flex-col gap-3 px-4">
      <p className="mx-auto text-4xl"> Sports API </p>
      {leagues && activeLeague != null && (
        <div className="flex flex-row gap-3">
          <p className="my-auto">Select a league to see standings</p>
          <LeagueSelection
            leagues={leagues}
            activeLeague={activeLeague}
            onLeagueChange={onLeagueChange}
          />
        </div>
      )}
      {standings && <StandingsCard standings={standings} />}
    </div>
  )
}

export default Page
