import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatemailinglistComponent } from './affiliatemailinglist.component';

describe('AffiliatemailinglistComponent', () => {
  let component: AffiliatemailinglistComponent;
  let fixture: ComponentFixture<AffiliatemailinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliatemailinglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatemailinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
