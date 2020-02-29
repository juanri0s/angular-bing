import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  template: `
      <div class="checkbox-container">
          <label class="container" [for]="toggleText" >{{ toggleText }}
              <input type="checkbox" role="checkbox" tabindex="0" (click)="onClick()">
              <span class="checkmark"></span>
          </label>
      </div>
  `,
  styleUrls: ['./toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent {
  @Input() toggleText: string;
  @Output() toggled = new EventEmitter();

  on: boolean;

  onClick(): void {
    this.on = !this.on;
    this.toggled.emit(this.on);
  }

}
