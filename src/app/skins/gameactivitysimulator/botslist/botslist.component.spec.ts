import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotslistComponent } from './botslist.component';

describe('BotslistComponent', () => {
  let component: BotslistComponent;
  let fixture: ComponentFixture<BotslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
