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