import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuccessModalComponent } from './order-success-modal.component';

describe('OrderSuccessModalComponent', () => {
  let component: OrderSuccessModalComponent;
  let fixture: ComponentFixture<OrderSuccessModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSuccessModalComponent]
    });
    fixture = TestBed.createComponent(OrderSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
