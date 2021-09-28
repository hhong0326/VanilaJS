const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList")
    
const TODOS_LS = 'toDos';
let toDos = [];

function filterFn(toDo) {
    return toDo.id === 1;
}

function deleteToDo(event) {
    console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    //filter 걸러낸 것으로 새로운 array 생성 forEach처럼 각각 돈다.
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos;
    saveToDos();

    console.log(cleanToDos);
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");    
    const span = document.createElement("span");
    const newId = toDos.length+1;
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click", deleteToDo);

    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.id = newId;

    //ul에 만든 li 붙이기
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };

    toDos.push(toDoObj);
    saveToDos();

}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);

        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init() {
    
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();