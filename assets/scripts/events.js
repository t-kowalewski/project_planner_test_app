const btn = document.querySelector('button');
// Ways of adding events

// #1 This way (anon funct) or point to named one
// btn.onclick = () => {
//   alert('Hi there!');
// };

// #2 Main approach - can add multiple listeners to one DOM element
// const btnHandler = (event) => {
//   // console.log('Hi there!');
//   console.log(event);
// };

// btn.addEventListener('click', btnHandler);
/////////////

// Removing event listeners - event & function should be the SAME / remember functions are objects - referenced values
// setTimeout(() => {
//   btn.removeEventListener('click', btnHandler);
// }, 3000);

/////////////
// Scroll events
// window.addEventListener('scroll', (event) => {
//   console.log(event);
// });

// Events & forms - Preventing default behavior (page reload)
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event);
});

/////////////
// Event Bubling & Capturing
const div = document.querySelector('div');

div.addEventListener(
  'click',
  (event) => {
    console.log('Clicked Div');
    console.log(event);
  }
  // true // switch listener into capturing phase
);

btn.addEventListener('click', (event) => {
  event.stopPropagation(); //don't bubble up event / or capture (bubble down)
  // event.stopImmediatePropagation(); //removes other listeners that button may have - only this listener will execute
  console.log('Clicked Button');
  console.log(event);
});

// document.body.addEventListener('click', () => {
//   console.log('Here is body');
// });

//////////////
// Event Delegation
const listItems = document.querySelectorAll('li');

// Bad for performance
// for (item of listItems) {
//   item.addEventListener('click', (event) => {
//     // console.log(event);
//     event.target.classList.toggle('red-background');
//   });
// }

const list = document.querySelector('ul');

list.addEventListener('click', (event) => {
  console.log(event);
  console.log(event.currentTarget);
  event.target.closest('li').classList.toggle('red-background');
});
