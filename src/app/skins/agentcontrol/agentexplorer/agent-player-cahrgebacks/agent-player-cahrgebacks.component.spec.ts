import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPlayerCahrgebacksComponent } from './agent-player-cahrgebacks.component';

describe('AgentPlayerCahrgebacksComponent', () => {
  let component: AgentPlayerCahrgebacksComponent;
  let fixture: ComponentFixture<AgentPlayerCahrgebacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentPlayerCahrgebacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPlayerCahrgebacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
