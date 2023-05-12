'use client'

import { User } from '@/api/selin-isik/types'
import { useRefreshUser, useUser } from '@/api/selin-isik/useUser'
import { UserBox } from '@/components/userBox/UserBox'
import Link from 'next/link'

const Page = () => {
  const { data, refetch } = useUser({
    config: {
      onSuccess: (data: User[]) => {
        if (data.length === 0) {
          refreshExchangeRate()
        }
      },
    },
  })

  const { mutate: refreshExchangeRate } = useRefreshUser({
    config: {
      onSuccess: () => {
        refetch()
      },
    },
  })

  return (
    <div className="bg-black flex flex-col w-full h-screen bg-game bg-cover">
      <div className="flex flex-col w-full h-full backdrop-blur-lg bg-black/30 items-center justify-center">
        <Link
          href="/selin-isik"
          className="absolute top-4 left-8 p-4 border-2 border-white rounded-lg bg-black/20 text-white"
        >
          <p className="w-full h-full"> Return to Home Page</p>
        </Link>
        {data && <UserBox user={data} />}
      </div>
    </div>
  )
}

export default Page
