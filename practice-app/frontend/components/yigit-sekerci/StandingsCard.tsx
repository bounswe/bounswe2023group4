import { Standing } from '@/api/yigit-sekerci/types'
import StandingCard from './StandingCard'

type StandingsCardProps = {
  standings: Standing[]
}

const StandingsCard = (props: StandingsCardProps) => {
  const { standings } = props
  return (
    <div className="flex flex-col gap-4 border rounded rounded-lg border-stone-400 bg-zinc-100 w-full p-4">
      {standings &&
        standings.map((standing) => (
          <StandingCard key={standing.team} standing={standing} />
        ))}
    </div>
  )
}

export default StandingsCard
