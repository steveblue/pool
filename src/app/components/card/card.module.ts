import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { InputModule } from '../input/input.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, ButtonModule, InputModule],
  exports: [CardComponent],
})
export class CardModule {}
