const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const editBtn = document.querySelector("#edit-btn");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const filterSelect = document.querySelector("#filter-select");



let oldInputValue;

//Função de adicionar tarefa:
const saveTodo = (text) => {
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
    const todos = document.querySelectorAll(".todo")


    todos.forEach((todo) => {
        let todoTitle = document.querySelector("h3")

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        } 
    })
}

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
  if (eTarget.classList.contains("finish-todo")) {
    parentEl.classList.toggle("made");
  }

  // Remover tarefa:
  if (eTarget.classList.contains("remove-todo")) {
    todoList.removeChild(parentEl);
  }

  // Editar tarefa:
  if (eTarget.classList.contains("edit-todo")) {
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

  todoList.style.display = "flex"
  todoForm.style.display = "block"
  editForm.style.display = "none"
});


filterSelect.addEventListener('change' , (e) =>{
    const todos = document.querySelector(".todo")
    const selectedOption = e.target.value

    if(selectedOption == "all"){
        
    }
    if(selectedOption == "done"){
        
    }
    if(selectedOption == "todo"){
    }
})