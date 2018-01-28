import {createElement, EventEmitter} from "./functions";

class View extends EventEmitter {
    constructor(){
        super();
        this.form = document.getElementById('form');
        this.newUserName = document.getElementById('new-user-name');
        this.newUserAvatarUrl = document.getElementById('new-user-avatar-url');
        
        this.form.addEventListener('submit', this.handleAdd.bind(this));     
    }

    handleAdd(e){
        e.preventDefault();
        const name = this.newUserName.value; 
        const avatar = this.newUserAvatarUrl.value || "https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png";
        const user = { name, avatar };
        this.emit('new-user', user); 
    }
    
}

export default View;