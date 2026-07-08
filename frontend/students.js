let allStudents = [];

async function loadStudents() {
    const response = await fetch("https://student-erp-2zcf.onrender.com/api/students");
    const students = await response.json();

    allStudents = students;
    displayStudents(students);
}

function displayStudents(students) {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(student => {
        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.mobile}</td>
                <td>${student.course}</td>
                <td>${student.department}</td>
                <td>${student.semester}</td>
                <td>
                    <button onclick="editStudent(
                        '${student._id}',
                        '${student.name}',
                        '${student.email}',
                        '${student.mobile}',
                        '${student.course}',
                        '${student.department}',
                        '${student.semester}'
                    )">Edit</button>

                    <button onclick="deleteStudent('${student._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

async function deleteStudent(id) {
    await fetch(`https://student-erp-2zcf.onrender.com/api/students/${id}`, {
        method: "DELETE"
    });

    loadStudents();
}

function editStudent(id, name, email, mobile, course, department, semester) {
    document.getElementById("editId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editEmail").value = email;
    document.getElementById("editMobile").value = mobile;
    document.getElementById("editCourse").value = course;
    document.getElementById("editDepartment").value = department;
    document.getElementById("editSemester").value = semester;

    document.getElementById("editModal").style.display = "block";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

async function updateStudent() {
    const id = document.getElementById("editId").value;

    const student = {
        name: document.getElementById("editName").value,
        email: document.getElementById("editEmail").value,
        mobile: document.getElementById("editMobile").value,
        course: document.getElementById("editCourse").value,
        department: document.getElementById("editDepartment").value,
        semester: document.getElementById("editSemester").value
    };

    const response = await fetch(`https://student-erp-2zcf.onrender.com/api/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    const data = await response.json();

    alert(data.message);

    closeEditModal();
    loadStudents();
}

function openAddModal() {
    document.getElementById("addModal").style.display = "block";
}

function closeAddModal() {
    document.getElementById("addModal").style.display = "none";
}

async function addStudent() {
    const student = {
        name: document.getElementById("addName").value,
        email: document.getElementById("addEmail").value,
        mobile: document.getElementById("addMobile").value,
        course: document.getElementById("addCourse").value,
        department: document.getElementById("addDepartment").value,
        semester: document.getElementById("addSemester").value
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

    closeAddModal();
    loadStudents();
}

document.getElementById("search").addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    const filteredStudents = allStudents.filter(student =>
        student.name.toLowerCase().includes(keyword) ||
        student.email.toLowerCase().includes(keyword) ||
        student.mobile.toLowerCase().includes(keyword) ||
        student.course.toLowerCase().includes(keyword) ||
        student.department.toLowerCase().includes(keyword) ||
        student.semester.toLowerCase().includes(keyword)
    );

    displayStudents(filteredStudents);
});

loadStudents();