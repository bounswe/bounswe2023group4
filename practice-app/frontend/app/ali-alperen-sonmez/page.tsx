'use client'
import {
  useExchangeRate,
  useRefreshExchangeRate,
} from '@/api/ali-alperen-sonmez/useExchangeRates'
import { ExchangeRateCard } from '@/components/exchangeRate/ExchangeRateCard'
import { useState } from 'react'

const Page = () => {
  const [isVisible, setIsVisible] = useState(false)

  const { data, refetch } = useExchangeRate({
    config: {
      onSuccess: (data: Weather[]) => {
        if (data.length === 0) {
          refreshExchangeRate()
        }
      },
    },
  })

  const { mutate: refreshExchangeRate } = useRefreshExchangeRate({
    config: {
      onSuccess: () => {
        refetch()
      },
    },
  })

  return (
    <div className="bg-exchange-rate bg-cover flex flex-col items-center w-full h-screen pt-16">
      <p className="text-5xl text-white font-bold pb-8">Welcome to X-RATES</p>
      <p className="text-white text-2xl font-semibold pb-14">
        See instant exchange rates immediately
      </p>
      <button
        onClick={() => {
          setIsVisible(isVisible == false ? true : false)
        }}
        className="text-white text-2xl font-medium border-2 border-white p-4 rounded-lg backdrop-blur-lg hover:transform hover:scale-105 transition duration-300"
      >
        See Available Currencies
      </button>

      {isVisible && data && (
        <div className="flex w-full h-full pt-12 justify-center">
          <ExchangeRateCard currency={data[0]} />
        </div>
      )}
    </div>
  )
}

export default Page
