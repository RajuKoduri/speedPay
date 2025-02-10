import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositbonussettingsComponent } from './depositbonussettings.component';

describe('DepositbonussettingsComponent', () => {
  let component: DepositbonussettingsComponent;
  let fixture: ComponentFixture<DepositbonussettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositbonussettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositbonussettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
