import locations from './store/locationsStore';
import formUI from './vievs/form';
import currencyUI from './vievs/currency';
import ticketsUI from './vievs/ticketsUI';
import favoritesStore from './store/favoritesStore';
import mySpinner from './vievs/spinnersAndLoaders';


// ? Мы начинаем всё инитить, слушать и заниматься другими полезными вещами после DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-use-before-define
  initApp();
  const form = formUI.form;
  form.reset();

  //! События
  // todo Слушаем сабмит формы поиска билетов
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-use-before-define
    onFormSubmit();
  });
  // todo Слушаем клик по области, где отрендерены билеты
  ticketsUI.ticketsContainer.addEventListener('click', (e) => {
    // ? ищу событие клика по кнопке добавления в избранное
    if (e.target.classList.contains('addToFavoritesButton')) {
      // eslint-disable-next-line no-use-before-define
      onAddToFavoritesButtonClick(e);
    }
  });
  // todo Слушаем клик по области, где отрендерено избранное
  favoritesStore.favoritesContainer.addEventListener('click', (e) => {
    // ?ищу событие клика по кнопке удаления из избранного
    if (e.target.classList.contains('removeFromFavoritesButton')) {
      // eslint-disable-next-line no-use-before-define
      onRemoveFromFavoritesButtonClick(e);
    }
  });
  //!-------------------------------
  //! Хэндлеры для этих самых событий, которые были выше
  async function initApp() {
    // ? Инитим всякое
    mySpinner.init();
    favoritesStore.init();
    // ? Выводим Спиннеры на деактивированых инпутах пока мы не запихнем в них наши красивые объекты, которые обработаем после того, как получим от сервера
    mySpinner.showSpinnerInput();
    await locations.init();
    // ? Заинитили автокомплиты и и убрали спинеры
    formUI.setAutocompleteData(locations.dataForAutocomplete);
    mySpinner.hideSpinnerInput();
  }
  async function onFormSubmit() {
    // ?Запуск спиннера загрузки билетов
    mySpinner.showSubmitSpinner();
    // ? Очистка контейнера для билетов и сбор данных формы
    ticketsUI.clearContainer();
    const origin = locations.getCityCodeByName(formUI.departLocationValue);
    const destination = locations.getCityCodeByName(formUI.returnLocationValue);
    // eslint-disable-next-line camelcase
    const depart_date = formUI.departDateValue;
    // eslint-disable-next-line camelcase
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    // ? Запрашиваем билеты
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    locations.lastSearch.forEach(ticket => ticket.currency = currency);
    // ? Рендерим билеты
    ticketsUI.renderTickets(locations.lastSearch);
    // ?Спрятали лоадер
    mySpinner.hideSubmitSpinner();
  }
  function onAddToFavoritesButtonClick(e) {
    // ?Нашли ближайший ДОМ карточки
    const ticketDOMObject = e.target.closest('.ticketCard');
    // ?Нашли объект билета в подобающем виде
    const ticketCustomObject = locations.getTicketObjectById(ticketDOMObject.id);
    console.log(ticketDOMObject);
    // ? Убираю col, в котором содержится ДОМ объект билетика вместе с билетиком :( Фактически удаляю билет со странички
    ticketDOMObject.parentElement.remove();
    // ? Там я в объект избранного кладу наш найенный объект билета и вывожу на страничку в коллапс билет, который был избран
    favoritesStore.setToFavorites(ticketCustomObject);
  }
  function onRemoveFromFavoritesButtonClick(e) {
    e.preventDefault();
    // ? И так все ясно
    favoritesStore.removeFavoriteTicket(e.target.closest('.favoriteTicketCard'));
  }
});
