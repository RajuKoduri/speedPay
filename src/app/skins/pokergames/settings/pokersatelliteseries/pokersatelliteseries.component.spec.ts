import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokersatelliteseriesComponent } from './pokersatelliteseries.component';

describe('PokersatelliteseriesComponent', () => {
  let component: PokersatelliteseriesComponent;
  let fixture: ComponentFixture<PokersatelliteseriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokersatelliteseriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokersatelliteseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
