import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotFeeComponent } from './jackpot-fee.component';

describe('JackpotFeeComponent', () => {
  let component: JackpotFeeComponent;
  let fixture: ComponentFixture<JackpotFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JackpotFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
