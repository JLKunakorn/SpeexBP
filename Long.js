async function solveAndClick() {
    console.log("🎯 กำลังกดปุ่ม Correction เพื่อแสดงคำตอบที่ถูกต้อง...");

    // 1. ตรวจสอบปุ่ม "Correction" ก่อนแล้วกด
    let correctionButton = document.querySelector('.action-exercise-button.correct');
    if (!correctionButton) {
        console.log("❌ ไม่พบปุ่ม Correction!");
        return;
    }
    correctionButton.click();
    console.log("✅ กด Correction เพื่อตรวจคำตอบ");

    // รอคำตอบแสดง (ลดเวลารอ)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. ตรวจเช็คทุก .scrambled-cell-container
    let exerciseItems = document.querySelectorAll('.scrambled-cell-container');
    let successItemFound = false;

    exerciseItems.forEach(item => {
        // ตรวจสอบว่าในแต่ละ .scrambled-cell-container มี .scrambled-cell.success หรือไม่
        if (item.querySelector('.scrambled-cell.success')) {
            successItemFound = true;
        } else {
            item.remove();  // ลบ item ที่ไม่มี success
        }
    });

    // ถ้าไม่พบคำตอบที่ถูกต้อง
    if (!successItemFound) {
        console.log("❌ ไม่พบคำตอบที่ถูกต้อง ลองใหม่...");

        // 3. รอ 1.5 วินาที แล้วกดปุ่ม "Solution"
        await new Promise(resolve => setTimeout(resolve, 1500));
        let solutionButton = document.querySelector('button.btn-link.solution');
        if (solutionButton) {
            solutionButton.click();
            console.log("✅ กด Solution เพื่อแสดงคำตอบที่ถูกต้อง");
        } else {
            console.log("❌ ไม่พบปุ่ม Solution!");
        }

        // รอให้เฉลยแสดง (ลดเวลารอ)
        await new Promise(resolve => setTimeout(resolve, 300));

        // 4. กดปุ่ม "Repeat" เพื่อเริ่มใหม่
        let repeatButton = document.querySelector('button[class*="repeat"]');
        if (repeatButton) {
            repeatButton.click();
            console.log("✅ กด Repeat เพื่อทำแบบทดสอบใหม่");
        } else {
            console.log("❌ ไม่พบปุ่ม Repeat!");
        }

        // รอให้หน้าโหลดใหม่
        await new Promise(resolve => setTimeout(resolve, 500));

        // เริ่มกระบวนการใหม่
        solveAndClick();
    } else {
        console.log("🎉 พบคำที่ถูกต้องแล้ว!");

        // 5. กดปุ่ม "Correction" เพื่อตรวจคำตอบอีกครั้ง
        correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กดปุ่ม Correction หลังจากลบเสร็จ");
        }

        // หน่วงเวลา 500 มิลลิวินาทีเพื่อให้คำตอบแสดงก่อน
        await new Promise(resolve => setTimeout(resolve, 500));

        // 6. กดปุ่ม "Next" เพื่อไปยังขั้นตอนถัดไป
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
