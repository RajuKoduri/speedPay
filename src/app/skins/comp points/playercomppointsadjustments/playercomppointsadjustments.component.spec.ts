import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayercomppointsadjustmentsComponent } from './playercomppointsadjustments.component';

describe('PlayercomppointsadjustmentsComponent', () => {
  let component: PlayercomppointsadjustmentsComponent;
  let fixture: ComponentFixture<PlayercomppointsadjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayercomppointsadjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayercomppointsadjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
