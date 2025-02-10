import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotiomprizepaymentsComponent } from './promotiomprizepayments.component';

describe('PromotiomprizepaymentsComponent', () => {
  let component: PromotiomprizepaymentsComponent;
  let fixture: ComponentFixture<PromotiomprizepaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotiomprizepaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotiomprizepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
