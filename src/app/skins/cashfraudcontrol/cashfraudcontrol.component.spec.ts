import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashfraudcontrolComponent } from './cashfraudcontrol.component';

describe('CashfraudcontrolComponent', () => {
  let component: CashfraudcontrolComponent;
  let fixture: ComponentFixture<CashfraudcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashfraudcontrolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashfraudcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
