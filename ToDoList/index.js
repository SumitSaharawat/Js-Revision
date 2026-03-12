let input = document.querySelector('#taskInput');
const button = document.querySelector('#task');
const task = document.querySelector('#taskList');

button.addEventListener('click', () => {
    if(input.value === ""){
        window.alert("Please enter task")
    }else{
        const child = document.createElement("li");
        const removeButton = document.createElement('button');
        const completeButton = document.createElement('button');

        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        completeButton.innerHTML = '✔'; 

        child.innerHTML = input.value;
        child.appendChild(removeButton);
        child.appendChild(completeButton);
        task.appendChild(child);

        removeButton.addEventListener('click', () => {
            task.removeChild(child);
        })

        completeButton.addEventListener('click', () => {
            child.classList.toggle('completed');
        })
    }

})

