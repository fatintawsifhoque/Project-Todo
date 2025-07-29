// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  // Render all todos
  function renderTodos() {
    list.innerHTML = '';

    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';

      // Create span for text
      const span = document.createElement('span');
      span.textContent = todo.text;
      if (todo.done) {
        span.style.textDecoration = 'line-through';
        span.style.color = 'green';
      }

      // Edit button
      const editBtn = document.createElement('button');
      editBtn.className = 'btn btn-warning btn-sm me-1';
      editBtn.textContent = 'Edit';

      // Done button
      const doneBtn = document.createElement('button');
      doneBtn.className = 'btn btn-success btn-sm me-1';
      doneBtn.textContent = todo.done ? 'Undo' : 'Done';

      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm';
      deleteBtn.textContent = 'Delete';

      // Edit: Prompt new value
      editBtn.addEventListener('click', () => {
        const newText = prompt('Edit todo:', todo.text);
        if (newText !== null && newText.trim() !== '') {
          todos[index].text = newText.trim();
          saveAndRender();
        }
      });

      // Done/Undo toggle
      doneBtn.addEventListener('click', () => {
        todos[index].done = !todos[index].done;
        saveAndRender();
      });

      // Delete
      deleteBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        saveAndRender();
      });

      // Append elements
      const buttonGroup = document.createElement('div');
      buttonGroup.appendChild(editBtn);
      buttonGroup.appendChild(doneBtn);
      buttonGroup.appendChild(deleteBtn);

      li.appendChild(span);
      li.appendChild(buttonGroup);
      list.appendChild(li);
    });
  }

  // Save to localStorage and re-render
  function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }

  // Form submit: Add new todo
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      todos.push({
        text,
        done: false  // default: not done
      });
      input.value = '';
      saveAndRender();
    }
  });

  // Initial render
  renderTodos();
});