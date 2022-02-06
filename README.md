
---
CS602 Final Project: A Shopping Cart Program
---

## Start the App

**Please go to the folder backend, and run `npm start` to start the server**

- No longer need a separate server and go to the folder frontend run `npm start` to start the client since it is now both run concurrently.

## Running Concurrently

> npm install --save concurrently
- added the following script in `package.json` of the backend file:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon app.js",
    "client": "cd .. && cd frontend && npm start",
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
