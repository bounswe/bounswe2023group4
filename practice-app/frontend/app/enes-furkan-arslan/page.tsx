'use client'
import { WeatherBox } from '@/components/weatherBox/WeatherBox'
import { useState } from 'react'

const Page = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-full h-screen flex items-center justify-center bg-weather">
      {isOpen ? (
        <WeatherBox
          country="TR"
          name="İstanbul"
          description="parçalı az bulutlu"
          main="Clouds"
          temp={285.74}
          windspeed={6.69}
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
