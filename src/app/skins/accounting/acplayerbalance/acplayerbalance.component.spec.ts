import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcplayerbalanceComponent } from './acplayerbalance.component';

describe('AcplayerbalanceComponent', () => {
  let component: AcplayerbalanceComponent;
  let fixture: ComponentFixture<AcplayerbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcplayerbalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcplayerbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
