import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentregistrationsettingsComponent } from './agentregistrationsettings.component';

describe('AgentregistrationsettingsComponent', () => {
  let component: AgentregistrationsettingsComponent;
  let fixture: ComponentFixture<AgentregistrationsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentregistrationsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentregistrationsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
