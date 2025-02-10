import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayercomppointsexchangeComponent } from './playercomppointsexchange.component';

describe('PlayercomppointsexchangeComponent', () => {
  let component: PlayercomppointsexchangeComponent;
  let fixture: ComponentFixture<PlayercomppointsexchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayercomppointsexchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayercomppointsexchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
