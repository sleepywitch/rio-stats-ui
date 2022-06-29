import {Component, Input, OnInit} from '@angular/core';
import {Game, GameHistory, RioGamesService} from "../../../services/rio/rio-games.service";
import {DatePipe} from "@angular/common";
import {Sort} from "@angular/material/sort";
import {RioDetailedStatsService} from "../../../services/rio/rio-detailed-stats.service";
import {RioDetailedStats, RioCharacterStatsList} from "../../../model/rio/rio-detailed-stats";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  username: string;           //username to search by

  filterGamesBy: number       //1 - all, 2 - ranked, 3 - unranked

  gameList: Game[];           //Display Game List filtered by above
  originalGameList: Game[];   //Original Unaltered GameList

  //Pagination Variables
  gamePage: Game[];
  collectionSize: number;
  page: number;
  pageSize: number;
  pageSizeOptions: number[] = [10, 25, 50];

  static defaultPage: number = 1;
  static defaultPageSize: number = 25;


  @Input()
  set usernameParam(usernameParam: string) {
    this.username = usernameParam;
    if (this.username && this.username.trim().length > 0) {
      this.findGamesByUser(this.username);
    }
  }

  constructor(private gamesService: RioGamesService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.filterGamesBy = 1;
    this.page = GameListComponent.defaultPage;
    this.pageSize = GameListComponent.defaultPageSize;
  }

  resetToAll() {
    if (this.filterGamesBy != 1) {
      this.gameList = this.originalGameList.slice();
      this.filterGamesBy = 1;
      this.resetGameListPagination();
    }
  }

  filterForRanked() {
    if (this.filterGamesBy != 2) {
      this.gameList = this.originalGameList.slice().filter(
        (game: Game) => {
          return (game.Tags.indexOf('Ranked') > -1);
        }
      );
      this.filterGamesBy = 2;
      this.resetGameListPagination();
    }
  }

  filterForUnranked() {
    if (this.filterGamesBy != 3) {
      this.gameList = this.originalGameList.slice().filter(
        (game: Game) => {
          return (game.Tags.indexOf('Unranked') > -1);
        }
      );
      this.filterGamesBy = 3;
      this.resetGameListPagination();
    }
  }

  refreshGamesList() {    //Pagination
    this.gamePage = this.gameList
      .map((game: Game, i) => ({id: i+1, ...game}))
      .slice((this.page - 1) * this.pageSize, (this.page -1) * this.pageSize + this.pageSize);
  }

  changeGamesPerPage() {
    this.page = GameListComponent.defaultPage;
    this.refreshGamesList();
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.redoFilter();
    } else if (sort.active === 'date') {
      this.gameList.sort((gl1: Game, gl2: Game) => this.compare(gl1.date_time_start, gl2.date_time_start, (sort.direction === 'asc')));
    }
    this.refreshGamesList();
  }

  parseDateNumber(dateNumber: number): string {
    if (!dateNumber) {
      return '';
    }
    let startDate = new Date(dateNumber * 1000);
    return <string>this.datePipe.transform(startDate, 'MMM d, y');
  }

  private findGamesByUser(user: string) {
    this.gamesService.getGamesByUsername(user).subscribe(
      (data: GameHistory) => {
        this.gameList = JSON.parse(JSON.stringify(data.games).split(' ').join(''));
        this.originalGameList = JSON.parse(JSON.stringify(data.games).split(' ').join(''));
        this.collectionSize = this.originalGameList.length;
        this.refreshGamesList();
      }
    );
  }

  private redoFilter() {
    if (this.filterGamesBy == 1) {
      this.resetToAll();
    } else if (this.filterGamesBy == 2) {
      this.filterForRanked();
    } else if (this.filterGamesBy == 3) {
      this.filterForUnranked();
    }
  }

  private resetGameListPagination() {   //Resets Pagination when filtering by ranked / unranked / all
    this.page = GameListComponent.defaultPage;
    this.pageSize = GameListComponent.defaultPageSize;
    this.collectionSize = this.gameList.length;
    this.refreshGamesList();
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1: 1) * (isAsc ? 1 : -1);
  }
}


