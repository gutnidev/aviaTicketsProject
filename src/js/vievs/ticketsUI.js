import currencyUI from './currency';

class TicketsUI {
  constructor() {
    this._ticketsContainer = document.getElementById('ticketsContainer');
  }

  clearContainer() {
    this._ticketsContainer.innerHTML = ' ';
  }

  // ? Показываем при отсутствии билетов
  showEmptyMessage() {
    const emptyTemplate = TicketsUI.emptyMsgTemplate();
    this._ticketsContainer.insertAdjacentHTML('afterbegin', emptyTemplate);
  }

  // ? рендерим же. Выводим билеты на страничку
  renderTickets(tickets) {
    this.clearContainer();
    if (!tickets || !tickets.length) {
      this.showEmptyMessage();
      return;
    }
    let fragment = '';
    tickets.forEach((ticket) => {
      const ticketTemp = TicketsUI.ticketTemplate(ticket);
      fragment += ticketTemp;
    });
    this._ticketsContainer.insertAdjacentHTML('afterbegin', fragment);
  }

  get ticketsContainer() {
    return this._ticketsContainer;
  }

  // ? Шаблон для билета
  static ticketTemplate(ticket) {
    return `

            <div class="col mb-3">
                        <div class="card ticketCard" id="${ticket.uniqueId}">
                            <div class="card-body pt-1 m-0">
                                <div class="d-flex align-items-center airlineBlock">
                                    <img src="${ticket.airlineLogo}" class=" ticketAirlineImg d-none d-sm-block" alt=" ">
                                    <span class="ml-auto badge ticketAirlineName"><span class="badge-primary">Авиакомпания: </span>${ticket.airlineName}</span>
                                </div>
                                <div class="d-flex align-items-center border-bottom border-primary flightCities" >
                                    <div class="d-flex align-items-center mr-auto">
                                        <span>${ticket.departureCityName}</span>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <span>${ticket.destinationCityName}</span>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center detailsBlock">
                                    <span class="text-monospace text-muted">${ticket.departureDate}</span>
                                    <span class="ml-auto text-danger currencyField">${currencyUI.moneySighn}${ticket.price}</span>
                                </div>
                                <div class="ticket-additional-info">
                                    <span class="font-italic">Пересадок: ${ticket.transfers}.</span>
                                    <span class="font-italic "> Номер рейса: ${ticket.flight_number}.</span>
                                </div>
                                <div class="d-flex">
                                    <button class="btn btn-sm btn-outline-success ml-auto addToFavoritesButton">В избранное</button>
                                </div>
                            </div>
                        </div>
                  </div>
    `;
  }

  // ? Шаблон для Показываем при отсутствии билетов
  static emptyMsgTemplate() {
    return `
      <div class="col-12 mb-3 m-auto">
              <div class="badge-secondary d-flex align-items-center " id="noTicketsMsg">
                   <p class="m-auto">По вашему запросу билетов не найдено.</p>
              </div>
      </div>
    `;
  }
}

const ticketsUI = new TicketsUI();

export default ticketsUI;
