import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertoagentsComponent } from './transfertoagents.component';

describe('TransfertoagentsComponent', () => {
  let component: TransfertoagentsComponent;
  let fixture: ComponentFixture<TransfertoagentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertoagentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertoagentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
