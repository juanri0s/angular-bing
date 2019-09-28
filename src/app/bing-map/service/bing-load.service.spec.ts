import { TestBed } from '@angular/core/testing';

import { BingLoadService } from './bing-load.service';

describe('BingMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BingLoadService = TestBed.get(BingLoadService);
    expect(service).toBeTruthy();
  });
});
