import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerBattingSearchComponent } from './player-batting-search.component';

describe('PlayerBattingSearchComponent', () => {
  let component: PlayerBattingSearchComponent;
  let fixture: ComponentFixture<PlayerBattingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerBattingSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerBattingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
