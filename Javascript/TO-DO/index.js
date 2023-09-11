let inputBox = document.getElementById("input-box");
let listContainer = document.getElementById('list-container');

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    }
    else {
        let li = document.createElement('li');
        li.classList.add("item");

        let div1 = document.createElement('div');
        div1.classList.add('d1');

        let div2 = document.createElement('div');
        div2.classList.add('d2');

        let input1 = document.createElement('input');
        input1.type = "checkbox";
        input1.classList.add("checkbox");
        div1.appendChild(input1);

        let para = document.createElement('p');
        para.classList.add('task');
        para.innerHTML = inputBox.value;
        div2.appendChild(para);

        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(div1);
        li.appendChild(div2);
        li.appendChild(span);
        listContainer.appendChild(li);
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
}, false)

function saveData() {
    let arr = [];
    let tasks = listContainer.getElementsByClassName('task');
    let checkbox = listContainer.getElementsByClassName('checkbox');

    for (let i = 0; i < tasks.length; i++) {
        let obj = {};
        obj.task = tasks[i].innerHTML;
        obj.checked = checkbox[i].checked;
        arr.push(obj);
    }
    localStorage.setItem("Tasks", JSON.stringify(arr));
}

function showTasks() {
    let tasks = localStorage.getItem("Tasks")
    let demo = {};
    if(tasks){
     demo = JSON.parse(tasks)
    }else {
        return;
    }
    console.log(demo?.length);

    for(let i = 0; i < demo.length; i++){
        let li = document.createElement('li');
        li.classList.add("item");

        let div1 = document.createElement('div');
        div1.classList.add('d1');

        let div2 = document.createElement('div');
        div2.classList.add('d2');

        let input1 = document.createElement('input');
        input1.type = "checkbox";
        input1.classList.add("checkbox");
        input1.checked = demo[i].checked;
        div1.appendChild(input1);

        let para = document.createElement('p');
        para.classList.add('task');
        para.innerHTML = demo[i].task;
        div2.appendChild(para);

        let span = document.createElement('span');
        span.innerHTML = "\u00d7";

        li.appendChild(div1);
        li.appendChild(div2);
        li.appendChild(span);
        listContainer.appendChild(li);
        
        if(demo[i].checked === true){
            listContainer.getElementsByTagName('li')[i].classList.add("checked");
        }
    }
}
showTasks();

