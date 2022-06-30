import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {StatBlock} from "../../../model/stats/stat-block";
import {MatSort, Sort} from "@angular/material/sort";
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-batting-list',
  templateUrl: './batting-list.component.html',
  styleUrls: ['./batting-list.component.css']
})
export class BattingListComponent implements OnInit {

  battingStats: StatBlock[]; //characterBatterStats
  tableName: string = 'NAME';   //left most character name

  extendedStatsToggle: boolean;

  //Pagination Variables
  cbsPage: StatBlock[];
  collectionSize: number;
  page = 1;
  pageSize = 27;
  pageSizeOptions: number[] = [10, 20, 27, 54];

  @Input()
  set battingStatsInput(cbsInput: StatBlock[]) {
    if (cbsInput) {
      console.log('receiving input');
      this.battingStats = cbsInput;
      this.collectionSize = this.battingStats.length;
      this.extendedStatsToggle = false;
      this.refreshStatPage();
    }
  }

  @Input()
  set tableNameInput(tableNameInput: string) {
    if (tableNameInput) {
      this.tableName = tableNameInput;
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  refreshStatPage() {   //Pagination
    this.cbsPage = this.battingStats
      .slice((this.page - 1) * this.pageSize, ((this.page - 1) * this.pageSize) + this.pageSize);
  }

  setExtendedStatsToggle(est: boolean) {
    this.extendedStatsToggle = est;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1: 1) * (isAsc ? 1 : -1);
  }

  //Sorting
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    } else if (sort.active === 'NAME') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.username + sb1.character, sb2.username + sb2.character, (sort.direction === 'asc')));
    } else if (sort.active === 'PA') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.plate_appearances, sb2.rawBattingStats.plate_appearances, (sort.direction === 'asc')));
    } else if (sort.active === 'AB') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.summary_at_bats, sb2.rawBattingStats.summary_at_bats, (sort.direction === 'asc')));
    } else if (sort.active === 'H') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.summary_hits, sb2.rawBattingStats.summary_hits, (sort.direction === 'asc')));
    } else if (sort.active === '2B') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.summary_doubles, sb2.rawBattingStats.summary_doubles, (sort.direction === 'asc')));
    } else if (sort.active === '3B') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.summary_triples, sb2.rawBattingStats.summary_triples, (sort.direction === 'asc')));
    } else if (sort.active === 'HR') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.summary_homeruns, sb2.rawBattingStats.summary_homeruns, (sort.direction === 'asc')));
    } else if (sort.active === 'RBI') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.summary_rbi, sb2.rawBattingStats.summary_rbi, (sort.direction === 'asc')));
    } else if (sort.active === 'BB') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.summary_walks_bb, sb2.rawBattingStats.summary_walks_bb, (sort.direction === 'asc')));
    } else if (sort.active === 'HBP') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.summary_walks_hbp, sb2.rawBattingStats.summary_walks_hbp, (sort.direction === 'asc')));
    } else if (sort.active === 'SO') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.summary_strikeouts, sb2.rawBattingStats.summary_strikeouts, (sort.direction === 'asc')));
    } else if (sort.active === 'SF') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.rawBattingStats.summary_sac_flys, sb2.rawBattingStats.summary_sac_flys, (sort.direction === 'asc')));
    }

    else if (sort.active === 'AVG') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.calculatedBattingStats.battingAverage, sb2.calculatedBattingStats.battingAverage, (sort.direction === 'asc')));
    } else if (sort.active === 'OBP') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.calculatedBattingStats.onBasePercentage, sb2.calculatedBattingStats.onBasePercentage, (sort.direction === 'asc')));
    } else if (sort.active === 'SLG') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.calculatedBattingStats.sluggingPercentage, sb2.calculatedBattingStats.sluggingPercentage, (sort.direction === 'asc')));
    } else if (sort.active === 'OPS') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare((sb1.calculatedBattingStats.onBasePlusSlugging), (sb2.calculatedBattingStats.onBasePlusSlugging), (sort.direction === 'asc')));
    }  else if (sort.active === 'BABIP') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.calculatedBattingStats.battingAverageOnBallsInPlay, sb2.calculatedBattingStats.battingAverageOnBallsInPlay, (sort.direction === 'asc')));
    } else if (sort.active === 'ISO') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.calculatedBattingStats.isolatedPower, sb2.calculatedBattingStats.isolatedPower, (sort.direction === 'asc')));
    } else if (sort.active === 'ABHR') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.calculatedBattingStats.atBatsPerHomeRun, sb2.calculatedBattingStats.atBatsPerHomeRun, (sort.direction === 'asc')));
    } else if (sort.active === 'BBK') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.calculatedBattingStats.walksToStrikeouts, sb2.calculatedBattingStats.walksToStrikeouts, (sort.direction === 'asc')));
    } else if (sort.active === 'BB%') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.calculatedBattingStats.walkPercentage, sb2.calculatedBattingStats.walkPercentage, (sort.direction === 'asc')));
    } else if (sort.active === 'SO%') {
      this.battingStats.sort((sb1: StatBlock, sb2: StatBlock) =>
        this.compare(sb1.calculatedBattingStats.strikeoutPercentage, sb2.calculatedBattingStats.strikeoutPercentage, (sort.direction === 'asc')));
    }

    this.refreshStatPage();
  }
}
