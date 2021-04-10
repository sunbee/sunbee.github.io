class Observable {
    constructor(value) {
        this._value = value;
        this._listeners = [];   
    }

    subscribe(listener) {
        this._listeners.push(listener);
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

class Computed extends Observable {
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

const bind2DOM = (input, observed) => {
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

function makeBindings() {
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

// Create an observer instance
var observer = new MutationObserver( (mutations) => {
    mutations.forEach( (mutation) => {
        var newNodes = mutation.addedNodes; // DOM NodeList
        if (newNodes !== undefined && newNodes.length > 0) { // If there are new nodes added
            newNodes.forEach( (newNode) => {
                var description = "name: " + newNode.nodeName;
                if (newNode.id) {
                    description += " | ID: " + newNode.id;
                }
                // Check: Put container node under observation for DOM changes.
                // alert("Added: " + description);
            });
        }
    });
    // Check: Inserted HTML nodes from quiz file.
    // alert(document.getElementById("Expected").getAttributeNames()); 
    makeBindings();
});

// Configuration of the observer:
var config = { 
    attributes: true, 
    childList: true, 
    subtree: true 
};

document.addEventListener('DOMContentLoaded', () => {
    var plug = "Howdy, WebViewer!";
    var appInventor = window.AppInventor; 
    if (appInventor) { // Do this when js is processed in AppInventor.
        plug = window.AppInventor.getWebViewString();
    } 

    // The node to be monitored
    var target = document.getElementById("Question"); /// The node to be monitored
    // Pass in the target node, as well as the observer options
    observer.observe(target, config);            

    document.getElementById("Question").innerHTML = plug;
}); 
