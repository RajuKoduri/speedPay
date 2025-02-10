import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedreportslistComponent } from './requestedreportslist.component';

describe('RequestedreportslistComponent', () => {
  let component: RequestedreportslistComponent;
  let fixture: ComponentFixture<RequestedreportslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedreportslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedreportslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
