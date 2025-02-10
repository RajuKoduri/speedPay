import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliaterevenueadjustmentsComponent } from './affiliaterevenueadjustments.component';

describe('AffiliaterevenueadjustmentsComponent', () => {
  let component: AffiliaterevenueadjustmentsComponent;
  let fixture: ComponentFixture<AffiliaterevenueadjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliaterevenueadjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliaterevenueadjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
