import { League } from '@/api/yigit-sekerci/types'
import { useState } from 'react'
import Image from 'next/image'

type LeagueSelectionProps = {
  leagues: League[]
  activeLeague: League
  onLeagueChange: (league: League) => void
}

const LeagueSelection = (props: LeagueSelectionProps) => {
  const { leagues, activeLeague, onLeagueChange } = props
  const [isOpen, setIsOpen] = useState(false)

  const handleLeagueSelect = (league: League) => {
    onLeagueChange(league)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-2 w-full rounded inline-flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {activeLeague.name}, {activeLeague.season} Season
        </span>
        <Image
          priority
          src={'arrow_drop_down.svg'}
          alt="arrow_drop_down"
          height={32}
          width={32}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-white shadow-lg rounded-md w-full">
          {leagues.map((league) => (
            <button
              key={league.id}
              className={`block text-left px-4 py-4 text-sm leading-5 w-full ${
                activeLeague.id === league.id
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => handleLeagueSelect(league)}
            >
              {league.name}, {league.season} Season
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LeagueSelection
