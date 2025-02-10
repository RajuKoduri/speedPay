import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotesystemsgamesComponent } from './remotesystemsgames.component';

describe('RemotesystemsgamesComponent', () => {
  let component: RemotesystemsgamesComponent;
  let fixture: ComponentFixture<RemotesystemsgamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemotesystemsgamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemotesystemsgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
