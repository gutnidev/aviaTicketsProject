
// eslint-disable-next-line no-undef
const pickerReturn = new Pikaday({
  field: document.getElementById('datepickerReturn'),
  format: 'DD.MM.YYYY',
  yearRange: [2020],
  reposition: false,
});

// eslint-disable-next-line no-undef
const pickerDepart = new Pikaday({
  field: document.getElementById('datepickerDepart'),
  yearRange: [2020],
  // eslint-disable-next-line no-undef
  minDate: moment()._d,
  format: 'DD.MM.YYYY',
  reposition: false,
  onSelect() {
    const now = this.getDate();
    pickerReturn.show();
    pickerReturn.setMinDate(now);
    pickerReturn.setDate(now, true);
  },
});

export { pickerDepart, pickerReturn };
