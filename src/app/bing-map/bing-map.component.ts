// tslint:disable-next-line:no-reference
/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.d.ts" />
import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BingMapService} from '../bing-map.service';

@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.css'],
  providers: [BingMapService]
})
export class BingMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() height: number;
  @ViewChild('bingMap', {static: true}) bingMap: ElementRef;
  private CITIES_PATH: string = 'assets/json/cities.json';
  private jsonReq: any;
  private mapReq: any;

  constructor(private http: HttpClient, private bing: BingMapService) {
  }

  ngOnInit() {
    this.getMap();
  }

  ngAfterViewInit(): void {
    this.generateMap();
  }

  private getMap(): void {
    this.bing.init(this.bingMap.nativeElement, {
      credentials: 'key.keyValue',
      showDashboard: true,
      showZoomButtons: true,
      disableBirdseye: true,
      disableStreetside: true,
      showLocateMeButton: false,
      enableClickableLogo: false,
      zoom: 4
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.CITIES_PATH);
  }

  generateMap() {
    // only subscribe if we don't have the map initialized yet
    if (!this.bing.map) {
      this.mapReq = this.bing.isMapSetup.subscribe(map => {
        if (map) {
          this.jsonReq = this.getJSON().subscribe((cities: Array<City>) => {
            this.createPins(cities);
          });
        }
      });
    } else {
      this.jsonReq = this.getJSON().subscribe((cities: Array<City>) => {
        this.createPins(cities);
      });
    }
  }

  createPins(cities: Array<City>): void {
    // make sure there aren't already pins on the map
    if (this.bing.map.entities.getLength() === 0) {
      for (const city of Object.values(cities)) {
        const center = new Microsoft.Maps.Location(city.latitude, city.longitude);
        const pin = new Microsoft.Maps.Pushpin(center, {
          title: city.state,
        });

        this.setPins(pin);
      }
    }
  }

  setPins(pin: any) {
    this.bing.map.entities.push(pin);
  }

  clearPins() {
    for (let i = this.bing.map.entities.getLength() - 1; i >= 0; i--) {
      const pin = this.bing.map.entities.get(i);
      if (pin instanceof Microsoft.Maps.Pushpin) {
        this.bing.map.entities.removeAt(i);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.jsonReq) {
      this.jsonReq.unsubscribe();
    }

    if (this.mapReq) {
      this.mapReq.unsubscribe();
    }
  }

}

interface City {
  state: string;
  latitude: number;
  longitude: number;
}
