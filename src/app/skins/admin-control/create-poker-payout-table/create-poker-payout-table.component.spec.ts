import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokerPayoutTableComponent } from './create-poker-payout-table.component';

describe('CreatePokerPayoutTableComponent', () => {
  let component: CreatePokerPayoutTableComponent;
  let fixture: ComponentFixture<CreatePokerPayoutTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePokerPayoutTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePokerPayoutTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
