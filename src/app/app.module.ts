import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BingMapComponent } from './bing-map/bing-map.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToggleComponent } from './toggle/toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    BingMapComponent,
    SidebarComponent,
    ToggleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
