import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RioDetailedStatsService} from "../../../services/rio/rio-detailed-stats.service";
import {CharacterNameEnum} from "../../../model/enum/character-name-enum";
import {RankedTypeEnum} from "../../../model/enum/ranked-type-enum";
import {StatBlock} from "../../../model/stats/stat-block";
import {SuperstarsTypeEnum} from "../../../model/enum/superstars-type-enum";
import {EnumUtilities} from "../../../utilities/enums/enum-utilities";
import {RioUserStatsList} from "../../../model/rio/rio-character-stats";
import {CalculatedStatsUtil} from "../../../utilities/stats/calculated-stats-util";
import {StatBlockTypeEnum} from "../../../model/enum/stat-block-type-enum";

@Component({
  selector: 'app-leaderboard-batting-search',
  templateUrl: './leaderboard-batting-search.component.html',
  styleUrls: ['./leaderboard-batting-search.component.css']
})
export class LeaderboardBattingSearchComponent implements OnInit {

  leaderboardSearchFormGroup: FormGroup;

  characterNames: string[];
  rankSelectTypes: string[];
  superstarSelectTypes: string[];

  playerBattingStats: StatBlock[];

  constructor(private formBuilder: FormBuilder,
              private rioDetailedStatsService: RioDetailedStatsService) { }

  ngOnInit(): void {
    this.leaderboardSearchFormGroup = this.formBuilder.group({
      'characterFG': [],
      'rankedTypeFG': [],
      'superstarTypeFG': [],
      'dateRangeFG': []
    });
    this.characterNames = Object.values(CharacterNameEnum);
    this.rankSelectTypes = Object.values(RankedTypeEnum);
    this.superstarSelectTypes = Object.values(SuperstarsTypeEnum);
  }

  search() {
    if (this.leaderboardSearchFormGroup.valid) {
      const control = this.leaderboardSearchFormGroup.value;
      let tagList = EnumUtilities.getTagListFromStrings(control.rankedTypeFG, control.superstarTypeFG);
      if (!control.characterFG || control.characterFG == 'Overall') {
        this.getOverallLeaderboardBattingStats(tagList);
      } else {
        this.getLeaderboardBattingStatsByCharacter(control.characterFG, tagList);
      }
    }
  }

  private getLeaderboardBattingStatsByCharacter(character: string, tagList: string[]) {

  }

  private getOverallLeaderboardBattingStats(tagList: string[]) {
    this.rioDetailedStatsService.getOverallBattingStatsByUser(tagList).subscribe(
      (data: RioUserStatsList) => {
        this.playerBattingStats = [];      //instantiate
        Object.entries(data.Stats).forEach(
          ([key, value]) => {
            let userStatBlock = new StatBlock();
            userStatBlock.character = key;
            userStatBlock.username = key;
            userStatBlock.calculatedBattingStats = CalculatedStatsUtil.calculateBattingStats(value.Batting);
            userStatBlock.rawBattingStats = value.Batting;
            userStatBlock.statBlockType = StatBlockTypeEnum.USERNAME;
            this.playerBattingStats.push(userStatBlock);
          }
        );
      }
    )

  }

}
