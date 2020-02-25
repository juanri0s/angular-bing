import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BingMapComponent } from './bing-map.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BingLoadService } from './service/bing-load.service';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BingMapComponent', () => {
  let component: BingMapComponent;
  let fixture: ComponentFixture<BingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BingMapComponent, AppComponent],
      providers: [BingLoadService, HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
