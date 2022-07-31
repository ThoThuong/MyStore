import { Component, OnInit } from '@angular/core';
import { OrderProduct, Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  constructor(private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.productService.get().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: unknown) => {
        console.info(error);
        // redirect to error page
      }
    )
  }

  order(orderProduct: any): void {

    this.productService.addToCart(orderProduct)
  }

}
