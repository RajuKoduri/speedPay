import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentManualDepositComponent } from './agent-manual-deposit.component';

describe('AgentManualDepositComponent', () => {
  let component: AgentManualDepositComponent;
  let fixture: ComponentFixture<AgentManualDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentManualDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentManualDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
