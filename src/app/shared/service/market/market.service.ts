import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { tokens } from 'token';

const COINBASE_WS_API_HOSTNAME = `wss://ws.finnhub.io?token=${tokens.FINNHUB}`;

@Injectable()
export class MarketService {
  private _socket$: WebSocketSubject<any>;
  constructor() {
    this._socket$ = webSocket({
      url: COINBASE_WS_API_HOSTNAME,
    });
    this.subscribe('AAPL');
    this.subscribe('AMZN');
  }
  fetchRealTimeMarketData(): Observable<any[]> {
    return this._socket$;
  }
  sendMessage(msg: any) {
    this._socket$.next(msg);
  }
  subscribe(symbol: string) {
    this.sendMessage({ type: 'subscribe', symbol });
  }
  unsubscribe(symbol: string) {
    this.sendMessage({ type: 'unsubscribe', symbol });
  }
}
