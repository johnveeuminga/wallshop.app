import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../database/database';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

export class User {
	id: number;
	name: string;
	username: string;

	constructor(id: number, name: string, username: string){
		this.id= id;
		this.name = name;
		this.username = username;
	}
}

@Injectable()
export class AuthServiceProvider {
	currentUser: User;

	constructor (private database:DatabaseProvider, private http: Http) {}

	private url = "http://192.168.56.1:8000/oauth/token";
	private userUrl = "http://192.168.56.1:8000/api/user";
	public dataHeader = {
		"Content-Type":"application/json",
		"Accept":"application/json"
	};

	public login(credentials){
		return new Promise((resolve, reject) => {
			if(credentials.username === null || credentials.password === null){
				return reject("Please insert credentials.")
			} else {
				this.database.checkIfUsernameExist(credentials.username).then( res => {
					if(res.length > 0){
						if(res.item(0).password === credentials.password){
							this.setUser(res.item(0).id, res.item(0).name, res.item(0).username);
							return resolve(this.currentUser);
						}else{
							return reject("Incorrrect password");
						}
					}else{
						return reject("User does not exist.");
					}
				})
			}
		})	
	}

	public getUserInfo(): User{
		return this.currentUser;
	}

	public setUser(id:number, name: string, username: string){
		this.currentUser = new User(id, name, username);
	}

	public logout(){
		this.currentUser = null;
	}
}
