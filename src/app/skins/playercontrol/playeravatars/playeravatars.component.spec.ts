import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayeravatarsComponent } from './playeravatars.component';

describe('PlayeravatarsComponent', () => {
  let component: PlayeravatarsComponent;
  let fixture: ComponentFixture<PlayeravatarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayeravatarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayeravatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
