let cal = document.querySelector('button');
let result = document.querySelector('#results');

cal.addEventListener('click', (e) => {
  e.preventDefault();
  let height = document.querySelector('#height').value;
  let weight = document.querySelector('#weight').value;

  if (isNaN(height) || height === '' || height < 0) {
    result.innerHTML = 'Please enter valid Height';
  } else if (isNaN(weight) || weight === '' || weight < 0) {
    result.innerHTML = 'Please enter valid Weight';
  } else {
    let final = bmi(height, weight);
    result.innerHTML = `<span>BMI : ${final}</span>`;
  }
});

function bmi(h, w) {
  let res = (w / ((h * h) / 10000)).toFixed(2);
  return res;
}