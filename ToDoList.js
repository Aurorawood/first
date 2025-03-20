// 获取 DOM 元素
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// 添加任务
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
  }
});

// 添加任务到列表
function addTask(taskText) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "删除";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(taskItem);
  });

  taskSpan.addEventListener("click", () => {
    taskSpan.classList.toggle("completed");
  });

  taskItem.appendChild(taskSpan);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);
}
// 保存任务
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item span").forEach((task) => {
    tasks.push({
      text: task.textContent,
      completed: task.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 加载任务
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text);
    if (task.completed) {
      const taskSpan = taskList.lastChild.querySelector("span");
      taskSpan.classList.add("completed");
    }
  });
}

// 在页面加载时加载任务
window.addEventListener("load", loadTasks);

// 在任务变化时保存任务
addTaskBtn.addEventListener("click", saveTasks);
taskList.addEventListener("click", saveTasks);
