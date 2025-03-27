// หาว่า .practice-box-foot มีอยู่ใน DOM หรือไม่
const practiceBoxFoot = document.querySelector('.practice-box-foot');

if (practiceBoxFoot) {
    console.log("✅ พบ .practice-box-foot แล้ว! โครงสร้างภายในคือ:");
    console.log(practiceBoxFoot.innerHTML); // แสดงโครงสร้าง HTML ภายใน

    // ค้นหาปุ่ม call-to-action ที่อยู่ภายใน practice-box-foot เท่านั้น
    const startButton = practiceBoxFoot.querySelector('.call-to-action');

    if (startButton) {
        console.log("✅ พบปุ่ม 'Start now' -> กำลังกดปุ่ม...");
        startButton.click();
    } else {
        console.log("❌ ไม่พบปุ่ม 'Start now' ใน .practice-box-foot");
    }
} else {
    console.log("❌ ไม่พบ .practice-box-foot ใน DOM");
}
