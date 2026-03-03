document.querySelector('#calculate').addEventListener('click', function() {
    const billAmount = parseFloat(document.querySelector('#bill').value);
    const tipPercentage = parseFloat(document.querySelector('#tip').value);
    
    if (isNaN(billAmount) || isNaN(tipPercentage) || billAmount < 0 || tipPercentage < 0)
    {
        alert('Please enter valid numbers for bill amount and tip percentage.');
        return;
    }
    
    const tipAmount = billAmount * (tipPercentage / 100);
    document.querySelector('#total').innerHTML = tipAmount.toFixed(2);
});