import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmadjustmentsComponent } from './tmadjustments.component';

describe('TmadjustmentsComponent', () => {
  let component: TmadjustmentsComponent;
  let fixture: ComponentFixture<TmadjustmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmadjustmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TmadjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
