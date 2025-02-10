import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfersummaryComponent } from './transfersummary.component';

describe('TransfersummaryComponent', () => {
  let component: TransfersummaryComponent;
  let fixture: ComponentFixture<TransfersummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfersummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfersummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
