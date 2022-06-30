import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StatBlock} from "../../../model/stats/stat-block";
import {RioDetailedStatsService} from "../../../services/rio/rio-detailed-stats.service";
import {RankedTypeEnum} from "../../../model/enum/ranked-type-enum";
import {SuperstarsTypeEnum} from "../../../model/enum/superstars-type-enum";
import {EnumUtilities} from "../../../utilities/enums/enum-utilities";
import {RioCharacterStatsList} from "../../../model/rio/rio-detailed-stats";
import {CalculatedStatsUtil} from "../../../utilities/stats/calculated-stats-util";
import {StatBlockTypeEnum} from "../../../model/enum/stat-block-type-enum";
import {DateSearchRangeEnum} from "../../../model/enum/date-search-range-enum";

@Component({
  selector: 'app-player-batting-search',
  templateUrl: './player-batting-search.component.html',
  styleUrls: ['./player-batting-search.component.css']
})
export class PlayerBattingSearchComponent implements OnInit {

  userBattingFormGroup: FormGroup;
  rankSelectTypes: string[];
  superstarSelectTypes: string[];
  dateSearchRanges: string[];

  userBattingStats: StatBlock[];
  battingStatsName: string;

  constructor(private formBuilder: FormBuilder,
              private rioDetailedStatsService: RioDetailedStatsService) { }

  ngOnInit(): void {
    this.userBattingFormGroup = this.formBuilder.group({
      'usernameFG': ['', [Validators.maxLength(64), Validators.required]],
      'rankedTypeFG': [],
      'superstarTypeFG': [],
      'dateSearchRangeFG': []
    });
    this.rankSelectTypes = Object.values(RankedTypeEnum);
    this.superstarSelectTypes = Object.values(SuperstarsTypeEnum);
    this.dateSearchRanges = Object.values(DateSearchRangeEnum);
  }

  search() {
    if (this.userBattingFormGroup.valid) {
      const control = this.userBattingFormGroup.value;
      let tagList = EnumUtilities.getTagListFromStrings(control.rankedTypeFG, control.superstarTypeFG);
      this.battingStatsName = control.usernameFG + '\'s Characters';
      this.getUserBattingStatsByCharacter(control.usernameFG, tagList);
    }
  }

  private getUserBattingStatsByCharacter(username: string, tagList: string[]) {
    this.rioDetailedStatsService.getBattingStatsForUserByCharacter(username, tagList).subscribe(
      (data: RioCharacterStatsList) => {
        this.userBattingStats = [];      //instantiate
        Object.entries(data.Stats).forEach(
          ([key, value]) => {
            if (!value.Batting.plate_appearances || value.Batting.plate_appearances == 0) {
              return; //bad data or a game that was quit immediately
            }
            let characterStatBlock = new StatBlock();
            characterStatBlock.character = key;
            characterStatBlock.username = username;
            characterStatBlock.calculatedBattingStats = CalculatedStatsUtil.calculateBattingStats(value.Batting);
            characterStatBlock.rawBattingStats = value.Batting;
            characterStatBlock.statBlockType = StatBlockTypeEnum.CHARACTER;
            this.userBattingStats.push(characterStatBlock);
          }
        )
      }
    );
  }
}
