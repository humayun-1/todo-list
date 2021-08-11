const input = document.querySelector('.input')
const form = document.querySelector('.form')
const btn = document.querySelector('.input~i')
const ul = document.querySelector('.ul')
const error = document.querySelector('.error')


btn.addEventListener('click', submit)
let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []

function submit() {
    if (input.value === '') {
        error.innerText = `Note: You Can't Create An Empty Task`
    }

    else {
        error.innerHTML = '&nbsp'
        ul.innerHTML += `<li>
        <span class="todo">${input.value}</span>
        <span>
          <i class="fas fa-trash delete"></i>
          <i class="fas fa-pen edit"></i>
          <i class="fas fa-angle-up up"></i>
          <i class="fas fa-angle-down down"></i>
        </span>
      </li>`;

        todos.push(input.value)
        localStorage.setItem('todos', JSON.stringify(todos))

        input.value = '';
    }
}

ul.addEventListener('click', (e) => {

    // Delete Feature
    if (e.target.classList.contains('delete')) {
        e.target.parentNode.parentNode.classList.add('fall');

        temp = e.target.parentNode.parentNode.childNodes[1].innerText;
        let index = todos.indexOf(temp);
        // Send To Local Storage
        if (index == '0') {
            todos.shift();
            localStorage.setItem('todos', JSON.stringify(todos));

        }
        else {
            todos.splice(index, index)
            localStorage.setItem('todos', JSON.stringify(todos))
        }

        e.target.parentNode.parentNode.addEventListener('transitionend', () => {
            e.target.parentNode.parentNode.remove()
        })
    }
    // Edit Feature

    else if (e.target.classList.contains('edit')) {
        let temp;
        temp = e.target.parentNode.parentNode.childNodes[1].innerText;
        e.target.parentNode.parentNode.childNodes[1].innerHTML = `<input type="text" class="tempInput">`;
        let tempInput = document.querySelector('.tempInput');
        tempInput.value = temp;
        tempInput.addEventListener('keydown', (e) => {

            // Send To Local Storage

            if (e.key == 'Enter') {
                let index = todos.indexOf(temp);
                todos[index] = tempInput.value
                localStorage.setItem('todos', JSON.stringify(todos))
                e.target.parentNode.parentNode.childNodes[1].innerHTML = tempInput.value;
            }
        })
    }

    // Move UP Feature
    else if (e.target.classList.contains('up')) {
        let clickedTodo = e.target.parentNode.parentNode.childNodes[1].innerHTML;
        for (i = 1; i < ul.childNodes.length; i++) {

            if (ul.childNodes[i].childNodes[1].innerHTML == clickedTodo) {

                let aboveTodo = ul.childNodes[i - 1].childNodes[1];
                let thisTodo = ul.childNodes[i].childNodes[1];
                let tempTodo;
                if (!aboveTodo == '') {
                    error.innerHTML = '&nbsp;'
                    tempTodo = thisTodo.innerHTML;
                    thisTodo.innerHTML = aboveTodo.innerHTML;
                    aboveTodo.innerHTML = tempTodo;

                    // Send To Local Storage

                    let temp = [];
                    for (i = 1; i < ul.childNodes.length; i++) {
                        temp.push(ul.childNodes[i].childNodes[1].innerHTML);
                        localStorage.setItem('todos', JSON.stringify(temp))
                    }
                }
                else {
                    error.innerHTML = `The selected todo is already on top!`
                }
            }
        }
    }


    // Move Down Feature

    else if (e.target.classList.contains('down')) {
        let clickedTodo = e.target.parentNode.parentNode.childNodes[1];
        for (i = 1; i < ul.childNodes.length; i++) {

            if (ul.childNodes[i].childNodes[1].innerHTML == clickedTodo.innerHTML) {

                // console.log(ul.lastChild.childNodes[1].innerHTML);
                if (clickedTodo.innerHTML !== ul.lastChild.childNodes[1].innerHTML) {
                    let bottomTodo = ul.childNodes[i + 1].childNodes[1];
                    let thisTodo = ul.childNodes[i].childNodes[1];
                    let tempTodo;
                    error.innerHTML = '&nbsp;'
                    tempTodo = thisTodo.innerHTML;
                    thisTodo.innerHTML = bottomTodo.innerHTML;
                    bottomTodo.innerHTML = tempTodo;
                    let temp = [];

                    // Send To Local Storage

                    for (i = 1; i < ul.childNodes.length; i++) {
                        temp.push(ul.childNodes[i].childNodes[1].innerHTML);
                        localStorage.setItem('todos', JSON.stringify(temp))
                    }
                }
                else {
                    error.innerHTML = `The selected todo is already on bottom!`
                }
            }
        }
    }
})

// fetch Data from Local Storage When The Page is Fully Loaded 

document.addEventListener('DOMContentLoaded', () => {
    for (i = 0; i < todos.length; i++) {
        ul.innerHTML += `<li>
        <span class="todo">${todos[i]}</span>
        <span>
          <i class="fas fa-trash delete"></i>
          <i class="fas fa-pen edit"></i>
          <i class="fas fa-angle-up up"></i>
          <i class="fas fa-angle-down down"></i>
        </span>
      </li>`;
    }
})