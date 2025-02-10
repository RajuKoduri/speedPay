import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitpermissionComponent } from './exitpermission.component';

describe('ExitpermissionComponent', () => {
  let component: ExitpermissionComponent;
  let fixture: ComponentFixture<ExitpermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitpermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
