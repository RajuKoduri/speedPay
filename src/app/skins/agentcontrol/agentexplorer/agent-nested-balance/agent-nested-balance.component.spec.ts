import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNestedBalanceComponent } from './agent-nested-balance.component';

describe('AgentNestedBalanceComponent', () => {
  let component: AgentNestedBalanceComponent;
  let fixture: ComponentFixture<AgentNestedBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentNestedBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentNestedBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
