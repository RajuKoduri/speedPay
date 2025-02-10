import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoIPListComponent } from './geo-ip-list.component';

describe('GeoIPListComponent', () => {
  let component: GeoIPListComponent;
  let fixture: ComponentFixture<GeoIPListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoIPListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoIPListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
