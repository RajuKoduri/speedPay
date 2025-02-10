import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentrevenueadjustmentsComponent } from './agentrevenueadjustments.component';

describe('AgentrevenueadjustmentsComponent', () => {
  let component: AgentrevenueadjustmentsComponent;
  let fixture: ComponentFixture<AgentrevenueadjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentrevenueadjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentrevenueadjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
