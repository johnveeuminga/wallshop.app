import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../auth-service/auth-service';
import { DatabaseProvider } from '../database/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';	
/*
  Generated class for the CartProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CartProvider {

  cart = {items:[]};
  totalPrice = 0;

  constructor(private database: DatabaseProvider, public http: Http) {
    console.log('Hello CartProvider Provider');
    console.log(this.getTotalPrice());
  }


	public create(data, items){
		return this.database.createCart(data).then( res => {
      for(var i=0; i<items.length ;i++){
        let data = {itemId:items[i].itemId, cartId: res.id, quantity:items[i].quantity, totalPrice:items[i].totalPrice}
        this.createCartItem(data, data.cartId).then( res => {
          return res;
        });     
      }
      console.log(res.id);
			return res;
		})
	}

  public createCartItem(data, id){
    return this.database.createCartItem(data, id).then( res => {
      return res;
    })
  }

  public index(){
    return this.database.getAllCarts()
    .then(data => {
      return data;
    })
  }

  public searchItems(id){
    return this.database.getCartItems(id)
    .then(data => {
      return data;
    })
  }

  public markAsComplete(id){
    return this.database.markAsComplete(id)
    .then(data => {
      return data;
    })
  }

  public getTotalPrice(){
    this.totalPrice = 0;
    for(var i =0; i<this.cart.items.length; i++){
      this.totalPrice+=this.cart.items[i].totalPrice;
    }

    return this.totalPrice;
  }

}
