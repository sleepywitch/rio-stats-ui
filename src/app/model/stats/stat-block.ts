import {RioDetailedStats} from "../rio/rio-detailed-stats";
import {StatBlockTypeEnum} from "../enum/stat-block-type-enum";
import {CalculatedBattingStats} from "./calculated-batting-stats";
import {RioBattingStats} from "../rio/rio-batting-stats";

export class StatBlock {
  username: string;
  character: string;
  calculatedBattingStats: CalculatedBattingStats;
  rawBattingStats: RioBattingStats;
  statBlockType: StatBlockTypeEnum;

  getDisplayName(): string {
    switch (this.statBlockType) {
      case StatBlockTypeEnum.USERNAME:
        return this.username;
      case StatBlockTypeEnum.CHARACTER:
        return this.character;
      case StatBlockTypeEnum.CHARACTER_FOR_USER:
        return this.character + ' (' + this.username + ')';
      case  StatBlockTypeEnum.CHARACTER_VS_USER:
        return this.character + ' vs. ' + this.username;
    }
    return '';    //safety return - should never be reached
  }
}
