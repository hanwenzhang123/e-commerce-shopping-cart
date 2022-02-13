
---
CS602 Final Project: A Shopping Cart Program
---

## Start the App

1. **Please go to the folder backend, and run `npm start` to start the server**
2. **Please go to the folder frontend, and run `npm start` to start the server**

- You may no longer need a separate server to run frontend `npm start` in order to start the client, since it is now both run concurrently.

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

## If Error Occurs
- Node / Express: EADDRINUSE, Address already in use - Kill server
1. > sudo lsof -i :3001
2. > kill -9 {PID}
3. > change PID value accordingly
 
