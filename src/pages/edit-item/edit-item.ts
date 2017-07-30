import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the EditUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

	id: number;
    data = {item_id:0, itemCode: '', itemDescription: '', itemPrice: ''};

  constructor(public alertCtrl: AlertController, public itemCtrl: ItemProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  	this.id = navParams.get('id');

  	this.itemCtrl.show(this.id).then(data => {
  	  let res = data.data;
  	  this.data.item_id = this.id;
  	  this.data.itemCode = res.itemCode;
  	  this.data.itemDescription = res.itemDescription;
  	  this.data.itemPrice = res.itemPrice;
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  submit(){
  	this.itemCtrl.update(this.id, this.data).then(data => {
  		this.showAlertUndismissable("Successfully updated item.", data.message, [{
  		  text: 'Close',
  		  handler: () => {
  		    this.navCtrl.push(DashboardPage, {action: 'items'});
  		  }
  		}]);
  	},
	  	error  => {
	  	  let mess: string ="";
	  	  var arr = Object.keys(error).map(key => error[key]);
	  	  arr.forEach(function(r){
	  	    mess += '<p>' + r + '<p>';
	  	  });
	  	  this.showAlert("Error updating item.", mess, ['Dismiss']);
	  	}
	  	);
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
