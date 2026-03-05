let birthdayInput = document.querySelector('#birthday');
let result = document.querySelector('#result');
let btn = document.querySelector('#btn');
let currentDate = new Date().toISOString().split('T')[0];
let input = null;
let curr = null;

birthdayInput.addEventListener('input', () => {
    input = birthdayInput.value;
    input = input.split("-");
});

curr = currentDate.split("-");

btn.addEventListener('click', () => {
    if(input === null)
    {
        result.innerHTML = "Please select Date of Birth";
    }else{
        result.innerHTML = res(curr, input)
    }
});

function res(current, input){

    let a = current[0] - input[0];
        
    if(input[1] > current[1])
    {
            a--;
        }else if (input[1] === current[1] && input[2] > current[2]){
            a--;
        }
    
    return a;
}



