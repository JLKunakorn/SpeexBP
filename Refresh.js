async function refreshSolve() {
    console.log("🎯 [Refresh] เริ่มสุ่มคำตอบทั้งหมด...");
    
    // 1️⃣ **สุ่มคำตอบทุกข้อพร้อมกัน**
    let refreshButtons = document.querySelectorAll(".halflings-icon.refresh");
    let refreshPromises = [];

    // สร้าง Promise สำหรับการคลิกแต่ละปุ่ม
    refreshButtons.forEach((button, index) => {
        refreshPromises.push(new Promise(resolve => {
            button.click();
            console.log(`🔄 [Refresh] สุ่มข้อที่ ${index + 1}`);
            setTimeout(resolve, 100); // รอ 100 มิลลิวินาทีหลังจากคลิก
        }));
    });

    // รอให้ทุกปุ่มถูกคลิกพร้อมกัน
    await Promise.all(refreshPromises);

    // 2️⃣ **กด Correction**
    let correctionButton = document.querySelector(".action-exercise-button.correct");
    if (correctionButton) {
        correctionButton.click();
        console.log("✅ [Refresh] กด Correction เพื่อตรวจคำตอบ...");
    } else {
        console.log("❌ [Refresh] ไม่พบปุ่ม Correction!");
        return;
    }

    // รอให้ระบบตรวจคำตอบก่อน (0.5 วิ)
    await new Promise(resolve => setTimeout(resolve, 500));

    // 3️⃣ **เช็คข้อที่ผิด**
    let incorrectAnswers = document.querySelectorAll(".input-group.has-error");
    while (incorrectAnswers.length > 0) {
        console.log(`❌ [Refresh] พบข้อผิด ${incorrectAnswers.length} ข้อ กำลังสุ่มใหม่...`);

        for (let question of incorrectAnswers) {
            let refreshButton = question.querySelector(".halflings-icon.refresh");
            if (refreshButton) {
                refreshButton.click();
                console.log("🔄 [Refresh] กดสุ่มใหม่...");
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        // กด Correction อีกรอบ
        correctionButton = document.querySelector(".action-exercise-button.correct");
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ [Refresh] กด Correction เพื่อตรวจคำตอบอีกครั้ง...");
        } else {
            console.log("❌ [Refresh] ไม่พบปุ่ม Correction!");
            return;
        }

        // รอให้ระบบตรวจคำตอบอีกครั้ง (0.5 วิ)
        await new Promise(resolve => setTimeout(resolve, 500));

        // อัปเดตรายการข้อผิดใหม่
        incorrectAnswers = document.querySelectorAll(".input-group.has-error");
    }

    console.log("🎉 [Refresh] สุ่มเสร็จ! ทุกข้อถูกต้องแล้ว!");

    // รอ 100ms ก่อนกด "Next"
    await new Promise(resolve => setTimeout(resolve, 100));

    // รอจนกว่าปุ่ม Next จะโหลด
    let checkNextButton = setInterval(() => {
        let nextButton = document.querySelector(".action-exercise-button.next");
        if (nextButton) {
            clearInterval(checkNextButton); // หยุดการตรวจสอบเมื่อปุ่ม Next พร้อม
            nextButton.click();
            console.log("➡️ [Refresh] กด Next ไปยังขั้นตอนถัดไป...");
        }
    }, 100); // ตรวจสอบทุกๆ 100 มิลลิวินาที
}

// 🔥 เรียกใช้งานโค้ด
refreshSolve();
