'use client'
import {
  useCreateWeather,
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
  const initWeather = {
    country: '',
    name: '',
    description: '',
    main: '',
    temp: -1000,
    windspeed: -1000 ,
  }


  const [weather, setWeather] = useState<Weather>(initWeather)

  const { mutate } = useCreateWeather({})
  const onSubmit = () => {
    mutate(weather)
    setWeather(initWeather);
  }

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
            className="text-4xl text-white font-bold mb-20 mt-20 "
            style={{ textShadow: '2px 2px #00000050' }}
          >
            Welcome to the Weather Forecast
          </p>
          <div className="flex w-full h-screen justify-evenly">
            <div className="flex flex-row w-2/5 h-[90%]  rounded-3xl overflow-hidden shadow-xl bg-weather-main bg-cover ">
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
            <div className="flex flex-col w-2/5 h-[90%] rounded-3xl overflow-hidden shadow-xl bg-black/20 border-2 border-white p-4 justify-evenly">
              <input
                className="p-2 bg-transparent border-2 border-white bg-white/20 rounded-lg placeholder-zinc-800 focus:outline-none focus:border-black"
                placeholder="Enter Country"
                onChange={(e) =>
                  setWeather({ ...weather, country: e.target.value })
                }
                value={weather.country}
              ></input>
              <input
                className="p-2 bg-transparent border-2 border-white bg-white/20 rounded-lg placeholder-zinc-800 focus:outline-none focus:border-black"
                placeholder="Enter City"
                onChange={(e) =>
                  setWeather({ ...weather, name: e.target.value })
                }
                value={weather.name}
              ></input>
              <input
                className="p-2 bg-transparent border-2 border-white bg-white/20 rounded-lg placeholder-zinc-800 focus:outline-none focus:border-black"
                placeholder="Enter Temp"
                onChange={(e) =>
                  setWeather({ ...weather, temp: Number(e.target.value) })
                }
                value={weather.temp == -1000 ? '' : weather.temp}
              ></input>
              <input
                className="p-2 bg-transparent border-2 border-white bg-white/20 rounded-lg placeholder-zinc-800 focus:outline-none focus:border-black"
                placeholder="Enter WindSpeed"
                onChange={(e) =>
                  setWeather({ ...weather, windspeed: Number(e.target.value) })
                }
                value={weather.windspeed == -1000 ? '' : weather.windspeed}
              ></input>
              <input
                className="p-2 bg-transparent border-2 border-white bg-white/20 rounded-lg placeholder-zinc-800 focus:outline-none focus:border-black"
                placeholder="Enter Weather Condition"
                onChange={(e) =>
                  setWeather({ ...weather, main: e.target.value })
                }
                value={weather.main}
              ></input>
              <input
                className="p-2 bg-transparent border-2 border-white bg-white/20 rounded-lg placeholder-zinc-800 focus:outline-none focus:border-black"
                placeholder="Enter Description"
                onChange={(e) =>
                  setWeather({ ...weather, description: e.target.value })
                }
                value={weather.description}
              ></input>
              <button
                className="p-2 bg-black border-0 rounded-lg w-1/2 mx-auto text-white text-lg font-semibold"
                onClick={onSubmit}
              >
                Save Weather Forecast
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
