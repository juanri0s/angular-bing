// tslint:disable-next-line:no-reference
/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.d.ts" />
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BingMapService} from '../bing-map.service';

@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.css'],
  providers: [BingMapService]
})
export class BingMapComponent implements OnInit, AfterViewInit {
  map: Microsoft.Maps.Map;
  @ViewChild('bingMap', {static: false}) bingMap: ElementRef;

  constructor(private bingMapService: BingMapService) {
  }

  ngAfterViewInit() {
    this.bingMapService.init(this.bingMap.nativeElement, {
      credentials: 'key.keyValue',
      showDashboard: true,
      showZoomButtons: true,
      disableBirdseye: true,
      disableStreetside: true,
      showLocateMeButton: false,
      enableClickableLogo: false
    });

    this.map = this.bingMapService.map;
  }

  ngOnInit() {
  }

  toggleFullScreen() {
  }

  clearPins() {
  }

  setPins() {

  }

  loadPinData() {

  }

  resetPins() {

  }


}
