// Seleção de elementos 
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Funções 

// Esta função pega os elementos HTML 
const saveTodo = (text) => {
  const todo = document.createElement("div")
  todo.classList.add("todo")

  const todoTitle = document.createElement("h3")
  todoTitle.innerText = text
  todo.appendChild(todoTitle)

  const doneBtn = document.createElement("button")
  doneBtn.classList.add("finish-todo")
  doneBtn.innerHTML = '<i class="bi bi-check2"></i>'
  todo.appendChild(doneBtn)

  const editBtn = document.createElement("button")
  editBtn.classList.add("edit-todo")
  editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>'
  todo.appendChild(editBtn)

  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("remove-todo")
  deleteBtn.innerHTML = '<i class="bi bi-trash"></i>'
  todo.appendChild(deleteBtn)

  // Adssionando a lista no todo-list 
  todoList.appendChild(todo)

  // Limpando o Input quando o formulário for enviado
  todoInput.value = " ";

  // Focar no input toda vez que enviar o formulário
  todoInput.focus();
}; 

// Esta função esconde e mostra o formulário adcionar tarefa e o editar tarefa 
const toggleForms = () => {
  // Escondendo o edit-form 
  editForm.classList.toggle("hide")

  // Escondendo adcionar tarefa 
  todoForm.classList.toggle("hide")

  // Escondendo a lista 
  todoList.classList.toggle("hide")
}

// Eventos

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if(inputValue) {
    saveTodo(inputValue);
  }    
});

// Função atualizar edição
const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo")

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3")
    
    if(todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  })
}

// Evento de click dos botões 
document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if(parentEl && parentEl.querySelector("h3")){
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if(targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if(targetEl.classList.contains("remove-todo")) {
    parentEl.remove()
  }

  if(targetEl.classList.contains("edit-todo")){
    toggleForms();

    editInput.value = todoTitle
    oldInputValue = todoTitle
  }
});

// Botão Cancelar 
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
})

// Salvando edição na memária 
editForm.addEventListener("submit", (e) =>{
  e.preventDefault();

  const editInputValue = editInput.value

  if(editInputValue){
    // Atualiazar
    updateTodo(editInputValue);
  }

  toggleForms();
})