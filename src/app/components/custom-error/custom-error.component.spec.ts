import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomErrorComponent } from './custom-error.component';

describe('CustomErrorComponent', () => {
  let component: CustomErrorComponent;
  let fixture: ComponentFixture<CustomErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomErrorComponent]
    });
    fixture = TestBed.createComponent(CustomErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
