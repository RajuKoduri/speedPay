import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoutsettingsComponent } from './timeoutsettings.component';

describe('TimeoutsettingsComponent', () => {
  let component: TimeoutsettingsComponent;
  let fixture: ComponentFixture<TimeoutsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeoutsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeoutsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
