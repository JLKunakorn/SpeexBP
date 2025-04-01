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
        // ถ้า element มี class "success" ถือว่าถูกต้อง
        if (cell.classList.contains('success')) {
            successFound = true;
        } else {
            cell.remove();  // ลบ element ที่ไม่มี success
        }
    });

    // หน่วงเวลา 1 วินาทีหลังจากลบ element เพื่อให้เห็นผล
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. ถ้าไม่พบคำตอบที่ถูกต้องเลย
    if (!successFound) {
        console.log("❌ ไม่พบคำตอบที่ถูกต้อง! กำลังทำตามขั้นตอนเพื่อแก้ไข...");

        // กดปุ่ม "Correction"
        correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กด Correction เพื่อตรวจคำตอบอีกครั้ง");
        }

        // รอ 1.5 วิ
        await new Promise(resolve => setTimeout(resolve, 1500));

        // กดปุ่ม "Solution" (class="btn btn-link solution")
        let solutionButton = document.querySelector('button.btn.btn-link.solution');
        if (solutionButton) {
            solutionButton.click();
            console.log("✅ กด Solution เพื่อแสดงคำตอบที่ถูกต้อง");
        } else {
            console.log("❌ ไม่พบปุ่ม Solution!");
        }

        // รอ 0.5 วิ
        await new Promise(resolve => setTimeout(resolve, 500));

        // กดปุ่ม "Repeat" (class="btn btn-primary action-exercise-button repeat")
        let repeatButton = document.querySelector('button.btn.btn-primary.action-exercise-button.repeat');
        if (repeatButton) {
            repeatButton.click();
            console.log("✅ กด Repeat เพื่อทำแบบทดสอบใหม่");
        } else {
            console.log("❌ ไม่พบปุ่ม Repeat!");
        }

        // รอให้หน้าโหลดใหม่
        await new Promise(resolve => setTimeout(resolve, 1000));

        // เริ่มการตรวจสอบใหม่
        solveAndClick();
    } else {
        console.log("🎉 พบคำที่ถูกต้องแล้ว!");

        // 4. กดปุ่ม "Correction" เพื่อตรวจคำตอบอีกครั้ง
        correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กดปุ่ม Correction หลังจากลบเสร็จ");
        }

        // หน่วงเวลา 1 วินาทีเพื่อให้คำตอบแสดงก่อน
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
}

// เรียกใช้งานฟังก์ชัน
solveAndClick();
