function clickNextButton() {
    // ค้นหาทุกปุ่มที่มี 'next' และ 'nxt-exercise' ใน class
    let buttons = document.querySelectorAll('.action-exercise-button.next.nxt-exercise');

    // ค้นหาปุ่มที่มี span ที่มีข้อความ "Next"
    let nextButton = Array.from(buttons).find(button => 
        button.innerText.trim().includes("Next")
    );

    if (nextButton) {
        nextButton.click();
        console.log("✅ กดปุ่ม Next สำเร็จ!");
    } else {
        console.log("❌ ไม่พบปุ่ม Next!");
    }
}

// เรียกใช้งานฟังก์ชัน
clickNextButton();
