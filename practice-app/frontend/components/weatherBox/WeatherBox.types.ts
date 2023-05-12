export interface WeatherBoxProps {
  country: string
  name: string
  description: string
  main: string
  temp: number
  windspeed: number
  buttonOnClick: () => void
}
