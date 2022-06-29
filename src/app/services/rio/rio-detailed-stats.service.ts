import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PlatformLocation} from "@angular/common";
import {Observable} from "rxjs";
import {RioCharacterStatsList, RioUserCharacterStatsList, RioUserStatsList} from "../../model/rio/rio-character-stats";
import {GameHistory} from "./rio-games.service";

@Injectable({
  providedIn: 'root'
})
export class RioDetailedStatsService {

  constructor(private http: HttpClient, private pl: PlatformLocation) { }

  getDetailedCharacterStatsForUsername(username: string): Observable<RioCharacterStatsList> {
    const params = new HttpParams()
      .set('username', username)
      .set('by_char', 1);

    return this.http.get<RioCharacterStatsList>(this.getServiceBaseUrl(), {params});
  }

  getBattingStatsByCharacter(tags: string[]): Observable<RioCharacterStatsList> {
    let params = new HttpParams()
      .set('by_char', 1)
      .set('exclude_pitching', 1)
      .set('exclude_fielding', 1)
      .set('exclude_misc', 1);
    tags.forEach((tag: string) => {params = params.append('tag', tag)});

    return this.http.get<RioCharacterStatsList>(this.getServiceBaseUrl(), {params});
  }

  getBattingStatsForUserByCharacter(username: string, tags: string[]): Observable<RioCharacterStatsList> {
    let params = new HttpParams()
      .set('by_char', 1)
      .set('exclude_pitching', 1)
      .set('exclude_fielding', 1)
      .set('exclude_misc', 1)
      .set('username', username);
    tags.forEach((tag: string) => {params = params.append('tag', tag)});

    return this.http.get<RioCharacterStatsList>(this.getServiceBaseUrl(), {params});
  }

  getOverallBattingStatsByUser(tags: string[]): Observable<RioUserStatsList> {
    let params = new HttpParams()
      .set('by_user', 1)
      .set('exclude_pitching', 1)
      .set('exclude_fielding', 1)
      .set('exclude_misc', 1);
    tags.forEach((tag: string) => {params = params.append('tag', tag)});

    return this.http.get<RioCharacterStatsList>(this.getServiceBaseUrl(), {params});
  }

  getCharacterBattingStatsByUser(charId: number, tags: string[]): Observable<RioUserCharacterStatsList> {
    let params = new HttpParams()
      .set('by_user', 1)
      .set('char_id', charId)
      .set('exclude_pitching', 1)
      .set('exclude_fielding', 1)
      .set('exclude_misc', 1);
    tags.forEach((tag: string) => {params = params.append('tag', tag)});

    return this.http.get<RioUserCharacterStatsList>(this.getServiceBaseUrl(), {params});
  }

  private getServiceBaseUrl(): string {
    return 'https://projectrio-api-1.api.projectrio.app/detailed_stats';
  }
}
