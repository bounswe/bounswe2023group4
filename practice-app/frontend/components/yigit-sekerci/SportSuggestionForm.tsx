import { SportSuggestions } from '@/api/yigit-sekerci/types'
import { useForm, UseFormRegister } from 'react-hook-form'

export type FormValues = SportSuggestions

const FormRow = (props: {
  label: string
  formKey: 'suggestion'
  formType: 'text'
  hasError: boolean
  error?: string
  register: UseFormRegister<SportSuggestions>
}) => {
  const { label, formKey, hasError, register, formType } = props
  return (
    <div className="relative">
      <div className="flex flex-row gap-4 mb-4">
        <label className="border border-stone-400	rounded-md w-1/4 text-center py-2">
          {label}
        </label>
        <input
          className="w-full border border-stone-400 rounded-md ps-2"
          type={formType}
          {...register(formKey, { required: true })}
        />
      </div>
      {hasError && (
        <div className="absolute top-0 right-0 text-red-500 text-sm me-4 h-full flex items-center">
          <p>This field is required</p>
        </div>
      )}
    </div>
  )
}

type Props = {
  onSubmit: (data: FormValues) => void
}

const SportSuggestionForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const { onSubmit } = props

  return (
    <form
      className="border rounded-lg p-6 mb-8 bg-zinc-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl mb-4">Add a new suggestion</h1>

      <FormRow
        label="Suggestion"
        formKey="suggestion"
        hasError={errors.suggestion !== undefined}
        formType="text"
        register={register}
      />

      <div className="flex justify-end">
        <button
          className="border border-stone-400 rounded-lg w-1/4 py-4 px-8 bg-red-100 hover:bg-red-300 text-center"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default SportSuggestionForm
