// selectors
const todoInput = document.querySelector("input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const navigation = document.querySelectorAll("nav ul li");

// FUNCTIONS

// GET saved todos from local storage
const displaySavedTodos = () => {
  //check local storage for items
  let todos = getLocalStorage();
  todos.forEach((todo) => {
    buildTodoItem(todo);
  });
};

// ADD todo item
const addTodo = (e) => {
  // prevent form submission (refreshing page)
  e.preventDefault();

  buildTodoItem(todoInput.value);

  // check local storage for items and save them to 'todos'
  // then add the new todo to the array
  let todos = getLocalStorage();
  todos.push(todoInput.value);

  // push the array into the local storage ibject
  localStorage.setItem("todos", JSON.stringify(todos));

  // clear todo input value
  todoInput.value = "";
};

// FILTER todo between COMPLETE and INCOMPLETE and ALL
const filterOptions = (link) => {
  link.addEventListener("click", (link) => {
    navigation.forEach((link) => link.classList.remove("active"));
    if (link.target.id === "all") {
      link.target.classList.add("active");
      let todos = todoList.childNodes;
      todos.forEach((todo) => {
        todo.style.display = "flex";
      });
    } else if (link.target.id === "complete") {
      link.target.classList.add("active");
      let todos = todoList.childNodes;
      todos.forEach((todo) => {
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      });
    } else {
      link.target.classList.add("active");
      let todos = todoList.childNodes;
      todos.forEach((todo) => {
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      });
    }
  });
};

// COMPLETE or DELETE todo item
const completeOrDelete = (e) => {
  const item = e.target;

  // DELETE todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");

    // get the inner text of the todo item being deleted
    const todoIndex = todo.children[0].innerText;

    // check local storage for items and save them to 'todos'
    // splice(cut) the item that was clicked on
    let todos = getLocalStorage();
    todos.splice(todos.indexOf(todoIndex), 1);

    // push the array into the local storage ibject
    localStorage.setItem("todos", JSON.stringify(todos));

    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // MARK complete
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
};

// GET local storage array of todos
const getLocalStorage = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    // if no todos create empty array
    todos = [];
  } else {
    // if there are todos, add them to the array.
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
};

const buildTodoItem = (todo) => {
  // html div for todos
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-item");

  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  todoDiv.append(newTodo);

  // create checkmark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // append to list
  todoList.appendChild(todoDiv);
};

const app = () => {
  // event listeners
  document.addEventListener("DOMContentLoaded", displaySavedTodos);
  todoBtn.addEventListener("click", addTodo);
  todoList.addEventListener("click", completeOrDelete);
  navigation.forEach((link) => {
    filterOptions(link);
  });
};

app();
