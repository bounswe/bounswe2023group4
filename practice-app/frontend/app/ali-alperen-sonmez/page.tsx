'use client'
import { ExchangeRate } from '@/api/ali-alperen-sonmez/types'
import {
  useCreateExchangeRate,
  useExchangeRate,
  useRefreshExchangeRate,
} from '@/api/ali-alperen-sonmez/useExchangeRates'
import { ExchangeRateCard } from '@/components/exchangeRate/ExchangeRateCard'
import { useState } from 'react'

const Page = () => {
  const initState = {
    from_currency: '',
    to_currency: '',
    date: '',
    amount: 0,
    rate: 0,
  }
  const [isVisible, setIsVisible] = useState(false)
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>(initState)

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

  const { mutate } = useCreateExchangeRate({})
  const onSubmit = () => {
    mutate(exchangeRate)
    setExchangeRate(initState)
  }

  return (
    <div className="bg-exchange-rate bg-cover flex flex-col items-center w-full h-screen pt-16">
      <p className="text-5xl text-white font-bold pb-8">Welcome to X-RATES</p>
      <p className="text-white text-2xl font-semibold pb-14">
        See instant exchange rates immediately
      </p>
      <div className="flex flex-row w-full items-center justify-center">
        <div className="flex w-2/5 ">
          <button
            onClick={() => {
              setIsVisible(isVisible == false ? true : false)
            }}
            className="text-white h-1/3 text-2xl font-medium border-2 border-white p-4 rounded-lg backdrop-blur-lg hover:transform hover:scale-105 transition duration-300 mx-auto"
          >
            See Available Currencies
          </button>

          {isVisible && data && (
            <div className="flex w-full h-full pt-12 justify-center">
              <ExchangeRateCard currency={data[0]} />
            </div>
          )}
        </div>
        <div className="flex w-2/5 flex-col border-2 border-white bg-black/50 rounded-lg p-4 backdrop-blur-lg ">
          <input
            className="flex w-full border-2 border-white p-1 focus:outline-none rounded-lg text-white bg-white/20 mb-2"
            placeholder="from curency"
            onChange={(e) =>
              setExchangeRate({
                ...exchangeRate,
                from_currency: e.target.value,
              })
            }
            value={exchangeRate.from_currency}
          ></input>

          <input
            className="flex w-full border-2 border-white p-1 focus:outline-none rounded-lg text-white bg-white/20 mb-2"
            placeholder="to curency"
            onChange={(e) =>
              setExchangeRate({
                ...exchangeRate,
                to_currency: e.target.value,
              })
            }
            value={exchangeRate.to_currency}
          ></input>
          <input
            className="flex w-full border-2 border-white p-1 focus:outline-none rounded-lg text-white bg-white/20 mb-2"
            placeholder="date"
            onChange={(e) =>
              setExchangeRate({
                ...exchangeRate,
                date: e.target.value,
              })
            }
            value={exchangeRate.date}
          ></input>
          <input
            className="flex w-full border-2 border-white p-1 focus:outline-none rounded-lg text-white bg-white/20 mb-2"
            placeholder="amount"
            onChange={(e) =>
              setExchangeRate({
                ...exchangeRate,
                amount: Number(e.target.value),
              })
            }
            value={exchangeRate.amount}
          ></input>
                    <input
            className="flex w-full border-2 border-white p-1 focus:outline-none rounded-lg text-white bg-white/20 mb-8"
            placeholder="amount"
            onChange={(e) =>
              setExchangeRate({
                ...exchangeRate,
                rate: Number(e.target.value),
              })
            }
            value={exchangeRate.rate}
          ></input>
          <button className='bg-white text-black w-1/2 mx-auto border-0 rounded-lg p-2' onClick={onSubmit}>SAVE</button>
        </div>
      </div>
    </div>
  )
}

export default Page
