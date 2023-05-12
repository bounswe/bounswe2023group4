'use client'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-poll bg-cover bg-center bg-no-repeat py-10">
      <p className="text-4xl font-bold text-white mb-12">
        Welcome to the Poll Website
      </p>
      <p className="text-2xl font-semibold text-white mb-12">
        Please select your action
      </p>
      <div className="flex flex-row justify-center w-full h-1/2">
        <Link href="/ali-nasra/get-poll" className=' w-1/4 bg-zinc-50/60 border-0 rounded-xl hover:bg-zinc-700/60 mr-12 drop-shadow-lg'>
          <button
            className="text-3xl font-semibold  hover:text-white w-full h-full "
          >
            Discover Polls
          </button>
        </Link>
        <Link href="/ali-nasra/create-poll" className=' w-1/4 bg-zinc-50/60 border-0 rounded-xl hover:bg-zinc-700/60 drop-shadow-lg'>
          <button
            className="text-3xl font-semibold  hover:text-white w-full h-full "
          >
            Create Polls
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Page
