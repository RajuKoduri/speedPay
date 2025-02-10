import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFAQCategoryComponent } from './add-faq-category.component';

describe('AddFAQCategoryComponent', () => {
  let component: AddFAQCategoryComponent;
  let fixture: ComponentFixture<AddFAQCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFAQCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFAQCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
