import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoserlistComponent } from './loserlist.component';

describe('LoserlistComponent', () => {
  let component: LoserlistComponent;
  let fixture: ComponentFixture<LoserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoserlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
