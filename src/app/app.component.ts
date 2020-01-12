import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <div class="sidebar">
          <app-sidebar></app-sidebar>
      </div>
      <div class="map">
          <app-bing-map [height]="height"></app-bing-map>
      </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'angular-bing';
  height: number;

  ngOnInit(): void {
    this.height = window.innerHeight;
  }
}
