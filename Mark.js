async function markTextSolve() {
    console.log("🎯 [Mark Text] เริ่มต้นการทำงาน...");

    // 1️⃣ กดทุก `.mark-text` ที่อยู่ใน `.exercise-items`
    let markTexts = document.querySelectorAll(".exercise-items .mark-text");
    if (markTexts.length > 0) {
        markTexts.forEach(mark => {
            mark.click();
            console.log("✅ [Mark Text] กดที่ .mark-text");
        });
    } else {
        console.log("❌ [Mark Text] ไม่พบ .mark-text ใน .exercise-items");
    }

    // 2️⃣ กด Correction
    let correctionButton = document.querySelector(".action-exercise-button.correct");
    if (correctionButton) {
        await new Promise(resolve => setTimeout(resolve, 500)); // หน่วง 0.5 วิ
        correctionButton.click();
        console.log("✅ [Mark Text] กด Correction...");
    } else {
        console.log("❌ [Mark Text] ไม่พบปุ่ม Correction!");
        return;
    }

    // 3️⃣ รอ 1 วิ แล้วกด Next
    await new Promise(resolve => setTimeout(resolve, 1000));

    let nextButton = document.querySelector(".action-exercise-button.next");
    if (nextButton) {
        nextButton.click();
        console.log("➡️ [Mark Text] กด Next ไปยังขั้นตอนถัดไป...");
    } else {
        console.log("❌ [Mark Text] ไม่พบปุ่ม Next!");
    }

    console.log("🎉 [Mark Text] เสร็จสิ้นการทำงาน!");
}

// 🔥 เรียกใช้งานโค้ด
markTextSolve();
