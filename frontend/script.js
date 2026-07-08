const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        course: document.getElementById("course").value
    };

    const response = await fetch("https://student-erp-2zcf.onrender.com/api/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    const data = await response.json();

    alert(data.message);

    form.reset();
    loadStudents();
});

async function loadStudents() {
    const response = await fetch("https://student-erp-2zcf.onrender.com/api/students");
    const students = await response.json();

    studentList.innerHTML = "";

    students.forEach((student) => {
        studentList.innerHTML += `
            <div class="student-card">
                <h3>${student.name}</h3>
                <p>${student.course}</p>
                <button onclick="deleteStudent('${student._id}')">Delete</button>
            </div>
        `;
    });
}

async function deleteStudent(id) {
    const response = await fetch(`https://student-erp-2zcf.onrender.com/api/students/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();

    alert(data.message);

    loadStudents();
}

loadStudents();