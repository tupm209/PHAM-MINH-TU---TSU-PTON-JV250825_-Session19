const courses = [
  {
    id: 1,
    content: "Learn Javascript Session 01",
    dueDate: "2023-04-17",
    status: "Pending",
    assignedTo: "Anh Bách",
  },
  {
    id: 2,
    content: "Learn Javascript Session 02",
    dueDate: "2023-04-17",
    status: "Pending",
    assignedTo: "Lâm",
  },
  {
    id: 3,
    content: "Learn Css Session 1",
    dueDate: "2023-04-17",
    status: "Pending",
    assignedTo: "Hiếu Ci ớt ớt",
  },
];
localStorage.setItem("courses", JSON.stringify(courses));

//Read
const tbody = document.querySelector("#tbody");
function renderRow(item) {
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
  <td class="id">${item.id}</td>
  <td class="content">${item.content}</td>
  <td class="date">${item.dueDate}</td>
  <td class="status">${item.status}</td>
  <td class="assigned">${item.assignedTo}</td>
  <td><button class="editBtn">Sửa</button></td>
  <td><button class="deleteBtn">Xóa</button></td>
  `;
  tbody.appendChild(newRow);
}

//tạo event edit cho item mới
function attachEditEvents() {
  const update = document.querySelectorAll(".editBtn");
  update.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const textItem = button.closest("tr");

      form.courseId.value = textItem.querySelector(".id").textContent;
      form.content.value = textItem.querySelector(".content").textContent;
      form.date.value = textItem.querySelector(".date").textContent;
      form.status.value = textItem.querySelector(".status").textContent;
      form.Username.value = textItem.querySelector(".assigned").textContent;
    });
  });
}

courses.forEach(renderRow);
attachEditEvents();

//Create
const form = document.getElementById("task-form");
const date = document.getElementById("date");
const getStatus = document.getElementById("status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
  const courseId = form.courseId.value ? Number(form.courseId.value) : null;

  if (
    form.content.value === "" ||
    form.date.value === "" ||
    form.status.value === "" ||
    form.Username.value === ""
  ) {
    alert("Hãy nhập thông tin");
    return;
  }

  const newData = {
    id:
      courseId ||
      (storedCourses.length > 0
        ? Math.max(...storedCourses.map((c) => c.id)) + 1
        : 1),
    content: form.content.value,
    dueDate: form.date.value,
    status: form.status.value,
    assignedTo: form.Username.value,
  };

  //Update
  if (courseId) {
    const index = courses.findIndex((i) => i.id === courseId);
    if (index !== -1) {
      courses[index] = newData;

      const rows = tbody.querySelectorAll("tr");
      rows.forEach((row) => {
        const id = Number(row.querySelector(".id").textContent);
        if (id === courseId) {
          row.querySelector(".content").textContent = newData.content;
          row.querySelector(".date").textContent = newData.dueDate;
          row.querySelector(".status").textContent = newData.status;
          row.querySelector(".assigned").textContent = newData.assignedTo;
        }
      });
    }
  } else {
    courses.push(newData);
    renderRow(newData);
    attachEditEvents();
  }

  localStorage.setItem("courses", JSON.stringify(courses));
  form.reset();
  form.courseId.value = "";
});

//Delete
const deleteData = document.querySelector("#tbody");
deleteData.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("deleteBtn")){
    const row = e.target.closest("tr");
    const id = Number(row.querySelector(".id").textContent);
    
    const index = courses.findIndex((item) => item.id === id);
    if(index !== -1){
      courses.splice(index,1);
      localStorage.setItem("courses", JSON.stringify(courses));
      row.remove();
    }
  }
})