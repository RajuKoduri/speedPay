import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueAdjustmentsComponent } from './revenue-adjustments.component';

describe('RevenueAdjustmentsComponent', () => {
  let component: RevenueAdjustmentsComponent;
  let fixture: ComponentFixture<RevenueAdjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueAdjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
