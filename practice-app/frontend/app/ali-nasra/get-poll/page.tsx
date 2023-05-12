'use client'
import Link from 'next/link'


import { PollBox } from '@/components/poll/PollBox'

const GetPollPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-poll bg-cover bg-center bg-no-repeat flex flex-col">
      <Link href="/ali-nasra" className='absolute top-8 left-8 p-3 bg-zinc-50/60 rounded-xl font-normal text-black'>
        <p className='w-full h-full'>Return to Home Page</p>
      </Link>

      <PollBox
        question="Who will win the NBA finals this year?"
        answers={['Golden State Warriors', 'Miami Heat']}
      />
    </div>
  )
}

export default GetPollPage
