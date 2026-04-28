import { DivComponent } from "../../common/div-components";
import './search.css';
export class CardList extends DivComponent {
    constructor(appState, parentState) { //обновлять избранное, пэррент для проверки загрузки
        super();
        this.appState = appState;
        this.parentState = parentState;
    }


    //Метод рендер переопределяем
    render() {
        if (this.parentState.loading)
        this.el.classList.add('card-list');
        this.el.innerHTML = `
            <div class="search__wrapper">
                <input
                type="text" 
                placeholder="Найти книгу или автора...." 
                class="search__input"
                value="${this.state.searchQuery ? this.state.searchQuery : ''}"
                />
                <img src="/static/search.svg" alt="Иконка поиска" />
            </div>
            <button aria-label="Искать"><img src="/static/search-white.svg" alt="Иконка поиска"/></button>
        `;
        this.el.querySelector('button').addEventListener('click', this.search.bind(this));
        this.el.querySelector('button').addEventListener('keydown', (event) => {
            if (event.code === 'Enter')
                this.search()
            }
        );
        return this.el;
    }
}