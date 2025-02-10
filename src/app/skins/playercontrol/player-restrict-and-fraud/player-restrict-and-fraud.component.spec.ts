import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRestrictAndFraudComponent } from './player-restrict-and-fraud.component';

describe('PlayerRestrictAndFraudComponent', () => {
  let component: PlayerRestrictAndFraudComponent;
  let fixture: ComponentFixture<PlayerRestrictAndFraudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerRestrictAndFraudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerRestrictAndFraudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
