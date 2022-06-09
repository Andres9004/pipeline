const url = "http://localhost:8081/";
let getTodosBtn = document.getElementById("getTodoBtn");
let todoList = document.getElementById("todoList");
let completeList = document.getElementById("completeList");
let newTodoBtn = document.getElementById("addTodoBtn");
let updateTodoBtn = document.getElementById("updateTodoBtn");

getTodosBtn.onclick = getAllTodos
newTodoBtn.onclick = addTodo
updateTodoBtn.onclick = updateTodo

async function getAllTodos(){
  let result = await fetch(url+"todo");
  if(result.status===200){
    let data = await result.json();
    populateLists(data);
  }else{
    console.log("Could not fetch todos")
  }
}

function populateLists(data){
  todoList.innerHTML="";
  completeList.innerHTML="";
  for(todo of data){
    if(todo.complete==false){
      let element = document.createElement("li");
      element.innerText = todo.task;
      element.className = "list-group-item list-group-item-warn";
      todoList.appendChild(element);
    }else{
      let element = document.createElement("li");
      element.innerText = todo.task;
      element.className = "list-group-item list-group-item-success";
      completeList.appendChild(element);
    }
  }
}


async function addTodo() {
  let task = document.getElementById("newTodo").value;
  let todo = {
    task:task,
    complete:false
  };

  let response = await fetch(url + "todo",{
    method: "POST",
    body: JSON.stringify(todo),
    headers:{'Content-Type':'application/json'}
  });

  if (response.status === 201) {
    console.log("Todo was added")
  } else {
    console.log("Something went wrong. Status code returned was "+response.status);
  }
}


async function updateTodo() {
  let taskToUpdate = document.getElementById("TodoToUpdate").value;
  let todoToUpdate = {
    task: taskToUpdate,
    complete: true
  };

  let response = await fetch(url + "todo", {
    method: "PUT",
    body: JSON.stringify(todoToUpdate),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.status === 200) {
    console.log("Todo was updated")
  } else {
    console.log("Something went wrong. Status code returned was " + response.status);
  }
}
