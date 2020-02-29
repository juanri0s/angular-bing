/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.d.ts" />
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BingMapComponent } from './bing-map.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BingLoadService } from './service/bing-load.service';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';

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
    component.height = window.innerHeight;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set map height equal to window height', () => {
    const windowHeight = window.innerHeight;
    expect(component.height).toEqual(windowHeight);
  });

  it('should create map container in dom', () => {
    const mapContainer = fixture.debugElement.query(By.css('#mapContainer'));
    expect(mapContainer).toBeDefined();
  });
});
