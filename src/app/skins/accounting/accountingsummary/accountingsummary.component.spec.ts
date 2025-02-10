import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingsummaryComponent } from './accountingsummary.component';

describe('AccountingsummaryComponent', () => {
  let component: AccountingsummaryComponent;
  let fixture: ComponentFixture<AccountingsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingsummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
