let Tasks = [
    {id: 1,tarea: "Dominar el mundo",completada: false},{id: 2,tarea: "Luchar con el odio que me tengo",completada: false},{id: 3,tarea: "Contemplar el abismo",completada: false}
]

const btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click",() =>{
    if((document.querySelector("#newTask").value) !== ''){
        let lastId = null;
        let newId = null;
        let newTask = document.querySelector("#newTask").value;
        if((Tasks.length) !== 0){
            lastId = Tasks[(Tasks.length-1)].id;
            newId = lastId + 1;
        }else{
            newId = 1;
        }
        Tasks.push({id: newId, tarea: newTask, completada: false})
        document.getElementById('newTask').value = '';
        displayTasks();
        total();
    }
})

let list = document.querySelector("#lista");


const displayTasks = () => {
    let html = "";
    list.innerHTML = "";
    let checker = document.querySelector("#checkers");
    checker.innerHTML = "";
    let remover = document.querySelector("#removers");
    remover.innerHTML = "";
    Tasks.forEach((item) => {
        html += `<li id="${item.id}">${item.id}<span>${item.tarea}</span></li>`
        addChecker(item.id);
        removeBtn(item.id);
    })
    list.innerHTML += html;
    
}

const addChecker = (id) => {
    let checker = document.querySelector("#checkers");
    let tareaIndex = Tasks.findIndex((tarea)=> tarea.id === id);
    checker.innerHTML += `<input type="checkbox" onclick="actualizar(${id})" id="checker${id}" ${Tasks[tareaIndex].completada ? 'checked' : null} >`
}

const actualizar = (id) => {
    let tareaIndex = Tasks.findIndex((tarea)=> tarea.id === id);
    Tasks[tareaIndex].completada = !Tasks[tareaIndex].completada;
    let tareasRealizadas = Tasks.filter(tarea => tarea.completada == true);
    if(Tasks[tareaIndex].completada == true){
        document.getElementById(id).style.color = "rgb(0, 215, 0)";
    }else{
        document.getElementById(id).style.color = ""
    }

}


const removeBtn = (id) => {
    document.querySelector("#removers").innerHTML += `<i class="fa-solid fa-xmark" onclick="remove(${id})" id="remover${id}"></i>`
}

const remove = (id) => {
    let tareaIndex = Tasks.findIndex((tarea)=> tarea.id === id);
    let checker = "checker"+String(id);
    let remover = "remover"+String(id);
    let lineChecker = document.getElementById(checker);
    let lineRemover = document.getElementById(remover);
    lineChecker.parentNode.removeChild(lineChecker);
    lineRemover.parentNode.removeChild(lineRemover);
    Tasks.splice(tareaIndex,1);
    displayTasks();
    total();
    console.log(Tasks);
}


const total = () => {
    document.querySelector("#total").innerHTML = Tasks.length;
}

displayTasks();
total();
