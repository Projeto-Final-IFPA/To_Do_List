// Seleção de elementos 
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");

let oldInputValue;

// Funções 

// Função para gerar o HTML da tarefa
function generateTodoHTML(text) {
  return `
    <div class="todo">
      <h3>${text}</h3>
      <button class="finish-todo">
        <i class="bi bi-check2"></i>
      </button>
      <button class="edit-todo">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="remove-todo">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  `;
}

// Esta função salva a nova tarefa
const saveTodo = (text) => {
  // Inserindo o HTML na lista de tarefas (somente usando innerHTML)
  todoList.innerHTML += generateTodoHTML(text);

  // Limpando o Input quando o formulário for enviado
  todoInput.value = " ";

  // Focar no input toda vez que enviar o formulário
  todoInput.focus();

  // Removendo a classe "hide" da todo-list (only once)
  if (todoList.classList.contains("hide")) {
    todoList.classList.remove("hide");
  }
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

// Inicializando a lista oculta (hide class in HTML)
todoList.classList.add("hide");


// NOTFICATION BOTAO

const btn = document.querySelector(".botao");
const divMessage = document.querySelector(".alert");

const msg = "Tarefa adcionada com sucesso !!!";

function ativar(msg) {
  const message = document.createElement("div");
  message.classList.add("message");
  message.innerText = msg;
  divMessage.appendChild(message);

  setTimeout(() => {
    message.style.display = "none";
  }, 3000);
}

btn.addEventListener("click", () => {
  ativar(msg);
});