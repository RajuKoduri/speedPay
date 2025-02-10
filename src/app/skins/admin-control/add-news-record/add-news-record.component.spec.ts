import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsRecordComponent } from './add-news-record.component';

describe('AddNewsRecordComponent', () => {
  let component: AddNewsRecordComponent;
  let fixture: ComponentFixture<AddNewsRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewsRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
