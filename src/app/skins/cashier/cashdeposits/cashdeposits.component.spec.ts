import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashdepositsComponent } from './cashdeposits.component';

describe('CashdepositsComponent', () => {
  let component: CashdepositsComponent;
  let fixture: ComponentFixture<CashdepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashdepositsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashdepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
