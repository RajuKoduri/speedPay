import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencieslistComponent } from './currencieslist.component';

describe('CurrencieslistComponent', () => {
  let component: CurrencieslistComponent;
  let fixture: ComponentFixture<CurrencieslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencieslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
