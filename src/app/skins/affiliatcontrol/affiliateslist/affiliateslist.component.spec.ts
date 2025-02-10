import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateslistComponent } from './affiliateslist.component';

describe('AffiliateslistComponent', () => {
  let component: AffiliateslistComponent;
  let fixture: ComponentFixture<AffiliateslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliateslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
