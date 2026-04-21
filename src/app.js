import { MainView } from "./views/main/main";

class App {
    //паблик свойство, даёт направление куда идти
    routes = [               
        {path: "", view: MainView}
    ];
    //Подписываемся на хэш #, а не /
    constructor() {;
        window.addEventListener('hashchange', this.route.bind(this));   //биндим на тек. контекст
        this.route();
    }
    //Функция роутинга
    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }
        const view = this.routes.find(r => r.path == location.hash).view;
        this.currentView = new view();
        this.currentView.render();
    }
}

new App();