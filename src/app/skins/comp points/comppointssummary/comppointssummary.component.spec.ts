import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComppointssummaryComponent } from './comppointssummary.component';

describe('ComppointssummaryComponent', () => {
  let component: ComppointssummaryComponent;
  let fixture: ComponentFixture<ComppointssummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComppointssummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComppointssummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
