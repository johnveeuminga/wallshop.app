import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import { DatabaseProvider } from '../../providers/database/database';
import { CartProvider } from '../../providers/cart/cart';
import { CartItemDPage} from '../../pages/cart-item-d/cart-item-d';

/**
 * Generated class for the CartComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'cart',
  templateUrl: 'cart.html'
})
export class CartComponent {

  carts  = [];

  constructor(private cart:CartProvider, private database: DatabaseProvider, public navCtrl: NavController, public alertCtrl:AlertController, public modalCtrl: ModalController) {
    this.database.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.index();
      }
    })
  }

  public index(){
    this.cart.index().then(data => {
      this.carts = data;
      console.log(data);
    });
  }

  showCartItems(id, cart){
    this.cart.searchItems(id).then(data => {
      console.log(data);
      let cartModal = this.modalCtrl.create(CartItemDPage, { cart: cart, items:data});
      cartModal.present();
    })
  }

}
