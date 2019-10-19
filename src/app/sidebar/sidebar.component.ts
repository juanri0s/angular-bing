import {Component, OnInit} from '@angular/core';
import {BingMapService} from '../bing-map/service/bing-map.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isPinsConnected: boolean = false;
  isIconsChanged: boolean = false;
  isInfoboxChanged: boolean = false;
  isInfoboxShowing: boolean = false;
  toggleData: any = [
    {
      toggleText: 'Connect Pins',
      toggleAction: 'connectPins'
    },
    {
      toggleText: 'Change Infobox Design',
      toggleAction: 'this.changeInfoboxTemplate()'
    },
    {
      toggleText: 'Hide Infobox',
      toggleAction: 'this.hideInfobox()'
    },
    {
      toggleText: 'Change Pin Icon',
      toggleAction: 'this.changePinIcon()'
    },
  ];

  constructor(private bing: BingMapService) {
  }

  ngOnInit() {
  }

  /**
   * placePins applies a default pin layer to the map
   */
  placePins(): void {
    this.bing.placePins();
  }

  /**
   * clearPins clears the current pin layer along with any infoboxes/colors/icons
   */
  clearPins(): void {
    this.bing.clearPins();
  }

  /**
   * connectPins connects each pin together in the pin current pin layer
   */
  connectPins(): void {
    console.log(this.isPinsConnected);
    if (!this.isPinsConnected) {
      this.bing.connectPins();
      this.isPinsConnected = true;
    } else {
      this.clearPins();
      this.placePins();
      this.isPinsConnected = false;
    }
  }

  /**
   * zoomOnPin takes in a pin and zooms in on it on the map
   */
  zoomOnPin(): void {
    // this.bing.zoomOnPin();
  }

  /**
   * zoomOnPins takes in an array of pins and zooms in to the boundary area on the map
   */
  zoomOnPins(): void {
    // this.bing.zoomOnPins();
  }

  /**
   * showInfobox activates infoboxes for all pins in the pin layer
   */
  showInfobox(): void {
    // send pin
    this.bing.pinClicked(2);
  }

  /**
   * hideInfobox hides all infoboxes in the pin layer
   */
  hideInfobox(): void {
    if (this.isInfoboxShowing) {
      this.isInfoboxShowing = false;
      this.clearPins();
      this.placePins();
    } else {
      this.isInfoboxShowing = true;
      this.bing.hideInfobox();
    }
  }

  /**
   * changePinIcon changes the icon for all pins in the pin layer
   */
  changePinIcon(): void {
    if (this.isIconsChanged) {
      this.isIconsChanged = false;
      this.clearPins();
      this.placePins();
    } else {
      this.isIconsChanged = true;
      this.bing.changePinIcon();
    }
  }

  /**
   * changePinColor takes in a color string and changes the color for all pins in the pin layer to that color
   */
  changePinColor(color: string): void {
    if (this.isIconsChanged) {
      this.isIconsChanged = false;
      this.clearPins();
      this.placePins();
    } else {
      this.isIconsChanged = true;
      this.bing.changePinColor(color);
    }
  }

  /**
   * changeInfoboxTemplate applies a different html template for infoboxes in the current pin layer
   */
  changeInfoboxTemplate(): void {
    if (this.isIconsChanged) {
      this.isInfoboxChanged = false;
      this.clearPins();
      this.placePins();
    } else {
      this.isInfoboxChanged = true;
      this.bing.changeInfoboxTemplate();
    }
  }

}
