import { TestBed } from '@angular/core/testing';

import { RioCharactersService } from './rio-characters.service';

describe('RioCharactersService', () => {
  let service: RioCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RioCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
