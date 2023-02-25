import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MarketService } from 'src/app/shared/service/market/market.service';
import {
  MarketActions,
  MarketStore,
} from 'src/app/shared/state/market/market.store';
import { StockValue } from 'src/app/shared/state/market/market.types';

@Component({
  selector: 'market-view',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent {
  public stocks: StockValue[];
  private _destroy: Subject<void> = new Subject();
  constructor(public store: MarketStore, public service: MarketService) {
    this.store.actions.emit({ type: MarketActions.FETCH });
    this.store.state$.pipe(takeUntil(this._destroy)).subscribe((state) => {
      this.stocks = Object.keys(state.market).map((key) => state.market[key]);
    });
  }
  onNew(symbol: string) {
    this.service.subscribe(symbol);
  }
  onDelete(symbol: string) {
    this.store.actions.emit({ type: MarketActions.DELETE, payload: symbol });
    this.service.unsubscribe(symbol);
  }
  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
