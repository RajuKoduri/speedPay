import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerbonusadjustmentsComponent } from './playerbonusadjustments.component';

describe('PlayerbonusadjustmentsComponent', () => {
  let component: PlayerbonusadjustmentsComponent;
  let fixture: ComponentFixture<PlayerbonusadjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerbonusadjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerbonusadjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
