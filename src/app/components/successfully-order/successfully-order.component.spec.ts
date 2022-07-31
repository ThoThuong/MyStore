import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullyOrderComponent } from './successfully-order.component';

describe('SuccessfullyOrderComponent', () => {
  let component: SuccessfullyOrderComponent;
  let fixture: ComponentFixture<SuccessfullyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfullyOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfullyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
