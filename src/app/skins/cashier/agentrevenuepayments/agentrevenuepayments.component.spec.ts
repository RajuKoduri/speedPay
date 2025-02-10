import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentrevenuepaymentsComponent } from './agentrevenuepayments.component';

describe('AgentrevenuepaymentsComponent', () => {
  let component: AgentrevenuepaymentsComponent;
  let fixture: ComponentFixture<AgentrevenuepaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentrevenuepaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentrevenuepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
