import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotinolcodeusagesComponent } from './promotinolcodeusages.component';

describe('PromotinolcodeusagesComponent', () => {
  let component: PromotinolcodeusagesComponent;
  let fixture: ComponentFixture<PromotinolcodeusagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotinolcodeusagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotinolcodeusagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
