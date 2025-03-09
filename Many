async function ManyAnswers() {
    console.log("🚀 เริ่มต้นการปรับแต่ง .choice-item...");

    // 1️⃣ หาทุก .item.choice-item ภายใน .exercise-items
    let choiceItems = document.querySelectorAll('.exercise-items .item.choice-item');

    // 2️⃣ ลบทุก .item.choice-item ยกเว้นตัวแรก
    for (let i = 1; i < choiceItems.length; i++) {
        choiceItems[i].remove();
    }
    console.log("✅ ลบ .choice-item เหลือเพียง 1 ตัว");

    // 🔁 ฟังก์ชันรอปุ่ม
    async function waitForButton(selector, maxWaitTime = 5000) {
        let elapsedTime = 0;
        while (elapsedTime < maxWaitTime) {
            let button = document.querySelector(selector);
            if (button) return button;
            console.log(`⌛ กำลังรอปุ่ม ${selector} (${elapsedTime}ms)`);
            await new Promise(resolve => setTimeout(resolve, 300)); // รอ 300ms ก่อนเช็คใหม่
            elapsedTime += 300;
        }
        return null;
    }

    // 🔁 ฟังก์ชันรอ elements (เช่น .choice-option.should-be-checked)
    async function waitForElements(selector, maxWaitTime = 5000) {
        let elapsedTime = 0;
        while (elapsedTime < maxWaitTime) {
            let elements = document.querySelectorAll(selector);
            if (elements.length > 0) return elements;
            console.log(`⌛ กำลังรอ ${selector} (${elapsedTime}ms)`);
            await new Promise(resolve => setTimeout(resolve, 300));
            elapsedTime += 300;
        }
        return [];
    }

    // 3️⃣ กดปุ่ม "Correction"
    let correctionButton = await waitForButton('.action-exercise-button.correct');
    if (correctionButton) {
        correctionButton.click();
        console.log("✅ กด Correction เพื่อตรวจคำตอบ");
    } else {
        console.log("❌ ไม่พบปุ่ม Correction!");
        return;
    }

    // 4️⃣ **รอให้ .choice-option.should-be-checked โผล่มา**
    let checkedOptions = await waitForElements('.item.choice-item .choice-option.should-be-checked', 5000);

    if (checkedOptions.length === 0) {
        console.log("❌ ไม่พบตัวเลือกที่ต้องกดหลังจาก Correction!");
        return;
    }

    // 5️⃣ กดทุก `.choice-option.should-be-checked`
    checkedOptions.forEach(option => {
        let checkbox = option.querySelector('input.choice');
        if (checkbox) {
            checkbox.click();
            console.log(`✅ กดตัวเลือก: ${option.innerText.trim()}`);
        }
    });

    // 6️⃣ กดปุ่ม "Correction" อีกครั้ง
    correctionButton = await waitForButton('.action-exercise-button.correct');
    if (correctionButton) {
        correctionButton.click();
        console.log("✅ กด Correction เพื่อตรวจคำตอบอีกครั้ง");
    } else {
        console.log("❌ ไม่พบปุ่ม Correction อีกครั้ง!");
        return;
    }

    // 7️⃣ หน่วงเวลา 400 - 800 ms (ลดลงจาก 500 - 1000 ms)
    let waitTime = Math.random() * (800 - 400) + 400;
    await new Promise(resolve => setTimeout(resolve, waitTime));

    // 8️⃣ กดปุ่ม Next
    let nextButton = await waitForButton(".action-exercise-button.next");
    if (nextButton) {
        nextButton.click();
        console.log("➡️ กด Next ไปยังขั้นตอนถัดไป...");
    } else {
        console.log("❌ ไม่พบปุ่ม Next!");
    }

    console.log("🎉 เสร็จสิ้นกระบวนการ ManyAnswers!");
}

// 🔥 เรียกใช้งานฟังก์ชัน `ManyAnswers();`
ManyAnswers();
