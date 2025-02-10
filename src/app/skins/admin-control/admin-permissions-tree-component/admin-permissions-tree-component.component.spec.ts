import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionsTreeComponentComponent } from './admin-permissions-tree-component.component';

describe('AdminPermissionsTreeComponentComponent', () => {
  let component: AdminPermissionsTreeComponentComponent;
  let fixture: ComponentFixture<AdminPermissionsTreeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPermissionsTreeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionsTreeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
