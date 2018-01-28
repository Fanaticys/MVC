class UserController {
    constructor(model, view){
        this.model = model;
        this.view = view;

        model.on('new-user', this.view.createUser.bind(view));
        view.on('add-friend', this.model.addFriend.bind(model));
        view.on('created-user', this.handleCreatedUser.bind(this));
        view.on('delete-friend', this.model.deleteFriend.bind(model));
    }

    handleCreatedUser(addPossibleFriend){
        this.model.on('new-user', addPossibleFriend);
    }
    
}

export default UserController;