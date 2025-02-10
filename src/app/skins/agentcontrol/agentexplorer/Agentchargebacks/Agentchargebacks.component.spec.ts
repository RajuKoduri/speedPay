/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgentchargebacksComponent } from './Agentchargebacks.component';

describe('AgentchargebacksComponent', () => {
  let component: AgentchargebacksComponent;
  let fixture: ComponentFixture<AgentchargebacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentchargebacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentchargebacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
