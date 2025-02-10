import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPersonalInfoComponent } from './agent-personal-info.component';

describe('AgentPersonalInfoComponent', () => {
  let component: AgentPersonalInfoComponent;
  let fixture: ComponentFixture<AgentPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentPersonalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
