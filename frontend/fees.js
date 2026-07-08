async function addFee() {
    const studentId = document.getElementById("student").value;
    const totalFees = Number(document.getElementById("totalFees").value);
    const paidFees = Number(document.getElementById("paidFees").value);

    if (!studentId || !totalFees || paidFees < 0) {
        alert("Please select student and enter valid fees");
        return;
    }

    const response = await fetch("https://student-erp-2zcf.onrender.com/api/fees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            studentId,
            totalFees,
            paidFees
        })
    });

    const data = await response.json();

    alert(data.message);

    document.getElementById("totalFees").value = "";
    document.getElementById("paidFees").value = "";

    loadFees();
}