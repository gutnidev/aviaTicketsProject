	import locations from './locationsStore'
	import currencyUI from '../vievs/currency'
	class FavoritesStore {
		constructor () {
			this._favoriteTickets = [];
			this._favoritesContainer = document.getElementById(`favoritesContainer`);
			this.collapseFavorites = document.getElementById(`collapseFavoritesID`);
			this.favoritesButton = document.getElementById(`showFavoritesButton`);
			this.favoritesButtonSpan = document.getElementById(`favoritesButtonSpan`);
		}
		
		setToFavorites(ticket){
			this._favoriteTickets.push(ticket);
			this.renderOneFavorite(ticket)
			this.favoritesButton.removeAttribute(`disabled`);
			this.favoritesButtonSpan.textContent = `${this._favoriteTickets.length}`;
		}
		removeFavoriteTicket(ticketDOM){
			this._favoriteTickets = 	this._favoriteTickets.reduce((acc, object)=>{
				if (object.uniqueId !== ticketDOM.id){
					acc.push(object);
				}
				
				return acc;
			},[]);
			this.favoritesButtonSpan.textContent = `${this._favoriteTickets.length}`;
			ticketDOM.parentElement.remove();
			if (!this._favoriteTickets.length && this.collapseFavorites.classList.contains(`show`)){
				this.collapseFavorites.classList.remove(`show`);
				this.favoritesButton.setAttribute(`disabled`,'');
			}
		}
		renderOneFavorite(ticket){
			const templateToRender = FavoritesStore.favoriteTicketTemplate(ticket);
			this._favoritesContainer.insertAdjacentHTML('afterbegin', templateToRender);
		}
		renderFavouriteTickets(ticketsToRender){
			let fragment = ``;
			ticketsToRender.forEach((ticket)=>{
				
				const ticketTemp = FavoritesStore.favoriteTicketTemplate(ticket);
				fragment += ticketTemp;
			});
			this._favoritesContainer.insertAdjacentHTML('afterbegin', fragment);
		}
		get favoritesContainer(){
			return this._favoritesContainer;
		}
		static favoriteTicketTemplate(ticket){
			let {uniqueId, airlineLogo, airlineName, departureCityName, destinationCityName, departureDate, price, transfers, flight_number } = ticket;
			return `
								<div class="col mt-2">
                    <div class="card dropdown-item  position-relative text-wrap p-0 h-100  favoriteTicketCard" id="${uniqueId}">
                        <div class="card-body  m-0">
                            <div class="d-flex align-items-center airlineBlock">
                                <span class="small text-wrap d-none d-sm-inline-block border-bottom border-secondary">${airlineName}</span>
                            </div>
                            <div class="d-flex align-items-center border-bottom border-primary flightCities" >
                                <div class="d-flex align-items-center mr-auto">
                                    <span class="small">${departureCityName}</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="small">${destinationCityName}</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-center detailsBlock">
                                <span class="text-monospace text-muted small">${departureDate}</span>
                                <span class="ml-auto text-danger small currencyField">${currencyUI.moneySighn}${price}</span>
                            </div>
                            <div class="ticket-additional-info">
                                <span class="font-italic small" > Номер рейса: ${flight_number}.</span>
                            </div>
                            <div class="d-flex">
                                <button class="btn btn-sm btn-outline-danger ml-auto removeFromFavoritesButton">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
			`;
		}
		
	}
	
	const favoritesStore = new FavoritesStore();
	export default favoritesStore;