import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerHouseRevenueComponent } from './player-house-revenue.component';

describe('PlayerHouseRevenueComponent', () => {
  let component: PlayerHouseRevenueComponent;
  let fixture: ComponentFixture<PlayerHouseRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerHouseRevenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerHouseRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
