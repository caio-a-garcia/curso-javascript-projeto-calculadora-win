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

		} else if (this.isSingleArgOpperator(value)){

			this.singleArgOpperation(value);

		} else switch(value){

			case 'clear':
				this.resetCalculations();
				break;
			case 'clear-element':
				this.popLastOpperation();
				break;
			case 'backspace':
				let previous = this.getLastOpperation();
				let start = -1*previous.length;
				let result = previous.slice(start,-1);
				this.setLastOpperation(result);
				break;
			case '.':
				this.addDot();
				break;
			case 'equal':
				this.equals();
				break;


		}

		this.setLastNumberToDisplay();

	}

	addNumber(value){

		let previous = this.getLastOpperation();

		if(isNaN(previous)){

			this.calcList.push(value);

		} else if(previous === '0'||previous === 0){

			this.setLastOpperation(value);

		} else{

			let newValue = previous + value;
			this.setLastOpperation(newValue);

		}

	}

	addOpperation(value){

		let previous = this.getLastOpperation();

		if(isNaN(previous) && previous){

			this.setLastOpperation(value);

		} else if (previous){

			this.pushOpperation(value);

		}

	}

	singleArgOpperation(value){

		let previous = this.getLastOpperation();
		let result = 0;

		if(!isNaN(previous) || previous != 0){

			switch(value){

				case 'percent':
					result = previous/100.0;
					break;
				case 'root':
					result = Math.sqrt(previous);
					break;
				case 'square':
					result = previous*previous;
					break;
				case 'invert':
					result = 1.0/previous;
					break;
				case 'negate':
					result = previous*(-1);
					break;

			}

			this.setLastOpperation(result);

		}

	}

	addDot(){

		let previous = this.getLastOpperation();

		if(!isNaN(previous) && !previous.includes('.')){

			let newValue = previous + '.';
			this.setLastOpperation(newValue);

		}

	}

	equals(){

		let lst = this.calcList;
		let i = 0;

		while(lst.length >= 3){

			console.log(lst);

			this.calculate();

			lst = this.calcList;

			i++;
			if(i > 10) {break;}

		}

	}

	calculate(){

		let val1 = parseFloat(this.shiftFirstOpperation());
		let op = this.shiftFirstOpperation();
		let val2 = parseFloat(this.getFirstOpperation());
		let result = 0;

		switch(op){

			case '+':
				result = val1 + val2;
				break;
			case '-':
				result = val1 - val2;
				break;
			case '*':
				result = val1 * val2;
				break;
			case '/':
				result = val1 / val2;
				break;

		}

		this.setFirstOpperation(result.toString());

	}


	setLastNumberToDisplay(){

		let lastNumber = '';//this.calcList;

		/*if(!isNaN(this.getLastOpperation())){

			lastNumber = this.getLastOpperation();

			}else if(!isNaN(this._calcList[this._calcList.length-2])){

					lastNumber = this._calcList[this._calcList.length-2];

					}*/

		//Setting the whole thing to the display since the calculation as a whole is not currently visible

		for(let i = 0; i < this.calcList.length; i++){

			lastNumber += this.calcList[i];

		}

		this.calcDisplay = lastNumber;

	}


//Auxiliary functions
	resetCalculations(){

		this.calcList = ['0'];

	}

	getLastOpperation(){

		return this.calcList[this.calcList.length-1];

	}

	setLastOpperation(value){

		this.calcList[this.calcList.length-1] = value;

	}

	setFirstOpperation(value){

		this.calcList[0] = value;

	}

	getFirstOpperation(){

		return this.calcList[0];

	}

	pushOpperation(value){

		this.calcList.push(value);

	}

	popLastOpperation(){

		this.calcList.pop();
		if (this.calcList.length == 0){

			this.calcList = ['0'];

		}

	}

	shiftFirstOpperation(){

		let result = this.calcList.shift();;

		/*if (this.calcList.length == 0){

			this.calcList = ['0'];

		} */

		return result;

	}

	get calcDisplay(){
			return this._calcDisplayEl.innerHTML;
		}

	set calcDisplay(value){
		this._calcDisplayEl.innerHTML = value;
	}

	get calcList(){
			return this._calcList;
		}

	set calcList(value){
		this._calcList = value;
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

	isSingleArgOpperator(value){

		return (['percent','root','square','invert','negate'].indexOf(value) > -1);

	}

}
