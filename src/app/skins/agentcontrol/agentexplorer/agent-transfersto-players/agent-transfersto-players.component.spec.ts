import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTransferstoPlayersComponent } from './agent-transfersto-players.component';

describe('AgentTransferstoPlayersComponent', () => {
  let component: AgentTransferstoPlayersComponent;
  let fixture: ComponentFixture<AgentTransferstoPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentTransferstoPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentTransferstoPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
