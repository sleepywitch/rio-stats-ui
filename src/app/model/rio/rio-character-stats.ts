import {RioBattingStats} from "./rio-batting-stats";
import {RioPitchingStats} from "./rio-pitching-stats";
import {RioMiscStats} from "./rio-misc-stats";

export interface RioCharacterStats {
  Batting: RioBattingStats,
  Misc?: RioMiscStats,
  Pitching?: RioPitchingStats
}

export interface RioCharacterStatsList {
  Stats: RioCharacterStats[];
}

export interface RioUserCharacterStatsList {
  StatList: RioCharacterStatsList[];
}

export interface RioUserStatsList {
  Stats: RioCharacterStats[];
}
