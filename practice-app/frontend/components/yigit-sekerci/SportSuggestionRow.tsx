import { SportSuggestions } from '@/api/yigit-sekerci/types'

type SportSuggestionRowProps = {
  suggestions: SportSuggestions[]
}

const SportSuggestionRow = (props: SportSuggestionRowProps) => {
  const { suggestions } = props
  return (
    <div className="flex flex-col gap-4 border rounded rounded-lg border-stone-400 bg-zinc-100 w-full p-4">
      {suggestions &&
        suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="border border-stone-400 bg-zinc-200 rounded rounded-sm flex flex-col gap-3 px-2 py-1"
          >
            <div>Suggestion: {suggestion.suggestion}</div>
          </div>
        ))}
    </div>
  )
}

export default SportSuggestionRow
