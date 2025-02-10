import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferedAgentsComponent } from './reffered-agents.component';

describe('RefferedAgentsComponent', () => {
  let component: RefferedAgentsComponent;
  let fixture: ComponentFixture<RefferedAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefferedAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferedAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
