import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationReponseComponent } from './creation-reponse.component';

describe('CreationReponseComponent', () => {
  let component: CreationReponseComponent;
  let fixture: ComponentFixture<CreationReponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationReponseComponent]
    });
    fixture = TestBed.createComponent(CreationReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
