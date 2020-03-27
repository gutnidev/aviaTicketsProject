	//! Этот модуль отвечает за функционал обращения клиента с сервером.
	import axios from 'axios';
	import config from '../config/apiConfig.js';

	//? Этот класс будет сожержать методы работы с сервером, которые будут экспортированы в модуль взаимодействия
	class ApiService {
		constructor (config) {
			//? Ссылочка для запроса
			this.url = config.url;
		}
		//? Запрашиваем страны
		async countries(){
			try {
				const response = await axios.get(`${this.url}/countries`);
				return response.data;
			} catch (err) {
				console.log(err);

				return Promise.reject(err);
			}
		}
		//? Запрос города
		async cities(){
			try {
				const response = await axios.get(`${this.url}/cities`);
				return response.data;
			} catch (err) {
				console.log(err);
				return Promise.reject(err);
			}
		}
		//? Запрос билетиков по параметрам, которые переданы из api
		async tickets(params){
			try{
				const response = await axios.get(`${this.url}/prices/cheap`,{
					params,
				});
				return response;
			}catch (err) {
				console.log(`${new Error(err)} не получил билеты`);
				return Promise.reject(err);
			}
		}
		//? Тут запрашиваю коды авиалиний
		async airlines(){
			try{
				const promise = await fetch(`${this.url}/airlines`);
				const response = promise.json();
				return response;
			}catch {err} {
					console.log(new Error(err));
					return Promise.reject(err);
			}
		}

	}

	const api = new ApiService(config);
	export default api;