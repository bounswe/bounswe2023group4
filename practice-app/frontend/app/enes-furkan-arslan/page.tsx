'use client'
import {
  useRefreshWeathers,
  useWeathers,
} from '@/api/enes-furkan-arslan/useWeather'
import { WeatherBox } from '@/components/weatherBox/WeatherBox'
import { useState } from 'react'

const Page = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, refetch } = useWeathers({
    config: {
      onSuccess: (data: Weather[]) => {
        if (data.length === 0) {
          refreshCountries()
        }
      },
    },
  })

  const { mutate: refreshCountries } = useRefreshWeathers({
    config: {
      onSuccess: () => {
        refetch()
      },
    },
  })

  return (
    <div className="w-full h-screen flex items-center justify-center bg-weather">
      {isOpen && data && data.length > 0 ? (
        <WeatherBox
          country={data[0].country}
          name={data[0].name}
          description={data[0].description}
          main={data[0].main}
          temp={data[0].temp}
          windspeed={data[0].windspeed}
          buttonOnClick={() => {
            setIsOpen(false)
          }}
        />
      ) : (
        <div className="flex flex-col w-full h-screen items-center justify-center">
          <p
            className="text-4xl text-white font-bold mb-20 "
            style={{ textShadow: '2px 2px #00000050' }}
          >
            Welcome to the Weather Forecast
          </p>
          <div className="flex flex-row w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-xl bg-weather-main bg-cover">
            <button
              onClick={() => {
                setIsOpen(true)
              }}
              className="w-full h-full backdrop-filter hover:backdrop-blur-md backdrop-blur-0"
            >
              <div className="bg-opacity-50 bg-black h-full w-full flex items-center justify-center">
                <span className="text-white text-3xl font-semibold">
                  İstanbul için anlık hava durumu
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
