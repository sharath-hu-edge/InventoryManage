import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackGoodsComponent } from './track-goods.component';

describe('TrackGoodsComponent', () => {
  let component: TrackGoodsComponent;
  let fixture: ComponentFixture<TrackGoodsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackGoodsComponent]
    });
    fixture = TestBed.createComponent(TrackGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
