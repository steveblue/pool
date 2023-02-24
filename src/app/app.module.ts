import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketService } from './shared/service/market/market.service';
import { MarketStore } from './shared/state/market/market.store';
import { MarketModule } from './views/home/market.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MarketModule, AppRoutingModule],
  providers: [MarketService, MarketStore],
  bootstrap: [AppComponent],
})
export class AppModule {}
