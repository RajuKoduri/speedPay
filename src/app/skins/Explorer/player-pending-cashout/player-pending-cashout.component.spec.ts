import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPendingCashoutComponent } from './player-pending-cashout.component';

describe('PlayerPendingCashoutComponent', () => {
  let component: PlayerPendingCashoutComponent;
  let fixture: ComponentFixture<PlayerPendingCashoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPendingCashoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPendingCashoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
