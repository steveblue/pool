import { Observable, BehaviorSubject, from, Subscription } from 'rxjs';
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';

export interface AbstractAction {
  type: string;
  payload?: any;
}

export interface AbstractState {
  [key: string]: any;
}

@Injectable()
export abstract class Store implements OnDestroy {
  private _pipe$: Subscription;
  private _state$: BehaviorSubject<AbstractState>;
  public state$: Observable<AbstractState>;
  public actions: EventEmitter<any> = new EventEmitter();
  public debug = false;
  public debugProp: string | null = null;

  protected constructor(initialState: AbstractState) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable() as Observable<AbstractState>;
    this._pipe$ = from(this.actions)
      .pipe(
        map((a: AbstractAction) => this.reducer(this.state, a)),
        map((s: AbstractState) => this.setState(s))
      )
      .subscribe();
  }

  get state(): AbstractState {
    return this._state$.getValue();
  }

  setState(nextState: AbstractState): void {
    this.next(nextState);
  }

  log(abstractState: AbstractState) {
    console.log(`STATE: ${abstractState}`);
  }

  reducer(state: AbstractState, action?: AbstractAction) {
    return state;
  }

  next(nextState?: AbstractState) {
    this._state$.next(nextState || this.state);
    if (this.debug === true) {
      if (this.debugProp) {
        this.log(this.state[this.debugProp]);
      } else {
        this.log(this.state);
      }
    }
  }

  ngOnDestroy() {
    this._pipe$.unsubscribe();
  }
}
