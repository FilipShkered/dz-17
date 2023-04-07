const input = document.querySelector('#msgInput');
const btn = document.querySelector('#msgButton');
const ul = document.querySelector('#todoList');

btn.addEventListener('click', onBtnClick);
ul.addEventListener('click', onUlClick);
input.addEventListener('keydown', onInputKeyDown);

init()

function init() {
  TodoApi
    .getList()
    .then((list) => {
      renderTodoList(list)
    })
    .catch((e) => {
      showError(e)
    })
}

function onBtnClick() {
  const todo = getData()

  if (!isTodoValid(todo)) {
    showError(new Error('Поле не может быть пустым'))
    return
  }

  

  TodoApi
    .create(todo)
    .then((newTodo) => {
      writeTodo(newTodo)
      clear()
    })
    .catch((e) => {
      showError(e)
    })

  
  
};

function onInputKeyDown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    onBtnClick();
  }
}

function getData() {
  return {
    message: input.value
  }
}

function onUlClick(e) {
  const target = e.target
  const todoEl = findElem(target)

  if (isDeleteBtn(target)) {
    deltodoElem(todoEl)
    return;
  }

  todoDone(todoEl)
}

function isDeleteBtn(el) {
  return el.classList.contains('deleteBtn')
}

function findElem(el) {
  return el.closest('.todoItem')
}

function deltodoElem(el) {
  const id = el.dataset.id;
  TodoApi.delete(id)
    .then(() => {
      el.remove();
    })
    .catch((e) => {
      showError(e);
    });
}


function todoDone(el) {
  const id = el.dataset.id;
  const isDone = el.classList.contains('done');
  const done = { done: !isDone };
  TodoApi.update(id, done)
    .then(() => {
      el.classList.toggle('done');
    })
    .catch((e) => {
      showError(e);
    });
}


function isTodoValid(todo) {
  return todo.message !== ''
}

function showError(e) {
  alert(e.message)
}

function renderTodoList(list) {
  const html = list.map(genTodoHtml).join('')

  ul.innerHTML = html

    const liElements = document.querySelectorAll('.todoItem')
  liElements.forEach((li) => {
    const todoId = li.dataset.id
    const todo = list.find((todo) => todo.id === todoId)
    if (todo.done) {
      li.classList.add('done')
    }
  })
}
function writeTodo(todo) {

  const html = genTodoHtml(todo)

  ul.insertAdjacentHTML('beforeend', html)
}

function genTodoHtml(todo) {
  return `
  <li class="todoItem"  data-id=${todo.id}>
  <span>${todo.message}</span>
  <button class="deleteBtn">Delete</button>
  </li>`;
}

function clear() {
  input.value = ''
}