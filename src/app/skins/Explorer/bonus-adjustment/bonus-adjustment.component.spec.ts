import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusAdjustmentComponent } from './bonus-adjustment.component';

describe('BonusAdjustmentComponent', () => {
  let component: BonusAdjustmentComponent;
  let fixture: ComponentFixture<BonusAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusAdjustmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
