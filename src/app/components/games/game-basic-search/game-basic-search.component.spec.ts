import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBasicSearchComponent } from './game-basic-search.component';

describe('GameSearchComponent', () => {
  let component: GameBasicSearchComponent;
  let fixture: ComponentFixture<GameBasicSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameBasicSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameBasicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
