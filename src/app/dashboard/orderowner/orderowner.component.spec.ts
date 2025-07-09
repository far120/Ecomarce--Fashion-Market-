import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderownerComponent } from './orderowner.component';

describe('OrderownerComponent', () => {
  let component: OrderownerComponent;
  let fixture: ComponentFixture<OrderownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderownerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
