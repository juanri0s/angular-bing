import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-item',
  template: `
      <div class="checkbox-container">
          <label class="container">{{ toggleText }}
              <input type="checkbox" role="checkbox" tabindex="0" (click)="toggleAction.emit('')">
              <span class="checkmark"></span>
          </label>
      </div>
  `,
  styleUrls: ['./toggle-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleItemComponent {
  @Input() toggleText;
  @Output() toggleAction = new EventEmitter();

}
