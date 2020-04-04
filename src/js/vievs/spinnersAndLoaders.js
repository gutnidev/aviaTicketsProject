
// ? Это вынес листенер для событие отслеживание курсора, отдельно чтобы убить событие за ненадобностью
const listenerForSubmit = (e) => {
  const sp = document.getElementById('spinnerForSubmit');
  sp.style.left = `${e.clientX}px`;
  sp.style.top = `${e.clientY}px`;
};

class Spinner {
  constructor() {
    this.inpuDepart = null;
    this.inpuDestination = null;
    this.submitButton = null;
    this.spinnerForSubmit = null;
  }

  // ? Инитим при загрузке
  init() {
    this.inpuDepart = document.getElementById('autocompleteDepartHelpBlock');
    this.inpuDestination = document.getElementById('autocompleteReturnHelpBlock');
    this.submitButton = document.getElementById('submitSearchForm');
  }

  // ? Показываем/скрываем наши спинеры возле инпутов автокомплита
  showSpinnerInput() {
    this.inpuDepart.insertAdjacentElement('beforeend', this.spinnerForInputTemplate());
    this.inpuDestination.insertAdjacentElement('beforeend', this.spinnerForInputTemplate());
  }

  hideSpinnerInput() {
    const elements = document.querySelectorAll('.mySpanSpinner');
    if (elements.length) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
    }
  }

  // ? Показываем/скрываем наши спинеры возле инпутов автокомплита
  showSubmitSpinner() {
    this.spinnerForSubmit = this.spinnerForSubmitTemplate();
    window.addEventListener('mousemove', listenerForSubmit);
    this.submitButton.insertAdjacentElement('beforeend', this.spinnerForSubmit);
  }

  hideSubmitSpinner() {
    document.getElementById('spinnerForSubmit').remove();
    window.removeEventListener('mousemove', listenerForSubmit);
  }

  // ? Шаблончик спинера для инпутов
  spinnerForInputTemplate() {
    const sp = document.createElement('span');
    sp.classList.add('spinner-border');
    sp.classList.add('spinner-border-sm');
    sp.classList.add('text-danger');
    sp.classList.add('mySpanSpinner');
    return sp;
  }

  // ? Шаблончик спинера для лоада билетов, пока запрос ушел и еще не вернулся ответ
  spinnerForSubmitTemplate() {
    const sp = document.createElement('span');
    sp.classList.add('spinner-border');
    sp.classList.add('spinner-border-sm');
    sp.classList.add('text-danger');
    sp.setAttribute('id', 'spinnerForSubmit');
    sp.style.position = 'fixed';
    sp.style.zIndex = '3000';
    return sp;
  }
}


const mySpinner = new Spinner();


export default mySpinner;
