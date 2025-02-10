import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentaccessrulesComponent } from './agentaccessrules.component';

describe('AgentaccessrulesComponent', () => {
  let component: AgentaccessrulesComponent;
  let fixture: ComponentFixture<AgentaccessrulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentaccessrulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentaccessrulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
