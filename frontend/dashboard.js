// alert("Dashboard JS loaded");
// Google Login Token
const params = new URLSearchParams(window.location.search);

const googleToken = params.get("token");
const googleUser = params.get("user");

if (googleToken) {
    localStorage.setItem("token", googleToken);
}

if (googleUser) {
    localStorage.setItem("user", decodeURIComponent(googleUser));
}

// URL se token remove
window.history.replaceState({}, document.title, "dashboard.html");

// Check Login
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
    window.location.href = "login.html";
}

// Welcome Text
document.getElementById("welcomeText").innerText =
    `Welcome ${user.name} (${user.role})`;

// Role Based Menu
const menu = document.getElementById("menu");

if (user.role === "admin") {

    menu.innerHTML = `
        <button onclick="location.href='students.html'">Manage Students</button>
        <button onclick="location.href='attendance.html'">Attendance</button>
        <button onclick="location.href='notice.html'">Notice Board</button>
    `;

}
else if (user.role === "faculty") {

    menu.innerHTML = `
        <button onclick="location.href='students.html'">Student List</button>
        <button onclick="location.href='attendance.html'">Mark Attendance</button>
        <button onclick="location.href='notice.html'">Notice Board</button>
    `;

}
else {

    menu.innerHTML = `
        <button onclick="location.href='students.html'">My Profile</button>
        <button onclick="location.href='attendance.html'">My Attendance</button>
        <button onclick="location.href='notice.html'">Notice Board</button>
    `;

}

// Dashboard Data
async function loadDashboardData() {

    try {

        const studentResponse = await fetch("http://localhost:5000/api/students");
        const students = await studentResponse.json();

        const noticeResponse = await fetch("http://localhost:5000/api/notices");
        const notices = await noticeResponse.json();

        document.getElementById("totalStudents").innerText = students.length;

        document.getElementById("totalNotices").innerText = notices.length;

    } catch (error) {

        console.log(error);

    }

}

// Logout
function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

}

async function loadChart() {

    const response = await fetch("http://localhost:5000/api/students");
    const students = await response.json();

    const ctx = document.getElementById("studentChart");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Students"],
            datasets: [{
                label: "Total Students",
                data: [students.length]
            }]
        }
    });

}

loadChart();
// Load Dashboard
loadDashboardData();