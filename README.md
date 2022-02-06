CS602 Final Project - A Shopping Cart Program

1. Please go to the folder backend, and run `npm start` to start the server.

No longer need a separate server and go to the folder frontend run `npm start` to start the client since it is now both run concurrently.

> npm install --save concurrently
added the following script in `package.json` of the backend file:
```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon app.js",
    "client": "cd .. && cd frontend && npm start",
    "start": "concurrently \"npm run dev\" \"npm run client\""
},
```