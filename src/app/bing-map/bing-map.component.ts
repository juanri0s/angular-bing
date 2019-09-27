// tslint:disable-next-line:no-reference
/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.d.ts" />
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BingMapService} from '../bing-map.service';

@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.css'],
  providers: [BingMapService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BingMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() height: number;
  @ViewChild('bingMap', {static: true}) bingMap: ElementRef;
  private CITIES_PATH: string = 'assets/json/cities.json';
  private jsonReq: any;
  private mapReq: any;
  private cities: Array<City> = [];
  private pins: Array<any> = [];

  constructor(private http: HttpClient, private bing: BingMapService) {
  }

  ngOnInit(): void {
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

  generateMap(): void {
    // only subscribe if we don't have the map initialized yet
    if (!this.bing.map) {
      this.mapReq = this.bing.isMapSetup.subscribe(map => {
        if (map) {
          this.jsonReq = this.getJSON().subscribe((cities: Array<City>) => {
            this.cities = cities;
            this.createPins(cities);
          });
        }
      });
    } else {
      this.jsonReq = this.getJSON().subscribe((cities: Array<City>) => {
        this.cities = cities;
        this.createPins(cities);
      });
    }
  }

  createPins(cities: Array<City>): void {
    // make sure there aren't already pins on the map
    if (this.bing.map.entities.getLength() === 0) {
      for (const city of Object.values(cities)) {
        const coord = new Microsoft.Maps.Location(city.latitude, city.longitude);
        const pin = new Microsoft.Maps.Pushpin(coord, {
          title: city.state,
        });

        this.pins.push(pin);
      }

      this.setPins(this.pins);
    }
  }

  setPins(pin: any): void {
    this.bing.map.entities.push(pin);
  }

  clearPins(): void {
    for (let i = this.bing.map.entities.getLength() - 1; i >= 0; i--) {
      const pin = this.bing.map.entities.get(i);

      // If there are polylines we need to clear them too
      if (pin instanceof Microsoft.Maps.Polyline) {
        this.bing.map.entities.removeAt(i);
      }

      if (pin instanceof Microsoft.Maps.Pushpin) {
        this.bing.map.entities.removeAt(i);
      }
    }
  }

  connectPins(): void {
    if (this.bing.map.entities.getLength() !== 0) {
      let coordA: any;
      let coordB: any;
      const numStates = 50;
      // tslint:disable-next-line:forin
      for (const key in this.cities) {
        if (Number(key) === numStates - 1) {
          return;
        }

        const city = this.cities[key];
        const nextCity = this.cities[Number(key) + 1];

        // coordA will be the first point, coordB will be the 2nd point, and then
        // coordB will become coordA for the next iteration
        if (!coordA && !coordB) {
          coordA = new Microsoft.Maps.Location(city.latitude, city.longitude);
          coordB = new Microsoft.Maps.Location(nextCity.latitude, nextCity.longitude);
        }

        coordA = coordB;
        coordB = new Microsoft.Maps.Location(nextCity.latitude, nextCity.longitude);

        const coords = [coordA, coordB];

        const line = new Microsoft.Maps.Polyline(coords, {
          strokeColor: 'red',
          strokeThickness: 3,
          strokeDashArray: [4, 4]
        });

        this.bing.map.entities.push(line);
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
