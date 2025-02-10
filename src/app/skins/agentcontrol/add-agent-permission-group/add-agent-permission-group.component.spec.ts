import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentPermissionGroupComponent } from './add-agent-permission-group.component';

describe('AddAgentPermissionGroupComponent', () => {
  let component: AddAgentPermissionGroupComponent;
  let fixture: ComponentFixture<AddAgentPermissionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAgentPermissionGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgentPermissionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
