'use client'
import Link from 'next/link'
import { useState } from 'react'

const Page = () => {
  const initialUser = {
    name: '',
    job: '',
  }
  const [user, setUser] = useState(initialUser)
  return (
    <div className="bg-black flex flex-col w-full h-screen bg-game bg-cover">
      <div className="flex relative flex-col w-full h-full backdrop-blur-lg bg-black/30 items-center justify-center">
      <Link  href="/selin-isik" className="absolute top-4 left-8 p-4 border-2 border-white rounded-lg bg-black/20 text-white"><p className='w-full h-full'> Return to Home Page</p></Link> 
        <div className="flex flex-col w-3/5 h-4/5 rounded-3xl border-4 overflow-hidden shadow-lg bg-black/30 p-10 drop-shadow-xl justify-evenly">
            <p className='text-white font-bold text-4xl text-center px-auto pb-6'>Crete New Avatar</p>
          <input
          className='text-white font-semibold text-xl p-3 bg-white/30 border-2 border-white rounded-xl focus:outline-none placeholder-slate-800'
          placeholder='Enter Name'
            onChange={(e) => {
              setUser({ ...user, name: e.target.value })
            }}
          ></input>
          <input
          placeholder='Enter Job'
          className='text-white font-semibold text-xl p-3 bg-white/30 border-2 border-white rounded-xl focus:outline-none placeholder-slate-800'
            onChange={(e) => {
              setUser({ ...user, job: e.target.value })
            }}
          ></input>
          <button className='p-4 text-white font-bold text-2xl border-2 w-1/2 rounded-lg mx-auto hover:bg-black/30'>Save User</button>
        </div>
      </div>
    </div>
  )
}

export default Page
