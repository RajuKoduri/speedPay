import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnsettingsComponent } from './earnsettings.component';

describe('EarnsettingsComponent', () => {
  let component: EarnsettingsComponent;
  let fixture: ComponentFixture<EarnsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarnsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
