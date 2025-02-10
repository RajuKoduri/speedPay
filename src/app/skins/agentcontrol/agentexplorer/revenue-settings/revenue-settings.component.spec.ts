import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueSettingsComponent } from './revenue-settings.component';

describe('RevenueSettingsComponent', () => {
  let component: RevenueSettingsComponent;
  let fixture: ComponentFixture<RevenueSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
