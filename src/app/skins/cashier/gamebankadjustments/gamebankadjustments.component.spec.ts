import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamebankadjustmentsComponent } from './gamebankadjustments.component';

describe('GamebankadjustmentsComponent', () => {
  let component: GamebankadjustmentsComponent;
  let fixture: ComponentFixture<GamebankadjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamebankadjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamebankadjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
