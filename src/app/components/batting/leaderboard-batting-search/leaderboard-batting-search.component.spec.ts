import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardBattingSearchComponent } from './leaderboard-batting-search.component';

describe('LeaderboardBattingSearchComponent', () => {
  let component: LeaderboardBattingSearchComponent;
  let fixture: ComponentFixture<LeaderboardBattingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardBattingSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardBattingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
