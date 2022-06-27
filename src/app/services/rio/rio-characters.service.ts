import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlatformLocation} from "@angular/common";
import {Observable} from "rxjs";


class CharacterList {
}

@Injectable({
  providedIn: 'root'
})
export class RioCharactersService {

  constructor(private http: HttpClient, private pl: PlatformLocation) { }

  getAllCharacterData(): Observable<CharacterList> {
    return this.http.get<CharacterList>(this.getServiceBaseUrl());
  }

  private getServiceBaseUrl(): string {
    return 'https://projectrio-api-1.api.projectrio.app/characters';
  }
}
