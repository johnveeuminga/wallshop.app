import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../auth-service/auth-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';	


/*
  Generated class for the CartItemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CartItemProvider {

  constructor(public http: Http) {
    console.log('Hello CartItemProvider Provider');
  }

  private url ='';
	private headers = new Headers({
    "Accept": "application/json",
    // "Authorization": "Bearer " + this.auth.getUserInfo().access_token,
	});


public store(data, id){
  	this.url = "http://192.168.56.1:8000/api/carts/"+id;

  	return this.http.post(this.url, data,{
  		headers: this.headers
  	}).map((res:Response)=>res.json())
			.catch((error: any) => Observable.throw(error.json()));

  }

}
