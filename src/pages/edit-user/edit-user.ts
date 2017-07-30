import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the EditUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

	id: number;
	data = {
		user_id: 0,
		username: '',
		name: ''
	}
  constructor(public alertCtrl: AlertController, public userCtrl: UserProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  	this.id = navParams.get('id');

  	this.userCtrl.show(this.id).then(data => {
  	  let res = data.data;
  	  this.data.user_id = this.id;
  	  this.data.username = res.username;
  	  this.data.name = res.name;
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  // submit(){
  //   console.log(this.data);
  //   this.userCtrl.update(this.id, this.data);
  // }

  submit(){
  	this.userCtrl.update(this.id, this.data).then(data => {
  		this.showAlertUndismissable("Successfully updated user.", "", [{
  		  text: 'Close',
  		  handler: () => {
  		    this.navCtrl.push(DashboardPage);
  		  }
  		}]);
  	},
	  	error  => {
	  	  let mess: string ="";
	  	  var arr = Object.keys(error).map(key => error[key]);
	  	  arr.forEach(function(r){
	  	    mess += '<p>' + r + '<p>';
	  	  });
	  	  this.showAlert("Error updating user.", mess, ['Dismiss']);
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
