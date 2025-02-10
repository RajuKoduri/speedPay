import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcagentexpensesComponent } from './acagentexpenses.component';

describe('AcagentexpensesComponent', () => {
  let component: AcagentexpensesComponent;
  let fixture: ComponentFixture<AcagentexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcagentexpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcagentexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
