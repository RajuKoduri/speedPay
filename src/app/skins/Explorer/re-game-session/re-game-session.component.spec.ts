import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReGameSessionComponent } from './re-game-session.component';

describe('ReGameSessionComponent', () => {
  let component: ReGameSessionComponent;
  let fixture: ComponentFixture<ReGameSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReGameSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReGameSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
