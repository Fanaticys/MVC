import {createElement, EventEmitter, User} from "../functions";

class UserView extends EventEmitter {
    constructor(){
        super();
        this.body = document.querySelector('body');
    }

    createUser({user, users}){
        const newUser = new User(user, users, this);

        this.body.appendChild(newUser.container);
        
        this.emit('created-user', newUser.addPossibleFriend.bind(newUser));
    }

}

export default UserView;