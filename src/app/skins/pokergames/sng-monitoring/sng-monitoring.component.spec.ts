import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SngMonitoringComponent } from './sng-monitoring.component';

describe('SngMonitoringComponent', () => {
  let component: SngMonitoringComponent;
  let fixture: ComponentFixture<SngMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SngMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SngMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
