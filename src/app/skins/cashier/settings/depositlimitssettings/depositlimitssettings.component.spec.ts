import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositlimitssettingsComponent } from './depositlimitssettings.component';

describe('DepositlimitssettingsComponent', () => {
  let component: DepositlimitssettingsComponent;
  let fixture: ComponentFixture<DepositlimitssettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositlimitssettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositlimitssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
