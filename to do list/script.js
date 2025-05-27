
  const addTaskBtn = document.getElementById('add-task-btn');
  const newTaskInput = document.getElementById('new-task');
  const taskList = document.getElementById('task-list');
  const alertBox = document.getElementById('alert-box');

  // Function to create a task item
  function createTask(taskText, isCompleted = false) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;

    const label = document.createElement('label');
    label.textContent = taskText;

    if (isCompleted) {
      li.classList.add('completed');
    }

    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed');
      saveTasksToStorage();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveTasksToStorage();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  // Save tasks to localStorage
  function saveTasksToStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
      const text = li.querySelector('label').textContent;
      const isCompleted = li.querySelector('input[type="checkbox"]').checked;
      tasks.push({ text, isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasksFromStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTask(task.text, task.isCompleted));
  }

  // Add new task when "Add" button is clicked
  addTaskBtn.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();

    if (taskText === '') {
      alertBox.textContent = 'Please enter a task';
      alertBox.style.display = 'block';

      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 3000);
      return;
    }

    createTask(taskText);
    saveTasksToStorage();
    newTaskInput.value = '';
  });

  // Load saved tasks when the page loads
  window.addEventListener('DOMContentLoaded', loadTasksFromStorage);
