const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer')

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');
const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const HandShakeController = require('./controllers/HandShakeController')

//Routes Boxes
routes.post("/boxes",BoxController.store);
routes.get("/boxes/:id",BoxController.show);
routes.get("/boxesAll/:id", BoxController.showAll);

//Routes Users
routes.post("/users",UserController.store);
routes.get("/users/:id",UserController.show);
routes.get("/usersAll", UserController.showAll);
routes.get("/users", UserController.verifica);

//Routes Files
routes.post("/boxes/:id/files", multer(multerConfig).single('file') ,FileController.store);

//Routes Login
routes.get("/login", LoginController.show);

//Routes HandShake
routes.get("/handshake", HandShakeController.doHandShake);
routes.post("/handshake", HandShakeController.saveKey);

module.exports = routes;