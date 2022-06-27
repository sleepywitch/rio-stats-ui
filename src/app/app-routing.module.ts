import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./components/layout/layout/layout.component";
import {GameListComponent} from "./components/games/game-list/game-list.component";
import {GameBasicSearchComponent} from "./components/games/game-basic-search/game-basic-search.component";
import {
  CharacterBattingSearchComponent
} from "./components/batting/character-batting-search/character-batting-search.component";
import {PlayerBattingSearchComponent} from "./components/batting/player-batting-search/player-batting-search.component";

const APP_ROUTES: Routes = [
  {path: 'games-basic', component: GameBasicSearchComponent},
  {path: 'batting-character', component: CharacterBattingSearchComponent},
  {path: 'batting-player', component: PlayerBattingSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
