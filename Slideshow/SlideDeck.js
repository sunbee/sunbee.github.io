import { Slide } from './Slide.js';
import { removeAllChildren } from './Swissknife.js';

async function initialize_deck(from, to) {
    var deck = [];
    for (var idx = from; idx <= to; idx++) {
        var quiz_name = './Slides/Quiz00' + idx + '.html';
        var slide = document.createElement("slide-quiz");
        slide.setAttribute("path2html", quiz_name);
        deck.push(slide);
    };
    return deck;
};

export class SlideDeck extends HTMLElement {
    constructor() {
        super();

        this._deck = [];

        this._iam = document.createElement("div");
    };

    async connectedCallback() {
        
        var from = Number(this.getAttribute("from"));
        var to = Number(this.getAttribute("to"));
        var current = Number(this.getAttribute("current"));
        await initialize_deck(from, to)
            .then( (deck) => {
                this._deck = deck;
                this._iam.appendChild(this._deck[current-1]);
                this.appendChild(this._iam);
                console.log(this._iam);
            }
        );
    };

    static get observedAttributes() {
        return ["current"];
    }

    async attributeChangedCallback(name, oldvalue, newvalue) {
        if (!oldvalue) { // null until set
            console.log("Chnanged" + name + oldvalue + newvalue);
            return;
        };
        removeAllChildren(this._iam);
        this._iam.appendChild(this._deck[Number(newvalue)-1]);
        this.appendChild(this._iam);
        console.log(this._iam);
    };

    get deck() {
        return this._deck;
    }
};

customElements.define('slide-deck', SlideDeck);