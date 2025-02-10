import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsMonitoringComponent } from './tournaments-monitoring.component';

describe('TournamentsMonitoringComponent', () => {
  let component: TournamentsMonitoringComponent;
  let fixture: ComponentFixture<TournamentsMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentsMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
