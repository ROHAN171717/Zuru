let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("You must write something!");
    }
    else {
        createElements(inputBox.value, "")
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener('click', function (e) {
    let ele = e.target.tagName;
    if (ele === "INPUT") {
        if (e.target.checked === true) {
            e.target.parentElement.parentElement.classList.add("checked");
            console.log(e.target.parentElement.parentElement);
        } else if (e.target.checked === false) {
            e.target.parentElement.parentElement.classList.remove("checked");
        }
        saveData();
    } else if (ele === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
})

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
    arrayOfTasks.map((ele) => {
        createElements(ele.task, ele.checked)
    })
}
showTasks();

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
    if(input1.checked){
        para.classList.add('checked')
    }
    div2.appendChild(para);

    let span = document.createElement('span');
    span.innerText = "\u00d7";
    li.appendChild(div1);
    li.appendChild(div2);
    li.appendChild(span);
    listContainer.appendChild(li);
}
