import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargebacksComponent } from './chargebacks.component';

describe('ChargebacksComponent', () => {
  let component: ChargebacksComponent;
  let fixture: ComponentFixture<ChargebacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargebacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargebacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
