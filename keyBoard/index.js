window.addEventListener('keydown', (e) => {
  document.querySelector(
    '#insert'
  ).innerHTML = `<div class="key">${e.code}</div>`;
});
