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

  placePins(): void {
    this.bing.placePins();
  }

  clearPins(): void {
    this.bing.clearPins();
  }

  connectPins(): void {
    this.bing.connectPins();
  }

  zoomOnPin(): void {
    // this.bing.zoomOnPin();
  }

  zoomOnPins(): void {
    // this.bing.zoomOnPins();
  }

  showInfobox(): void {
    // send pin
    this.bing.pinClicked(2);
  }

  hideInfobox(): void {
    this.bing.hideInfobox();
  }

  changePinIcon(): void {
    this.bing.changePinIcon();
  }

  changePinColor(color: string): void {
    this.bing.changePinColor(color);
  }

}
