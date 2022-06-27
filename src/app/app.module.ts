import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { GameListComponent } from './components/games/game-list/game-list.component';
import {DatePipe} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgModule} from "@angular/core";
import { GameBasicSearchComponent } from './components/games/game-basic-search/game-basic-search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import { CharacterDataListComponent } from './components/character-data/character-data-list/character-data-list.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RankedFilterWidgetComponent } from './components/widgets/ranked-filter-widget/ranked-filter-widget.component';
import { SuperstarsFilterWidgetComponent } from './components/widgets/superstars-filter-widget/superstars-filter-widget.component';
import { CharacterBattingSearchComponent } from './components/batting/character-batting-search/character-batting-search.component';
import { BattingListComponent } from './components/batting/batting-list/batting-list.component';
import { PlayerBattingSearchComponent } from './components/batting/player-batting-search/player-batting-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    GameListComponent,
    GameBasicSearchComponent,
    CharacterDataListComponent,
    RankedFilterWidgetComponent,
    SuperstarsFilterWidgetComponent,
    CharacterBattingSearchComponent,
    BattingListComponent,
    PlayerBattingSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
