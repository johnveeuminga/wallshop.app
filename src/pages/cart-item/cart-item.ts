import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController, Events } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { CartItemProvider } from '../../providers/cart-item/cart-item';
import { CheckoutPage } from '../checkout/checkout';
/**
 * Generated class for the CartItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart-item',
  templateUrl: 'cart-item.html',
})
export class CartItemPage {

  item = {id: 1, itemDescription: 1, itemPrice: 1.00};
	cartItem = {quantity:1, totalPrice: 1.00};

  constructor(private events:Events, private alertCtrl: AlertController, private cartItemProv: CartItemProvider, private cart: CartProvider, public viewCtrl: ViewController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  	var scannedItem = (this.navParams.get("item"));
    this.item.id = scannedItem.id;
    this.item.itemDescription= scannedItem.itemDescription
    this.item.itemPrice = scannedItem.itemPrice 
    this.calculatePrice();
    console.log(this.item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartItemPage');
  }

  calculatePrice(){
  	this.cartItem.totalPrice = this.cartItem.quantity * this.item.itemPrice;
  }


  dismiss(){
  	this.viewCtrl.dismiss();
  }

  submit(){
    this.events.publish("cart:addItem", {
      item: this.item,
      details: this.cartItem
    })
    var cartItem = {
      itemId: this.item.id,
      quantity: this.cartItem.quantity,
      totalPrice: this.cartItem.totalPrice,
      item: this.item
    }
    console.log(cartItem);
    this.cart.cart.items.push(cartItem)
    console.log(this.cart.cart);
    this.showAlertUndismissable("Item added to cart", "Would like to add another item?",[
      {
        text: "Yes",
        handler : () => {
          this.dismiss()
        }
      },
      {
        text: "Checkout",
        handler: () =>{
          this.navCtrl.push(CheckoutPage);
        }
      }
    ])
  }


  showAlert(title, message, buttons){
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    });

    alert.present();
  }

  showAlertUndismissable(title, message, buttons){
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons,
      enableBackdropDismiss: false
    });

    alert.present();
  }


}
