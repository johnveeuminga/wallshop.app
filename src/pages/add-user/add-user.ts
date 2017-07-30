import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../dashboard/dashboard';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the AddUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

  data = {name: '', username: '', password: '', password_confirmation: ''}
  
  constructor(private db:DatabaseProvider, public alertCtrl: AlertController, public userCtrl: UserProvider, public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
  }

  submit(){
    this.db.getDatabaseState().subscribe( rdy => {
      if(rdy){
          this.userCtrl.store(this.data).then(data=> {
            this.showAlertUndismissable("Successfully added user.", "", [{
              text: 'Close',
              handler: () => {
                this.navCtrl.push(DashboardPage);
              }
            }]);
          }
          ).catch( error => {
            this.showAlert("Error Adding User", error, ['DISMISS'])
          });
        }
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
