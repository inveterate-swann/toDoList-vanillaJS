//user interaction doesn't provide results 
//solution: add interactivity so the user can manage to-do list

var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("add");
var completeTaskHolder = document.getElementById("completed-tasks");
var incompleteTaskHolder = document.getElementById("incomplete-tasks");

var createNewTaskElement = function (taskString) {
    //create list item
    var listItem = document.createElement("li");
    //input (checkbox)
    var checkBox = document.createElement("input"); //checkBox
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input"); //text
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
  
  
    //each element needs modified 
    checkBox.type = "checkbox";
    editInput.type = "text";
  
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
  
    label.innerText = taskString;
  
  
    //each element needs appendeding
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
  
    return listItem;
}




//add a new task
var addTask = function () {
  console.log("New task...");
  //create new list item with text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //append to incompleteTask
  if (taskInput.value === "") {

  } else {
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, completeTask);
  }
  
  taskInput.value = "";
}

//edit existing task
var editTask = function () {
  console.log("Edit task...");
  
  var listItem = this.parentNode;
  
  var editItem = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var buttonLabel = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("editMode");
  
    //if the class of the parent is in .editMode
  if (containsClass) {
      //switch from .editMode
      //label text becomes input value
      label.innerText = editItem.value;
      buttonLabel.innerText = "Edit";
  } else {
    //else 
      //switch to .editMode
      //input value becomes to label's text 
      editItem.value = label.innerText;
      buttonLabel.innerText = "Done";
  }
    
    //Toggle .editMode list item
  listItem.classList.toggle("editMode");
}

//delete tasks 
var deleteTask = function () {
  console.log("Delete task...");
    //remove the parent list from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
}
//mark task complete
var completeTask = function () {
  console.log("Complete task...");
  //when the box is checked
  var listItem = this.parentNode;
    //append the task list item to #completed-tasks
  completeTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, incompleteTask);
}
//mark task incomplete
var incompleteTask = function () {
  console.log("Incomplete task...");
  //when the box is checked
  var listItem = this.parentNode;
    //append the tast list item to #incomplete-tasks
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, completeTask);
}

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind new task...");    
  var editButton = taskListItem.querySelector("button.edit");
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var deleteButton = taskListItem.querySelector("button.delete");
 
    //select it's children
    //bind editTask to edit button
  editButton.addEventListener("click", editTask);

    //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
    //bind taskCompleted to checkbox
  checkBox.onchange = checkBoxEventHandler;

  
}

var ajaxRequest = function () {
  console.log("AJAX request");
  
}



//bind add button to add task
//addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], completeTask);
}


//cycle over completeTaskHolder ul list items
for (var i = 0; i < completeTaskHolder.children.length; i++) {
     //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completeTaskHolder.children[i], incompleteTask);
}



