import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketComponent } from './market.component';
import { MarketService } from 'src/app/shared/service/market/market.service';
import { MarketStore } from 'src/app/shared/state/market/market.store';

@NgModule({
  declarations: [MarketComponent],
  imports: [CommonModule],
  providers: [MarketService, MarketStore],
  exports: [MarketComponent],
})
export class MarketModule {}
