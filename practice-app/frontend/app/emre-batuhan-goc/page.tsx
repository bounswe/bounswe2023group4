'use client'
import { Country } from '@/api/emre-batuhan-goc/types'
import {
  useCountries,
  useCreateCountry,
  useDeleteCountries,
  useRefreshCountries,
} from '@/api/emre-batuhan-goc/useCountries'
import CountryCard from '@/components/emre-batuhan-goc/CountryCard'
import CountryForm, {
  FormValues,
} from '@/components/emre-batuhan-goc/CountryForm'

const Page = () => {
  const { data, refetch } = useCountries({
    config: {
      onSuccess: (data: Country[]) => {
        if (data.length === 0) {
          refreshCountries()
        }
      },
    },
  })

  const { mutate: createCountry } = useCreateCountry({
    config: {
      onSuccess: () => {
        refetch()
      },
    },
  })

  const { mutate: refreshCountries } = useRefreshCountries({
    config: {
      onSuccess: () => {
        refetch()
      },
    },
  })

  const { mutate: deleteCountries } = useDeleteCountries({
    config: {
      onSuccess: () => {
        refreshCountries()
      },
    },
  })

  const onSubmit = (data: FormValues) => {
    createCountry(data)
  }

  return (
    <div className="grid gap-3 grid-cols-3 px-4 pt-2">
      <div className="col-span-3 content-end grid grid-cols-3 gap-3 justify-between my-4">
        <div />
        <p className="flex m-auto text-center text-4xl"> Country API </p>
        <button
          className="bg-red-100 hover:bg-red-300 rounded-lg p-4 w-1/2 mx-auto"
          onClick={() => {
            deleteCountries()
          }}
        >
          Refresh Countries
        </button>
      </div>

      {data &&
        data.map((country, i) => <CountryCard key={i} country={country} />)}

      <div className="col-span-3">
        <CountryForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default Page
