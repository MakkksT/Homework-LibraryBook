import { FavoritesView } from "./views/favorites/favorites";
import { MainView } from "./views/main/main";

class App {
    //паблик свойство, даёт направление куда идти
    routes = [               
        {path: "", view: MainView},
        {path: "#favorites", view: FavoritesView}
    ];
    //стейт это объект находится на определенном уровне иерархии 
    // на данный момент два уровня иерархии app и view(main.js)
    //Делаем глобальный стейт
    appState = {
        favorites: []
    };

    //Подписываемся на хэш #, а не /
    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));   //биндим на тек. контекст
        this.route();
    }
    //Функция роутинга
    route() {
        if (this.currentView) {
            this.currentView.destroy();
        }
        const view = this.routes.find(r => r.path == location.hash).view;
        this.currentView = new view(this.appState
        );
        this.currentView.render();
    }
}

new App();

//onchange нужен для реактивности объекта(проекта) она следит за изменениями в объекте, 
// построена на proxy-api 
//construcotr нужен помимо запуска, нужен для внедрение зависимостей 