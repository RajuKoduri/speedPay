import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCashAdjustmentComponent } from './player-cash-adjustment.component';

describe('PlayerCashAdjustmentComponent', () => {
  let component: PlayerCashAdjustmentComponent;
  let fixture: ComponentFixture<PlayerCashAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerCashAdjustmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCashAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
