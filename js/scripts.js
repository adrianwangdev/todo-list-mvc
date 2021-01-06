const model = {
  todos: []
}

/* ================================================================== */

const view = {
  addTodo: function (event) {
    if (event.keyCode === 13) {
      const todoTextInput = document.querySelector('.todoText')
      todoTextInput.value.trim() !== ''
        ? controller.addTodo()
        : alert('不可空白')
    }
  },

  clearTodos: function () {
    const listUl = document.querySelector('.list')
    listUl.innerHTML = ''
  },

  renderTodos: function () {
    this.clearTodos()
    const listUl = document.querySelector('.list')
    let listItem = ''
    model.todos.length === 0
      ? (listItem = '<span>Great! You are nothing to do :)</span>')
      : (model.todos.forEach(todo => {
          todo.completed
            ? (listItem += `
                <li
                  data-create=${todo.createTime}
                  onclick="controller.completeTodo(this)"
                  class="todoItem completed"
                ">
                  <p>${todo.todoText}</p>
                  <span onclick="controller.deleteTodo(this)">Delete</span>
                </li>
              `)
            : (listItem += `
                <li
                  data-create=${todo.createTime}
                  onclick="controller.completeTodo(this)"
                  class="todoItem"
                ">
                  <p>${todo.todoText}</p>
                  <span onclick="controller.deleteTodo(event, this)">Delete</span>
                </li>
              `)
        }))

    listUl.innerHTML = listItem
  }
}

/* ================================================================== */

const controller = {
  initTodos: function () {
    view.renderTodos()
  },

  addTodo: function () {
    const todoTextInput = document.querySelector('.todoText')
    const todoText = todoTextInput.value
    const newTodo = {
      createTime: Date.now(),
      todoText: todoText,
      completed: false
    }
    model.todos.push(newTodo)
    todoTextInput.value = ''
    view.renderTodos()
  },

  deleteTodo: function (event, deleteIcon) {
    event.stopPropagation()
    const todoLi = deleteIcon.parentElement
    const todoPosition = this.getPosition(todoLi)
    model.todos.splice(todoPosition, 1)
    view.renderTodos()
  },

  completeTodo: function (todoLi) {
    const todoPosition = this.getPosition(todoLi)
    model.todos[todoPosition].completed = !model.todos[todoPosition].completed
    view.renderTodos()
  },

  getPosition: function (todoLi) {
    const createTime = Number(todoLi.dataset.create)
    const todoPosition = model.todos.findIndex(todo => createTime === todo.createTime)
    return todoPosition
  }
}

controller.initTodos()
