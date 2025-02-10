import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCashAdjustmentComponent } from './agent-cash-adjustment.component';

describe('AgentCashAdjustmentComponent', () => {
  let component: AgentCashAdjustmentComponent;
  let fixture: ComponentFixture<AgentCashAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentCashAdjustmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentCashAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
