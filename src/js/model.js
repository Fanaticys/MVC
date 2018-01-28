import { EventEmitter } from "./functions";

class Model extends EventEmitter {
    constructor(){
        super();
        this.users = [];
    }

    addUser(user){
        if(!user.name){
            return alert('Please enter username');
        }
        const flag = this.users.some((registeredUser) => registeredUser.name == user.name);
        if(flag){
            return alert(`User name: "${user.name}" already exist`);
        }
        user.friends = [];
        this.users.push(user);
        this.emit('new-user', {user, users: this.users});
    }

    addFriend({user, friend}){
        const someUser = this.users.find(registeredUser => registeredUser.name == user.name);
        someUser.friends.push(friend);
    }

    deleteFriend({user, friend}){
        const index = user.friends.findIndex(addedFriend => addedFriend.name == friend.user.name);
        if(index !== -1){
            user.friends.splice(index, 1);
        }
    }

}

export default Model;