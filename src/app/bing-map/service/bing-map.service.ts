import {Injectable} from '@angular/core';
import {City} from '../city';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pin} from '../pin';

@Injectable({
  providedIn: 'root'
})
export class BingMapService {

  private CITIES_PATH: string = 'assets/json/cities.json';
  public jsonReq: any;
  public mapReq: any;
  public map: Microsoft.Maps.Map;
  public cities: Array<City> = [];
  public pins: Array<Microsoft.Maps.Pushpin> = [];

  constructor(private http: HttpClient) {
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.CITIES_PATH);
  }

  createPins(cities: Array<City>): void {
    // make sure there aren't already pins on the map
    if (this.map.entities.getLength() === 0) {
      for (const city of Object.values(cities)) {
        const coord = new Microsoft.Maps.Location(city.latitude, city.longitude);
        const pin = new Microsoft.Maps.Pushpin(coord, {
          title: city.state,
        });

        this.pins.push(pin);
      }

      this.map.entities.push(this.pins);
    }
  }

  placePins(): void {
    if (this.map.entities.getLength() === 0) {
      this.createPins(this.cities);
    }
  }

  clearPins(): void {
    for (let i = this.map.entities.getLength() - 1; i >= 0; i--) {
      const pin = this.map.entities.get(i);

      // If there are polylines we need to clear them too
      if (pin instanceof Microsoft.Maps.Polyline) {
        this.map.entities.removeAt(i);
      }

      if (pin instanceof Microsoft.Maps.Pushpin) {
        this.map.entities.removeAt(i);
      }
    }
  }

  connectPins(): void {
    if (this.map.entities.getLength() !== 0) {
      let coordA: Microsoft.Maps.Location;
      let coordB: Microsoft.Maps.Location;
      const numStates: number = 48;
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

        const coords: Array<Microsoft.Maps.Location> = [coordA, coordB];

        const line = new Microsoft.Maps.Polyline(coords, {
          strokeColor: 'red',
          strokeThickness: 3,
          strokeDashArray: [4, 4]
        });

        this.map.entities.push(line);
      }
    }
  }

  zoomOnPin(pin: Pin): void {
    const pinCoord = new Microsoft.Maps.Location(pin.latitude, pin.longitude);

    if (this.map.entities.getLength() !== 0) {
      this.map.setView({bounds: Microsoft.Maps.LocationRect.fromLocations(pinCoord)});
    }
  }

  zoomOnPins(pins: Array<Pin>): void {
    const pinCoords: Array<Microsoft.Maps.Location> = [];

    if (this.map.entities.getLength() !== 0) {
      for (const pin of pins) {
        pinCoords.push(new Microsoft.Maps.Location(pin.latitude, pin.longitude));
      }

      this.map.setView({bounds: Microsoft.Maps.LocationRect.fromLocations(pinCoords)});
    }
  }

}
