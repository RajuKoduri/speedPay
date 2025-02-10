import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsettingsComponent } from './merchantsettings.component';

describe('MerchantsettingsComponent', () => {
  let component: MerchantsettingsComponent;
  let fixture: ComponentFixture<MerchantsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
