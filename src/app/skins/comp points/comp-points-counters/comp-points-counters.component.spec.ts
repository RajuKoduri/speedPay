import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompPointsCountersComponent } from './comp-points-counters.component';

describe('CompPointsCountersComponent', () => {
  let component: CompPointsCountersComponent;
  let fixture: ComponentFixture<CompPointsCountersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompPointsCountersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompPointsCountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
