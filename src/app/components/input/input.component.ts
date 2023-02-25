import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() type: string = 'text';
  @Output() onInput = new EventEmitter<Event>();
  @ViewChild('inputRef') inputRef: ElementRef;
  constructor() {}
  onChange(ev: Event) {
    this.onInput.emit(ev);
  }
  public clear() {
    this.inputRef.nativeElement.value = '';
  }
}
