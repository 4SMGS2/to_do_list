viewList();

function addToList() {
    const inputTextElement = document.getElementById('inputText');
    const inputText = inputTextElement.value.trim();

    if (inputText !== '') {
        const tasks = JSON.parse(localStorage.getItem('toDoList')) || [];
        const error = false;

        tasks.forEach((element) => {
            if (element === inputText) {
                alert('Такая задача уже есть!');
                error = true;
            }
        })

        if (!error) {
            tasks.push(inputText);
            
            localStorage.setItem('toDoList', JSON.stringify(tasks));

            inputTextElement.value = '';  

            createElement(inputText);
        }
    }
}

function createElement(element) {
    const li = document.createElement('li');

    li.textContent = element;
    li.setAttribute("onclick", "completeTask(this)");

    const del = document.createElement('button');
    del.textContent = 'Удалить';
    del.setAttribute("onclick", "deleteTask(this)");
    li.appendChild(del);

    toDoList.appendChild(li);    
}

function viewList() {
    const tasks = JSON.parse(localStorage.getItem('toDoList')) || [];
    const toDoList = document.getElementById('toDoList');

    tasks.forEach((element, index) => {
        createElement(element);
    });
}

function completeTask(el) {
    el.style.textDecoration = "line-through";
}

function deleteTask(el) {
    const tasks = JSON.parse(localStorage.getItem('toDoList'));
    const taskText = el.closest('li').textContent;

    const tasksUpdate = tasks.filter((element) => element !== taskText.slice(0, -7));

    localStorage.setItem('toDoList', JSON.stringify(tasksUpdate));
    el.closest('li').remove();
}