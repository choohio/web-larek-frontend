import { WebLarekAPI } from './components/WebLarekApi';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppData } from './components/AppData';
import { Modal } from './components/common/Modal';
import { Page } from './components/Page';
import { IProduct } from './types';
import { Card } from './components/Card';

const api = new WebLarekAPI(CDN_URL, API_URL);

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const modalCardTemplate = ensureElement<HTMLElement>('#modal-container');

const events = new EventEmitter();
// Модель данных приложения
const appData = new AppData(events);

const page = new Page(events, document.body);
const modal = new Modal(events, modalCardTemplate);

events.on('modal:open', () => {
    page.locked = true;
});

events.on('modal:close', () => {
    page.locked = false;
});

events.on('card:select', (item: IProduct) => {
    appData.setPreview(item);
});

events.on('preview:change', (item: IProduct) => {
    const card = new Card(cloneTemplate(cardCatalogTemplate), {
        onClick: () => {}
    })
})

events.on('items:change', (items: IProduct[]) => {
    page.catalog = items.map(item => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card-select', item)
        })
        return card.render(item);
    })
})

api.getProductsList().then(appData.setItems.bind(appData)).catch(err => console.log(err))