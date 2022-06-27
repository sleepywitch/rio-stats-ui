export interface CharacterData {
  batting_stance: number,
  batting_stat_bar: number,
  bunting: number,
  captain: boolean,
  captain_star_hit_or_pitch: number,
  char_id: string,
  character_class: number,
  charge_hit_power: number,
  chemistry_table_id: number,
  curve: number,
  curve_ball_speed: number,
  fast_ball_speed: number,
  fielding_arm: number,
  fielding_stat_bar: number,
  hit_trajectory_mhl: number,
  hit_trajectory_mpp: number,
  name: string,
  nice_contact_spot_size: number,
  non_captain_star_pitch: number,
  non_captain_star_swing: number,
  perfect_contact_spot_size: number,
  pitching_stat_bar: number,
  running_stat_bar: number,
  slap_hit_power: number,
  speed: number,
  starting_addr: string,
  throwing_arm: number,
  weight: number
}

export interface CharacterDataList {
  characters: CharacterData[];
}
