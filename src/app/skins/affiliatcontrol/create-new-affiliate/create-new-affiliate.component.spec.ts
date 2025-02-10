import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAffiliateComponent } from './create-new-affiliate.component';

describe('CreateNewAffiliateComponent', () => {
  let component: CreateNewAffiliateComponent;
  let fixture: ComponentFixture<CreateNewAffiliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewAffiliateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewAffiliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
