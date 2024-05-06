import { WebLarekAPI } from './components/WebLarekApi';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { AppData } from './components/AppData';
import { Modal } from './components/common/Modal';
import { Page } from './components/Page';
import { Basket } from './components/common/Basket';
import { IProduct, OrderForm } from './types';
import { Card } from './components/Card';
import { Order } from './components/Order';

const api = new WebLarekAPI(CDN_URL, API_URL);

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const modalCardTemplate = ensureElement<HTMLElement>('#modal-container');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');

const events = new EventEmitter();

// Модель данных приложения
const appData = new AppData(events);

const page = new Page(events, document.body);
const modal = new Modal(events, modalCardTemplate);
const basket = new Basket(events);
const orderForm = new Order(events, cloneTemplate(orderTemplate));

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
    const card = new Card(cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
            if(appData.inBasket(item)) {
                appData.removeFromBasket(item);
                card.button = 'В корзину';
            } else {
                appData.addToBasket(item);
                card.button = 'Удалить из корзины'
            }
        }
    });
    card.button = appData.inBasket(item) ? 'Удалить из корзины' : 'В корзину';
    modal.render({content: card.render(item)})
});

events.on('basket:change', () => {
    page.counter = appData.basket.items.length;
    basket.items = appData.basket.items.map(id => {
        const item = appData.items.find((item) => item.id === id);
        const card = new Card(cloneTemplate(cardBasketTemplate), {
            onClick: () => appData.removeFromBasket(item)
        })
        return card.render(item);
    })
    basket.total = appData.basket.total;
});

events.on('basket:open', () => {
    modal.render({
        content: basket.render()
    })
})

events.on('order:open', () => {
    modal.render({
        content: orderForm.render({
            payment: 'card',
            address: '',
            valid: false,
            errors: []
        })
    })
})

events.on('items:change', (items: IProduct[]) => {
    page.catalog = items.map(item => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        })
        return card.render(item);
    })
});

events.on(/^order\..*:change$/, (data: {field: keyof OrderForm, value: string}) => {
    appData.setOrderField(data.field, data.value)
})

events.on('formErrors:change', (error: Partial<OrderForm>) => {
    const {payment, address, email, phone} = error;
    orderForm.valid = !payment && !address;
})

events.on('order:submit', (error: Partial<OrderForm>) => {
    
})

api.getProductsList().then(appData.setItems.bind(appData)).catch(err => console.log(err))