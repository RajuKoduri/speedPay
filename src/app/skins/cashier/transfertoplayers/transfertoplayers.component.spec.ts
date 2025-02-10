import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertoplayersComponent } from './transfertoplayers.component';

describe('TransfertoplayersComponent', () => {
  let component: TransfertoplayersComponent;
  let fixture: ComponentFixture<TransfertoplayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertoplayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertoplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
