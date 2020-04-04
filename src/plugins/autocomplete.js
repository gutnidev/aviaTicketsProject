class Autocomplete {
  constructor(inputID) {
    this._inputID = inputID;
    this._dataToUse = null;
  }

  init() {
    // eslint-disable-next-line no-undef
    $(`#${this._inputID}`).autocomplete({
      source: this._dataToUse,
      treshold: 1,
      highlightClass: 'text-primary',
      customSubValue: 'Не получилось',
    });
  }

  set autocompleteData(dataToSet) {
    this._dataToUse = dataToSet;
    this.init();
  }
}

const myAutoDepart = new Autocomplete('autocompleteDepart');
const myAutoReturn = new Autocomplete('autocompleteReturn');


export { myAutoDepart, myAutoReturn };
