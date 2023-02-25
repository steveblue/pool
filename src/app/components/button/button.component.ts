import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() content: string;
  @Output() onPress = new EventEmitter<MouseEvent | KeyboardEvent>();
  constructor() {}
  onClick(ev: MouseEvent) {
    this.onPress.emit(ev);
  }
}
