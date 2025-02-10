import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedtransactionComponent } from './detailedtransaction.component';

describe('DetailedtransactionComponent', () => {
  let component: DetailedtransactionComponent;
  let fixture: ComponentFixture<DetailedtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedtransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
