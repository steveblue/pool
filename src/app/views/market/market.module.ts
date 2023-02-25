import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketComponent } from './market.component';
import { MarketService } from 'src/app/shared/service/market/market.service';
import { MarketStore } from 'src/app/shared/state/market/market.store';
import { InputModule } from 'src/app/components/input/input.module';
import { ButtonModule } from 'src/app/components/button/button.module';
import { CardModule } from 'src/app/components/card/card.module';

@NgModule({
  declarations: [MarketComponent],
  imports: [CommonModule, CardModule, InputModule, ButtonModule],
  providers: [MarketService, MarketStore],
  exports: [MarketComponent],
})
export class MarketModule {}
