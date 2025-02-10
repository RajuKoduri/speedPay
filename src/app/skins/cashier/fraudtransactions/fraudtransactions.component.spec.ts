import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudtransactionsComponent } from './fraudtransactions.component';

describe('FraudtransactionsComponent', () => {
  let component: FraudtransactionsComponent;
  let fixture: ComponentFixture<FraudtransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FraudtransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FraudtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
