CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  username TEXT,
  password TEXT

);

INSERT INTO users(name, username, password) VALUES ('Test User', 'admin', 'password');
INSERT INTO users(name, username, password) VALUES ('Test User', 'admin232', 'password');

CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  itemCode TEXT,
  itemDescription TEXT UNIQUE,
  itemPrice NUMERIC
);

INSERT INTO items(itemCode, itemDescription, itemPrice) VALUES ('001', 'Coffee', 50.0);

CREATE TABLE carts (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	address TEXT,
	pickupTime DATE,
	status INTEGER
);

CREATE TABLE cartItems (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	itemId INTEGER,
	cartId INTEGER,
	quantity NUMERIC,
	totalPrice NUMERIC
);