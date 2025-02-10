import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentpermissiongroupsComponent } from './agentpermissiongroups.component';

describe('AgentpermissiongroupsComponent', () => {
  let component: AgentpermissiongroupsComponent;
  let fixture: ComponentFixture<AgentpermissiongroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentpermissiongroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentpermissiongroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
