import { FunctionComponent } from 'react'
import { UserBoxProps } from './UserBox.types'

export const UserBox: FunctionComponent<UserBoxProps> = (Props) => {
  const { user } = Props

  return (
    <div className="flex flex-col w-3/5 h-4/5 rounded-3xl border-4 overflow-hidden shadow-lg bg-black/30 p-10 drop-shadow-xl justify-evenly">
      <div className="flex flex-row items-center justify-between w-3/4  ">
        <img
          className="w-64 h-64 border-[3px] border-white rounded-full drop-shadow-md"
          src={user.avatar}
        />
        <div className="flex">
          <p className="text-3xl text-white font-bold pr-4">
            {user.first_name}
          </p>
          <p className="text-3xl text-white font-bold">{user.last_name}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between px-4">
        <p className="text-3xl text-white font-bold">{`User ID: ${user.id}`}</p>
        <p className="text-3xl text-white font-bold">{`User e-mail: ${user.email}`}</p>
      </div>
    </div>
  )
}
