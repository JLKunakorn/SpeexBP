async function solveAndCheck() {
    console.log("🎯 กำลังกดปุ่ม Correction เพื่อเริ่มการตรวจคำตอบ...");

    // 1. กดปุ่ม "Correction" ก่อน
    let correctionButton = document.querySelector('.action-exercise-button.correct');
    if (correctionButton) {
        correctionButton.click();
        console.log("✅ กด Correction เพื่อตรวจคำตอบ");
    } else {
        console.log("❌ ไม่พบปุ่ม Correction!");
        return;
    }

    // 2. หน่วงเวลา 1 วินาที เพื่อให้ระบบเห็นปุ่ม "Solution"
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. กดปุ่ม "Solution"
    let solutionButton = document.querySelector('button.btn-link.solution');
    if (solutionButton) {
        solutionButton.click();
        console.log("✅ กด Solution");

        // รอ 0.5 วินาทีให้คำตอบแสดง
        await new Promise(resolve => setTimeout(resolve, 500));

        // 4. เก็บคำตอบที่ได้
        let answers = [];
        let answerFields = document.querySelectorAll('.answer.form-control');
        
        if (answerFields.length === 0) {
            console.log("❌ ไม่พบช่องกรอกคำตอบ!");
            return;
        }

        // เก็บคำตอบจากช่องกรอกคำตอบ
        answerFields.forEach(field => {
            answers.push(field.value);
        });

        console.log("📝 คำตอบที่เก็บ: ", answers);

        // 5. กดปุ่ม "Repeat" เพื่อเริ่มใหม่
        let repeatButton = document.querySelector('button[class*="repeat"]');
        if (repeatButton) {
            repeatButton.click();
            console.log("✅ กด Repeat");
        } else {
            console.log("❌ ไม่พบปุ่ม Repeat!");
            return;
        }

        // รอ 0.5 วินาทีให้การเปลี่ยนแปลงเกิดขึ้น
        await new Promise(resolve => setTimeout(resolve, 500));

        // 6. เติมคำตอบในช่องที่ตรงกับคำตอบที่เก็บไว้
        let blanks = document.querySelectorAll('.answer.form-control');
        await Promise.all(Array.from(blanks).map((blank, index) => {
            if (answers[index]) {
                blank.value = answers[index]; // เติมคำตอบที่เก็บไว้
                console.log(`✅ เติมคำตอบ '${answers[index]}' ในช่องที่ ${index + 1}`);
            }
        }));

        // 7. กดปุ่ม "Correction" เพื่อตรวจคำตอบอีกครั้ง
        correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กด Correction เพื่อตรวจคำตอบอีกครั้ง");
        } else {
            console.log("❌ ไม่พบปุ่ม Correction อีกครั้ง!");
        }

        // 8. หน่วงเวลา 0.5 วินาที เพื่อให้การตรวจคำตอบเสร็จ
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 9. กดปุ่ม Next เพื่อไปยังขั้นตอนถัดไป
        let nextButton = document.querySelector(".action-exercise-button.next");
        if (nextButton) {
            nextButton.click();
            console.log("➡️ กด Next ไปยังขั้นตอนถัดไป...");
        } else {
            console.log("❌ ไม่พบปุ่ม Next!");
        }

        console.log("🎉 เสร็จสิ้นการกดปุ่ม Correction, Solution, Repeat และ Next!");
    } else {
        console.log("❌ ไม่พบปุ่ม Solution!");
    }
}

// เรียกใช้งานฟังก์ชัน
solveAndCheck();
