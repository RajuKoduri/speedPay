import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTransferstoAgentsComponent } from './agent-transfersto-agents.component';

describe('AgentTransferstoAgentsComponent', () => {
  let component: AgentTransferstoAgentsComponent;
  let fixture: ComponentFixture<AgentTransferstoAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentTransferstoAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentTransferstoAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
