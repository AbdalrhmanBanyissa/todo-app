// Fetch existing todos from localStorage
const getSavedTodos = function () {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Save todos to localStorage
const saveTodos = function (todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Render application todos based on filters
const renderTodos = function (todos, filters) {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";
  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach(function (todo) {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

const removeTodo = function (id) {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id;
  });

  todos.splice(todoIndex, 1);
};

// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
  const div = document.createElement("div");
  const p = document.createElement("span");
  const btn = document.createElement("button");
  const input = document.createElement("input");

  todo.text.length > 0
    ? (p.textContent = todo.text)
    : (p.textContent = " Empty Todo ");

  btn.textContent = "x";
  input.setAttribute("type", "checkbox");

  input.addEventListener("change", function () {
    todo.completed = !todo.completed;
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // if (todo.completed) input.checked = true;
  input.checked = todo.completed;

  btn.addEventListener("click", function () {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  div.appendChild(input);
  div.appendChild(p);
  div.appendChild(btn);
  return div;
};

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
