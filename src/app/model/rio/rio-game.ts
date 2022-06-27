export interface RioGame {
  AwayCaptain: string,
  AwayScore: number,
  AwayUser: string,
  HomeCaptain: string,
  HomeScore: number,
  HomeUser: string,
  Id: number,
  InningsPlayed: number,
  InningsSelected: number,
  Tags: string[],
  date_time_end: number,
  date_time_start: number
}

export interface RioGameHistory {
  games: RioGame[];
}
