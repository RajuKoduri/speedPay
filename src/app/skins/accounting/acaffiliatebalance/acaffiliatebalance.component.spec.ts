import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaffiliatebalanceComponent } from './acaffiliatebalance.component';

describe('AcaffiliatebalanceComponent', () => {
  let component: AcaffiliatebalanceComponent;
  let fixture: ComponentFixture<AcaffiliatebalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcaffiliatebalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaffiliatebalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
