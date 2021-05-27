class CalcController{

	constructor(){

		this._calcList = ['0'];
		//this._currentResult;
		this._calcDisplayEl = document.querySelector("#display");
		this.initialize();
		this.initButtonEvents();

	}

	initialize(){

		this.setLastNumberToDisplay();

	}

	initButtonEvents(){

		let buttons = document.querySelectorAll('div#calculadora button.btn');

		buttons.forEach((btn, index)=>{
			
			this.addEventListenerAll(btn, 'click drag', e =>{
			
				let btnVal = btn.value;

				this.exeBtn(btnVal);

			});

			this.addEventListenerAll(btn, 'mouseover mouseup mousedonw', e =>{

				btn.style.cursor = "pointer";

			});

		});
		
	}



	exeBtn(value){

		if (!isNaN(value)){

			this.addNumber(value);

		} else if (this.isRegularOpperator(value)){

			this.addOpperation(this.mapRegularOpperator(value));

		}

	}

	addNumber(value){

		let previous = this.getLastOpperation();

		if(isNaN(previous)){

			this._calcList.push(value);

		} else if(previous === '0'||previous === 0){

			this.setLastOpperation(value);

		} else{

			let newValue = previous + value;
			this.setLastOpperation(newValue);

		}
		this.setLastNumberToDisplay();

	}

	addOpperation(value){

		let previous = this.getLastOpperation();

		if(isNaN(previous) && previous){

			this.setLastOpperation(value);

		} else if (previous){

			this.pushOpperation(value);

		}

		this.setLastNumberToDisplay();

	}

	setLastNumberToDisplay(){

		let lastNumber = 0;

		if(!isNaN(this.getLastOpperation())){

			lastNumber = this.getLastOpperation();

			}else if(!isNaN(this._calcList[this._calcList.length-2])){

					lastNumber = this._calcList[this._calcList.length-2];

					}

		this.calcDisplay = lastNumber;

	}


//Auxiliary functions
	getLastOpperation(){

		return this._calcList[this._calcList.length-1];

	}

	setLastOpperation(value){

		this._calcList[this._calcList.length-1] = value;

	}

	pushOpperation(value){

		this._calcList.push(value);

		/*if(this._calcList.length > 3){

			this.calc();*/

		//}

	}

	get calcDisplay(){
			return this._calcDisplayEl.innerHTML;
		}

	set calcDisplay(value){
		this._calcDisplayEl.innerHTML = value;
	}

	addEventListenerAll(element, events, fn){
		events.split(' ').forEach(event => {

			element.addEventListener(event, fn, false);

		});

	}

	isRegularOpperator(value){

		return (['plus', 'minus', 'times', 'divide'].indexOf(value) > -1);

	}

	mapRegularOpperator(value){

		switch(value){

			case 'plus':
				return '+';
			case 'minus':
				return '-';
			case 'times':
				return '*';
			case 'divide':
				return '/';

		}

	}

}
