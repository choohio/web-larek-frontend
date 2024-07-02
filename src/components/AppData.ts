import {IBasket, IProduct, IOrder, OrderForm, PaymentMethod} from "../types";
import { IEvents } from "./base/events";

export class AppData {

    constructor(protected events: IEvents) {};

    items: IProduct[] = [];
    basket: IBasket = {
        items: [],
        total: 0,
    };
    order: IOrder = {
        email: '',
        phone: '',
        address: '',
        payment: 'card',
        total: 0,
        items: []
    };
    preview: IProduct = null;

    formErrors: Partial<Record<keyof OrderForm, string>>

    clearBasket() {
        this.basket.items = [];
        this.basket.total = 0;
        this.events.emit('basket:change');
    }

    // изменение массива товаров каталога
    setItems(items: IProduct[]) {
        this.items = items;
        this.events.emit('items:change', this.items);
    }

    // изменение открываемого в модальном окне товара
    setPreview(item: IProduct) {
        this.preview = item;
        this.events.emit('preview:change', this.preview);
    }

    inBasket(item: IProduct) {
        return this.basket.items.includes(item.id);
    }

    // изменение списка товаров корзины
    addToBasket(item: IProduct) {
        this.basket.items.push(item.id); 
        this.basket.total += item.price;
        this.events.emit('basket:change', this.basket);
    }

    removeFromBasket(item: IProduct) {
        this.basket.items = this.basket.items.filter(id => id !== item.id);
        this.basket.total = this.basket.total - item.price;
        this.events.emit('basket:change', this.basket);
    }

    setPaymentMethod(method: PaymentMethod) {
        this.order.payment = method; 
    }

    // данные форм оформления заказа валидны
    setOrderField(field: keyof OrderForm, value: string) {
        if (field === 'payment') {
            this.setPaymentMethod(value as PaymentMethod)
        } else {
            this.order[field] = value;
        }

        console.log(this.order);

        if (this.order.payment && this.validateOrder()) {
            this.order.total = this.basket.total;
            this.order.items = this.basket.items;
            this.events.emit('order:ready', this.order);
        }
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        if (!this.order.address) {
            errors.address = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
};

    
