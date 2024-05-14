import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationQuestionComponent } from './creation-question.component';

describe('CreationQuestionComponent', () => {
  let component: CreationQuestionComponent;
  let fixture: ComponentFixture<CreationQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationQuestionComponent]
    });
    fixture = TestBed.createComponent(CreationQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
