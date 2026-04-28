import { DivComponent } from "../../common/div-components";
import './card.css';
export class CardList extends DivComponent {
    constructor(appState, parentState) { //обновлять избранное, пэррент для проверки загрузки кол-во книг
        super();
        this.appState = appState;
        this.parentState = parentState;
    }

    //Метод рендер переопределяем
    render() {
        if (this.parentState.loading) {
            this.el.innerHTML = `<div class="card_list__loader">Загрузка...</div>`;
            return this.el;
        }
        this.el.innerHTML = `
            <h1>Найдено книг - ${this.parentState.list.length}</h1>
        `   
        return this.el;
    }
}