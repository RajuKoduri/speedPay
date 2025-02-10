import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentexplorerComponent } from './agentexplorer.component';

describe('AgentexplorerComponent', () => {
  let component: AgentexplorerComponent;
  let fixture: ComponentFixture<AgentexplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentexplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentexplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
