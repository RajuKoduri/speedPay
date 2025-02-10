import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerPersonalInformationComponent } from './player-personal-information.component';

describe('PlayerPersonalInformationComponent', () => {
  let component: PlayerPersonalInformationComponent;
  let fixture: ComponentFixture<PlayerPersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerPersonalInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
