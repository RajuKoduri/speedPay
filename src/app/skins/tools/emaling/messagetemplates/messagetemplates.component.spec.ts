import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagetemplatesComponent } from './messagetemplates.component';

describe('MessagetemplatesComponent', () => {
  let component: MessagetemplatesComponent;
  let fixture: ComponentFixture<MessagetemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagetemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagetemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
