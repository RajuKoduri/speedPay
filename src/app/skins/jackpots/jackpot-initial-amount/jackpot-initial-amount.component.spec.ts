import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotInitialAmountComponent } from './jackpot-initial-amount.component';

describe('JackpotInitialAmountComponent', () => {
  let component: JackpotInitialAmountComponent;
  let fixture: ComponentFixture<JackpotInitialAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JackpotInitialAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotInitialAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
