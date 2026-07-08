async function addNotice() {
    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;

    const response = await fetch("http://localhost:5000/api/notices", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            message,
            postedBy: "Admin"
        })
    });

    const data = await response.json();

    alert(data.message);

    document.getElementById("title").value = "";
    document.getElementById("message").value = "";

    loadNotices();
}

async function loadNotices() {
    const response = await fetch("http://localhost:5000/api/notices");
    const notices = await response.json();

    const noticeList = document.getElementById("noticeList");
    noticeList.innerHTML = "";

    notices.forEach(notice => {
        noticeList.innerHTML += `
            <div class="student-card">
                <h3>${notice.title}</h3>
                <p>${notice.message}</p>
                <small>Posted By: ${notice.postedBy}</small>
                <br><br>
                <button onclick="deleteNotice('${notice._id}')">Delete</button>
            </div>
        `;
    });
}

async function deleteNotice(id) {
    await fetch(`https://student-erp-2zcf.onrender.com/api/notices/${id}`, {
        method: "DELETE"
    });

    loadNotices();
}

loadNotices();