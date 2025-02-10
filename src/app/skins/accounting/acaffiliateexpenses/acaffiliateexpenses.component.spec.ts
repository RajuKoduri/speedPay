import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaffiliateexpensesComponent } from './acaffiliateexpenses.component';

describe('AcaffiliateexpensesComponent', () => {
  let component: AcaffiliateexpensesComponent;
  let fixture: ComponentFixture<AcaffiliateexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcaffiliateexpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaffiliateexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
