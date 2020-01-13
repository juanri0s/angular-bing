import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BingMapService } from './bing-map.service';

@Injectable({
  providedIn: 'root'
})
export class BingLoadService {
  private loadPromise: Promise<void>;
  isMapSetup: Subject<boolean> = new Subject<boolean>();

  constructor(private bing: BingMapService) {
  }

  init(element: HTMLElement, options: Microsoft.Maps.IMapLoadOptions): void {
    const MAX_ATTEMPTS: number = 2;
    let attempts: number = 0;

    this.load().then(() => {
      this.bing.map = new Microsoft.Maps.Map(element, options);

      // Only need if you want pin infoboxes to show
      this.setInitialInfobox();

      this.isMapSetup.next(true);
    }).catch(() => {
      attempts++;
      if (attempts < MAX_ATTEMPTS) {
        console.log('Initial map load failed, retrying one more time.');
        this.load().then(() => {
          this.bing.map = new Microsoft.Maps.Map(element, options);
          // Only need if you want pin infoboxes to show
          this.setInitialInfobox();

          this.isMapSetup.next(true);
        });
      } else {
        console.log('Max load attempts achieved. Try refreshing.');
      }
    });
  }

  setInitialInfobox() {
    this.bing.infobox = new Microsoft.Maps.Infobox(this.bing.map.getCenter(), {
      title: 'pushpins',
      showCloseButton: true,
      description: 'description',
      visible: false
    });

    this.bing.infobox.setMap(this.bing.map);
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
        return resolve();
      };
      script.onerror = (error: Event) => {
        console.error('maps script error' + error);
        throw reject(error);
      };
    });

    document.body.appendChild(script);

    return this.loadPromise;
  }
}
