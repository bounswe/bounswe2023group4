import { FunctionComponent } from 'react'
import { ExchangeRateCardProps } from './ExchangeRateCard.types'

export const ExchangeRateCard: FunctionComponent<ExchangeRateCardProps> = (
  Props
) => {
  const { currency } = Props


  return (
    <div className="flex flex-col w-1/3 h-2/3  bg-black/60 backdrop-blur-lg border-2 border-white rounded-xl justify-between pt-8 pb-3 items-center">
      <div className="flex flex-row w-full justify-evenly px-4">
        <p className="text-2xl text-white font-bold">{currency?.fromCurrency}</p>
        <p className="text-2xl text-white font-bold">{currency?.toCurrency}</p>
      </div>
      <div className="flex flex-row w-full justify-evenly px-4">
        <p className="text-2xl text-white font-bold">{`${currency?.amount} ${currency?.fromCurrency}`}</p>
        <p className="text-2xl text-white font-bold">{`${currency?.exchangeRate} ${currency?.toCurrency}`}</p>
      </div>
      <div className="flex flex-row w-full justify-end px-4">
        <p className="text-xl text-white font-bold">{currency?.date}</p>
      </div>
    </div>
  )
}
