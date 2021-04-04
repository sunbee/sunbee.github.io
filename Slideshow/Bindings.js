
export class Observable {
	constructor(value) {
		this._value = value;
		this._listeners = [];   
	}

	subscribe(listener) {
		this._listeners.push(listener)
	}

	notify() {
		this._listeners.forEach(listener => listener(this._value));
	}

	get value() {
		return this._value;
	}

	set value(val) {
		if (this._value != val) {
		  this._value = val;
		  this.notify();
		}
	}
} 

	let protagonist = new Observable("Joker!");
	protagonist.subscribe((val) => console.log(`Protagonist changed to ${val}`));
	protagonist.value = "Zhankar";
	console.log(protagonist.value);

export class Computed extends Observable {
	constructor (computer, dependents) {
		super(computer());	// Initialize computed value 
							// by call to constructor of Observable class
		const listener = (_) => {
			/*
			Helper function, corrals all dependents 
			(which are Observable instances,) and 
			recomputes the computed value, then
			notifies any listeners.
			Note that 'listeners' property is inherited
			from parent Observable class, hence the chaining effect.
			*/
			console.log('Listener in Computed got ' + _);
			this._value = computer();
			this.notify();  // Notify listeners of 'this' instance 
						  // of Computed class

		}
		dependents.forEach(dependent => dependent.subscribe(listener));    
	}

	get value() {
		return this._value;
	}

	set value(_) {
		/*
		Raise an exception, the value is computed from dependents, 
		not set.
		*/
		throw "Set no computed property.";
	}

}

	var first_name = new Observable("Dalai");
	var second_name = new Observable("Lama");

	var full_name = new Computed(() => `HH ${first_name.value} ${second_name.value}`, [first_name, second_name]);
	full_name.subscribe((val) => console.log(`The HH changed to ${val}`)); // Chaining

	first_name.value = "Panchen";
	first_name.value = "Vishnu";
	first_name.value = "Vishnu";

export const bind2DOM = (input, observed) => {
	/*
	Bind a DOM element of type input to data,
	with data wrapped in an instance of Observable class,
	so that any change to data updates the DOM and
	any change to the DOM updates the data (i.e. Observable instance).
	*/
	input.value = observed.value;
	observed.subscribe(() => input.value = observed.value);
	input.onkeyup = () => {observed.value = input.value; console.log(observed.value);}
}

export function makeBindings() {
	/* 
	Make bindings to update 
	the player's status in real-time
	while s/he enters their response 
	in the text-box.
	The status is computed based on
	the answer that is embedded in
	the quiz HTML.
	Bindings are made each time that
	the slide-deck is advanced.
	*/   
	var answer = document.getElementById("Expected").getAttribute("data-answer");
	var response = new Observable('ans');
	var passfail = new Computed( () => {
		return (response.value == answer) ? "Good!" : "Try!";
	}, [response]);

	var context = {
		response: response,
		passfail: passfail
	};

	document.querySelectorAll("[data-binding]").forEach( (inputElement) => {
		console.log("Bound:" + inputElement);
		bind2DOM(inputElement, context[inputElement.getAttribute("data-binding")]);
	});
};