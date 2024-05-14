import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChoixThemeAdminComponent} from './choix-theme-admin.component';

describe('ChoixThemeAdminComponent', () => {
  let component: ChoixThemeAdminComponent;
  let fixture: ComponentFixture<ChoixThemeAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoixThemeAdminComponent]
    });
    fixture = TestBed.createComponent(ChoixThemeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
