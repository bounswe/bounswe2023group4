'use client'

import { UserBox } from "@/components/userBox/UserBox"
import Link from 'next/link'

const user = {
    id: 7,
    email: "michael.lawson@reqres.in",
    first_name: "Michael",
    last_name: "Lawson",
    avatar: "https://reqres.in/img/faces/7-image.jpg"
}
const Page = () => {
  return (
    <div className="bg-black flex flex-col w-full h-screen bg-game bg-cover">
      <div className="flex flex-col w-full h-full backdrop-blur-lg bg-black/30 items-center justify-center">
      <Link  href="/selin-isik" className="absolute top-4 left-8 p-4 border-2 border-white rounded-lg bg-black/20 text-white"><p className='w-full h-full'> Return to Home Page</p></Link> 
        <UserBox user = {user}/>
        
      </div>
    </div>
  )
}

export default Page
