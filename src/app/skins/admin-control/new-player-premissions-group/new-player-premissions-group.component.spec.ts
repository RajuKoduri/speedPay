import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlayerPremissionsGroupComponent } from './new-player-premissions-group.component';

describe('NewPlayerPremissionsGroupComponent', () => {
  let component: NewPlayerPremissionsGroupComponent;
  let fixture: ComponentFixture<NewPlayerPremissionsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPlayerPremissionsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlayerPremissionsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
