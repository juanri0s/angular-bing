import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BingMapComponent} from './bing-map/bing-map.component';
import {HttpClientModule} from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToggleItemComponent } from './toggle-item/toggle-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BingMapComponent,
    SidebarComponent,
    ToggleItemComponent
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
