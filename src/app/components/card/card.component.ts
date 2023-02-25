import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { validateStockSymbol } from 'src/app/shared/service/market/market.utils';
import { StockValue } from 'src/app/shared/state/market/market.types';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() stockValue: StockValue;
  @Output() onNewSymbol = new EventEmitter<string>();
  @Output() onDeleteSymbol = new EventEmitter<string>();
  @ViewChild(InputComponent) inputComponent: InputComponent;
  public symbol: string;
  public error: string | null;
  constructor() {}
  onChange(ev: Event) {
    this.error = null;
    this.symbol = (ev.target as HTMLInputElement)?.value;
  }
  onAdd(ev: MouseEvent | KeyboardEvent) {
    validateStockSymbol(this.symbol)
      .then((symbol) => {
        this.onNewSymbol.emit(symbol as string);
        this.inputComponent.clear();
      })
      .catch((error) => {
        this.error = error.message;
      });
  }
  onDelete(symbol: string) {
    this.onDeleteSymbol.emit(symbol);
  }
}
