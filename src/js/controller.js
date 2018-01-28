class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;

        view.on('new-user', this.model.addUser.bind(this.model));
    }
    
}

export default Controller;