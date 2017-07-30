import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the AddUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  data = {itemCode: '', itemDescription: '', itemPrice: ''}
  
  constructor(public alertCtrl: AlertController, public itemCtrl: ItemProvider, public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  submit(){
    this.itemCtrl.store(this.data).then(data=> {
      this.showAlertUndismissable("Successfully added item.", "", [{
        text: 'Close',
        handler: () => {
          this.navCtrl.push(DashboardPage, {action: 'items'});
        }
      }]);
    },
      error  => {
          this.showAlert("Error Adding Item", error, ['DISMISS'])
      }
    ).catch( err => {
          this.showAlert("Error Adding User", err, ['DISMISS'])

    });
  }

  dismiss(){
  	this.viewCtrl.dismiss();
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
