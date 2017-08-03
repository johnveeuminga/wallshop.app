import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DatabaseProvider } from '../database/database';
import 'rxjs/add/operator/map';

/*
  Generated class for the ShopperProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ShopperProvider {
  shopper:any;

  constructor(private database: DatabaseProvider, public http: Http) {
    console.log('Hello ShopperProvider Provider');
  }

  createShopper(data){
    return this.database.createShopper(data)
      .then( res => {
        console.log(res);
        return res;
      })
  }

  getShopperByEmail(email){
    return this.database.getShopperByEmail(email)
      .then( res => {
        console.log(res);
        return res;
      })
  }

}
