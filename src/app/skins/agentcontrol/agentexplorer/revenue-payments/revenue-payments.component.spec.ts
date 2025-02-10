import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuePaymentsComponent } from './revenue-payments.component';

describe('RevenuePaymentsComponent', () => {
  let component: RevenuePaymentsComponent;
  let fixture: ComponentFixture<RevenuePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenuePaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
