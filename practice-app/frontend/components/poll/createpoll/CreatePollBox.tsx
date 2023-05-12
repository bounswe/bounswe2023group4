import { FunctionComponent } from 'react'
import { CreatePollBoxProps } from './CreatePollBox..types'

export const CreatePollBox: FunctionComponent<CreatePollBoxProps> = (Props) => {
  const { setPoll, poll } = Props

  return (
    <div className="flex flex-col w-3/5 h-[70%] overflow-y-scroll-auto rounded-2xl border-0 overflow-hidden shadow-lg bg-zinc-50/60 drop-shadow-xl justify-between py-14 px-8">
      <div className="flex flex-col">
        <p className="text-xl font-semibold py-3">Please enter your question</p>
        <input
        type='text'
          className="mb-8 p-3 bg-white/50 border-2 border-white rounded-md focus:outline-none focus:border-amber-500 focus:bg-amber-500/10"
          value={poll.question}
          onChange={(e) => {
            setPoll({ ...poll, question: e.target.value })
          }}
        ></input>
        <p className="text-xl font-semibold pt-3 pb-6">Please enter options</p>
        <input
        type='text'
          className="mb-8 p-3 bg-white/50 border-2 border-white rounded-md focus:outline-none focus:border-amber-500 focus:bg-amber-500/10 text-black"
          value={poll.answers[0]}
          placeholder="Option1"
          onChange={(e) => {
            setPoll({ ...poll, answers: [e.target.value, poll.answers[1]] })
          }}
        ></input>
        <input
        type='text'
          className="mb-8 p-3 bg-white/50 border-2 border-white rounded-md focus:outline-none focus:border-amber-500 focus:bg-amber-500/10"
          value={poll.answers[1]}
          placeholder="Option2"
          onChange={(e) => {
            setPoll({ ...poll, answers: [poll.answers[0], e.target.value] })
          }}
        ></input>
      </div>
      <button className="text-black font-semibold p-3 text-xl border-2 w-1/3 border-black rounded-lg mx-auto hover:bg-zinc-700 hover:border-zinc-700 hover:text-white">
        Submit Poll
      </button>
    </div>
  )
}
