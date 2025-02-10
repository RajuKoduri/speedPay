import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatestatisticsComponent } from './affiliatestatistics.component';

describe('AffiliatestatisticsComponent', () => {
  let component: AffiliatestatisticsComponent;
  let fixture: ComponentFixture<AffiliatestatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliatestatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatestatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
