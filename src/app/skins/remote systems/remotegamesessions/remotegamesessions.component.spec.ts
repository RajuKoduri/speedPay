import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotegamesessionsComponent } from './remotegamesessions.component';

describe('RemotegamesessionsComponent', () => {
  let component: RemotegamesessionsComponent;
  let fixture: ComponentFixture<RemotegamesessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemotegamesessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemotegamesessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
