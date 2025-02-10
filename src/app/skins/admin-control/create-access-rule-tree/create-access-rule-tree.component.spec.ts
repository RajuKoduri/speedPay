import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccessRuleTreeComponent } from './create-access-rule-tree.component';

describe('CreateAccessRuleTreeComponent', () => {
  let component: CreateAccessRuleTreeComponent;
  let fixture: ComponentFixture<CreateAccessRuleTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccessRuleTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccessRuleTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
