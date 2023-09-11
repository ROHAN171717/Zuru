let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById('list-container');
let addButton = document.getElementById("add-button");

addButton.addEventListener('click', addTask)

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("You must write something!");
    }
    else {
        createElements(inputBox.value, false)
    }
    inputBox.value = "";
    saveData();
}

function saveData() {
    let arr = [];
    let tasks = listContainer.getElementsByClassName('task');
    let checkbox = listContainer.getElementsByClassName('checkbox');

    for (let i = 0; i < tasks.length; i++) {
        let obj = {};
        obj.task = tasks[i].innerText;
        obj.checked = checkbox[i].checked;
        arr.push(obj);
    }
    localStorage.setItem("Tasks", JSON.stringify(arr));
}

function showTasks() {
    let tasks = localStorage.getItem("Tasks")
    let arrayOfTasks = [];
    if (tasks) {
        arrayOfTasks = JSON.parse(tasks)
    }
    arrayOfTasks.forEach((ele) => {
        createElements(ele.task, ele.checked)
    })
}

window.addEventListener('load', showTasks);

function createElements(text, checked) {
    let li = document.createElement('li');
    li.classList.add("item");

    let div1 = document.createElement('div');
    div1.classList.add('d1');

    let div2 = document.createElement('div');
    div2.classList.add('d2');

    let input1 = document.createElement('input');
    input1.type = "checkbox";
    input1.classList.add("checkbox");
    input1.checked = checked;
    div1.appendChild(input1);

    let para = document.createElement('p');
    para.classList.add('task');
    para.innerText = text;
    if (input1.checked) {
        para.classList.add('checked')
    }
    div2.appendChild(para);

    let crossIcon = document.createElement('span');
    crossIcon.innerText = "\u00d7";
    li.appendChild(div1);
    li.appendChild(div2);
    li.appendChild(crossIcon);

    li.addEventListener('click', function(e) {
        if (input1.checked) {
            if (e.target.tagName === "INPUT") {
                input1.checked = true;
                para.classList.add('checked');
            }else{
                input1.checked = false;
                para.classList.remove('checked');
            }
        } else {
            if (e.target.tagName === "INPUT") {
                input1.checked = false;
                para.classList.remove('checked');
            }else{
                input1.checked = true;
                para.classList.add('checked');
            }
        }
        saveData();
    })

    crossIcon.addEventListener('click', function (e) {
        e.target.parentElement.remove();
        saveData();
    })

    listContainer.appendChild(li);
}
