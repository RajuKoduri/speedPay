import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pReferringSettingsComponent } from './p2p-referring-settings.component';

describe('P2pReferringSettingsComponent', () => {
  let component: P2pReferringSettingsComponent;
  let fixture: ComponentFixture<P2pReferringSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2pReferringSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pReferringSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
