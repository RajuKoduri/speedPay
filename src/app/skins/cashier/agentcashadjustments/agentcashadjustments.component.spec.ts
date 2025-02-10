import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentcashadjustmentsComponent } from './agentcashadjustments.component';

describe('AgentcashadjustmentsComponent', () => {
  let component: AgentcashadjustmentsComponent;
  let fixture: ComponentFixture<AgentcashadjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentcashadjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentcashadjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
