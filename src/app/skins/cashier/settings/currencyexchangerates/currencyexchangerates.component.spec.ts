import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyexchangeratesComponent } from './currencyexchangerates.component';

describe('CurrencyexchangeratesComponent', () => {
  let component: CurrencyexchangeratesComponent;
  let fixture: ComponentFixture<CurrencyexchangeratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyexchangeratesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyexchangeratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
