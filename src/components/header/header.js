import { DivComponent } from "../../common/div-components";

export class Header extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }
    //Метод рендер переопределяем
    render() {
        this.el.innerHTML = "";
        this.el.classList.add('header');
        this.el.innerHTML = `
            <div> 
            <img src="/static/logo.svg"  alt="Логотип"/>
            </div>
        `;
        return this.el;
    }
}