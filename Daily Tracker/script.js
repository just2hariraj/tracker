const habitList = document.getElementById("habit-list");
const addBtn = document.getElementById("add-btn");
const newHabitInput = document.getElementById("new-habit");

let habits = JSON.parse(localStorage.getItem("habits")) || [];
let lastDate = localStorage.getItem("date");
const today = new Date().toDateString();

// Reset habits if it's a new day
if (lastDate !== today) {
  habits = habits.map(h => ({ ...h, completed: false }));
  localStorage.setItem("date", today);
}

function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function render() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = habit.name;
    if (habit.completed) span.classList.add("completed");

    span.onclick = () => {
      habit.completed = !habit.completed;
      save();
      render();
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";

    removeBtn.onclick = () => {
      habits.splice(index, 1); // remove from array
      save();                  // update localStorage
      render();
    };

    li.appendChild(span);
    li.appendChild(removeBtn);
    habitList.appendChild(li);
  });
}

addBtn.onclick = () => {
  if (newHabitInput.value.trim() === "") return;
  habits.push({ name: newHabitInput.value, completed: false });
  newHabitInput.value = "";
  save();
  render();
};

render();
