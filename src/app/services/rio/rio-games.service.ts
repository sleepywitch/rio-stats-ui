import { Injectable } from '@angular/core';
import {PlatformLocation} from "@angular/common";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface GameHistory {
  games: Game[];
}

export interface Game {
  AwayCaptain: string,
  AwayScore: number,
  AwayUser: string,
  HomeCaptain: string,
  HomeScore: number,
  HomeUser: string,
  Id: number,
  InningsPlayed: number,
  InningsSelected: number,
  Tags: string[],
  date_time_end: number,
  date_time_start: number
}

@Injectable({
  providedIn: 'root'
})
export class RioGamesService {

  constructor(private http: HttpClient, private pl: PlatformLocation) { }


  getGamesByUsername(username: string): Observable<GameHistory> {
    const params = new HttpParams()
      .set('username', username);

    return this.http.get<GameHistory>(this.getServiceBaseUrl(), {params});
  }

  private getServiceBaseUrl(): string {
    return 'https://projectrio-api-1.api.projectrio.app/games';
  }

}
