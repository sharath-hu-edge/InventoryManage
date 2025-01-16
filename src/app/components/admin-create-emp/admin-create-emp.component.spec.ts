import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateEmpComponent } from './admin-create-emp.component';

describe('AdminCreateEmpComponent', () => {
  let component: AdminCreateEmpComponent;
  let fixture: ComponentFixture<AdminCreateEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateEmpComponent]
    });
    fixture = TestBed.createComponent(AdminCreateEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
