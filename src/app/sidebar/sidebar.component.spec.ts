import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { ToggleComponent } from '../toggle/toggle.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent, ToggleComponent],
      providers: [HttpClient, HttpHandler]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be visible', () => {
    const sidebar = fixture.debugElement.query(By.css('.sidebar')).nativeElement;
    expect(sidebar).toBeDefined();
  });

  it('should have as title "angular-bing"', () => {
    const appTitle = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(appTitle.textContent).toBe('angular-bing');
  });

  it('should have five toggles', () => {
    const toggles = fixture.debugElement.queryAll(By.css('app-toggle'));
    expect(toggles.length).toEqual(5);
  });

  it('should have five buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toEqual(5);
  });
});
