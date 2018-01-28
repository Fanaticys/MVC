function createElement(tag, options, ...children){
    const element = document.createElement(tag);
    if(options){
        Object.keys(options).forEach((property) => {
            element[property] = options[property];
        });
    }
    
    if(children){
        children.forEach(child => {
            if(typeof child === "string"){
                child = document.createTextNode(child);
            }
            element.appendChild(child);
        });
    }

    return element;
}

class EventEmitter {
    constructor(){
        this.events = {};
    }

    on(type, cb){
        this.events[type] = this.events[type] || [];
        this.events[type].push(cb);
    }

    emit(type, user){
        if(this.events[type] && this.events[type].length) {
            this.events[type].forEach(cb => cb(user));
        }
        return;
    }
}

class User {
    constructor(user, users, context){
        this.user = user;
        this.context = context;
        this.imgAvatar = createElement('img', { src: user.avatar });
        this.faSearch = createElement('i', {className: "fa fa-search", ariaHidden: true});
        this.faTimes = createElement('i', {className: "fa fa-times off", ariaHidden: true});
        this.searchButton = createElement('button', {id: 'search-button'}, this.faSearch, this.faTimes);
        this.userName = createElement('h3', {innerText: user.name});
        this.avatarWrapper = createElement('div', { className: "avatar-wrapper" }, this.imgAvatar);
        this.userNameWrapper = createElement('div', { className: 'user-name' }, this.userName);
        this.input = createElement('input', {type: "text"});
        this.proposalList = createElement('ul', {className: 'proposal-list'});
        this.searchInput = createElement('div', {className: 'search-input'}, this.input, this.proposalList);
        this.formWrapper = createElement('div', {className: 'form-wrapper'}, this.searchButton, this.searchInput);
        this.header = createElement('header', {}, this.avatarWrapper, this.userNameWrapper, this.formWrapper);
        
        this.pFriends = createElement('p', {innerText: 'Subscriptions:'});
        this.userFriends = createElement('ul', { className: 'user-friends'});
        this.main = createElement('main', {}, this.pFriends, this.userFriends);

        this.container = createElement('div', { className: 'container' }, this.header, this.main);

        this.searchButton.addEventListener('click', (e) => {
            this.toggleSearch();
        });
        this.input.addEventListener('keyup', (e) => {
            const value = e.target.value.toUpperCase();
            const listItems = this.proposalList.querySelectorAll('li');
            listItems.forEach(li => {
                if(li.innerHTML.toUpperCase().indexOf(value) > -1){
                    li.style.display = "";
                } else {
                    li.style.display = "none";
                }
            });
            if(value) {
                this.proposalList.classList.add('show');
            } else {
                this.proposalList.classList.remove('show');
            }
        });

        users.forEach( reqisteredUser => {
            if( reqisteredUser.name != user.name){
                this.addPossibleFriend({user: reqisteredUser});
            }
        });
    }

    addPossibleFriend({user}){
        const li = createElement('li', {className: 'list-item', innerText: user.name});
        li.setAttribute('data-avatar', user.avatar);
        li.addEventListener('click', (e) => {
            const possibleFriendName = e.target.textContent;
            const possibleFriendAvatar = e.target.getAttribute('data-avatar');
            const friend = { name: possibleFriendName, avatar: possibleFriendAvatar };
            this.addFriend(friend);
            this.context.emit('add-friend', {user: this.user, friend});
            this.toggleSearch();
            this.proposalList.removeChild(li);
        });
        this.proposalList.appendChild(li);
    }

    addFriend({name, avatar}){
        const i = createElement('i', {className: 'fa fa-trash-o'});
        const button = createElement('button', { className: 'remove-friend' }, i);
        const span = createElement('span', { className: 'user-friend-name', innerHTML: name });
        const li = createElement('li', {className: 'user-friend'}, span, button);
        this.userFriends.appendChild(li);
        button.addEventListener('click', (e) => {
            let li =  e.target.parentNode;
            if(e.target.nodeName == "I"){
                li = li.parentNode;
            }
            this.deleteFriend(li, {user: { name, avatar }});
        });
    }

    deleteFriend(li, friend){
        this.userFriends.removeChild(li);
        this.addPossibleFriend(friend);
        this.context.emit('delete-friend', {user: this.user, friend});
    }

    toggleSearch(){
        this.input.focus();
        this.faSearch.classList.toggle('off');
        this.faTimes.classList.toggle('off');
        this.searchInput.classList.toggle('on');
        this.proposalList.classList.toggle('on');
    }
}

export { createElement, EventEmitter, User };