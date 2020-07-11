import moment from 'moment';
import api from '../services/apiService';

class Locations {
  constructor(_api) {
    this.api = _api;
    this.countries = null;
    this.cities = null;
    this.dataForAutocomplete = null;
    this.airlines = null;
    this.lastSearch = null;
  }

  // ? Метод записывает страны и города в массив массивов с помощью запроса, который был вызван из API сервиса.
  // ? Перед return метод разделяет массив с помощью деструктуризации и записывает нужные нам значения(массивы стран и городов) в свойства класса
  // ? Возвращает  массив массивов стран и городов
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);
    const [countriesFromArray, citiesFromArray, airlines] = response;
    this.countries = countriesFromArray;
    this.cities = citiesFromArray;
    this.serializeCountries(this.countries);
    this.serializeCities(this.cities);
    this.createDataForAutocomplete(this.cities);
    this.serializeAirlines(airlines);
    // console.log(this.cities);
    return response;
  }

  // ? Преобразование стран, городов, авиакомпаний к подобающему виду
  serializeCountries(countries) {
    // {'Country code':{...}}
    this.countries = countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
    return this.countries;
  }

  serializeAirlines(airlines) {
    this.airlines = airlines.reduce((acc, airObj) => {
      const airLogo = airObj.code || 'null';
      // eslint-disable-next-line no-param-reassign
      airObj.logo = `http://pics.avs.io/200/200/${airLogo}.png`;
      // eslint-disable-next-line no-param-reassign
      airObj.name = airObj.name || airObj.name_translations.en;
      acc[airLogo] = airObj;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    // {`City name, country name: ' '}
    this.cities = cities.reduce((acc, city) => {
      const cityName = city.name || city.name_translations.en;
      const countryName = this.getCountryNameByCode(city.country_code || null);
      const fullName = `${cityName}, ${countryName}`;
      acc[city.code] = {
        ...city,
        countryName,
        fullName,
      };
      return acc;
    }, {});
    return this.cities;
  }

  // ? Получаем имя города по коду, имя страны по коду, код по имени и другие полезные плюшки
  getCountryNameByCode(code) {
    if (!this.countries[code]) return ' ';
    return this.countries[code].name || this.countries.name_translations.en;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code].name ? this.airlines[code].name : 'Your aviaticket';
  }

  getCityCodeByName(name) {
    try {
      const city = Object.values(this.cities).find((item) => item.fullName.split(' ').join('') === name.split(' ').join(''));
      return city.code;
    } catch (err) {
      console.log(`${new Error(err)}: Не можем найти код города по имени города. Имя города неверное`);
      alert('Мы не можем найти такое имя города, попробуйте выбрать название города из выпадающего списка предложений');
      return null;
    }
  }

  getArilinesLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : '';
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getTicketObjectById(_id) {
    const ticket = this.lastSearch.filter((ticket) => ticket.uniqueId === _id);
    console.log(ticket[0]);
    return ticket[0];
  }

  // ? Создаем правильные объекты для автокомплита, для вывода билетиков и добываем уникальных айдишник.
  createDataForAutocomplete(cities) {
    // {CityName, CountryName: CityCode,CountryCode}
    // console.log(cities);
    this.dataForAutocomplete = Object.entries(cities).reduce((acc, [, cityObj]) => {
      acc[cityObj.fullName] = ' ';
      return acc;
    }, {});
  }

  createUniqueId() {
    return `_${Math.random().toString(36).substr(2, 9)}`;
  }

  createCardInfo(tickets) {
    return Object.values(tickets).map((oneTicket) => ({
      ...oneTicket,
      departureCityName: this.getCityNameByCode(oneTicket.origin),
      destinationCityName: this.getCityNameByCode(oneTicket.destination),
      airlineLogo: this.getArilinesLogoByCode(oneTicket.airline),
      airlineName: this.getAirlineNameByCode(oneTicket.airline),
      departureDate: moment(oneTicket.departure_at).format('D MMMM YYYY, h:mm'),
      uniqueId: this.createUniqueId(),
    }));
  }

  // ? Делаем запрос через apiService, получаем билетики
  async fetchTickets(params) {
    const {
      origin, destination, depart_date, return_date, currency,
    } = params;
    if (!(origin && destination && depart_date && return_date && currency)) {
      return null;
    }
    try {
      const response = await this.api.tickets(params);
      if (response.statusText) {
        this.lastSearch = this.createCardInfo(response.data.data);
        return this.lastSearch;
      }
    } catch (err) {
      alert(err);
      return err;
    }
  }
}

const locations = new Locations(api);

export default locations;
