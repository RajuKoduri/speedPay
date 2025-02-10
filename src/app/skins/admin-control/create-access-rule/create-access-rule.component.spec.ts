import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccessRuleComponent } from './create-access-rule.component';

describe('CreateAccessRuleComponent', () => {
  let component: CreateAccessRuleComponent;
  let fixture: ComponentFixture<CreateAccessRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccessRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccessRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
