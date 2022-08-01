import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderProduct, Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
const TEST = [
  {
    "id": "e88e1934-8f73-48c6-b3ac-9a899c2f9b07",
    "name": "Book",
    "price": 9.99,
    "url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "description": "You can read it!",
    "orderQuantity": 1
  },
  {
    "id": "ccf7bb23-6206-4753-a919-8fe797f8a236",
    "name": "Headphones",
    "price": 249.99,
    "url": "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "description": "Listen to stuff!",
    "orderQuantity": 1
  },
  {
    "id": "6b7ef38f-6be7-429f-b252-d136e6e4959b",
    "name": "Backpack",
    "price": 79.99,
    "url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "description": "Carry things around town!",
    "orderQuantity": 1
  },
  {
    "id": "4697e9df-d87d-4553-bfcc-da791e90897a",
    "name": "Glasses",
    "price": 129.99,
    "url": "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "description": "Now you can see!",
    "orderQuantity": 1
  },
  {
    "id": "3288d4c2-441d-4f6d-b053-d2c81764939a",
    "name": "Cup",
    "price": 4.99,
    "url": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "description": "Drink anything with it!",
    "orderQuantity": 1
  },
  {
    "id": "c7ad1fba-9b85-4238-8cc8-98b1c979a2eb",
    "name": "Shirt",
    "price": 29.99,
    "url": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80",
    "description": "Wear it with style!",
    "orderQuantity": 1
  }
]

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _endpoint = 'assets/data.json';
  private cart = new BehaviorSubject<OrderProduct[]>([]);
  cart$ = this.cart.asObservable();
  constructor(private http: HttpClient) { }

  get(id?: string, endpoint = this._endpoint): Observable<Product[] | Product | undefined> {
    return this.http.get<Product[] | Product>(endpoint).pipe(
      map((data: any) => {
        if (id) {
          const productRp = data.find((p: any) => p?.id === id);
          return productRp;
        }
        return data;
      })
    );
  }

  addToCart(product: OrderProduct): void {
    this.getCart().subscribe(
      (data) => {
        let products = data;
        let index = products.findIndex(p => p?.id === product?.id);
        if (index >= 0) {
          products[index]['orderQuantity'] = products[index]['orderQuantity'] + product.orderQuantity;
        } else {

          products = [...products, product];
        }
        this.cart.next(products);
      })
  }

  getCart(): Observable<OrderProduct[]> {
    return of(this.cart.value);
  }


  updateCart(products: OrderProduct[]): void {
    this.cart.next(products)
  }
}
