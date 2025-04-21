async function solveAndClick() {
  console.log("🎯 กำลังกดปุ่ม Correction เพื่อแสดงคำตอบที่ถูกต้อง...");

  // 1. กดปุ่ม "Correction"
  let correctionButton = document.querySelector('.action-exercise-button.correct');
  if (correctionButton) {
    correctionButton.click();
    console.log("✅ กด Correction เพื่อตรวจคำตอบ");
  } else {
    console.log("❌ ไม่พบปุ่ม Correction!");
    return;
  }

  // รอให้คำตอบแสดง
  await new Promise(resolve => setTimeout(resolve, 700));

  // 2. ตรวจเช็คทุก element ที่มี class ตามที่ระบุ
  let scrambledCells = document.querySelectorAll('.scrambled-cell.ui-state-default.ui-draggable.ui-draggable-handle.ui-droppable');
  let successFound = false;

  scrambledCells.forEach(cell => {
    if (cell.classList.contains('success')) {
      successFound = true;
    } else {
      cell.remove();  // ลบ element ที่ไม่มี success
    }
  });

  // หน่วงเวลา 1 วินาทีหลังจากลบ element เพื่อให้เห็นผล
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 3. กรณีไม่พบคำที่ถูกต้องเลย ให้รีเฟรชหน้าเว็บ
  if (!successFound) {
    console.log("❌ ไม่พบคำตอบที่ถูกต้อง! กำลังรีเฟรชหน้าเว็บ...");
    window.location.reload();
    return;
  }

  // 4. หากเจอคำถูกต้องแล้ว ให้กด Correction อีกครั้ง
  console.log("🎉 พบคำที่ถูกต้องแล้ว!");
  correctionButton = document.querySelector('.action-exercise-button.correct');
  if (correctionButton) {
    correctionButton.click();
    console.log("✅ กดปุ่ม Correction หลังจากลบเสร็จ");
  }
  await new Promise(resolve => setTimeout(resolve, 700));

  // 5. กดปุ่ม "Next" เพื่อไปยังขั้นตอนถัดไป
  let nextButton = document.querySelector('button[class*="next"]');
  if (nextButton) {
    nextButton.click();
    console.log("✅ กดปุ่ม Next เพื่อไปยังขั้นตอนถัดไป");
  } else {
    console.log("❌ ไม่พบปุ่ม Next!");
  }
}

// เรียกใช้งานฟังก์ชัน
solveAndClick();
