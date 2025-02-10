import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokerSatelliteSeriesComponent } from './create-poker-satellite-series.component';

describe('CreatePokerSatelliteSeriesComponent', () => {
  let component: CreatePokerSatelliteSeriesComponent;
  let fixture: ComponentFixture<CreatePokerSatelliteSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePokerSatelliteSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePokerSatelliteSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
