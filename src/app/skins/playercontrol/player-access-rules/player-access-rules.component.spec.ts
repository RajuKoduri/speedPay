import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAccessRulesComponent } from './player-access-rules.component';

describe('PlayerAccessRulesComponent', () => {
  let component: PlayerAccessRulesComponent;
  let fixture: ComponentFixture<PlayerAccessRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerAccessRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAccessRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
