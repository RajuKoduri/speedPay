import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyexchangesComponent } from './currencyexchanges.component';

describe('CurrencyexchangesComponent', () => {
  let component: CurrencyexchangesComponent;
  let fixture: ComponentFixture<CurrencyexchangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyexchangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyexchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
