import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BingMapService } from './bing-map.service';
import { HttpClient } from '@angular/common/http';

describe('BingMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [],
    providers: [BingMapService, HttpClient]
  }));

  it('should be created', () => {
    const service: BingMapService = TestBed.get(BingMapService);
    expect(service).toBeTruthy();
  });
});
