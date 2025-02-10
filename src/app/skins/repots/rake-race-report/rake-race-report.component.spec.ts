import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RakeRaceReportComponent } from './rake-race-report.component';

describe('RakeRaceReportComponent', () => {
  let component: RakeRaceReportComponent;
  let fixture: ComponentFixture<RakeRaceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RakeRaceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RakeRaceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
