'use client'
import Link from 'next/link'
const Page = () => {
  return (
    <div className="bg-black flex flex-col w-full h-screen bg-game bg-cover">
      <div className="flex flex-col w-full h-full backdrop-blur-lg py-20 bg-black/30 items-center">
        <p className="text-white text-3xl font-bold pb-20">
          You have succesfully logged in to the GameX
        </p>
        <p className="text-white text-2xl font-bold pb-20">Please select your avatar</p>
        <div className="flex h-screen w-full justify-center ">
            <Link href="/selin-isik/get-profile" className='w-1/3 h-1/2 bg-black/30 mr-8 border-2 rounded-xl border-white hover:bg-purple-500/30'><button className="flex w-full h-full justify-center items-center text-3xl font-bold text-white ">Select Current Avatar</button></Link>
            <Link href="/selin-isik/add-profile" className='w-1/3 h-1/2 bg-black/30 border-2 rounded-xl border-white hover:bg-purple-500/30'><button className="flex w-full h-full justify-center items-center text-3xl font-bold text-white">Create New Avatar</button></Link>
        
        </div>
      </div>
    </div>
  )
}

export default Page
