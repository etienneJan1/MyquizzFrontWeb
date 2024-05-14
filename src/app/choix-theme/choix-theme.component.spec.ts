import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixThemeComponent } from './choix-theme.component';

describe('ChoixThemeComponent', () => {
  let component: ChoixThemeComponent;
  let fixture: ComponentFixture<ChoixThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoixThemeComponent]
    });
    fixture = TestBed.createComponent(ChoixThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
