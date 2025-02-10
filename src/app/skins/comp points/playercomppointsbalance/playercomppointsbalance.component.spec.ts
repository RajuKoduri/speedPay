import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayercomppointsbalanceComponent } from './playercomppointsbalance.component';

describe('PlayercomppointsbalanceComponent', () => {
  let component: PlayercomppointsbalanceComponent;
  let fixture: ComponentFixture<PlayercomppointsbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayercomppointsbalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayercomppointsbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
