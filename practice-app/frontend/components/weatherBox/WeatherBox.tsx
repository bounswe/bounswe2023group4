'use client'
import { FunctionComponent } from 'react'
import { WeatherBoxProps } from './WeatherBox.types'
import Image from 'next/image'
import cloud from '../../public/cloud.svg'

export const WeatherBox: FunctionComponent<WeatherBoxProps> = (Props) => {
  const { country, name, description, main, temp, windspeed, buttonOnClick } =
    Props

  return (
    <div className="flex flex-row w-4/5 h-4/5 rounded-3xl border-0 overflow-hidden shadow-lg bg-white/50 ">
      <div className="flex items-end w-3/5 bg-city bg-cover ">
        <div className="flex h-1/3 bg-gradient-to-t from-black items-center w-full px-12 justify-between pt-6">
          <div className="flex">
            <p className="text-white text-4xl pr-8 font-semibold">{`${(
              temp - 272.15
            ).toFixed(0)} C`}</p>
            <p className="text-white pr-2 text-lg align-text-top"> {country}</p>
            <p className="text-white text-3xl">{name}</p>
          </div>
          <div className="flex items-center">
            <p className="text-white pr-2 align-middle text-xl">{main}</p>
            <Image
              width={50}
              height={50}
              src={cloud}
              alt="main"
              className="pt-2"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-2/5 bg-white p-4 justify-between">
        <div>
          <p className="text-3xl text-center pb-4 font-bold">Weather Details</p>

          <div className="pb-4 ">
            <p className="text-xl text-black pb-2 font-semibold">Description</p>
            <p className="text-black text-xl">{description}</p>
          </div>
          <div>
            <p className="text-xl text-black pb-2 font-semibold">
              Wind Informations
            </p>
            <p className="text-black text-xl">{windspeed}</p>
          </div>
        </div>

        <button
          className="text-center w-full bg-white text-black text-xl p-2 border-2 border-black rounded-xl hover:bg-black hover:text-white"
          onClick={buttonOnClick}
        >
          Return to Main Page
        </button>
      </div>
    </div>
  )
}
