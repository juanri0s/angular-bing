import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BingMapComponent } from './bing-map/bing-map.component';
import { ToggleComponent } from './toggle/toggle.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SidebarComponent,
        BingMapComponent,
        ToggleComponent
      ],
      providers: [HttpClient, HttpHandler]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title "angular-bing"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-bing');
  });

  it('should set a height equal to window height', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const windowHeight = window.innerHeight;
    component.height = window.innerHeight;
    expect(component.height).toEqual(windowHeight);
  });
});
