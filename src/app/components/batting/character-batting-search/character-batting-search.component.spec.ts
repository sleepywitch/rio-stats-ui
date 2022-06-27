import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterBattingSearchComponent } from './character-batting-search.component';

describe('CharacterBattingSearchComponent', () => {
  let component: CharacterBattingSearchComponent;
  let fixture: ComponentFixture<CharacterBattingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterBattingSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterBattingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
