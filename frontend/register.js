const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    const response = await fetch("https://student-erp-2zcf.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
        window.location.href = "login.html";
    }
});