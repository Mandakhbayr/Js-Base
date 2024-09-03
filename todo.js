document.addEventListener("DOMContentLoaded", function () {
  let inputbox = document.getElementById("text-box");
  let lists = document.getElementsByClassName("list");
  let left = document.getElementById("lrw");
  let mid = document.getElementById("mrw");
  let right = document.getElementById("rrw");

  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text/plain");
    let draggedElement = document.getElementById(data);

    if (
      draggedElement &&
      (e.target === left || e.target === mid || e.target === right)
    ) {
      let checkbox = draggedElement.querySelector('input[type="checkbox"]');

      if (e.target === right) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }

      e.target.appendChild(draggedElement);
      save();
    }
  }

  function makeItemsDraggable(lists) {
    for (let list of lists) {
      list.draggable = true;
      list.addEventListener("dragstart", handleDragStart);
    }
  }

  function setDropTargets() {
    let dropTargets = [left, mid, right];
    for (let target of dropTargets) {
      target.addEventListener("dragover", handleDragOver);
      target.addEventListener("drop", handleDrop);
    }
  }

  function addTask() {
    if (inputbox.value === "") {
      alert("nothing");
    } else {
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      let time = new Date();
      let tim =
        time.getFullYear() +
        "-" +
        time.getMonth() +
        "-" +
        time.getDate() +
        "-" +
        time.getHours() +
        "-" +
        time.getMinutes() +
        "-" +
        time.getSeconds();
      let timeDiv = document.createElement("div");
      timeDiv.className = "text";
      timeDiv.textContent = tim;

      let lst = document.createElement("div");
      lst.id = "task-" + Date.now();
      lst.className = "list";

      let textDiv = document.createElement("div");
      textDiv.className = "text";
      textDiv.textContent = inputbox.value;

      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      span.style.cursor = "pointer";

      lst.appendChild(checkbox);
      lst.appendChild(textDiv);
      lst.appendChild(timeDiv);
      lst.appendChild(span);

      left.appendChild(lst);

      inputbox.value = "";
      makeItemsDraggable([lst]);
      save();
    }
  }

  // Delete or check off a task
  function handleTaskClick(e) {
    if (e.target.tagName === "INPUT") {
      if (e.target.checked) {
        right.appendChild(e.target.parentNode);
      } else left.appendChild(e.target.parentNode);
    }
    //after you uncheck it can still go back to right
    else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
    save();
  }
  function save() {
    localStorage.setItem("data1", left.innerHTML);
    localStorage.setItem("data2", mid.innerHTML);
    localStorage.setItem("data3", right.innerHTML);
  }

  // Load state from localStorage
  function showData() {
    left.innerHTML = localStorage.getItem("data1") || "";
    mid.innerHTML = localStorage.getItem("data2") || "";
    right.innerHTML = localStorage.getItem("data3") || "";
    makeItemsDraggable(left.getElementsByClassName("list"));
    makeItemsDraggable(mid.getElementsByClassName("list"));
    makeItemsDraggable(right.getElementsByClassName("list"));
  }
  setDropTargets();
  showData();

  document.getElementById("69").addEventListener("click", addTask);

  left.addEventListener("click", handleTaskClick);
  mid.addEventListener("click", handleTaskClick);
  right.addEventListener("click", handleTaskClick);
});
