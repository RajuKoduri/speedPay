import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPermissionGroupsComponent } from './player-permission-groups.component';

describe('PlayerPermissionGroupsComponent', () => {
  let component: PlayerPermissionGroupsComponent;
  let fixture: ComponentFixture<PlayerPermissionGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPermissionGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPermissionGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
