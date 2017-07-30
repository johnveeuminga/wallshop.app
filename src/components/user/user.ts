import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { EditUserPage } from '../../pages/edit-user/edit-user';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the UserComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user',
  templateUrl: 'user.html'
})
export class UserComponent {

  users = [];

  constructor(private database: DatabaseProvider, public navCtrl: NavController, public alertCtrl:AlertController, public user:UserProvider, public modalCtrl: ModalController) {
    this.database.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.index();
      }
    })
  }

  public index(){
    this.user.index().then(data => {
      this.users = data;
    });
  }

  public showOptions(id){
    let alert = this.alertCtrl.create({
      title: 'Select Action',
      message: 'What do you want to do with this user?',
      buttons: [{
        text: 'Edit',
        handler: () => {
          this.presentEditUserModal(id);
          console.log('edit');
        }
       },
       {

         text: 'Delete',
         cssClass: 'button-danger',
         handler: () => {
          this.presentDeleteAlert(id);

         }
      }]
    });

    alert.present();
  }

  presentEditUserModal(id){
    let modal = this.modalCtrl.create(EditUserPage, {id: id});
    modal.present();
  }

  presentDeleteAlert(id){
    let alert = this.alertCtrl.create({
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
        buttons: [{
            text: 'Cancel',
            handler: () =>{

            }
        },
        {
          text:'Delete',
          handler: () =>{
            this.user.delete(id).then(data => {
              this.index();
              this.showAlertUndismissable("Successfully deleted user.", "" , [{
                text: 'Close',
                handler: () => {
                }
              }]);
            },
              error  => {
                let mess: string ="";
                var arr = Object.keys(error).map(key => error[key]);
                arr.forEach(function(r){
                  mess += '<p>' + r + '<p>';
                });
                this.showAlert("Error deleting user.", mess, ['Dismiss']);
              }
            );
          }
        }]
    });

    alert.present();
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

  ionViewDidLoad(){
    // this.index();
  }


}
