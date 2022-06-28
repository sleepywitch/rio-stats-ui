import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StatBlock} from "../../../model/stats/stat-block";
import {RioDetailedStatsService} from "../../../services/rio/rio-detailed-stats.service";
import {RankedTypeEnum} from "../../../model/enum/ranked-type-enum";
import {SuperstarsTypeEnum} from "../../../model/enum/superstars-type-enum";
import {EnumUtilities} from "../../../utilities/enums/enum-utilities";
import {RioCharacterStatsList} from "../../../model/rio/rio-character-stats";
import {CalculatedStatsUtil} from "../../../utilities/stats/calculated-stats-util";
import {StatBlockTypeEnum} from "../../../model/enum/stat-block-type-enum";

@Component({
  selector: 'app-player-batting-search',
  templateUrl: './player-batting-search.component.html',
  styleUrls: ['./player-batting-search.component.css']
})
export class PlayerBattingSearchComponent implements OnInit {

  userBattingFormGroup: FormGroup;
  rankSelectTypes: string[];
  superstarSelectTypes: string[];

  userBattingStats: StatBlock[];

  constructor(private formBuilder: FormBuilder,
              private rioDetailedStatsService: RioDetailedStatsService) { }

  ngOnInit(): void {
    this.userBattingFormGroup = this.formBuilder.group({
      'usernameFG': ['', [Validators.maxLength(64), Validators.required]],
      'rankedTypeFG': [],
      'superstarTypeFG': []
    });
    this.rankSelectTypes = Object.values(RankedTypeEnum);
    this.superstarSelectTypes = Object.values(SuperstarsTypeEnum);
  }

  search() {
    if (this.userBattingFormGroup.valid) {
      const control = this.userBattingFormGroup.value;
      let tagList = EnumUtilities.getTagListFromStrings(control.rankedTypeFG, control.superstarTypeFG);
      this.getUserBattingStatsByCharacter(control.usernameFG, tagList);
    }
  }

  private getUserBattingStatsByCharacter(username: string, tagList: string[]) {
    this.rioDetailedStatsService.getBattingStatsForUserByCharacter(username, tagList).subscribe(
      (data: RioCharacterStatsList) => {
        this.userBattingStats = [];      //instantiate
        Object.entries(data.Stats).forEach(
          ([key, value]) => {
            if (!value.Batting.plate_appearances) {
              return; //bad data
            }
            let characterStatBlock = new StatBlock();
            characterStatBlock.character = key;
            characterStatBlock.username = username;
            characterStatBlock.calculatedBattingStats = CalculatedStatsUtil.calculateBattingStats(value.Batting);
            characterStatBlock.rawBattingStats = value.Batting;
            characterStatBlock.statBlockType = StatBlockTypeEnum.CHARACTER_FOR_USER;
            this.userBattingStats.push(characterStatBlock);
          }
        )
      }
    );
  }
}
