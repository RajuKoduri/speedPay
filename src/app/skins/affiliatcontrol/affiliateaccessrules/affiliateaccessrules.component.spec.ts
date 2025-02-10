import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateaccessrulesComponent } from './affiliateaccessrules.component';

describe('AffiliateaccessrulesComponent', () => {
  let component: AffiliateaccessrulesComponent;
  let fixture: ComponentFixture<AffiliateaccessrulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliateaccessrulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateaccessrulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
