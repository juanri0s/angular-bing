import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pin} from '../pin';
import {City} from '../city';

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
  public infobox: any;
  private NUM_STATES: number = 8;

  constructor(private http: HttpClient) {
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.CITIES_PATH);
  }

  setInfobox() {
    this.infobox = new Microsoft.Maps.Infobox(this.map.getCenter(), {
      visible: false
    });

    this.infobox.setMap(this.map);
  }

  createPins(cities: Array<City>): void {
    // If you plan on having infoboxes, set an instance of it when we first create the pines
    this.setInfobox();

    // make sure there aren't already pins on the map
    if (this.map.entities.getLength() === 0) {
      for (const city of Object.values(cities)) {
        const coord = new Microsoft.Maps.Location(city.latitude, city.longitude);
        const pin = new Microsoft.Maps.Pushpin(coord, {
          title: city.state,
        });

        this.pins.push(pin);

        Microsoft.Maps.Events.addHandler(pin, 'click', (e) => {
          this.pinClicked(e);
        });
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
      // tslint:disable-next-line:forin
      for (const key in this.cities) {
        if (Number(key) === this.NUM_STATES - 1) {
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

  pinClicked(e) {
    if (e.target) {
      this.infobox.setOptions({
        location: e.target,
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        visible: true
      });
    }
  }

  showInfobox(e) {

  }

  showInfoboxes(): void {
    if (this.map.entities.getLength() !== 0) {
      for (const city of Object.values(this.cities)) {
        const coord = new Microsoft.Maps.Location(city.latitude, city.longitude);

        const infobox = new Microsoft.Maps.Infobox(coord, {
          title: 'Map Center',
          description: 'Seattle'
        });

        infobox.setMap(this.map);
      }
    }
  }

}
