	
	    var pickerDepart = new Pikaday({
        field: document.getElementById('datepickerDepart'),
		    yearRange: [2020],
		    minDate: moment()._d,
        format: 'DD.MM.YYYY',
		    reposition: false,
        onSelect: function() {
            const now = this.getDate();
            pickerReturn.show();
            pickerReturn.setMinDate(now);
						pickerReturn.setDate(now, true);
        }
    });
	    var pickerReturn = new Pikaday({
        field: document.getElementById('datepickerReturn'),
        format: 'DD.MM.YYYY',
		    yearRange: [2020],
		    reposition: false,
    });
	export  {pickerDepart,pickerReturn};
