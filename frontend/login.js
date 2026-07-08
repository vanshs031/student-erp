const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    alert(data.message);

    if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "dashboard.html";
    }
});
document.getElementById("googleLogin").addEventListener("click", () => {
    window.location.href = "https://student-erp-2zcf.onrender.com/api/auth/google";
});