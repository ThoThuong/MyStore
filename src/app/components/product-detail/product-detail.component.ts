import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { OrderProduct, Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  orderProduct!: OrderProduct;
  subscription: Subscription[] = [];
  product!: Product;
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.subscription.push(this.route.paramMap.pipe(
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

    ))

  }

  order(): void {
    this.productService.addToCart(this.orderProduct);
    setTimeout(() => {
      alert(`Your Shopping cart has been updated successfully.`);
    }, 50);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }
}
