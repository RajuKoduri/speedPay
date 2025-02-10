import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayercashadjustmentsComponent } from './playercashadjustments.component';

describe('PlayercashadjustmentsComponent', () => {
  let component: PlayercashadjustmentsComponent;
  let fixture: ComponentFixture<PlayercashadjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayercashadjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayercashadjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
