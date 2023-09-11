    let todos = [];
    const todosList = document.getElementById('todos');
    const todoInput = document.getElementById('textInput');
    const inputButton = document.getElementById('add');
    const clearButton = document.getElementById('clearButton');
    
    const apiKey = '3118e57e449a473bafd145849231009'
    const apiUrl = ''

    document.addEventListener('DOMContentLoaded', () => { // load from localStorage 
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            todos = JSON.parse(storedTodos);
            renderTodos();
        }
    });
    
    function addTodos(e) {
        e.preventDefault();
        console.log(todoInput.value); // logging for debugging
        const textValue = todoInput.value.trim();
        if(textValue !== "") {// check empty form
            todos.push({text: textValue, completed: false}); // default status is incomplete
            saveTodosToLocalStorage();
            todoInput.value = '';
            renderTodos();
        }
    }
    inputButton.addEventListener('click', addTodos);

    function removeTodo(index) {
        todos.splice(index, 1);
        saveTodosToLocalStorage();
        renderTodos();
    }

    function editTodo(index) {
        const currentElement = document.querySelector(`#todos div:nth-child(${index + 1}) p`);
        const taskText = currentElement.innerText;
        if (todoInput.value.trim() === '') { //check if input box is blank
            removeTodo(index);
            todoInput.value = taskText;
            todoInput.focus(); // move cursor to editing box
        }
    }
    
    function renderTodos() {
        todosList.innerHTML = '';
        todos.forEach((todo, i) => {
            const newHTML = `<div class="todoItem">
            <label class="custom-checkbox">
                <input type="checkbox" onchange="toggleStrikeThrough(${i})" ${todo.completed ? 'checked' : ''}>
                <i class="fa-solid fa-square checkbox-icon"></i>
            </label>
            <p id="todo_${i}" class="todoItemText">${todo.text}</p>
            <div class="actions"> 
                <i onclick="editTodo(${i})" class="fa-regular fa-pen-to-square"></i>
                <i onclick="removeTodo(${i})" class="fa-solid fa-trash"></i> 
            </div>
        </div>`;
            todosList.innerHTML += newHTML;
            const todoText = document.getElementById(`todo_${i}`);
            if (todo.completed) {
                todoText.style.textDecoration = 'line-through';
            } else {
                todoText.style.textDecoration = 'none';
            }
        });
    }
    
    function toggleStrikeThrough(index) {
        todos[index].completed = !todos[index].completed;
        saveTodosToLocalStorage();
        renderTodos();
    }

    function clearAllData() {
        const confirmation = window.confirm('Are you sure you want to clear all data?');
        if (confirmation) {
            todos = [];
        saveTodosToLocalStorage();
        renderTodos();
    }}
    
    function saveTodosToLocalStorage() { //save todos to localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    clearButton.addEventListener('click', clearAllData);
    renderTodos();
    
    function updateTime() {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const seconds = currentTime.getSeconds().toString().padStart(2, '0'); 
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = currentTime.toLocaleDateString(undefined, options);
        const timeString = `${hours}:${minutes}:${seconds}`;

        document.getElementById('time').textContent = timeString;
        document.getElementById('date').textContent = dateString;
    }
    setInterval(updateTime, 1000); // Update the clock every second (1000 milliseconds)
    window.onload = updateTime; // Initialize the clock when the page loads





