import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderProduct, Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = []
  products!: Product[];
  constructor(private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.subscription.push(this.productService.get().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: unknown) => {
        console.info(error);
        // redirect to error page
      }
    ))
  }

  order(orderProduct: any): void {
    this.productService.addToCart(orderProduct)
  }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

}
