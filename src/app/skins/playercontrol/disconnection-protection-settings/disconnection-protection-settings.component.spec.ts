import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectionProtectionSettingsComponent } from './disconnection-protection-settings.component';

describe('DisconnectionProtectionSettingsComponent', () => {
  let component: DisconnectionProtectionSettingsComponent;
  let fixture: ComponentFixture<DisconnectionProtectionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisconnectionProtectionSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectionProtectionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
