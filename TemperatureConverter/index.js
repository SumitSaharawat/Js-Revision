const celciusInput = document.querySelector('#celsius');
const fahrenheitInput = document.getElementById('fahrenheit');
const kelvinInput = document.getElementById('kelvin');

celciusInput.addEventListener('input', () => {
    const celsius = parseFloat(celciusInput.value);
    if (!isNaN(celsius)) {
        fahrenheitInput.value = (celsius * 9/5) + 32;
        kelvinInput.value = celsius + 273.15;
    } else {
        fahrenheitInput.value = '';
        kelvinInput.value = '';
    }
});

fahrenheitInput.addEventListener('input', () => {
    const fahrenheit = parseFloat(fahrenheitInput.value);
    if (!isNaN(fahrenheit)) {
        celciusInput.value = (fahrenheit - 32) * 5/9;
        kelvinInput.value = ((fahrenheit - 32) * 5/9) + 273.15;
    } else {
        celciusInput.value = '';
        kelvinInput.value = '';
    }
});

kelvinInput.addEventListener('input', () => {
    const kelvin = parseFloat(kelvinInput.value);
    if(!isNaN(kelvin)){
        celciusInput.value = kelvin - 273.15;
        fahrenheitInput.value = ((kelvin - 273.15) * 9/5) + 32; 
    }else{
        celciusInput.value = '';
        fahrenheitInput.value = '';
        }
});