class Task {
    constructor(title) {
        this.id = Date.now();
        this.title = title;
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

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('flex', 'justify-between', 'items-center', 'bg-gray-100', 'p-2', 'rounded', 'shadow-sm');
            li.innerHTML = `
                <span>${task.title}</span>
                <button onclick="taskManager.deleteTask(${task.id})" class="bg-red-500 text-white px-4 py-1 rounded">Supprimer</button>
            `;
            taskList.appendChild(li);
        });
    }
}

const taskManager = new TaskManager();

document.getElementById('addTaskButton').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskTitle = taskInput.value.trim();

    if (taskTitle) {
        taskManager.addTask(taskTitle);
        taskInput.value = '';
    }
});