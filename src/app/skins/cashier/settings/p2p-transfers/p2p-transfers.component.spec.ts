import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pTransfersComponent } from './p2p-transfers.component';

describe('P2pTransfersComponent', () => {
  let component: P2pTransfersComponent;
  let fixture: ComponentFixture<P2pTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2pTransfersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
