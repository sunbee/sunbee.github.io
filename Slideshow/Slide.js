import { makeBindings } from './Bindings.js';

var elaborate = () => {
	document.getElementById("Elaboration").addEventListener("click", () => {
		if (document.getElementById('Content').style.display == 'block') {
			document.getElementById('Content') .style.display='none'
		} else {
			document.getElementById('Content') .style.display='block'
		}  
	});	  
}

async function load_slide(path2html) {
	const response =  await fetch(path2html);
	const slide = await response.text();
	return slide;
};
  
export class Slide extends HTMLElement {
	constructor() {
		super();
	};

	async connectedCallback() {
		this.innerHTML = await load_slide(this.getAttribute("path2html"));
		makeBindings();
		elaborate();
	};
};

customElements.define('slide-quiz', Slide);
