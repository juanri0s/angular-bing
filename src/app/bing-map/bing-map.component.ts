// tslint:disable-next-line:no-reference
/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.d.ts" />
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BingLoadService } from './service/bing-load.service';
import { BingMapService } from './service/bing-map.service';
import { State } from './state';

@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.css'],
  providers: [BingLoadService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BingMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() height: number;
  @ViewChild('bingMap', { static: true }) bingMap: ElementRef;

  constructor(private bing: BingMapService, private bingLoader: BingLoadService) {
  }

  ngOnInit(): void {
    this.getMap();
  }

  ngAfterViewInit(): void {
    this.generateMap();
  }

  private getMap(): void {
    this.bingLoader.init(this.bingMap.nativeElement, {
      credentials: 'key.keyValue',
      liteMode: true,
      showDashboard: true,
      showZoomButtons: true,
      disableBirdseye: true,
      disableStreetside: true,
      showLocateMeButton: false,
      enableClickableLogo: false,
      zoom: 4
    });
  }

  generateMap(): void {
    // only subscribe if we don't have the map initialized yet
    if (!this.bing.map) {
      this.bing.mapReq = this.bingLoader.isMapSetup.subscribe(map => {
        if (map) {
          this.bing.jsonReq = this.bing.getJSON().subscribe((cities: Array<State>) => {
            this.bing.states = cities;
            this.bing.createPins(cities);
          });
        }
      });
    } else {
      this.bing.jsonReq = this.bing.getJSON().subscribe((cities: Array<State>) => {
        this.bing.states = cities;
        this.bing.createPins(cities);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.bing.jsonReq) {
      this.bing.jsonReq.unsubscribe();
    }

    if (this.bing.mapReq) {
      this.bing.mapReq.unsubscribe();
    }
  }
}
