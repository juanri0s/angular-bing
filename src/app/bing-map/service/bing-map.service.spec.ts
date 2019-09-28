import { TestBed } from '@angular/core/testing';

import { BingMapService } from './bing-map.service';

describe('BingMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BingMapService = TestBed.get(BingMapService);
    expect(service).toBeTruthy();
  });
});
