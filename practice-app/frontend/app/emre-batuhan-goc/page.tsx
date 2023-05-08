import { Country } from '@/api/emre-batuhan-goc/types'
import CountryCard from '@/components/emre-batuhan-goc/CountryCard'

const MockCountries: Country[] = Array<Country>(100).fill({
  name: 'Turkey',
  capital: 'Ankara',
  population: 100000000,
  gdp: 1000000000000,
})

const Page = () => {
  return (
    <div className="grid gap-3 grid-cols-3 px-4 pt-2">
      {MockCountries.map((country, i) => (
        <CountryCard key={i} country={country} />
      ))}
    </div>
  )
}

export default Page
