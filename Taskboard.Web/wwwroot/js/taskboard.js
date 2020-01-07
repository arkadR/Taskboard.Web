

var newUserStoryModal = document.getElementById("new-us-modal");
var newUserStoryButton = document.getElementById("new-us-button");
var newUserStoryClose = document.getElementsByClassName("close")[0];

var userStoryForm = document.getElementById('user-story-form');
var userStoryIdInput = document.getElementById("new-us-id");
var userStoryNameInput = document.getElementById("new-us-name");


newUserStoryButton.onclick = function() {
    newUserStoryModal.style.display = "block";
    userStoryNameInput.focus();
    userStoryIdInput.value = randInt(0, 1000);
};

newUserStoryClose.onclick = function() {
    newUserStoryModal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == newUserStoryModal) {
        newUserStoryModal.style.display = "none";
    }
};

function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    let id = event.dataTransfer.getData('text');
    let draggedItem = document.getElementById(id);
    let droppedOn = event.target;
    let dropzone = findAncestorWithClass(droppedOn, 'grid-item');
    if (dropzone.getAttribute('user_story_id') != draggedItem.getAttribute('user_story_id')) {
        return;
    }
    
    let state = dropzone.id.toString().split('_').pop();
    let taskId = id.toString().split('_').pop();
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", `php/task/change_state.php`);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(`id=${taskId}&state=${state}`);

    let newTaskPlaceholder = dropzone.getElementsByClassName('task-new')[0];
    if (newTaskPlaceholder) {
        dropzone.insertBefore(draggedItem, newTaskPlaceholder);
    }
    else {
        dropzone.appendChild(draggedItem);
    }

    event.dataTransfer.clearData();
}

function deleteTask(id) {
    let task = document.getElementById('task_'+id);
    task.parentElement.removeChild(task);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", `php/task/delete.php`);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(`id=${id}`);
}

function addTasks(parentId) {
    let parent = document.getElementById(parentId);
    let newUsPlaceholder = document.querySelector(`#${parentId} > .task-new`);

    let usId = parent.getAttribute('user_story_id');
    let newId = 0;
    for (x of parent.children) {
        if (x.classList.contains('task')) {
            if (parseInt(x.getAttribute('task_id')) >= newId) {
                newId = parseInt(x.getAttribute('task_id')) + 1;
            }
        }
    }
    let task = createTask(usId, newId);
    parent.insertBefore(task, newUsPlaceholder);
    task.getElementsByClassName('task-title')[0].focus();
}

function createTask(usId, taskId) {
    let task = document.createElement('div');
    task.id = `task_${usId}_${taskId}`;
    task.setAttribute('user_story_id', usId);
    task.setAttribute('task_id', taskId)
    task.classList.add("task");
    task.draggable = true;
    task.ondragstart = event => onDragStart(event);
    task.style.borderColor = randColor();
    let removeButton = document.createElement('div');
    removeButton.classList.add('close');
    removeButton.innerHTML = '&times';
    removeButton.addEventListener('click', ev => {
        task.parentElement.removeChild(task);
    })
    let taskTitle = document.createElement('textarea');
    taskTitle.classList.add('task-title');
    taskTitle.addEventListener('blur', ev => {
        if (!event.target.value)
            task.parentElement.removeChild(task);
        else {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST", `php/task/create.php`);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send(`name=${encodeURIComponent(event.target.value)}&parentId=${usId}`);
        }
    })
    let taskAssignee = document.createElement('input');
    taskAssignee.type = 'text';
    taskAssignee.classList.add('task-assignee');
    taskAssignee.placeholder = 'Unassigned';
    task.appendChild(taskTitle);
    task.appendChild(taskAssignee);
    task.appendChild(removeButton);


    return task;
}

function findAncestorWithClass(element, className) {
    while (!element.classList || !element.classList.contains(className)) {
        if (!element.parentElement)
            return null; 
        element = element.parentElement;
    }
    return element;
}


function randInt(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
}

function randColor() {
    let hex = '0123456789ABCDEF';
    var colorString = '#';
    for (let i = 0; i < 6; i++) {
        colorString += hex[randInt(0, 16)];
    }
    return colorString;
}

function checkDefinition(){
	let x = parseInt(document.getElementById("dictionary_number").value);
	if(!isNaN(x)){
		if(x==1){
			alert("Na tablicy kanban znajdują się zadania do realizacji, przedstawione przy pomocy kolorowych kart.");
		}
		else if (x==2){
			alert("Deadline oznacza granicę czasową, przed jaką dany task ma zostać wykonany.");
		}
		else if (x==3){
			alert("Task to zadanie będące częścią projektu, posiada deadline oraz osobę przydzieloną.");
		}
		else alert("Podaj poprawny numer!");
	}
	else alert("Błędny input!");
}

function rate(){
	let srednia = parseFloat(document.getElementById("srednia").innerHTML);
	let liczbaGlosow = parseInt(document.getElementById("liczbaGlosow").innerHTML);
	let x = parseFloat(document.getElementById("ocena_input").value);
	if(!isNaN(x)){
		if(x>=1.0 && x<=5.0){
			let y = (srednia * liczbaGlosow + x) / (liczbaGlosow+1);
			liczbaGlosow+=1;
			document.getElementById("srednia").innerHTML = y.toString();
			document.getElementById("liczbaGlosow").innerHTML = liczbaGlosow.toString();
		}
		else alert("Skala oceniania <1.0,5.0>");
	}
	else alert("Błędny input!");
}

function goToRegister() {
		window.location.href = "register.html";
}