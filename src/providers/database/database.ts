import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/Rx';
import { IonicStorageModule } from  '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Storage } from '@ionic/storage';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
	database: SQLiteObject;
	private databaseReady: BehaviorSubject<boolean>;
  constructor(private sqLitePort: SQLitePorter, private platform: Platform,  private storage: Storage, private sqlite: SQLite, public http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    console.log(this.database);
    this.platform.ready().then(() => {
    	console.log('ready');
    	this.sqlite.create({
    		name: 'wallshopd123123123b',
    		location: 'default'
    	}).then( (db: SQLiteObject) => {
    		this.database = db;
    		this.storage.get('database_filled').then( val => {
    			if(val){
    				this.databaseReady.next(true);
    			}else{
    				this.fillDatabase();
    			}
    		})
    	});
    })
  }

  fillDatabase(){
  	this.http.get('assets/dump.sql')
  	.map(res=> res.text())
  	.subscribe(sql => {
  		this.sqLitePort.importSqlToDb(this.database, sql)
  		.then(data => {
  			this.databaseReady.next(true);
  			this.storage.set('database_filled', true);
  		})
  	});
  }

  addUser(name, username, password){
  	let data = [name, username ,password];
  	return new Promise((resolve, reject)  => {
  		this.checkIfUsernameExist(username).then( res => {
  			if(res.length > 0){
  				console.log('qweqweqweq');
  				return reject("Username Already Taken");
  			}else{
  				resolve(this.database.executeSql("INSERT INTO users (name, username, password) VALUES (?, ?, ?)", data)
  					.then( res => {
  						return {
  							message: "User added successfully"
  						};
  					}))
  			}
  		})
  	})
  }
	
  editUser(id, name, username){
  	 let data = [name, username, id];
  	 return this.checkIfUsernameExist(username).then( res => {
		console.log(res)
		if(res.length == 1){
			if(res.item(0).id==id){
				return this.database.executeSql("UPDATE users SET name = (?), username = (?) WHERE id = (?)", data)
					.then(res => {
	  					return {
	  						message: 'User successfully updated.'
	  					}
					});
			}else{
	  			return Promise.reject("Username Already Taken");
			}
		}else{
	  		return Promise.reject("Username Already Taken");

		}
  		});
  }

  deleteUser(id){
  	let data = [id];
  	return this.database.executeSql("DELETE FROM users WHERE id = (?)", data)
  	.then ( res => {
  		return {
  			message: "User deleted successfully"
  		}
  	})
  }

  searchUser(id){
  	let data = [id];
  	return this.database.executeSql("SELECT * FROM users WHERE id = (?)", data)
  		.then (res => {
  			return {
  				data: res.rows.item(0)
  			}
  		})
  }

  checkIfUsernameExist(username){
  	let data = [username]
  	console.log(username);
  	return this.database.executeSql("SELECT * FROM users WHERE username = (?)", [username])
  		.then (res => {
  			return res.rows;
  		})
  }

  checkIfBarcodeExists(code){
  	return this.database.executeSql("SELECT * FROM items WHERE itemCode = (?)", [code])
  		.then( res => {
  			if(res.rows.length > 0){
					return true
				}else{
					return false;
				}
  		})
  }

  addItem(itemCode, itemDescription, itemPrice){
		let data  = [itemCode, itemDescription, itemPrice];
		var ret;
  	return new Promise((resolve, reject)  => {
			this.checkIfBarcodeExists(itemCode).then( res => {
				console.log(res);
				if(res){
					 return  reject("Code already taken");
				}else{
					 return  resolve(this.database.executeSql("INSERT INTO items (itemCode, itemDescription, itemPrice) values (?, ?, ?)", data)
						.then( res => {
							console.log(res);
							return res;
						}));
				}
			});
		})
  }

  editItem(itemCode, itemDescription, itemPrice, id){
  	let data = [itemCode, itemDescription, itemPrice, id];
  	return this.database.executeSql("UPDATE items SET itemCode = (?), itemDescription = (?), itemPrice = (?) WHERE id = (?)", data)
  	.then( res => {
  		return res;
  	})
  }

  deleteItem(id){
  	let data = [id];
  	return this.database.executeSql("DELETE FROM items WHERE id = ?", data)
  	.then ( res => {
  		return {
  			message: "User deleted successfully"
  		}
  	})
  }

  searchItem(id){
  	let data = [id];
  	return this.database.executeSql("SELECT * FROM items WHERE id = (?)", data)
  		.then (res => {
  			return {
  				data: res.rows.item(0)
  			}
  		})
  }


  getAllusers(){
  	return this.database.executeSql("SELECT * FROM users ORDER BY id DESC", [])
  	.then(data=>{
  		let users = [];
  		if(data.rows.length > 0){
  			for(var i =0; i<data.rows.length; i++){
  				users.push({id: data.rows.item(i).id, name: data.rows.item(i).name, username: data.rows.item(i).username});
  			}
  		}
  		return users;
  	})
  }

  getAllItems(){
  	console.log(this.database);
  	return this.database.executeSql("SELECT * FROM items ORDER BY id DESC", [])
  	.then(data=>{
  		let items = [];
  		if(data.rows.length > 0){
  			for(var i =0; i<data.rows.length; i++){
  				items.push({itemCode: data.rows.item(i).itemCode, itemDescription: data.rows.item(i).itemDescription, itemPrice: data.rows.item(i).itemPrice, id: data.rows.item(i).id, photoPath: data.rows.item(i).photoPath});
  			}
  		}
  		return items;
  	})
  }

  searchItemByItemCode(code){
  	return this.database.executeSql("SElECT * FROM items where itemCode = (?)",[code])
  	.then(data => {
  		return data.rows;
  	})
  }

  getAllCarts(){
    return this.database.executeSql("SELECT * FROM carts ORDER BY id DESC", [])
      .then(data => {
        let carts = [];
        console.log(data);
        if(data.rows.length > 0){
          for(var i =0; i<data.rows.length; i++){
            carts.push({id:data.rows.item(i).id, name: data.rows.item(i).name, address: data.rows.item(i).address, pickupTime: data.rows.item(i).pickupTime, status:data.rows.item(i).status, authCode:data.rows.item(i).authCode});
          }
        }
        return carts;
      })
  }
  createCart(data){
    let postData = [data.name, data.address, data.pickupTime, data.id];
    return this.database.executeSql("INSERT INTO carts (name, address, pickupTime, status, shopperId) VALUES (?, ?, ?,  0, ?)",postData)
    .then(data => {
      return {data: data.rows, id: data.insertId};
    }).catch( err => {
      return err;
    })
  }

  createCartItem(data, id){
    let postData = [data.itemId, data.cartId, data.quantity, data.totalPrice]
    return this.database.executeSql("INSERT INTO cartItems (itemId, cartId, quantity, totalPrice) VALUES (?, ?, ?, ?)", postData)
    .then(data => {
      return data.rows
    }).catch (err => {
      return err;
    })
  }

  getCartItems(id){
    console.log(id);
    return this.database.executeSql("SElECT * FROM cartItems INNER JOIN items ON cartItems.itemId = items.id WHERE cartId = (?)",[id])
    .then(data => {
      console.log(data);
      return data.rows;
    })
  }

  markAsComplete(id){
    return this.database.executeSql("UPDATE carts SET status = 1 WHERE id = ?", [id]).then(res => {
      return res;
    })
	}
	
	createShopper(data){
		let postData = [data.email];
		return this.database.executeSql("INSERT INTO shoppers (email) VALUES (?)", postData)
			.then(res => {
				console.log(res);
				return res
			})
	}

	getShopperByEmail(email){
		return this.database.executeSql("SELECt * FROM shoppers WHERE email = (?)", [email])
			.then(res => {
				return res.rows
			})
	}

	setAuthCode(data){
		return this.database.executeSql("UPDATE carts SET authCode = (?) WHERE id = (?)",data).then( res => {
			return res
		})
	}

  getDatabaseState(){
  	return this.databaseReady.asObservable();
	}
	
	setItemPhoto(id, photoPath){
		let data = [photoPath, id];
		return this.database.executeSql("UPDATE items SET photoPath = (?) where id = (?)", data).then( res => {
			return res;
		});
	}


}