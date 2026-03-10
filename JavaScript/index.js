const typedTextSpan = document.querySelector('.typed-text');
const cursor = document.querySelector('.cursor');
let i = 0;
const words = ['Love', 'Jhakaas', 'mast', 'dhinchak', 'Weird'];

setInterval(type, 2000);

function type() {
  typedTextSpan.innerHTML = words[i];
  i++;
  if (i === 4) {
    i = 0;
  }
}

function erase() {}
