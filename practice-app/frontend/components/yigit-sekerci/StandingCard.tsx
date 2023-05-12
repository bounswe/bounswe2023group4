import { Standing } from '@/api/yigit-sekerci/types'

type StandingCardProps = {
  standing: Standing
}

const StandingCard = (props: StandingCardProps) => {
  const { standing } = props
  return (
    <div className="border border-stone-400 bg-zinc-200 rounded rounded-sm flex flex-col gap-3 px-2 py-1">
      <div>Team: {standing.team}</div>
      <div>Rank: {standing.rank}</div>
      <div>Points: {standing.points}</div>
    </div>
  )
}

export default StandingCard
