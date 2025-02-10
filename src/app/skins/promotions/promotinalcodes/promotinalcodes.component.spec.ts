import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotinalcodesComponent } from './promotinalcodes.component';

describe('PromotinalcodesComponent', () => {
  let component: PromotinalcodesComponent;
  let fixture: ComponentFixture<PromotinalcodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotinalcodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotinalcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
