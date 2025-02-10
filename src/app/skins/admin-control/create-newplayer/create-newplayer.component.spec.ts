import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewplayerComponent } from './create-newplayer.component';

describe('CreateNewplayerComponent', () => {
  let component: CreateNewplayerComponent;
  let fixture: ComponentFixture<CreateNewplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
