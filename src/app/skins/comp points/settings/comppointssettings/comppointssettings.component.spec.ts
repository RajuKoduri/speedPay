import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComppointssettingsComponent } from './comppointssettings.component';

describe('ComppointssettingsComponent', () => {
  let component: ComppointssettingsComponent;
  let fixture: ComponentFixture<ComppointssettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComppointssettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComppointssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
