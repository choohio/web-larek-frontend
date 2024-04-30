import {IBasket, IProduct, IOrder, OrderForm} from "../types";
import { IEvents } from "./base/events";

export class AppData {
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

    constructor(protected events: IEvents) {};

    clearBasket() {
        this.basket.items = [];
        this.basket.total = 0;
        this.events.emit('basket:change');
    }

    setItems(items: IProduct[]) {
        this.items = items;
        this.events.emit('items:change', this.items);
    }

    setPreview(item: IProduct) {
        this.preview = item;
        this.events.emit('preview:change', this.preview);
    }

    setOrderField(field: keyof OrderForm, value: string) {
        // this.order[field] = value;

        // if (this.validateOrder()) {
        //     this.events.emit('order:ready', this.order);
        // }
    }

    validateOrder() {
        // const errors: typeof this.formErrors = {};
        // if (!this.order.email) {
        //     errors.email = 'Необходимо указать email';
        // }
        // if (!this.order.phone) {
        //     errors.phone = 'Необходимо указать телефон';
        // }
        // this.formErrors = errors;
        // this.events.emit('formErrors:change', this.formErrors);
        // return Object.keys(errors).length === 0;
    }


};

    
