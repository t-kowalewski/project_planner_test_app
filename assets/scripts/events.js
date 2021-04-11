const btn = document.querySelector('button');

// #1 This way (anon funct) or point to named one
// btn.onclick = () => {
//   alert('Hi there!');
// };

const btnHandler = () => {
  console.log('Hi there!');
};

// #2 Main approach - can add multiple listeners to one DOM element
btn.addEventListener('click', btnHandler);

// Removing event listeners - function should be the SAME / remember functions are objects - referenced values
setTimeout(() => {
  btn.removeEventListener('click', btnHandler);
}, 3000);
