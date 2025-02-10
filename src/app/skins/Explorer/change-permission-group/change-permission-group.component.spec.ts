import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePermissionGroupComponent } from './change-permission-group.component';

describe('ChangePermissionGroupComponent', () => {
  let component: ChangePermissionGroupComponent;
  let fixture: ComponentFixture<ChangePermissionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePermissionGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePermissionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
