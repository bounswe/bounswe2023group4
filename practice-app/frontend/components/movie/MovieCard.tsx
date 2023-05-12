import { FunctionComponent } from 'react'
import { MovieCardProps } from './MovieCard.types'

export const MovieCard: FunctionComponent<MovieCardProps> = (Props) => {
  const { movie } = Props

  return (
    <div className="flex flex-col w-1/4 h-2/3  bg-black/60  border-2 border-white rounded-xl justify-between pt-8 pb-3 items-center">
      <img
        src={movie.Poster}
        alt="poster"
        className="w-32 h-32 border-0 rounded-lg"
      />

      <p className="text-white text-xl">{`Name: ${movie.Title}`}</p>
      <p className="text-white text-xl">{`Release Year: ${movie.Year}`}</p>
      <p className="text-white text-xl">{`Type: ${movie.Type}`}</p>
      <p className="text-white text-xl">{`Imdb Id: ${movie.imdbID}`}</p>
    </div>
  )
}
