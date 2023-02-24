import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Store } from '../store';
import { MarketService } from '../../service/market/market.service';
import {
  FinnData,
  FinnMessage,
  StockValue,
  TradeConditionsMap,
} from './market.types';

export enum MarketActions {
  REPLACE = '[Market] Replace',
  FETCH = '[Market] Fetch',
}

export interface MarketAction {
  type: string;
  payload?: FinnMessage;
}

export class MarketState {
  market: Record<string, FinnMessage> = {};
}

function getLatestFinndata(input: Array<FinnData>): FinnData {
  return input.reverse()[0];
}

function sortFinnDataByUnixTimestamp(input: Array<FinnData>): Array<FinnData> {
  return input.sort((a, b) => {
    return a.t - b.t;
  });
}

function transformFinnDataToStockValue(input: FinnData): StockValue {
  return {
    conditions: input.c.map((condition) => TradeConditionsMap[condition]),
    lastPrice: input.p,
    symbol: input.s,
    timestamp: new Date(input.t * 1000),
    volume: input.v,
  };
}

@Injectable()
export class MarketStore extends Store implements OnDestroy {
  private readonly _destroy = new Subject<void>();
  public override state$: Observable<MarketState>;
  constructor(public service: MarketService) {
    super(new MarketState());
  }

  override reducer(state: MarketState, action?: MarketAction) {
    switch (action?.type) {
      case MarketActions.REPLACE:
        const sortedFinnDataArray = sortFinnDataByUnixTimestamp(
          action.payload?.data as FinnData[]
        );
        const lastTrade = getLatestFinndata(sortedFinnDataArray);
        const stockValue = transformFinnDataToStockValue(lastTrade);
        const updatedMarketState = {
          [stockValue.symbol]: stockValue,
        };
        return {
          ...state,
          market: {
            ...state.market,
            ...updatedMarketState,
          },
        };
      case MarketActions.FETCH:
        this.service
          .fetchRealTimeMarketData()
          .pipe(
            takeUntil(this._destroy),
            map((res) =>
              this.actions.emit({ type: MarketActions.REPLACE, payload: res })
            )
          )
          .subscribe();
        return state;
      default:
        return state;
    }
  }

  override ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
