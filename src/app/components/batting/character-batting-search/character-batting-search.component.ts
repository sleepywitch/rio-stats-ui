import {Component, OnInit} from '@angular/core';
import {SuperstarsTypeEnum} from "../../../model/enum/superstars-type-enum";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RankedTypeEnum} from "../../../model/enum/ranked-type-enum";
import {StatBlock} from "../../../model/stats/stat-block";
import {EnumUtilities} from "../../../utilities/enums/enum-utilities";
import {RioDetailedStatsService} from "../../../services/rio/rio-detailed-stats.service";
import {RioCharacterStatsList} from "../../../model/rio/rio-character-stats";
import {CalculatedStatsUtil} from "../../../utilities/stats/calculated-stats-util";
import {StatBlockTypeEnum} from "../../../model/enum/stat-block-type-enum";

@Component({
  selector: 'app-character-batting-search',
  templateUrl: './character-batting-search.component.html',
  styleUrls: ['./character-batting-search.component.css']
})
export class CharacterBattingSearchComponent implements OnInit {

  charBattingFormGroup: FormGroup;
  rankSelectTypes: string[];
  superstarSelectTypes: string[];

  characterBattingStats: StatBlock[];

  constructor(private formBuilder: FormBuilder,
              private rioDetailedStatsService: RioDetailedStatsService) { }

  ngOnInit(): void {
    this.charBattingFormGroup = this.formBuilder.group({
      'rankedTypeFG': [],
      'superstarTypeFG': []
    });
    this.rankSelectTypes = Object.values(RankedTypeEnum);
    this.superstarSelectTypes = Object.values(SuperstarsTypeEnum);
  }

  search() {
    if (this.charBattingFormGroup.valid) {
      const control = this.charBattingFormGroup.value;
      let tagList = EnumUtilities.getTagListFromStrings(control.rankedTypeFG, control.superstarTypeFG);
      this.getCharacterBattingStats(tagList);
    }
  }

  private getCharacterBattingStats(tagList: string[]) {
    this.rioDetailedStatsService.getBattingStatsByCharacter(tagList).subscribe(
      (data: RioCharacterStatsList) => {
        this.characterBattingStats = [];      //instantiate
        Object.entries(data.Stats).forEach(
          ([key, value]) => {
            let characterStatBlock = new StatBlock();
            characterStatBlock.character = key;
            characterStatBlock.calculatedBattingStats = CalculatedStatsUtil.calculateBattingStats(value.Batting);
            characterStatBlock.rawBattingStats = value.Batting;
            characterStatBlock.statBlockType = StatBlockTypeEnum.CHARACTER;
            this.characterBattingStats.push(characterStatBlock);
          }
        )
      }
    );
  }
}
