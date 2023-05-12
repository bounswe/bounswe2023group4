'use client'
import { CreatePollBox } from '@/components/poll/createpoll/CreatePollBox'
import { useState } from 'react'
import Link from 'next/link'

const CreatePollPage = () => {
  const [poll, setPoll] = useState({ question: '', answers: ['', ''] })

  return (
    <div className="w-full h-screen flex items-center justify-center bg-poll bg-cover bg-center bg-no-repeat">
      <Link
        href="/ali-nasra"
        className="absolute top-8 left-8 p-3 bg-zinc-50/60 rounded-xl font-normal text-black"
      >
        <p className="w-full h-full">Return to Home Page</p>
      </Link>
      <CreatePollBox poll={poll} setPoll={setPoll} />
    </div>
  )
}

export default CreatePollPage
