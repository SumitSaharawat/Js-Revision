let start = document.querySelector('#start');
let stop = document.querySelector('#stop');
let intervalId = null;

const randomColor = function () {
  const hex = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  document.body.style.backgroundColor = color;
};

start.addEventListener('click', () => {
    intervalId = setInterval(randomColor, 1000);
})

stop.addEventListener('click', () => {
    clearInterval(intervalId);
})

