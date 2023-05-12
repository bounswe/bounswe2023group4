'use client'

import { MovieCard } from '@/components/movie/MovieCard'
import { useState } from 'react'

const Page = () => {
  const [movieName, setMovieName] = useState('')

  const movie = {
    Title: 'Fight Club',
    Year: '1999',
    imdbID: 'tt0137523',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
  };

  return (
    <div className="bg-movie bg-cover w-full h-screen">
      <div className="flex flex-col w-full h-full backdrop-blur-lg py-10 items-center">
        <div className='flex flex-col justify-center items-center'>
          <p className="flex text-white text-4xl font-bold pb-10">
            Welcome to Movie Search Engine
          </p>
          <input
            className="w-2/3 flex p-3 border-2 border-white rounded-lg bg-white/50 text-white focus:outline-none"
            onChange={(e) => setMovieName(e.target.value)}
            value={movieName}
          ></input>
        </div>
        <div className='flex w-full h-full pt-6 justify-center items-center'>
          <MovieCard movie={movie}/>
        </div>
      </div>
    </div>
  )
}

export default Page
