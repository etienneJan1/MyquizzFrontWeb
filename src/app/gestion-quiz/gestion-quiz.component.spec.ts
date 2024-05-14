import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionQuizComponent } from './gestion-quiz.component';

describe('GestionQuizComponent', () => {
  let component: GestionQuizComponent;
  let fixture: ComponentFixture<GestionQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionQuizComponent]
    });
    fixture = TestBed.createComponent(GestionQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
