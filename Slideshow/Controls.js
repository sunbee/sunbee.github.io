import { makeBindings } from './Bindings.js';
import { randomInt } from './Swissknife.js';

/*
Advance to the next slide 
on the click of a button.
The button is in the slide-control element.
The advancement mechanism consists of 
attributeChangedCallback() of the div tag
that is the wrapper of the slide-deck element.
The attribute, current, is changed upon 
clicking the button via setAttribute() method,
triggering the attributeChangedCallback(),
advancing to the slide referenced by current.
Note that the HTML of every slide-quiz element
includes the number ID of the next page,
with the numbering scheme starting from 1. 
The slide-quiz elements are contained 
in the slide-deck element as
an array with indexes starting from 0. 
*/ 

var nxt = () => { 
	document.getElementById("Nxt").addEventListener("click", () => {
		document.querySelectorAll("[current]").forEach( (deckElement) => { // Slide-Deck
			deckElement.setAttribute("current", 
					// Slide ..
					document.getElementById("Pagination").getAttribute("data-pagedn"));
			console.log(deckElement);
		});
	});
};

var fst = () => { 
	document.getElementById("1st").addEventListener("click", () => { // Slide-Deck
		document.querySelectorAll("[current]").forEach( (deckElement) => {
			deckElement.setAttribute("current",
					deckElement.getAttribute("from"));
			console.log(deckElement);
		});
	});
};

var lst = () => { 
	document.getElementById("Lst").addEventListener("click", () => { // Slide-Deck
		document.querySelectorAll("[current]").forEach( (deckElement) => {
			deckElement.setAttribute("current",
					deckElement.getAttribute("to"));
			console.log(deckElement);
		});
	});
};

var rnd = () => { 
	document.getElementById("Rnd").addEventListener("click", () => { // Slide-Deck
		document.querySelectorAll("[current]").forEach( (deckElement) => {
			deckElement.setAttribute("current",
					randomInt(deckElement.getAttribute("from"), deckElement.getAttribute("to")));
			console.log(deckElement);
		});
	});
};

async function load_slide(path2html) {
	const response =  await fetch(path2html);
	const slide = await response.text();
	return slide;
};
  
export class Control extends HTMLElement {
	constructor() {
		super();
	};

	async connectedCallback() {
		this.innerHTML = await load_slide(this.getAttribute("path2html"));
		nxt();
		fst();
		lst();
		rnd();
	};
};

customElements.define('slide-control', Control);