import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pin} from '../pin';
import {State} from '../state';

@Injectable({
  providedIn: 'root'
})
export class BingMapService {

  private STATES_PATH: string = 'assets/json/states.json';
  private ICON_PATH: string = 'assets/icons/pin.png';
  private NUM_STATES: number = 8;
  private doPinsExist: boolean = false;

  public jsonReq: any;
  public mapReq: any;
  public map: Microsoft.Maps.Map;
  public states: Array<State> = [];
  public pins: Array<Microsoft.Maps.Pushpin> = [];
  public infobox: Microsoft.Maps.Infobox;

  constructor(private http: HttpClient) {
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.STATES_PATH);
  }

  createPins(states: Array<State>): void {
    // make sure there aren't already pins on the map
    if (!this.doPinsExist) {
      for (const state of Object.values(states)) {
        const coord = new Microsoft.Maps.Location(state.latitude, state.longitude);
        let pin = new Microsoft.Maps.Pushpin(coord, null);

        // Only need if you want pin infoboxes to show
        pin = this.setPinInfo(pin, coord, state);

        this.pins.push(pin);
      }

      this.map.entities.push(this.pins);

      if (this.map.entities.getLength() > 0) {
        this.doPinsExist = true;
      }
    }
  }

  placePins(): void {
    if (!this.doPinsExist) {
      this.createPins(this.states);
    }
  }

  clearPins(): void {
    // normally you would loop through the existing pins and change the icon
    if (this.doPinsExist) {
      for (let i = this.map.entities.getLength() - 1; i >= 0; i--) {
        const pin = this.map.entities.get(i);

        // If there are polylines we need to clear them too
        if (pin instanceof Microsoft.Maps.Polyline) {
          this.map.entities.removeAt(i);
        }

        if (this.infobox) {
          this.hideInfobox();
          this.infobox.setMap(null);
        }

        if (pin instanceof Microsoft.Maps.Pushpin) {
          this.map.entities.removeAt(i);
          this.pins = [];
        }
      }

      this.doPinsExist = false;
    }
  }

  resetInfobox(): void {
    document.getElementById('custom-infobox').remove();
    this.infobox.setOptions({
      htmlContent: ''
    });
  }

  connectPins(): void {
    if (this.doPinsExist) {
      let coordA: Microsoft.Maps.Location;
      let coordB: Microsoft.Maps.Location;
      // tslint:disable-next-line:forin
      for (const key in this.states) {
        if (Number(key) === this.NUM_STATES - 1) {
          return;
        }

        const state = this.states[key];
        const nextState = this.states[Number(key) + 1];

        // coordA will be the first point, coordB will be the 2nd point, and then
        // coordB will become coordA for the next iteration
        if (coordA && coordB) {
          coordA = coordB;
          coordB = new Microsoft.Maps.Location(nextState.latitude, nextState.longitude);
        } else {
          coordA = new Microsoft.Maps.Location(state.latitude, state.longitude);
          coordB = new Microsoft.Maps.Location(nextState.latitude, nextState.longitude);
        }

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

    if (this.doPinsExist) {
      this.map.setView({bounds: Microsoft.Maps.LocationRect.fromLocations(pinCoord)});
    }
  }

  zoomOnPins(pins: Array<Pin>): void {
    const pinCoords: Array<Microsoft.Maps.Location> = [];

    if (this.doPinsExist) {
      for (const pin of pins) {
        pinCoords.push(new Microsoft.Maps.Location(pin.latitude, pin.longitude));
      }

      this.map.setView({bounds: Microsoft.Maps.LocationRect.fromLocations(pinCoords)});
    }
  }

  setPinInfo(pin: Microsoft.Maps.Pushpin, coord: Microsoft.Maps.Location, state: State): Microsoft.Maps.Pushpin {
    pin.metadata = {
      title: state.state,
      description: `Lat: ${state.latitude}, Long: ${state.longitude}`,
      location: coord,
      visible: false
    };

    Microsoft.Maps.Events.addHandler(pin, 'click', (e) => {
      this.pinClicked(e);
    });

    this.infobox.setMap(this.map);

    return pin;
  }

  hideInfobox(): void {
    this.infobox.setOptions({
      visible: false
    });
  }

  pinClicked(e) {
    if (e.target.metadata) {
      this.infobox.setOptions({
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        location: e.target.metadata.location,
        visible: true
      });
    }
  }

  changePinColor(col: string): void {
    for (const pin of this.pins) {
      pin.setOptions({
        color: col
      });
    }
  }

  changePinIcon(): void {
    for (const pin of this.pins) {
      pin.setOptions({
        icon: this.ICON_PATH
      });
    }
  }

  changeInfoboxTemplate(): void {
    // tslint:disable-next-line:max-line-length
    const infoboxTemplate = '<div id="custom-infobox" class="custom-infobox"><b class="custom-infobox-title">{title}</b><a class="custom-infobox-description">{description}</a></div>\n';

    this.infobox.setOptions({
      htmlContent: infoboxTemplate.replace('{title}', 'myTitle').replace('{description}', 'myDescription')
    });
  }

}
