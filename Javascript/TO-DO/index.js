let inputBox, listContainer, addButton, editButton, editId;

// function starter() {
inputBox = document.getElementById("input-box");
listContainer = document.getElementById("list-container");
addButton = document.getElementById("add-button");
editButton = document.getElementById("edit-button");
// }

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You must write something!");
  } else {
    createElements(inputBox.value, false, Date.now());
    inputBox.value = "";
    saveData();
  }
}

addButton.addEventListener("click", addTask);

editButton.addEventListener("click", function () {
  let editedElement = document.getElementById(editId);
  if (editedElement) {
    document.getElementById(editId).querySelector(".task").innerText =
      inputBox.value;
  }
  inputBox.value = "";
  addButton.style.display = "block";
  editButton.style.display = "none";
  saveData();
});

function saveData() {
  let arr = [];
  let items = listContainer.getElementsByClassName("item");

  for (let i = 0; i < items.length; i++) {
    let obj = {};
    let task = items[i].querySelector(".task");
    let checkbox = items[i].querySelector(".checkbox");

    obj.id = items[i].id;
    obj.task = task.innerText;
    obj.checked = checkbox.checked;

    arr.push(obj);
  }
  localStorage.setItem("Tasks", JSON.stringify(arr));
}

function showTasks() {
  let tasks = localStorage.getItem("Tasks");
  let arrayOfTasks = [];
  if (tasks) {
    arrayOfTasks = JSON.parse(tasks);
  }
  arrayOfTasks.forEach((ele) => {
    createElements(ele.task, ele.checked, ele.id);
  });
}

window.addEventListener("load", function () {
  // starter();
  showTasks();
});

function createElements(text, checked, id) {
  let li = document.createElement("li");
  li.classList.add("item");
  li.id = id;

  let div1 = document.createElement("div");
  div1.classList.add("d1");

  let div2 = document.createElement("div");
  div2.classList.add("d2");  

  let input1 = document.createElement("input");
  input1.type = "checkbox";
  input1.classList.add("checkbox");
  input1.checked = checked;
  div1.appendChild(input1);

  let para = document.createElement("p");
  para.classList.add("task");
  para.innerText = text;
  if (input1.checked) {
    para.classList.add("checked");
  }
  div2.appendChild(para);

  let crossIcon = document.createElement("span");
  crossIcon.innerText = "\u00d7";

  let editIcon = document.createElement("i");
  editIcon.classList.add("fa");
  editIcon.classList.add("fa-edit");

  li.appendChild(div1);
  li.appendChild(div2);
  li.appendChild(crossIcon);
  li.appendChild(editIcon);

  para.addEventListener("click", function () {
    if (input1.checked) {
      input1.checked = false;
      para.classList.remove("checked");
    } else {
      input1.checked = true;
      para.classList.add("checked");
    }
    saveData();
  });

  input1.addEventListener("click", function () {
    if (input1.checked) {
      para.classList.add("checked");
    } else {
      para.classList.remove("checked");
    }
    saveData();
  });

  crossIcon.addEventListener("click", function (e) {
    e.target.parentElement.remove();
    saveData();
  });

  editIcon.addEventListener("click", function (e) {
    inputBox.value = e.target.parentElement.querySelector(".task").innerText;
    addButton.style.display = "none";
    editButton.style.display = "block";
    editId = id;
  });
  listContainer.appendChild(li);
}
