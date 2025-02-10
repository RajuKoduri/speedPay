import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerManualDepositComponent } from './player-manual-deposit.component';

describe('PlayerManualDepositComponent', () => {
  let component: PlayerManualDepositComponent;
  let fixture: ComponentFixture<PlayerManualDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerManualDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerManualDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
