import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  isConfirmed = false;
  total = 0
  orderProducts!: OrderProduct[];
  userOrderForm!: FormGroup;
  subscription: Subscription[] = [];
  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscription.push(this.productService.getCart().subscribe(
      (data) => {
        this.total = data.reduce((acc, v) => {
          acc += v.price * v.orderQuantity;
          return acc;
        }, 0);


        this.orderProducts = data;
        this.userOrderForm = this.fb.group(
          {
            fullname: ['', [Validators.required, Validators.minLength(3)]],
            address: ['', [Validators.required, Validators.minLength(6)]],
            creditCardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16,16}$')]],
          }
        )
      }));
  }


  updateCart(p: OrderProduct): void {

    let index = this.orderProducts.findIndex((p: any) => p?.id === p?.id);
    if (index >= 0) {
      this.orderProducts[index]['orderQuantity'] = p.orderQuantity;

      this.total = this.orderProducts.reduce((acc, v) => {

        acc += v.price * v.orderQuantity;
        return acc;
      }, 0);
    }

    setTimeout(() => {
      alert(`Your Shopping cart has been updated successfully.`);
    }, 50);
  }

  confirmOrder(): void {
    if (this.total > 0 && this.userOrderForm.valid) {
      this.isConfirmed = true;
    }
  }


  removeProductCart(id: string): void {
    this.orderProducts = this.orderProducts.filter(p => p.id !== id);
    setTimeout(() => {
      alert(`Your Shopping cart has been updated successfully.`);
    }, 50);
  }


  ngOnDestroy(): void {
    this.productService.updateCart(this.orderProducts);
    this.subscription.forEach(s => s.unsubscribe());

  }

}
