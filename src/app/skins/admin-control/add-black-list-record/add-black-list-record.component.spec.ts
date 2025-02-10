import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlackListRecordComponent } from './add-black-list-record.component';

describe('AddBlackListRecordComponent', () => {
  let component: AddBlackListRecordComponent;
  let fixture: ComponentFixture<AddBlackListRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBlackListRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlackListRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
