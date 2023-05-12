import { useMutation, useQuery } from 'react-query'

type UseWeathersProps = {
  config?: any
}

const fetchWeathers = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/weathers/`, {
    mode: 'cors',
  })
  return response.json()
}

const useWeathers = (props: UseWeathersProps) => {
  const { config } = props
  return useQuery<Weather[]>('weathers', fetchWeathers, config)
}

type UseMutationWeathersProps = {
  config?: any
}

const refreshWeathers = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/weather_collect/`, {
    mode: 'cors',
    method: 'get',
  })
  return response.json()
}

const useRefreshWeathers = (props: UseMutationWeathersProps) => {
  const { config } = props
  return useMutation('refreshWeathers', refreshWeathers, config)
}

const deleteWeathers = async () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  await fetch(`${apiBaseUrl}/weather_clearall/`, {
    mode: 'cors',
    method: 'delete',
  })
}

const useDeleteWeathers = (props: UseMutationWeathersProps) => {
  const { config } = props
  return useMutation('deleteWeathers', deleteWeathers, config)
}

const createWeather = async (weather: Weather) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const response = await fetch(`${apiBaseUrl}/weather_new/`, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(weather),
  })
  return response.json()
}

const useCreateWeather = (props: UseMutationWeathersProps) => {
  const { config } = props
  return useMutation('createWeather', createWeather, config)
}

export { useWeathers, useRefreshWeathers, useDeleteWeathers, useCreateWeather }
