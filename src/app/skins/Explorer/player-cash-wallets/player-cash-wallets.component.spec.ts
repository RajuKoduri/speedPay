import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCashWalletsComponent } from './player-cash-wallets.component';

describe('PlayerCashWalletsComponent', () => {
  let component: PlayerCashWalletsComponent;
  let fixture: ComponentFixture<PlayerCashWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerCashWalletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCashWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
