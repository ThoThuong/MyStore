import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderProduct, Product } from 'src/app/models/product';

@Component({
  selector: '[app-product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  orderProduct!: OrderProduct;
  @Input() product!: Product;
  @Output() productOrdered = new EventEmitter<OrderProduct>();

  constructor() { }

  ngOnInit(): void {
    this.orderProduct = { ...this.product, orderQuantity: 1 };
  }

  order(): void {
    this.productOrdered.emit(this.orderProduct);
    alert(`Your Shopping cart has been updated successfully.`);
  }

}
