document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    try {
        validateForm();
        alert('Formulario enviado correctamente');
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

function validateForm() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const comentarios = document.getElementById('comentarios').value;

    if (!nombre || !apellido || !email || !telefono || !pais || !comentarios) {
        throw new Error('Todos los campos son obligatorios');
    }

    if (!validateEmail(email)) {
        throw new Error('El correo electrónico no es válido');
    }

    if (!validatePhone(telefono)) {
        throw new Error('El número de teléfono no es válido');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);

}


let tasks = []; // crea un array vacio (listas)

const form = document.querySelector(".form_task"); // Formulario
const taskInput = document.querySelector("#taskInput"); // Input
const taskList = document.querySelector("#taskList"); // Lista de li

// Muestrar las tareas en el HTML
const renderTasks = () => {
    taskList.innerHTML = ""; // Borrar toda la informacion del ul
    tasks.forEach((task) => {
        // Dinamico con el texto ingresado en el input
        const html = ` 
            <li data-id="${task.id}" class="tasks__item">
                <p class="${task.completa && "done"}">${task.txt_tarea}</p>
                <div>
                    <i class="bx bx-check"></i>
                    <i class="bx bx-trash"></i>
                </div>
            </li>
        `;
        taskList.innerHTML += html;
    })
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const txt_tarea = (taskInput.value.trim());

    let erroresValidacion = false;
    
    if(txt_tarea.length < 5){
        erroresValidacion = true;
        const error = document.querySelector(".error")
        error.textContent = "El texto de la tarea debe contener al menos 5 caractres";

        setTimeout(() => {
            error.textContent = "";
        }, 4000); // 4.000 milisegundos
    } 

    if(!erroresValidacion){

       const task = {
            id: Date.now(), 
            txt_tarea: txt_tarea,
            completa: false,
       };
       
       tasks.push(task); 
       console.log(tasks)
       localStorage.setItem("tasks", JSON.stringify(tasks));
    

       taskInput.value = ""; 

       renderTasks();
    }
})


taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("bx-check")){

        
        const id = event.target.closest("li").dataset.id;

        const task = tasks.find((task) => task.id == id);

        task.completa = !task.completa;
        console.log(task);

        renderTasks();


        event.target.closest("li").querySelector("p").classList.toggle("done");

        localStorage.setItem("tasks", JSON.stringify(tasks));
    };


    if(event.target.classList.contains("bx-trash")){
        const id = event.target.closest("li").dataset.id;
        const taskIndex = tasks.findIndex((task)=> task.id == id);

        tasks.splice(taskIndex, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        event.target.closest("li").remove();

    }
});


document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    renderTasks();
});



















let tasks = []; // crea un array vacio (listas)

const form = document.querySelector(".form_task"); // Formulario
const taskInput = document.querySelector("#taskInput"); // Input
const taskList = document.querySelector("#taskList"); // Lista de li

// Muestrar las tareas en el HTML
const renderTasks = () => {
    taskList.innerHTML = ""; // Borrar toda la informacion del ul
    tasks.forEach((task) => {
        // Dinamico con el texto ingresado en el input
        const html = ` 
            <li data-id="${task.id}" class="tasks__item">
                <p class="${task.completa && "done"}">${task.txt_tarea}</p>
                <div>
                    <i class="bx bx-check"></i>
                    <i class="bx bx-trash"></i>
                </div>
            </li>
        `;
        taskList.innerHTML += html;
    })
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const txt_tarea = (taskInput.value.trim());

    let erroresValidacion = false;
    
    if(txt_tarea.length < 5){
        erroresValidacion = true;
        const error = document.querySelector(".error")
        error.textContent = "El texto de la tarea debe contener al menos 5 caractres";

        setTimeout(() => {
            error.textContent = "";
        }, 4000); // 4.000 milisegundos
    } 

    if(!erroresValidacion){
       // console.log(txt_tarea);
       const task = {
            id: Date.now(), // nos da la cantidad de milisegundos desde 01/01/1970. Genero un numero unico
            txt_tarea: txt_tarea,
            completa: false,
       };
       
       tasks.push(task); // Agrego la tarea a la lista de tareas
       console.log(tasks);

       // Almaceno las tareas en el localStorage
       localStorage.setItem("tasks", JSON.stringify(tasks));
       // JSON.stringify(task) transforma un objeto JS que del tipo array
       // en un objeto JSON del tipo string

       taskInput.value = ""; // limpiar el campo de la tarea (input)
       // form.reset(); // limpia el formulario completo

       renderTasks();
    }
})


taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("bx-check")){

        
        const id = event.target.closest("li").dataset.id;
       
        const task = tasks.find((task) => task.id == id);

        task.completa = !task.completa;
        console.log(task);

        renderTasks();


        event.target.closest("li").querySelector("p").classList.toggle("done");

        localStorage.setItem("tasks", JSON.stringify(tasks));
    };



    if(event.target.classList.contains("bx-trash")){
        const id = event.target.closest("li").dataset.id;
        const taskIndex = tasks.findIndex((task)=> task.id == id);

        tasks.splice(taskIndex, 1);
      
        localStorage.setItem("tasks", JSON.stringify(tasks));
        event.target.closest("li").remove();

    }
});

// Recupero lo almacenado en localStorage
document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    renderTasks();
});
