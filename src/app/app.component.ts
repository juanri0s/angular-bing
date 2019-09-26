import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'NG Bing';
  height: number;

  ngOnInit(): void {
    this.height = window.innerHeight;
  }
}
