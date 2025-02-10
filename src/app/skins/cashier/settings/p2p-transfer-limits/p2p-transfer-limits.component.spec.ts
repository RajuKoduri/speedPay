import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pTransferLimitsComponent } from './p2p-transfer-limits.component';

describe('P2pTransferLimitsComponent', () => {
  let component: P2pTransferLimitsComponent;
  let fixture: ComponentFixture<P2pTransferLimitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2pTransferLimitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pTransferLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
