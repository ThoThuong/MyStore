import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderProduct, Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  orderProduct!: OrderProduct;

  product!: Product;
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((paramMap: any) => {
        const productId = paramMap.get('id')
        return this.productService.get(productId);
      })
    ).subscribe(
      (data: any) => {
        this.product = data;
        this.orderProduct = {
          ...this.product, orderQuantity: 1
        }
      },
      (error) => {
        console.info(error);
        this.router.navigate(["error-page"]);
      }

    )

  }

  order(): void {
    this.productService.addToCart(this.orderProduct);
    alert(`Your Shopping cart has been updated successfully.`);
  }
}
