import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentstatisticsComponent } from './agentstatistics.component';

describe('AgentstatisticsComponent', () => {
  let component: AgentstatisticsComponent;
  let fixture: ComponentFixture<AgentstatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentstatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentstatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
