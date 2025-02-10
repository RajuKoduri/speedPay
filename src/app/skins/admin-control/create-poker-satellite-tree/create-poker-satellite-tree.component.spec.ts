import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokerSatelliteTreeComponent } from './create-poker-satellite-tree.component';

describe('CreatePokerSatelliteTreeComponent', () => {
  let component: CreatePokerSatelliteTreeComponent;
  let fixture: ComponentFixture<CreatePokerSatelliteTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePokerSatelliteTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePokerSatelliteTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
