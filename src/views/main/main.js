import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";

export class MainView extends AbstractView {
    state = {
        list: [],
        numFound: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0
    };
    constructor(appState) {
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this)); //подписываемся
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Поиск книг');
    }
//Добавили отписку чтобы не было утечек памяти
    destroy() {
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path) {
        if (path === 'favorites') {
            this.render();               //где бы мы не обновили фейворитс, будем срабатывать рендер
        }
    }

    async stateHook(path) {
        if (path === 'searchQuery') {
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.state.offset);
            this.state.loading = false;
            console.log(data)
            this.state.numFound = data.numFound;
            this.state.list = data.docs;
        }//добавляем ещё одну подписку для кол-во книг добавили доп. перендер
        if (path === 'list' || path === 'loading') {
            this.render();
        }
    }

// Загрузчик книг
async loadList(q, offset) {
    const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}`);
    const data = await res.json();
    
    if (data.docs) {
        // Загружаем жанры с задержкой 500мс между запросами
        for (const doc of data.docs) {
            await this.addGenres(doc);
            await new Promise(resolve => setTimeout(resolve, 200)); // задержка
        }
    }
    
    return data;
}
//Попробовал кастрировано починить загружать жанры 
//Может вызывать ошибку Many Request 429
async addGenres(book) {
    if (book.key) {
        try {
            const res = await fetch(`https://openlibrary.org${book.key}.json`);
            const workData = await res.json();
            if (workData.subjects) {
                book.subject = workData.subjects.slice(0, 2);
            }
        } catch (error) {
            // Ничего не делаем, просто игнорируем ошибку
        }
    }
    return book;
}


    render() {
        const main = document.createElement('div');
        main.innerHTML = `
            <h1>Найдено книг - ${this.state.numFound}</h1>
        `
        main.append(new Search(this.state).render());
        main.append(new CardList(this.appState, this.state).render());
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader() {
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}