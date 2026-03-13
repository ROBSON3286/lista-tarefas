const list = document.getElementById("tasksList") // ul
const form = document.getElementById("formTask") // form
const addTaskBtn = document.getElementById("addTaskBtn")
const orderTaskBtn = document.getElementById("orderTasks")
const taskInput = document.getElementById("taskInput")
const clearTasksBtn = document.getElementById("clearTasksBtn")
const startDateInput = document.getElementById("startDate")
const dueDateInput = document.getElementById("endDate")
const today = new Date().toISOString().split("T")[0]
const now = new Date()
const formatted = now.toISOString().slice(0,16)


document.getElementById("endDate").value = formatted

document.getElementById("startDate").value = today
document.getElementById("endDate").value = today
taskInput.focus() // começar com foco no input

class Task{
    constructor(task, startDate, dueDate){

        console.log(task, startDate, dueDate)

        this.task = task
        this.state = false
        this.startDate = startDate
        this.dueDate = dueDate
        this.alerted = false

    }
}


function formatDate(date){

    if(!date) return ""

    const d = new Date(date)

    return d.toLocaleDateString("pt-BR") + " " +
           d.toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"})
}

class Modal {
    constructor() {
        this.modal = document.getElementById("modal");
        this.modalContent = document.getElementById("modalContent");
        this.modalMessage = document.getElementById("modal-message");
        this.btnClose = document.getElementById("modal-close");

        this.btnConfirm = document.createElement("button");  // Botão de confirmação
        this.btnCancel = document.createElement("button");  // Botão de cancelamento

        this.btnClose.addEventListener("click", () => this.close());
        this.btnCancel.addEventListener("click", () => this.close());

        this.btnChange = document.createElement("button")

        this.btnChange.addEventListener("click", ()=> this.executeChangeName())

        // Quando o usuário clica em "Confirmar", chamamos a função de ação
        this.btnConfirm.addEventListener("click", () => this.executeConfirmAction());

        this.inputField = document.createElement("input") // para pegar a entrada


        window.addEventListener("click", (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open(message, onConfirmAction = null) {
        this.btnChange.style.display = "none" // garante que o btn n aparece
        this.modalMessage.textContent = message;
        this.modal.style.display = "flex";
        this.modal.classList.add("show");

        if (onConfirmAction) {
            // Guardamos a função passada para ser executada
            this.onConfirm = onConfirmAction;
            this.btnClose.style.display = "none";
            this.btnConfirm.textContent = "Confirmar";
            this.btnCancel.textContent = "Cancelar";
            this.btnConfirm.classList.add("confirm-btn");
            this.btnCancel.classList.add("cancel-btn");

            // Adiciona os botões ao modal
            this.modalContent.appendChild(this.btnConfirm);
            this.modalContent.appendChild(this.btnCancel);
        } else {
            // Se não passar a ação, mostra apenas o botão de fechar
            this.btnConfirm.remove();
            this.btnCancel.remove();
            this.btnClose.style.display = "inline-block";
        }
    }

    close() {
        this.modal.classList.remove("show");

        setTimeout(() => {
            this.modal.style.display = "none";
            // Limpa os botões após o fechamento
            this.btnConfirm.remove();
            this.btnCancel.remove();
            this.btnChange.remove();
            this.inputField.value = ""
        }, 300);
    }

    // Função para o modal de edição

    openEditModal(message, currentName, onConfirm){
        this.btnChange.style.display = "inline-block"
        this.modalMessage.textContent = message
        this.inputField.classList.add("inputNewName")
        this.inputField.value = currentName
        this.inputField.placeholder = "tarefa..."
       

        this.modal.style.display = "flex"
        this.modal.classList.add("show")

        this.btnClose.style.display = "none"; // Esconde o botão de fechar, pois vamos usar os botões personalizados
        this.btnChange.textContent = "Mudar";
        this.btnCancel.textContent = "Cancelar";
        this.btnChange.classList.add("confirm-btn"); // mesmo estilo
        this.btnCancel.classList.add("cancel-btn");

        // Adiciona o campo de input e os botões ao modal
        this.modalMessage.appendChild(this.inputField);
        this.modalContent.appendChild(this.btnChange);
        this.modalContent.appendChild(this.btnCancel);


        // Foca no campo de input
        this.inputField.focus();

        // salva o callback que será chamada ao confirmar

        this.onConfirm = onConfirm

    }

    // A função que executa a ação confirmada
    executeConfirmAction() {
        if (this.onConfirm) {  // Se houver uma ação para executar
            this.onConfirm();  // Chama a função armazenada em `this.onConfirm`
           
           
        }

        
    }

    executeChangeName(){
        const newName = this.inputField.value.trim()
        if(newName){
            this.onConfirm(newName); // chama a função de callback
            this.open("Nome alterado com sucesso!")
            
        } else{
            this.open("Nome inválido. Por favor, insira um novo nome")
        }
    }
}


const modal = new Modal()


class TaskList{
    constructor(){
        this.taskList = JSON.parse(localStorage.getItem("tasks")) || []
    }

    addTask(task){
        console.log(task)
        this.taskList.push(task)
        this.updateList() // atualizar toda vez que inserir nova
        this.saveToLocalStorage() // salvar no localStorage
    }

    sortByName(){
        this.taskList.sort((a,b)=> a.task.localeCompare(b.task))
        this.updateList()
        this.saveToLocalStorage()
    }

    clearList(){
        this.taskList = []
        this.saveToLocalStorage()
        this.updateList()
    }

    updateTaskStatus(item, li, removeBtn, changeNameBtn){
        if(item.state === true){
            li.classList.add("complete")
            removeBtn.style.display = "none"
            changeNameBtn.style.display = "none"
        }else{
            li.classList.remove("complete")
            removeBtn.style.display = "inline-block"
            changeNameBtn.style.display = "inline-block"
        }
    }

    saveToLocalStorage(){
        localStorage.setItem("tasks", JSON.stringify(this.taskList))
    }

    updateList(){
        list.innerHTML = ""

        if(this.taskList.length === 0){
            orderTaskBtn.style.display = "none"
            clearTasksBtn.style.display = "none"
        } else{
            orderTaskBtn.style.display = "inline-block"
            clearTasksBtn.style.display = "inline-block"
        }

        this.taskList.forEach((item, index)=> {
            const li = document.createElement("li")
            const deadline = getDeadlineStatus(item.startDate, item.dueDate)

            

        li.innerHTML = `
        <span class="task-number">Tarefa ${index+1}:</span>
        <div class="task-info">
        <span class="task-text">${item.task}</span>
        <span class="task-date">
        Início : ${formatDate(item.startDate)}
        </span>
        <span class="task-date">
        Prazo: ${formatDate(item.dueDate)}
        </span>
        <span class="task-alert ${deadline?.class || ""}">
        ${deadline?.text || ""}
        </span>
        </div>
        `

            const buttonContainer = document.createElement("div")
            buttonContainer.classList.add("button-container")


            const removeBtn = document.createElement("button")
            removeBtn.textContent = "🗑️"
            removeBtn.classList.add("remove-btn")
            removeBtn.addEventListener("click", ()=> {
                this.taskList.splice(index, 1)
                li.remove()
                this.updateList()
                this.saveToLocalStorage()
            })

            const changeNameBtn = document.createElement("button")
            changeNameBtn.textContent = "✏️"
            changeNameBtn.classList.add("change-btn")
            changeNameBtn.addEventListener("click", ()=> {
                modal.openEditModal(
                    "Digite o novo nome para a tarefa",
                    item.task,
                    (newName)=> { // Função de callback
                        item.task = newName; // Atualiza o nome da tarefa
                        this.saveToLocalStorage()
                        this.updateList()
                    }
                )                                            
            })

            const completeBtn = document.createElement("button")
            completeBtn.textContent = "✅"
            completeBtn.classList.add("complete-btn")
            
            completeBtn.addEventListener("click", ()=> {
                item.state = !item.state // inverte o estado
                this.saveToLocalStorage()
                this.updateTaskStatus(item, li, removeBtn, changeNameBtn)
            })
            this.updateTaskStatus(item, li, removeBtn, changeNameBtn)

            
          

            // Adicionando os botões ao container
            buttonContainer.appendChild(changeNameBtn)
            buttonContainer.appendChild(removeBtn);
            buttonContainer.appendChild(completeBtn); 
            
            // Descrição dos Botões
            completeBtn.title = "Marcar como concluida"
            removeBtn.title = "Remover tarefa"
            changeNameBtn.title = "Renomear tarefa"

            li.appendChild(buttonContainer)
            
            list.appendChild(li)

        })

    }   
}


const newTasksList = new TaskList()

newTasksList.updateList() // renderiza a lista ao carregar a página

form.addEventListener("submit", (e)=> {
    e.preventDefault()

    const nameTask = taskInput.value.trim()
    const startDate = startDateInput.value
    const dueDate = dueDateInput.value
    
    console.log(dueDate)

    if(nameTask.length !== 0 && typeof nameTask === "string" && startDate && dueDate && new Date(startDate) <= new Date(dueDate)){
        const newTask = new Task(nameTask, startDate, dueDate)
        newTasksList.addTask(newTask)
        form.reset()
        taskInput.focus()
      
    } else{
       modal.open("Insira uma tarefa válida")
    }

})


orderTaskBtn.addEventListener("click", ()=> {
    newTasksList.sortByName()
    modal.open("Lista ordenada de A-Z")
})

clearTasksBtn.addEventListener("click", ()=> {
    modal.open("Tem certeza que deseja limpar a lista de tarefas?", () => {
        newTasksList.clearList();  // Ação que limpa a lista
        modal.open("A lista foi excluida com sucesso!")
       
    });

  
})

function getDeadlineStatus(startDate, dueDate){

    if(!dueDate) return ""

    const now = new Date()
    const due = new Date(dueDate)

    const diffTime = due - now
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if(diffTime < 0){
        return {text:"🔴 Tarefa expirada", class:"expired"}
    }

    if(diffHours <= 1){
        return {text:"🚨 Menos de 1 hora", class:"urgent"}
    }

    if(diffHours <= 24){
        return {text:`⚠ ${diffHours} horas restantes`, class:"today"}
    }

    if(diffDays <= 3){
        return {text:`🟡 ${diffDays} dias restantes`, class:"warning"}
    }

    return {text:`⏳ ${diffDays} dias restantes`, class:"normal"}
}

function checkTaskAlerts(){

    const now = new Date()
    console.log(newTasksList.taskList)
   
    newTasksList.taskList.forEach(task => {

        console.log(task)

        if(!task.dueDate || task.state) return

        const due = new Date(task.dueDate)

        const diffTime = due - now
        const diffMinutes = Math.floor(diffTime / (1000 * 60))
        console.log(`Tarefa: ${task.task}, Minutos restantes: ${diffMinutes}`)
        if(diffMinutes <= 15 && diffMinutes > 0 ){

            alert(`🔔 A tarefa "${task.task}" vence em ${diffMinutes} minutos!`)

            task.alerted = true
            newTasksList.saveToLocalStorage()

        }
        location.reload()

    })

}

// document.addEventListener("DOMContentLoaded", () => {

//     checkTaskAlerts()

// })

orderTaskBtn.title = "Ordem Alfabética"
clearTasksBtn.title = "Limpar lista de tarefas"
addTaskBtn.title = "Adicionar nova tarefa"

setInterval(checkTaskAlerts, 60000)

