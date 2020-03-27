	import {myAutoDepart, myAutoReturn} from '../../plugins/autocomplete'
	import {pickerDepart,pickerReturn} from '../../plugins/picadayConfig'

	
	class FormUI{
		constructor () {
			this._form = document.forms[`searchForm`];
			this.autocompleteDepartInput = document.getElementById(`autocompleteDepart`);
			this.autocompleteReturnInput = document.getElementById(`autocompleteReturn`);
			this.datepickerDepartInput = document.getElementById(`datepickerDepart`);
			this.datepickerReturnInput = document.getElementById(`datepickerReturn`);
			this.autocompleteDepartObj = myAutoDepart;
			this.autocompleteReturnObj = myAutoReturn;
			this.datepickerDepartObj = pickerDepart;
			this.datepickerReturnObj = pickerReturn;
		}
		//? инитим наш автокомплит своими удобными объектами, активируем его после этого
		setAutocompleteData(data){
			this.autocompleteDepartObj.autocompleteData = data;
			this.autocompleteReturnObj.autocompleteData = data;
			this.activateAutocompleteInputs();
		}
		activateAutocompleteInputs(){
			if (this.autocompleteDepartInput.hasAttribute(`disabled`) && this.autocompleteReturnInput.hasAttribute(`disabled`)){
				this.autocompleteDepartInput.removeAttribute(`disabled`);
				this.autocompleteReturnInput.removeAttribute(`disabled`);
			}
		}
		formClear(){
			this.form.reset();
		}
		//? Получаем всякое
		get form(){
			return this._form;
		}
		get departLocationValue(){
			if(!this.autocompleteDepartInput.value){
			
			}
			return this.autocompleteDepartInput.value;
		}
		get returnLocationValue(){
			return this.autocompleteReturnInput.value;
		}
		get departDateValue(){
			return this.datepickerDepartObj.toString(`YYYY-MM`);
		}
		
		get returnDateValue(){
			return this.datepickerReturnObj.toString(`YYYY-MM`);
		}
	}
	
	
	
	
	const formUI = new FormUI();
	export default formUI;