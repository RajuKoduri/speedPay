import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewAdministratorComponent } from './create-new-administrator.component';

describe('CreateNewAdministratorComponent', () => {
  let component: CreateNewAdministratorComponent;
  let fixture: ComponentFixture<CreateNewAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
