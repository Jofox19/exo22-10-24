class Task {
    constructor(title) {
        this.id = Date.now();
        this.title = title;
        this.isCompleted = false;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(title) {
        const task = new Task(title);
        this.tasks.push(task);
        this.renderTasks();
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.renderTasks();
    }

    toggleTaskCompletion(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.isCompleted = !task.isCompleted;
            this.renderTasks();
        }
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('flex', 'justify-between', 'items-center', 'p-2', 'rounded', 'shadow-sm', 'mb-2');
            li.classList.add(task.isCompleted ? 'bg-green-100' : 'bg-gray-100');

            li.innerHTML = `
                <span class="${task.isCompleted ? 'line-through text-green-600' : ''}">${task.title}</span>
                <div>
                    <button data-id="${task.id}" class="complete-task bg-blue-500 text-white px-4 py-1 rounded mr-2">${task.isCompleted ? 'Incomplet' : 'Complété'}</button>
                    <button data-id="${task.id}" class="delete-task bg-red-500 text-white px-4 py-1 rounded">Supprimer</button>
                </div>
            `;

            taskList.appendChild(li);
        });

        document.querySelectorAll('.delete-task').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.getAttribute('data-id'));
                this.removeTask(taskId);
            });
        });

        document.querySelectorAll('.complete-task').forEach(button => {
            button.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.getAttribute('data-id'));
                this.toggleTaskCompletion(taskId);
            });
        });
    }
}

const taskManager = new TaskManager();

document.getElementById('addTaskButton').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskTitle = taskInput.value.trim();
    const errorMessage = document.getElementById('errorMessage');

    if (taskTitle) {
        taskManager.addTask(taskTitle);
        taskInput.value = '';
        errorMessage.innerText = ''; 
    } else {
        errorMessage.innerText = 'Le champ de saisie ne peut pas être vide';  
    }
});