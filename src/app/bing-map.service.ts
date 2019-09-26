import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingMapService {
  public map: Microsoft.Maps.Map;
  private loadPromise: Promise<void>;
  isMapSetup: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  init(element: HTMLElement, options: Microsoft.Maps.IMapLoadOptions): void {
    this.load().then(() => {
      this.map = new Microsoft.Maps.Map(element, options);
      this.isMapSetup.next(true);
    });
  }

  private load(): Promise<void> {
    if (this.loadPromise) {
      return this.loadPromise;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;

    const mapsCallback = 'getMap';
    script.src = `https://www.bing.com/api/maps/mapcontrol?callback=${mapsCallback}`;

    // tslint:disable-next-line:ban-types
    this.loadPromise = new Promise<void>((resolve: Function, reject: Function) => {
      window[mapsCallback] = () => {
        resolve();
      };
      script.onerror = (error: Event) => {
        console.error('maps script error' + error);
        reject(error);
      };
    });

    document.body.appendChild(script);

    return this.loadPromise;
  }
}
