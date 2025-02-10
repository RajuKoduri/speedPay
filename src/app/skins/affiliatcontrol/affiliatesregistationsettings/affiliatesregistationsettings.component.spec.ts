import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatesregistationsettingsComponent } from './affiliatesregistationsettings.component';

describe('AffiliatesregistationsettingsComponent', () => {
  let component: AffiliatesregistationsettingsComponent;
  let fixture: ComponentFixture<AffiliatesregistationsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliatesregistationsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatesregistationsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
