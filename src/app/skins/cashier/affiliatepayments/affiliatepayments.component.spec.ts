import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatepaymentsComponent } from './affiliatepayments.component';

describe('AffiliatepaymentsComponent', () => {
  let component: AffiliatepaymentsComponent;
  let fixture: ComponentFixture<AffiliatepaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliatepaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
