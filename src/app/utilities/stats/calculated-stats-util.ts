import {RioBattingStats} from "../../model/rio/rio-batting-stats";
import {CalculatedBattingStats} from "../../model/stats/calculated-batting-stats";

export class CalculatedStatsUtil {

  static calculateBattingStats(rbs: RioBattingStats): CalculatedBattingStats {
    let calculatedBattingStats: CalculatedBattingStats = {
      battingAverage: (rbs.summary_hits / rbs.summary_at_bats),
      onBasePercentage: ((rbs.summary_hits + rbs.summary_walks_bb + rbs.summary_walks_hbp) / rbs.plate_appearances),
      sluggingPercentage: ((rbs.summary_singles + (rbs.summary_doubles * 2) + (rbs.summary_triples * 3) + (rbs.summary_homeruns * 4)) / rbs.summary_at_bats),
      battingAverageOnBallsInPlay: ((rbs.summary_hits - rbs.summary_homeruns) / (rbs.summary_at_bats - rbs.summary_strikeouts - rbs.summary_homeruns + rbs.summary_sac_flys)),
      isolatedPower: (((rbs.summary_doubles * 2) + (rbs.summary_triples * 3) + (rbs.summary_homeruns * 4)) / rbs.summary_at_bats),
      atBatsPerHomeRun: (rbs.summary_at_bats / rbs.summary_homeruns),
      walksToStrikeouts: (rbs.summary_walks_bb / rbs.strikeouts),
      walkPercentage: (rbs.summary_walks_bb / rbs.plate_appearances),
      strikeoutPercentage: (rbs.summary_strikeouts / rbs.plate_appearances)
    }
    return calculatedBattingStats;
  }
}
