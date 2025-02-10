import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentIpHistoryComponent } from './agent-ip-history.component';

describe('AgentIpHistoryComponent', () => {
  let component: AgentIpHistoryComponent;
  let fixture: ComponentFixture<AgentIpHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentIpHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentIpHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
