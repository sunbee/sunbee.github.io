## Multi-Page Quiz in SPA with Custom HTML Nodes and Styling.

Advance slides and check the answer dynamically. Implementation uses custom HTML classes:
1. `slide-deck` is the deck with a quiz in each slide. The class holds an array of HTML nodes, each of which is an instance of `slide-quiz`, another custom HTML class.
2. `slide-quiz` is a single slide with a quiz question. It holds information about the number ID of the next slide. It also has the expected (i.e. correct) answer to the question.
3. `slide-control` is a set of 4 buttons to advance the deck and jump to 1st slide, next slide, last slide or a random slide.
4. The `slide-deck` element has attributes *from*, *to* and *current* to manage the deck. All slides are loaded during initialization (in the `connectedCallback()` method). The HTML docs in **Slides** folder are read to create corresponding `slide-quiz` elements. The values of *from* and *to* determine which slides are loaded and the value of *current* determines which slide is displayed in the viewport.
5. Bindings are used to provide responsive feedback to the player. Each `slide-quiz` element has a two-way data-binding. These bindings are made in the `connectedCallback()` method of the custom HTML class for `slide-quiz`.
6. Advancement to the next slide is based on changing the attribute *current* of the `slide-deck`'s div wrapper via the `setAttribute()` method. Implementation uses the `attributeChangedCallback()` of the custom HTML class for `side-deck`.
7. Styles are applied by linking a stylesheet in **index.html**.
8. Collapsible text has the button element in the slide, styling in the css stylesheet and javascript in the `slide-quiz` class where the click event is set during `connectedCallback()`.  
