/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgentwithdrawlComponent } from './Agentwithdrawl.component';

describe('AgentwithdrawlComponent', () => {
  let component: AgentwithdrawlComponent;
  let fixture: ComponentFixture<AgentwithdrawlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentwithdrawlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentwithdrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
