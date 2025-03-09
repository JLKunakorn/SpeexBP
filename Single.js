async function clickCorrectionAndNext() {
    console.log("🎯 กำลังกดปุ่ม Correction เพื่อแสดงคำตอบที่ถูกต้อง...");

    // 1. กดปุ่ม Correction เพื่อแสดงคำตอบ
    let correctionButton = document.querySelector(".action-exercise-button.correct");
    if (correctionButton) {
        correctionButton.click();
        console.log("✅ กด Correction เพื่อแสดงคำตอบที่ถูกต้อง...");
    } else {
        console.log("❌ ไม่พบปุ่ม Correction!");
        return;
    }

    // รอ 1 วินาที (ลดจาก 2 วินาที)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 2. ค้นหาทุกข้อที่มี class="item choice-item"
    let allQuestions = document.querySelectorAll('.item.choice-item');
    console.log(`🎯 พบทั้งหมด ${allQuestions.length} ข้อ`);

    // ใช้ Promise.all เพื่อเลือกคำตอบถูกต้องพร้อมกัน
    let clickPromises = Array.from(allQuestions).map((question, index) => {
        return new Promise(resolve => {
            console.log(`ข้อที่ ${index + 1}:`);

            // ค้นหาทุก label ที่มี class="choice-option should-be-checked"
            let correctChoice = question.querySelector('.choice-option.should-be-checked');

            if (correctChoice) {
                // คลิกที่ตัวเลือกที่ถูกต้อง
                let radioInput = correctChoice.querySelector('input[type="radio"]');
                if (radioInput) {
                    radioInput.click(); // คลิกตัวเลือกที่ถูกต้อง
                    console.log(`✔️ เลือกตัวเลือกที่ถูกต้องในข้อที่ ${index + 1}`);
                }
            }
            resolve(); // เมื่อทำเสร็จให้ resolve
        });
    });

    // รอให้เลือกคำตอบทั้งหมดเสร็จพร้อมกัน
    await Promise.all(clickPromises);

    // 3. กดปุ่ม Correction อีกครั้งเพื่อตรวจสอบคำตอบ
    if (correctionButton) {
        correctionButton.click();
        console.log("✅ กด Correction อีกครั้งเพื่อตรวจสอบคำตอบ...");
    } else {
        console.log("❌ ไม่พบปุ่ม Correction!");
    }

    // 4. กดปุ่ม Next เพื่อไปยังขั้นตอนถัดไป
    let nextButton = document.querySelector(".action-exercise-button.next");
    if (nextButton) {
        nextButton.click();
        console.log("➡️ กด Next ไปยังขั้นตอนถัดไป...");
    } else {
        console.log("❌ ไม่พบปุ่ม Next!");
    }

    console.log("🎉 เสร็จสิ้นการกดปุ่ม Correction, เลือกตัวเลือกที่ถูกต้อง และกด Next!");
}

// 🔥 เรียกใช้งานโค้ด
clickCorrectionAndNext();
