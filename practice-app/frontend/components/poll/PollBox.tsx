import { FunctionComponent } from "react"
import { PollBoxProps } from "./PollBox.types"

export const PollBox: FunctionComponent<PollBoxProps> = (Props) => {
    const { question, answers } =
      Props
  

    const render_Answers = () => {
        return answers.map((answer,index) => {
            return (
            <button className="flex border-2 border-amber-600 bg-amber-500/30 p-4 rounded-lg mb-8 hover:bg-amber-500/50" key={index}>
                <p className="text-black">{answer}</p>
            </button>
            )
        })
    }
    return (
      <div className="flex flex-col w-3/5 h-4/5 overflow-y-scroll-auto rounded-2xl border-0 overflow-hidden shadow-lg bg-zinc-50/60 p-5 drop-shadow-xl">
        <p className="text-black text-center text-3xl pb-10 pt-6">{question}</p>
        {render_Answers()}
      </div>
    )
  }
  