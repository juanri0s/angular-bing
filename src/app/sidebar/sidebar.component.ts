import {Component, OnInit} from '@angular/core';
import {BingMapService} from '../bing-map/service/bing-map.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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
    this.bing.connectPins();
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
    this.bing.hideInfobox();
  }

  /**
   * changePinIcon changes the icon for all pins in the pin layer
   */
  changePinIcon(): void {
    this.bing.changePinIcon();
  }

  /**
   * changePinColor takes in a color string and changes the color for all pins in the pin layer to that color
   */
  changePinColor(color: string): void {
    this.bing.changePinColor(color);
  }

  /**
   * changeInfoboxTemplate applies a different html template for infoboxes in the current pin layer
   */
  changeInfoboxTemplate(): void {
    this.bing.changeInfoboxTemplate();
  }

}
