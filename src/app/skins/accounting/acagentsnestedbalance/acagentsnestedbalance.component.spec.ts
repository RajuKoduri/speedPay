import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcagentsnestedbalanceComponent } from './acagentsnestedbalance.component';

describe('AcagentsnestedbalanceComponent', () => {
  let component: AcagentsnestedbalanceComponent;
  let fixture: ComponentFixture<AcagentsnestedbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcagentsnestedbalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcagentsnestedbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
