# QnA
## Que-1: What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll.

## Ans-1:
1. getElementById use for finding element by using specific ID. It is best way to get element or value from any file.
2. getElementByClassName is using for finding all element where class name are same in a file. When we use getElementByClassName with a class name; if we use same class name in future then event will automatically added to this.
3. querySelector is a CSS Selector to finding matching element by using CSS Selector. It is a modern and versatile method. It is best for complex selections or when we only need one item but want to use CSS logic.
4. querySelectorAll is similar to querySelector, but it finds all elements that match the CSS selector. We use .forEach function without selection HTMLCollection. It is very developer-friendly.

## Que-2: How do you create and insert a new element into the DOM?
## Ans-2: 
To create and insert a new element into the DOM, we can follow three main steps:
  1. Create the element
  2. Add content or attributes
  3. Insert it into the DOM

### Create the Element
`const newDiv = document.createElement("div");`

### Add content
`newDiv.innerText = "This is a new div";` <br>
`newDiv.classList.add("box");` <br>
`newDiv.id = "new-box";`

### Insert it into the DOM
`const parent = document.getElementById("container");` <br>
`parent.appendChild(newDiv);`

## Que-3: What is Event Bubbling? And how does it work?
## Ans-3:
Event Bubbling is how events in the DOM “bubble up” from the element we clicked to its parent elements. Its work like that: <br> when we click a button inside a div → the button gets the click first → then the div → then the body → then the document. <br><br>
Let, we have a html like that: <br>
    `<div id="parent">
        <button id="child">Click Me</button>
    </div>`
<br>
And if we add js in here: <br>

    document.getElementById("child").addEventListener("click", function () {
    console.log("Button Clicked");
    });

    document.getElementById("parent").addEventListener("click", function () {
    console.log("Div Clicked");
    });
then, if we click the button we will got output like that:<br>
`Button Clicked` <br>
`Div Clicked`

I mean it work like <br> `button → div → body → html → document`
or <br> `Child ➝ Parent ➝ Grandparent ➝ ... ➝ Top`

## Que-4: What is Event Delegation in JavaScript? Why is it useful?
## Ans-4:
Event Delegation is a technique where we attach one event listener to a parent element instead of adding separate listeners to multiple child elements; and let event bubbling do the work.

Events triggered on child elements bubble up to their parent.

That means:
If we click a `<li>` inside a `<ul>`, the click event moves from: <br>
`li → ul → body → document`

Let see one example for this. Supposed we have a html like that: <br>
```html
<ul id="list">
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>`
</ul>
```

If we write js for this list than:
```javascript
document.getElementById("list").addEventListener("click", function (event) {
  if (event.target.classList.contains("item")) {
   console.log("Item clicked:", event.target.textContent);
   }
});
```
<br><br>
we get output like this: <br>
`Item clicked: Item 1` <br>
`Item clicked: Item 2` <br><br>
here only one listener on `<ul>` <br> Detects clicks on any `<li>` <br> Works even if new `<li>` are added later.

It’s Useful for improves performance. Saves memory. Handles dynamic elements automatically. Cleaner & more maintainable code

Especially helpful in:
1. Dynamic lists
2. Tables
3. Menus
4. Cards generated with JavaScript

## Que-5: What is the difference between preventDefault() and stopPropagation() methods?
## Ans-5:


`preventDefault()`:
Stops the **default browser behavior** of an element.

Example:

* Clicking a link normally opens a new page
* Submitting a form normally reloads the page

we can stop that:

```javascript
document.querySelector("a").addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Link won't open now");
});
```

`stopPropagation()`: Stops the event from **bubbling up** to parent elements.


```javascript
document.getElementById("child").addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("Child clicked only");
});
```

* `preventDefault()` when you don’t want the browser to do its normal thing
* `stopPropagation()` when you don’t want parent elements reacting

These two often get mixed up because they’re both used inside event handlers — but they solve **completely different problems**.

