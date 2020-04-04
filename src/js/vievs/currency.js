class CurrencyUI {
  constructor() {
    this.currency = document.getElementById('selectCurrency');
    this.dictionary = {
      USD: '$',
      EUR: '€',
      UAH: '₴',
      CNY: '¥',
    };
    this._moneySighn = null;
  }

  // ? Получаем значение инпута
  get currencyValue() {
    this._moneySighn = this.dictionary[this.currency.value];
    return this.currency.value;
  }

  // ? Получаем знак денюжки
  get moneySighn() {
    return this._moneySighn;
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;
