import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BingMapService {
  public map: Microsoft.Maps.Map;
  private loadPromise: Promise<void>;

  constructor() {}

  init(element: HTMLElement, options: Microsoft.Maps.IMapLoadOptions): void {
    this.load().then(() => {
      this.map = new Microsoft.Maps.Map(element, options);
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

    const mapsCallback = 'bingMapsCallback';
    script.src = `https://www.bing.com/api/maps/mapcontrol?branch=release&clientApi=bingmapsfleettracker&callback=${mapsCallback}`;

    this.loadPromise = new Promise<
      void
      // tslint:disable-next-line:ban-types
      >((resolve: Function, reject: Function) => {
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
