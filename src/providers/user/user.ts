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
export class UserProvider {

  constructor(private database: DatabaseProvider, public auth: AuthServiceProvider, public http: Http) {
    this.database.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.index();
      }
    })
  }

  private url ='http://192.168.1.6:8000/api/users';
	private headers = new Headers({
    "Accept": "application/json",
    // "Authorization": "Bearer " + this.auth.getUserInfo().access_token,
	});
  public index(){
  	return this.database.getAllusers()
    .then(data => {
      return data;
    })
  }

  public store(data){
  	return this.database.addUser(data.name, data.username, data.password).then( data => {
      console.log("Add");
      return data
    }).catch( error => {
      return Promise.reject(error);
    })

  }

  public show(id){
    return this.database.searchUser(id)
    .then(data => {
      console.log(data);
      return data;
    })

  }

  public update(id, data){
    return this.database.editUser(id, data.name, data.username)
      .then( data => {
        return data;
      },err  => {
        return Promise.reject(err);
      })

  }

  public delete(id){
    return this.database.deleteUser(id)
    .then ( data => {
      return data;
    })
  }

}
