import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletexchangessettingsComponent } from './walletexchangessettings.component';

describe('WalletexchangessettingsComponent', () => {
  let component: WalletexchangessettingsComponent;
  let fixture: ComponentFixture<WalletexchangessettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletexchangessettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletexchangessettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
