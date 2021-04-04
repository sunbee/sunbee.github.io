import { Observable, Computed, bind2DOM, makeBindings } from './Bindings.js';
import { Slide } from '/Slide.js';
import { Control } from '/Controls.js';
import { SlideDeck } from './SlideDeck.js';
import { removeAllChildren } from './Swissknife.js';

async function update_DOM(index) {
    /*
    Create custom HTML elements,
    slide-deck and slide-control,
    for insertion into the DOM.
    Set the attributes of the new elements
    for use in fleshing out the nodes
    at the time of insertion into DOM
    via the connectedCallback() method.
    Insert into DOM using appendChild()
    after removing previous children.
    The slide-deck loads an array 
    of slide-quiz elements and 
    the slide-control element
    handles pagination. Slide advancement
    occurs via the attributeChangedCallback()
    on the observed attribute, current,
    which is the current slide numvber. 
    */
    var slideDeck = document.createElement("slide-deck");
    slideDeck.setAttribute("from", "1");
    slideDeck.setAttribute("to", "3");
    slideDeck.setAttribute("current", "1");
    var question = document.getElementById("Question");
    removeAllChildren(question);
    question.appendChild(slideDeck);
    
    var control = document.createElement("slide-control");
    control.setAttribute("path2html", "./controls.html");
    var answer = document.getElementById("Controls");
    removeAllChildren(answer);
    answer.appendChild(control);

    return answer.parentElement;
};

export function loadSlide(index) {
    update_DOM(index);
};

