import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from '../button/button.module';
import { InputModule } from '../input/input.module';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [ButtonModule, InputModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the card', () => {
    expect(component).toBeTruthy();
  });
});
