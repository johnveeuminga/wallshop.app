import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../auth-service/auth-service';
import { KeysPipe } from '../../pipes/keys/keys';
import { DatabaseProvider } from '../../providers/database/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';	

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ItemProvider {

  constructor(private database: DatabaseProvider, public auth: AuthServiceProvider, public http: Http) {
  }

  public index(){
    return this.database.getAllItems()
    .then(data => {
      return data;
    })
  }

  public store(data){
  	  return this.database.addItem(data.itemCode, data.itemDescription, data.itemPrice).then( data => {
        return data
      }).catch( error => {
        return Promise.reject(error);
      })

  }

  public show(id){
    return this.database.searchItem(id)
    .then(data => {
      console.log(data);
      return data;
    })
  }  

  public update(id, data){
    return this.database.editItem(data.itemCode, data.itemDescription, data.itemPrice, id)
      .then( data => {
        return data;
      },err  => {
        console.log(err);
      });
  }

  public delete(id){
    return this.database.deleteItem(id)
    .then ( data => {
      return data;
    })
  }

  public findByCode(code){
   return this.database.searchItemByItemCode(code)
    .then(data => {
      return data;
    })
  }

}
