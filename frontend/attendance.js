async function loadStudents() {
    const response = await fetch("http://localhost:5000/api/students");
    const students = await response.json();

    const table = document.getElementById("attendanceTable");
    table.innerHTML = "";

    students.forEach(student => {
        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>
                    <button onclick="markAttendance('${student._id}', 'Present')">Present</button>
                    <button onclick="markAttendance('${student._id}', 'Absent')">Absent</button>
                </td>
            </tr>
        `;
    });
}

async function markAttendance(studentId, status) {
    const date = document.getElementById("attendanceDate").value;

    if (!date) {
        alert("Please select date");
        return;
    }

    const response = await fetch("http://localhost:5000/api/attendance", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            studentId,
            date,
            status
        })
    });

    const data = await response.json();
    alert(data.message);
}
async function loadAttendanceRecords() {
    const response = await fetch("https://student-erp-2zcf.onrender.com/api/attendance");
    const records = await response.json();

    const table = document.getElementById("attendanceRecords");
    table.innerHTML = "";

    records.forEach(record => {
        table.innerHTML += `
            <tr>
                <td>${record.studentId?.name}</td>
                <td>${record.date}</td>
                <td>${record.status}</td>
            </tr>
        `;
    });
}
loadStudents();