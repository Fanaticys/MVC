import 'font-awesome/css/font-awesome.css';
import '../sass/style.sass';

import Model from "./model";
import View from "./view";
import Controller from "./controller"; 
import UserView from "./user-component/user.view";
import UserController from "./user-component/user.controller";

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

const userView = new UserView();
const userController = new UserController(model, userView);