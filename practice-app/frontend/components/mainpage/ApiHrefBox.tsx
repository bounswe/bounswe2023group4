'use client'

const ApiHrefBox = (props: {
  apiName: string
  student: string
  onClick: () => void
}) => {
  const { apiName, student, onClick } = props

  return (
    <button
      className="mx-auto text-center border w-1/2 px-4 pt-5 pb-1 rounded-lg cursor-pointer bg-stone-100 hover:bg-stone-200"
      onClick={onClick}
    >
      <div className="mx-auto">{apiName}</div>
      <p className="text-end text-xs relative">Prepared by {student}</p>
    </button>
  )
}

export default ApiHrefBox
