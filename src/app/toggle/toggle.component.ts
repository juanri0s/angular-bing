import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  template: `
      <div class="checkbox-container" >
          <label class="container" [for]="toggleText" (click)="onClick()" >{{ toggleText }}
            <input type="checkbox" role="checkbox" tabindex="0" >
            <span class="checkmark"></span>
          </label>
      </div>
  `,
  styleUrls: ['./toggle.component.css'],
})
export class ToggleComponent {
  @Input() toggleText: string;
  @Output() toggled: EventEmitter<any> = new EventEmitter();

  on: boolean;

  onClick() {
    this.on = !this.on;
    this.toggled.emit(this.on);
  }

}
