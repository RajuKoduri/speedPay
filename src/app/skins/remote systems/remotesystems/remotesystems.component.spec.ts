import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteSystemComponent } from './remotesystems.component';

describe('RemotesystemsComponent', () => {
  let component: RemoteSystemComponent;
  let fixture: ComponentFixture<RemoteSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
