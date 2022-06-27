import { TestBed } from '@angular/core/testing';

import { RioGamesService } from './rio-games.service';

describe('RioGamesService', () => {
  let service: RioGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RioGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
