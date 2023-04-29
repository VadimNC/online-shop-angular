import {ProductsService} from './../../services/products.service';
import {Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProducts} from "../models/products";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {
  basket!: IProducts[];
  basketSubscription!: Subscription;

  constructor(private ProductsService: ProductsService) {
  }

  ngOnInit(): void {
    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  minusItemFromBasket(item: IProducts) {
    if (item.quantity === 1) {
      this.ProductsService.deleteProductFromBasket(item.id).subscribe(() => {
        let idx = this.basket.findIndex((data) => data.id === item.id);
        this.basket.splice(idx, 1);
      });
    } else {
      item.quantity -= 1;
      this.ProductsService.updateProductToBasket(item).subscribe((data) => {
      });
    }

  }

  plusItemFromBasket(item: IProducts) {
    item.quantity += 1;
    this.ProductsService.updateProductToBasket(item).subscribe((data) => {
    });
  }

}
