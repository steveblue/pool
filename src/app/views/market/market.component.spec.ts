import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardModule } from 'src/app/components/card/card.module';
import { MarketService } from 'src/app/shared/service/market/market.service';
import { MarketStore } from 'src/app/shared/state/market/market.store';
import { MarketComponent } from './market.component';

describe('MarketComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CardModule],
      declarations: [MarketComponent],
      providers: [MarketService, MarketStore],
    }).compileComponents();
  });

  it('should create the market view', () => {
    const fixture = TestBed.createComponent(MarketComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have empty stocks on load`, () => {
    const fixture = TestBed.createComponent(MarketComponent);
    const app = fixture.componentInstance;
    expect(app.stocks).toEqual([]);
  });

  it('should render an app-input', () => {
    const fixture = TestBed.createComponent(MarketComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-card')?.textContent).toContain('Add');
  });
});
