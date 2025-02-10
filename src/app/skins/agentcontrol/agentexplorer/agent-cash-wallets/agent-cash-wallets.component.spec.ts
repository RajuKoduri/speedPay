import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCashWalletsComponent } from './agent-cash-wallets.component';

describe('AgentCashWalletsComponent', () => {
  let component: AgentCashWalletsComponent;
  let fixture: ComponentFixture<AgentCashWalletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentCashWalletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentCashWalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
