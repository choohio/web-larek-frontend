# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с компонентами
- src/components/base/ — папка с кодом базовых компонентов

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды
npm install
npm run start

## Сборка
npm run build

## Архитектура приложения
Архитектура в соответсвии с паттерном MVP. Код приложения разделен на слои: 
- слой представления, отвечает за отображение данных на странице, 
- слой данных, отвечает за хранение и изменение данных
- презентер, отвечает за связь представления и данных.

## Описание данных

Интерфейс карточки товара
interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: CategoryType,
    price: number | null;
}

Интерфейс корзины
interface IBasket {
    items: string[];
    total: number;
}

Интерфейс заказа
interface IOrder {
    payment: PaymentMethod,
    email: string,
    phone: string,
    address: string,
    items: string[];
    total: number;
}

Тип способов оплаты
type PaymentMethod = 'cash' | 'card';

Интерфейс страницы
interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

Тип, описывающий возможные категории товара
type CategoryType =
  | 'другое'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'хард-скил';

## Модели данных
Класс, описывающий состояние приложения
class AppData {

    // Массив с товарами
    items: IProduct[] = [];

    // Корзина с товарами
    basket: IBasket = {
        items: [],
        total: 0,
    };

    // Заказ клиента
    order: IOrder = {
        email: '',
        phone: '',
        address: '',
        payment: 'card',
        total: 0,
        items: []
    };

    // Ошибки форм
    formErrors

    // Метод для очистки корзины
    clearBasket()

    // Установка товаров каталога
    setItems(items: IProduct[]) 

    // Установка содержимого модального окна
    setPreview(item: IProduct) 

    // Метод проверки наличия товара в корзине
    inBasket(item: IProduct) 

    // Метод для добавления товара в корзину
    addToBasket(item: IProduct) 

    // Метод для удаления товара из корзины
    removeFromBasket(item: IProduct)

    // Метод для установки способа оплаты
    setPaymentMethod(method: PaymentMethod) 

    // Метод для заполнения полей в форме заказа
    setOrderField(field: keyof OrderForm, value: string) 

    // Валидация формы заказа
    validateOrder() 
};

## Классы представления
// Класс компонента
abstract class Component {
    protected constructor(protected readonly container: HTMLElement) 

    // Переключить класс
    toggleClass(element: HTMLElement, className: string, force?: boolean) 

    // Установить текстовое содержимое
    protected setText(element: HTMLElement, value: unknown) 

    // Сменить статус блокировки
    setDisabled(element: HTMLElement, state: boolean) 

    // Установить изображение с альтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) 

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement 
}

Класс View
Наследуется от класса Component. Добавляет поле events.

Класс Card описывает карточку товара. Наследуется от класса Component.

Класс Page описывает главную страницу. Наследуется от класса View. Содержит каталог товаров и счетчик количества добавленных в корзину товаров.

Класс Basket отвечает за отображение товаров в корзине и общей суммы товаров. Наследуется от класса View.

Класс Form Наследуется от класса View.

Класс Modal 
Отвечает за отображение содержимого модального окна. Содержит методы open и close. Наследуется от класса View.

Класс Success
Отвечает за отображение содержимого модального окна успешного выполнения заказа.

Класс EventEmitter брокер событий. Методы:
on

## Описание событий
Возникают при изменении данных модели:
- `items:change` - изменение массива товаров каталога
- `preview:change` - изменение открываемого в модальном окне товара
- `basket:change` - изменение списка товаров корзины
Возникают при взаимодействии пользователя с интерфейсом:
- `order:open` - открытие модального окна с формой оформления заказа
- `basket:open` - открытие модального окна корзины
- `card:select` - открытие описания товара в модальном окне
- `^order\..*:change` - изменение данных в форме с данными заказа
- `^contacts\..*:change` - изменение полей ввода в форме контактных данных
- `contacts:submit` - отправка формы контактных данных пользователя в модальном окне заказа
- `order:submit` - событие, генерируемое при отправке формы со способом платежа и адресом
- `modal:open` - открытие модального окна
- `modal:close` - закрытие модального окна
