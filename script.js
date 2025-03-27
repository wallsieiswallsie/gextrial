document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Masukkan tugas terlebih dahulu!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    li.innerHTML = `${taskText} <button onclick="removeTask(this)">❌</button>`;
    li.addEventListener("click", function () {
        this.classList.toggle("completed");
        saveTasks(); // Simpan perubahan status ke localStorage
    });

    taskList.appendChild(li);
    taskInput.value = "";

    saveTasks(); // Simpan tugas ke localStorage
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks(); // Perbarui localStorage setelah tugas dihapus
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.textContent.replace("❌", "").trim(),
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Bersihkan daftar sebelum memuat ulang

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} <button onclick="removeTask(this)">❌</button>`;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function () {
            this.classList.toggle("completed");
            saveTasks(); // Simpan perubahan status ke localStorage
        });

        taskList.appendChild(li);
    });
}