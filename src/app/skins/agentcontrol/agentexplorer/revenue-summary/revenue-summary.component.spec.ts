import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueSummaryComponent } from './revenue-summary.component';

describe('RevenueSummaryComponent', () => {
  let component: RevenueSummaryComponent;
  let fixture: ComponentFixture<RevenueSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
