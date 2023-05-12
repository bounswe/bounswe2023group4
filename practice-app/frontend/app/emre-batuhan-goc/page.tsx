'use client'
import { useCountries } from '@/api/emre-batuhan-goc/useCountries'
import CountryCard from '@/components/emre-batuhan-goc/CountryCard'

const Page = () => {
  const { data } = useCountries()

  return (
    <div className="grid gap-3 grid-cols-3 px-4 pt-2">
      {data &&
        data.map((country, i) => <CountryCard key={i} country={country} />)}
    </div>
  )
}

export default Page
