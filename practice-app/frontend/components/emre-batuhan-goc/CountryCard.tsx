import { Country } from '@/api/emre-batuhan-goc/types'

const CountryCard = (props: { country: Country }) => {
  const { country } = props

  return (
    <div
      className="border rounded-lg p-8 flex flex-col gap-3
      bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
    >
      <p className="text-5xl">{country.name}</p>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population} People</p>
      <p>Gross Domestic Product: {country.gdp} $</p>
    </div>
  )
}

export default CountryCard
