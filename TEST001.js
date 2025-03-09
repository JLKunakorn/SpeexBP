async function loadAndRunScript(url, key) {
    if (!window[key]) {  // ตรวจสอบว่าโหลดไปแล้วหรือยัง
        try {
            let response = await fetch(url);
            let scriptText = await response.text();
            let scriptElement = document.createElement("script");
            scriptElement.textContent = scriptText;
            document.body.appendChild(scriptElement);
            window[key] = true; // ตั้งค่าให้รู้ว่าโหลดแล้ว
            console.log(`✅ รันโค้ดจาก ${url} สำเร็จ!`);
        } catch (error) {
            console.error(`❌ โหลดโค้ดจาก ${url} ล้มเหลว:`, error);
        }
    } else {
        console.log(`🔄 โค้ดจาก ${url} ถูกโหลดไปแล้ว ไม่โหลดซ้ำ`);
    }
}

async function main() {
    console.log("🚀 เริ่มต้นตรวจสอบประเภทของแบบฝึกหัด...");

    while (true) {
        // เช็คว่ามีปุ่ม "Continue learning" หรือไม่
        let continueButton = document.querySelector('.btn.btn-primary.next[tabindex="0"]');
        if (continueButton && continueButton.innerText.includes("Continue learning")) {
            console.log("🎉 พบปุ่ม 'Continue learning' -> หยุดทำงาน!");
            return;
        }

        const exerciseItems = document.querySelector(".exercise-items");

        if (!exerciseItems) {
            console.log("❌ ไม่พบ .exercise-items");
            return;
        }

        if (exerciseItems.querySelector('.drag-drop-placeholder.ui-droppable')) {
            await loadAndRunScript("https://raw.githubusercontent.com/JLKunakorn/SpeexBP/main/Drag.js", "isDragLoaded");
        } else if (exerciseItems.querySelector('input[type="radio"]')) {
            await loadAndRunScript("https://raw.githubusercontent.com/JLKunakorn/SpeexBP/main/Single.js", "isSingleLoaded");
        } else if (exerciseItems.querySelector('.gap-container.form-inline.form-group-sm')) {
            await loadAndRunScript("https://raw.githubusercontent.com/JLKunakorn/SpeexBP/main/Refresh.js", "isRefreshLoaded");
        } else if (exerciseItems.querySelector('.scrambled-cell-container')) {
            await loadAndRunScript("https://raw.githubusercontent.com/JLKunakorn/SpeexBP/main/Long.js", "isLongLoaded");
        } else if (exerciseItems.querySelector('.answer-container.form-inline.form-group-sm')) {
            await loadAndRunScript("https://raw.githubusercontent.com/JLKunakorn/SpeexBP/main/Write.js", "isWriteLoaded");
        } else if (exerciseItems.querySelector('input[type="checkbox"]')) {
            await loadAndRunScript("https://raw.githubusercontent.com/JLKunakorn/SpeexBP/main/Many.js", "isManyLoaded");
        } else if (exerciseItems.querySelector('.mark-text')) {
            await loadAndRunScript("https://raw.githubusercontent.com/JLKunakorn/SpeexBP/main/Mark.js", "isMarkLoaded");
        } else if (exerciseItems.querySelector('.scrambled-sentence.ui-sortable')) {
            await loadAndRunScript("https://raw.githubusercontent.com/JLKunakorn/SpeexBP/main/Arrange.js", "isArrangeLoaded");
        } else {
            await loadAndRunScript("https://raw.githubusercontent.com/JLKunakorn/SpeexBP/main/Next.js", "isNextLoaded");
        }

        // หน่วงเวลา 1 วินาทีก่อนเช็คใหม่
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

// ✅ เรียกใช้งานฟังก์ชันหลัก
main();
