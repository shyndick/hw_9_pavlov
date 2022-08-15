const ToDoList = function () {
    let toDoListArr = [
        // {
        //     taskName: "Выучить JS",
        //     id: "1",
        //     isDone: false,
        // },
        // {
        //     taskName: "Выучить CSS",
        //     id: "2",
        //     isDone: true,
        // }
    ];

    this.init = () => {
        const element = document.querySelector('.app')
        const toDoList = document.createElement('div');
        toDoList.classList.add('todolist');

        toDoList.innerHTML = `<div class="todolist__wrapper" />
                                <div class="todolist__header">
                                    <h2 class="todolist__title">Todo list</h2>
                                    <input type="text" class="todolist__input">
                                </div>
                                <div class="todolist__content">
                                    <ul class="todolist_items"></ul>
                                </div>    
                              </div>`
        element.appendChild(toDoList);
        this.addEventListenerInput();
        this.show();
        this.deleteEvent();
    }

    this.editModal = (idTodo) => {
        const todo = toDoListArr.find(({id}) => id === idTodo);
        const { taskName, id } = todo
        const elementModal = document.createElement('div');
        elementModal.classList.add('modal')

        elementModal.innerHTML=`<div class="modal__container">
                                    <div class="modal__wrapper">
                                        <h2>Редактирование ToDo</h2>
                                        <input type="text" class="input__edit" value="${taskName}">
                                        <button class="modal__save">Сохранить</button>
                                    </div>
                                   <div>`
         document.body.appendChild(elementModal) 
         
         
         elementModal.addEventListener('click', (e) => {
            if(e.target.classList[0] === 'modal__container'){
                elementModal.remove()
            }            
         })

         const saveButton = document.querySelector('.modal__save');
         saveButton.addEventListener('click',() => {
            const input = document.querySelector('.input__edit')            
            this.edit(input.value, id)
            elementModal.remove()
         })       
         
    }

    this.edit = (editTaskName, id) => {
        toDoListArr = toDoListArr.map(todo => {
            if (todo.id === id) {
                todo.taskName = editTaskName
            }
            return todo;
        })

        this.show();
    }


    this.addEventListenerInput = () => {
        const input = document.querySelector('.todolist__input');
        input.addEventListener('keypress', (e) => {
            if(e.key === "Enter" && e.target.value !== '') {
                this.addToDo(e.target.value);
                e.target.value = "";
            }
        })
    }

    this.addToDo = (task) => {
        toDoListArr.push({
            taskName: task,
            id: `${Math.round(performance.now())}`,
            isDone: false,
        })

        this.show();
    }

    this.checkedEvent = () => {
        const checkboxs = document.querySelectorAll('.checkbox');
        checkboxs.forEach((checkbox)=>{
            checkbox.addEventListener('click',(e) => {
                const id = e.target.id
                const isChecked = e.target.checked
                toDoListArr = toDoListArr.map(todo => {
                    if(todo.id === id ) {
                        todo.isDone = isChecked 
                    }
                    return todo
                })
                this.show();
            })
        })
    }

    this.editEvent = () => {
        const editButtons = document.querySelectorAll('.btn__edit')
            editButtons.forEach((editButton) => {
                editButton.addEventListener('click', (e) => {
                    this.editModal(e.target.dataset.edit)
                })
            })
    }

    this.deleteEvent = () => {
        const deleteButtons = document.querySelectorAll('.btn__delete')
        deleteButtons.forEach((deleteButton) => {
           deleteButton.addEventListener('click', (e) => {
              this.delete(e.target.dataset.delete);
           })
        })
     }
  
  
     this.delete = (deleteId) => {
        toDoListArr = toDoListArr.filter(({ id }) => id != deleteId);
        this.show();
     }

    this.show = () => {
        const ul = document.querySelector('.todolist_items');
        let li=""

        toDoListArr.forEach(({taskName, id, isDone}) => {          
            li += `<li class="todolist_item">
                    <label class="${isDone? "todolist__task done" : "todolist__task "}" ><input id="${id}" type="checkbox" class="checkbox" ${isDone ? "checked" : ""}><span class = todolist__text>${taskName}</span>
                    </label>
                    <div>
                        <button class="btn btn__edit" data-edit="${id}">Edit</button>
                        <button class="btn btn__delete" data-delete="${id}">Delete</button>
                    <div>
                 </li>`
        })

        ul.innerHTML=li
        this.checkedEvent()
        this.editEvent()
        this.deleteEvent()
    }

}


window.addEventListener('load', () => {
    const toDoLIst = new ToDoList();
    toDoLIst.init()
})