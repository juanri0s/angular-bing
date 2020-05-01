import { TestBed } from '@angular/core/testing';
import { BingLoadService } from './bing-load.service';
import { BingMapService } from './bing-map.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BingLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [],
    providers: [BingMapService, HttpClient]
  }));

  it('should be created', () => {
    const service: BingLoadService = TestBed.get(BingLoadService);
    expect(service).toBeTruthy();
  });
});
