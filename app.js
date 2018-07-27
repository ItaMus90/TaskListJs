// Define UI Vars
var form = document.getElementById('task-form');
var taskList = document.getElementsByClassName('collection')[0];
var clearBtn = document.getElementsByClassName('clear-tasks')[0];
var filter = document.getElementById('filter');
var taskInput = document.getElementById('task');


//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);

    //Add task event
    form.addEventListener('submit',addTask);

    //Remove task event
    taskList.addEventListener('click',removeTask);

    //Clear task event
    clearBtn.addEventListener('click',clearTasks);

    //Fillter task event
    filter.addEventListener('keyup',filterTask);
}

//Get Tasks from LocalStorage
function getTasks(){
    var tasks;

    if(localStorage.getItem('tasks') === null){
        //Initilaize Array
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    for(var i = 0; i < tasks.length; i ++){
        //Create li element
        var li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create a task node and append to li
        li.appendChild(document.createTextNode(tasks[i]));
        //Create new link element
        var link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to li 
        li.appendChild(link);
        
        //Append li to ul
        taskList.appendChild(li);
    }
}


//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //Create li element
    var li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create a task node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    var link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li 
    li.appendChild(link);
    
    //Append li to ul
    taskList.appendChild(li);

    //Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input 
    taskInput.value = '';


    e.preventDefault();
}


//Store Task 
function storeTaskInLocalStorage(task){
    var tasks;

    if(localStorage.getItem('tasks') === null){
        //Initilaize Array
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')) {
         
        if(confirm('Are You Sure?')) {
                 e.target.parentElement.parentElement.remove();

                //Remove task from LoaclSrorage
                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
            }
    }
}

//Remove task from LoaclSrorage
function removeTaskFromLocalStorage(taskItem){
    var tasks;

    if(localStorage.getItem('tasks') === null){
        //Initilaize Array
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
    
}

//Clear Tasks
function clearTasks(){
    //taskList.innerHTML = '';

    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from LocalStroage
    clearTasksFromLocalSotage();
}

//Clear from LocalStroage
function clearTasksFromLocalSotage(){
    localStorage.clear();
}

//Filter task
function filterTask(e){
    var text = e.target.value.toLowerCase();

    var collectionItem = document.getElementsByClassName('collection-item');

    for(var i = 0; i < collectionItem.length; i++){
        var item = collectionItem[i].firstChild.textContent;
        
        if(item.toLowerCase().indexOf(text) != -1){
            collectionItem[i].style.display = 'block'; //Jquery show 
        }else{
            collectionItem[i].style.display = 'none'; //Jquery hidden 
        }
    }
}