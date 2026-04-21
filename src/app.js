class App {
    //паблик свойство
    route = [               
        {path: "", view: null}
    ];

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));   //биндим на тек. контекст
        this.route();
    }
    //Функция роутинга
    route() {               
        const view = this.route.find(r => r.path == location.hash).view;
    }
}

new App();