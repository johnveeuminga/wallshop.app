import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import { EditItemPage } from '../../pages/edit-item/edit-item';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the ItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'item',
  templateUrl: 'item.html'
})

export class ItemComponent {

  items = [];

  constructor(private database: DatabaseProvider, public navCtrl: NavController, public alertCtrl:AlertController, public item:ItemProvider, public modalCtrl: ModalController) {
    this.database.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.index();
      }
    })
  }

 public index(){
    this.item.index().then(data => {
      this.items = data;
    });
  }

  public showOptions(id){
    let alert = this.alertCtrl.create({
      title: 'Select Action',
      message: 'What do you want to do with this item?',
      buttons: [{
        text: 'Edit',
        handler: () => {
          this.presentEditModal(id);
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

  presentEditModal(id){
    let modal = this.modalCtrl.create(EditItemPage, {id: id});
    modal.present();
  }

  presentDeleteAlert(id){
    let alert = this.alertCtrl.create({
        title: 'Delete Item',
        message: 'Are you sure you want to delete this item?',
        buttons: [{
            text: 'Cancel',
            handler: () =>{

            }
        },
        {
          text:'Delete',
          handler: () =>{
            this.item.delete(id).then(data => {
              this.index();
              this.showAlertUndismissable("Successfully deleted item.", "", [{
                text: 'Close',
                handler: () => {
                }
              }]);
            },
              error  => {
                this.showAlert("Error deleting item.","", ['Dismiss']);
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

}
