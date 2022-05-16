// Add To Do Items

//UI variables
const form = document.querySelector("form");
const input = document.querySelector("#textTaskName"); 
const butonDeleteAll = document.querySelector("#butonDeleteAll"); 
const taskList = document.querySelector("#task-list");
let items;

// load items
loadItems();

//search event listeners
eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener("submit", addNewItem);

    // delete an item
    taskList.addEventListener("click", deleteItem);

    // delete all items
    butonDeleteAll.addEventListener("click",deleteAllItems);
}

function loadItems() {
items = getItemsFromLS();

    items.forEach(function(item) {
        createItem(item);
    });
}

// get items from Local Storage
function getItemsFromLS() {
    if(localStorage.getItem('items')===null){
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to Local Storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

// delete item from local storage
function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text) {
    //create li
    const li = document.createElement("li");
    li.className = "list-group-item bg-transparent fs-5"; //değistirmeyi unutma!!!
    li.appendChild(document.createTextNode(text));

    //create a
    const a = document.createElement("a");
    a.classList = "delete-item float-end";
    a.setAttribute("href", "#");
    a.setAttribute("onMouseOver","hover()");
    a.innerHTML =`<i class="fa-light fa-x" style="   background-color: #01003d;
    color: #ffffff;
    border: 3px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    opacity: 0.6;"></i>`;

    function hover() {
        document.a.backgroundColor = '#000000';
        document.a.color = '#ffffff';
        document.a.borderRadius = '3px';
        document.a.paddingLeft = '10px';
        document.a.paddingRight = '10px';
        document.a.opacity = '10';
    }

    //add a to li
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);
}

// add new items
function addNewItem(e) {
    if(input.value === '') {
        alert("Boş geçilemez!");
    } else {

    //create item
    createItem(input.value);

    // save to local storage
    setItemToLS(input.value);

    // clear input
    input.value = ""; }

    e.preventDefault();
}

// delete an item
function deleteItem(e) {
        if(e.target.className === 'fa-light fa-x') {
            if(confirm("Bunu silmek istediğinzden emin misiniz?")) {
            e.target.parentElement.parentElement.remove();

            // delete item from local storage
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

// delete all items
function deleteAllItems(e) {

    if(confirm("Hepsini silmek istediğinize emin misiniz?")) {
       while(taskList.firstChild){
           taskList.removeChild(taskList.firstChild);
       }
       localStorage.clear();
    } 
    e.preventDefault();
}