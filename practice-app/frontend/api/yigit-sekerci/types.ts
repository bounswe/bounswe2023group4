export type League = {
  id: number
  name: string
  country: string
  season: number
}

export type Standing = {
  league_id: number
  team: string
  rank: number
  points: number
}
