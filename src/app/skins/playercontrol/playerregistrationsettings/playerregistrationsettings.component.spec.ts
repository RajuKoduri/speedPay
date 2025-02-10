import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerregistrationsettingsComponent } from './playerregistrationsettings.component';

describe('PlayerregistrationsettingsComponent', () => {
  let component: PlayerregistrationsettingsComponent;
  let fixture: ComponentFixture<PlayerregistrationsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerregistrationsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerregistrationsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
