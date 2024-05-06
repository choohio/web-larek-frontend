// Интерфейс товара в магазине
export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: CategoryType,
    price: number | null;
}

// Интерфейс корзины
export interface IBasket {
    items: string[];
    total: number;
}

export type PaymentMethod = 'cash' | 'card';

// Интерфейс заказа
export interface IOrder {
    payment: PaymentMethod,
    email: string,
    phone: string,
    address: string,
    items: string[];
    total: number;
}

export type OrderForm = Omit<IOrder, 'items' | 'total'>;

export interface IOrderResult {
    id: string,
    total: number;
}

export type CategoryType =
  | 'другое'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'хард-скил';

export type CategoryMapping = {
  [Key in CategoryType]: string;
};