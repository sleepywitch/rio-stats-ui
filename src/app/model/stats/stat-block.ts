import {RioCharacterStats} from "../rio/rio-character-stats";
import {StatBlockTypeEnum} from "../enum/stat-block-type-enum";
import {CalculatedBattingStats} from "./calculated-batting-stats";
import {RioBattingStats} from "../rio/rio-batting-stats";

export class StatBlock {
  username: string;
  character: string;
  calculatedBattingStats: CalculatedBattingStats;
  rawBattingStats: RioBattingStats;
  statBlockType: StatBlockTypeEnum;
}
