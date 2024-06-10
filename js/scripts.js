const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const editBtn = document.querySelector("#edit-btn");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const filterSelect = document.querySelector("#filter-select");
const searchInput = document.querySelector("#search-input");
const ereaseBtn = document.querySelector("#erease-button");

let oldInputValue;

//Função de adicionar tarefa:
const saveTodo = (text, made = 0, save = 1) => {
  todoList.style.display = "flex";

  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("todo-btns");
  todo.appendChild(buttonsDiv);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.classList.add("buttons");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  buttonsDiv.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.classList.add("buttons");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  buttonsDiv.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-todo");
  removeBtn.classList.add("buttons");
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  buttonsDiv.appendChild(removeBtn);

  //Utilizando dados da LocalStorage

  if (made) {
    todo.classList.add("made");
  }
  if (save) {
    saveTodoLocalStorage({ text, made });
  }

  todoList.appendChild(todo);

  todoInput.value = ``;
  todoInput.focus();
};

//Função de cancelar edição:
const toggleForms = () => {
  todoList.style.display = "none";
  todoForm.style.display = "none";
  editForm.style.display = "block";
};

//Função de dar update na edição
const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = document.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      uptadeTodoLocalStorage(oldInputValue, text);
    }
  });
};

//Adicionar tarefa:
todoForm.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

// Opções da Tarefa:
document.addEventListener("click", (e) => {
  const eTarget = e.target;
  const parentEl = eTarget.closest(".todo");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  // Concluir tarefa:
  if (
    eTarget.classList.contains("finish-todo") ||
    eTarget.classList.contains("fa-check")
  ) {
    parentEl.classList.toggle("made");

    updateTodoStatusLocalStorage(todoTitle);
  }

  // Remover tarefa:
  if (
    eTarget.classList.contains("remove-todo") ||
    eTarget.classList.contains("fa-xmark")
  ) {
    todoList.removeChild(parentEl);
    if (!todoList.innerHTML) {
      todoList.style.display = "none";
    }

    removeTodoLocalStorage(todoTitle);
  }

  // Editar tarefa:
  if (
    eTarget.classList.contains("edit-todo") ||
    eTarget.classList.contains("fa-pen")
  ) {
    todoList.style.display = "none";
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
    editInput.focus();
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  editForm.style.display = "none";
  todoList.style.display = "flex";
  todoForm.style.display = "block";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  todoList.style.display = "flex";
  todoForm.style.display = "block";
  editForm.style.display = "none";
});

//Botão de filtrar os elementos da lista
filterSelect.addEventListener("change", (e) => {
  const todo = document.querySelectorAll(".todo");
  const selectedOption = e.target.value;
  const madeElements = document.querySelectorAll(".made");

  if (selectedOption == "all") {
    madeElements.forEach((element) => {
      element.classList.remove("hide");
    });
    todo.forEach((element) => {
      element.classList.remove("hide");
    });
  }
  if (selectedOption == "done") {
    madeElements.forEach((element) => {
      element.classList.remove("hide");
    });
    todo.forEach((element) => {
      if (
        element.classList.contains("todo") &&
        element.classList.contains("made")
      ) {
        return;
      } else {
        element.classList.toggle("hide");
      }
    });
  }
  if (selectedOption == "todo") {
    madeElements.forEach((element) => {
      element.classList.remove("hide");
    });
    todo.forEach((element) => {
      if (
        element.classList.contains("todo") &&
        element.classList.contains("made")
      ) {
        element.classList.toggle("hide");
      } else {
        element.classList.remove("hide");
      }
    });
  }
});

// Função de Pesquisar Tarefas
searchInput.addEventListener("keyup", (e) => {
  const elements = document.querySelectorAll(".todo h3");
  const searchValue = searchInput.value;
  const todoClass = document.querySelector(".todo");

  if (!searchValue) {
    todoClass.classList.remove("hide");
  }

  elements.forEach((e) => {
    let elementsText = e.innerHTML;
    let todoBox = e.closest(".todo");
    if (elementsText.includes(searchValue)) {
      todoBox.classList.remove("hide");
    } else {
      todoBox.classList.add("hide");
    }
  });
});

//Limpar campo de pesquisa
ereaseBtn.addEventListener("click", (e) => {
  const todoClass = document.querySelector(".todo");
  e.preventDefault();
  searchInput.value = "";
  searchInput.focus();
  todoClass.classList.remove("hide");
});

//Local Storage
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  return todos;
};

const loadTodos = () => {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.made, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text !== todoText);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.made = !todo.made) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

const uptadeTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();
