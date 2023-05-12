import { Country } from '@/api/emre-batuhan-goc/types'
import { useForm, UseFormRegister } from 'react-hook-form'

export type FormValues = Country

const FormRow = (props: {
  label: string
  formKey: 'name' | 'capital' | 'population' | 'gdp'
  formType: 'text' | 'number'
  hasError: boolean
  error?: string
  register: UseFormRegister<Country>
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

const CountryForm = (props: Props) => {
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
      <h1 className="text-2xl mb-4">Add a new country</h1>

      <FormRow
        label="Name"
        formKey="name"
        hasError={errors.name !== undefined}
        formType="text"
        register={register}
      />

      <FormRow
        label="Capital"
        formKey="capital"
        hasError={errors.capital !== undefined}
        formType="text"
        register={register}
      />

      <FormRow
        label="Population"
        formKey="population"
        hasError={errors.population !== undefined}
        formType="number"
        register={register}
      />

      <FormRow
        label="GDP"
        formKey="gdp"
        hasError={errors.gdp !== undefined}
        formType="number"
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

export default CountryForm
