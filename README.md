---
CS602 Final Project: A Shopping Cart Application
---
## Boilerplate Code
> npm install express\
> npm install mongodb\
> npm install mongoose

```js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/mydb", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

## Start the App

1. **Please run `npm install` to install all the dependencies first**
2. **Please go to the folder backend, and run `npm start` to start the server**
3. **Please go to the folder frontend, and run `npm start` to start the server**

- Note: You may no longer need a separate server to run frontend `npm start` in order to start the client, since it is now both run concurrently.

## Running Concurrently

> npm install --save concurrently
- added the following script in `package.json` of the backend file:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon app.js ",
    "client": "cd .. && cd frontend && npm start ",
    "start": "concurrently \"npm run dev\" \"npm run client\""
},
```
```json
 "dependencies": {
     "concurrently": "^7.0.0",
 }
 ```
 
- added the following script in `package.json` of the frontend folder:
```json
{
  "proxy": "http://localhost:3001",
}
```

## If Error Occurs
- Node / Express: EADDRINUSE, Address already in use - Kill server
1. > sudo lsof -i :3001
2. > kill -9 {PID}
3. > change PID value accordingly
 
## Secret Token

ACCESS_TOKEN_SECRET => `require("crypto").randomBytes(64).toString("hex")`

## Version Control

https://github.com/hanwenzhang123/bu-cs602-final-project

## CS602 Sample Project

Consider a shopping cart application for a merchant’s website. The merchant has a list of products that they sell. Each product has a unique id, name, description, price, and quantity in stock. The application should be able to show the list of all products, search for the products by name/description.

The customer interface should allow the ordering of the products. The customer selects from the list of products and specifies the quantity of each they like to order.

You can skip the customer registration part and assume that each customer has already created their customer id. When the order is submitted, the available quantities should be updated. The customer should not be allowed to back order any product.

The customer interface should have the capability to show the list of all their orders.

The admin interface should have the capability to add/update a product, and delete a product. The admin interface should have the capability to show the list of all customers, and when a customer is selected, show the list of that particular customer’s orders. The admin should be allowed to delete or update the existing orders of a selected customer.

The application should support the REST APIs (XML & JSON) for the list of products, products matching the specified name, and products within the specified price range.
