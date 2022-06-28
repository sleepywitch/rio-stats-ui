export interface CalculatedBattingStats {
  battingAverage: number,     // (singles / atBats)
  onBasePercentage: number,   // (singles + walksBB + walksHBP / plateAppearances)
  sluggingPercentage: number, // (1B + (2B*2) + (3B*3) + (HR*4))/ atBats)
  onBasePlusSlugging: number, // (onBasePercentage + slugging)
  //Advance Stats
  battingAverageOnBallsInPlay: number,        //(H - HR)/(AB-K-HR+SF)
  isolatedPower: number,                      //((2B*2) + (3B*3) + (HR*4))/ atBats)
  atBatsPerHomeRun: number,                    //AB/HR
  walksToStrikeouts: number,                   //BB/K
  walkPercentage: number,                     //BB/PA
  strikeoutPercentage: number                 //K/PA
}
