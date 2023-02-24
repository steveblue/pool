import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  MarketActions,
  MarketStore,
} from 'src/app/shared/state/market/market.store';

@Component({
  selector: 'market-view',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],
})
export class MarketComponent {
  title = 'pool';
  private _destroy: Subject<void> = new Subject();
  constructor(public store: MarketStore) {
    this.store.actions.emit({ type: MarketActions.FETCH });
    this.store.state$.pipe(takeUntil(this._destroy)).subscribe((data) => {
      console.log(data);
    });
  }
  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
