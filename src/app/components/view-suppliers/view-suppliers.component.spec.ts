import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSuppliersComponent } from './view-suppliers.component';

describe('ViewSuppliersComponent', () => {
  let component: ViewSuppliersComponent;
  let fixture: ComponentFixture<ViewSuppliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSuppliersComponent]
    });
    fixture = TestBed.createComponent(ViewSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
