import {Component, Input, OnInit} from '@angular/core';
import {StatBlockI} from "../../../model/stats/stat-block";
import {Sort} from "@angular/material/sort";
import {Game} from "../../../services/rio/rio-games.service";

@Component({
  selector: 'app-batting-list',
  templateUrl: './batting-list.component.html',
  styleUrls: ['./batting-list.component.css']
})
export class BattingListComponent implements OnInit {

  battingStats: StatBlockI[]; //characterBatterStats

  extendedStatsToggle: boolean;

  //Pagination Variables
  cbsPage: StatBlockI[];
  collectionSize: number;
  page = 1;
  pageSize = 27;
  pageSizeOptions: number[] = [10, 20, 27, 54];

  @Input()
  set battingStatsInput(cbsInput: StatBlockI[]) {
    if (cbsInput) {
      console.log('receiving input');
      this.battingStats = cbsInput;
      this.collectionSize = this.battingStats.length;
      this.extendedStatsToggle = false;
      this.refreshStatPage();
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  refreshStatPage() {   //Pagination
    this.cbsPage = this.battingStats
      .slice((this.page - 1) * this.pageSize, ((this.page - 1) * this.pageSize) + this.pageSize);
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    } else if (sort.active === 'AVG') {
      this.battingStats.sort((sb1: StatBlockI, sb2: StatBlockI) =>
        this.compare(sb1.calculatedBattingStats.battingAverage, sb2.calculatedBattingStats.battingAverage, (sort.direction === 'asc')));
    } else if (sort.active === 'OBP') {
      this.battingStats.sort((sb1: StatBlockI, sb2: StatBlockI) =>
        this.compare(sb1.calculatedBattingStats.onBasePercentage, sb2.calculatedBattingStats.onBasePercentage, (sort.direction === 'asc')));
    } else if (sort.active === 'SLG') {
      this.battingStats.sort((sb1: StatBlockI, sb2: StatBlockI) =>
        this.compare(sb1.calculatedBattingStats.sluggingPercentage, sb2.calculatedBattingStats.sluggingPercentage, (sort.direction === 'asc')));
    } else if (sort.active === 'OPS') {
      this.battingStats.sort((sb1: StatBlockI, sb2: StatBlockI) =>
        this.compare((sb1.calculatedBattingStats.onBasePercentage + sb1.calculatedBattingStats.sluggingPercentage), (sb2.calculatedBattingStats.onBasePercentage + sb2.calculatedBattingStats.sluggingPercentage), (sort.direction === 'asc')));
    }
    this.refreshStatPage();
  }

  setExtendedStatsToggle(est: boolean) {
    this.extendedStatsToggle = est;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1: 1) * (isAsc ? 1 : -1);
  }

}
