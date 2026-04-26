import { DivComponent } from "../../common/div-components";
import './search.css';
export class Search extends DivComponent {
    constructor(state) {
        super();
        this.state = state;
    }
    //Метод рендер переопределяем
    render() {
        this.el.classList.add('header');
        this.el.innerHTML = `
            <div> 
            <img src="/static/logo.svg"  alt="Логотип"/>
            </div>
            <div class="menu">
                <a class="menu__item" href="#">
                    <img src="/static/search.svg"  alt="Поиск"/>
                    Поиск книг
                </a>
                 <a class="menu__item" href="#favorites">
                    <img src="/static/favorites.svg"  alt="Избранное"/>
                    Избранное
                    <div class="menu__counter">
                        ${this.appState.favorites.length}
                    </div>
                </a>
            </div> 
        `;
        return this.el;
    }
}