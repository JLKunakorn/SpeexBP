async function solveAndCheck() {
    console.log("🎯 เริ่มทำงาน...");

    // 2. กดปุ่ม Start
    let startButton = document.querySelector('.btn.btn-primary.start-exercise');
    if (startButton) {
        startButton.click();
        console.log("✅ กด Start เพื่อเริ่มการทำงาน");
    } else {
        console.log("❌ ไม่พบปุ่ม Start!");
        return;
    }

    // 3. กดปุ่ม Correction
    let correctionButton = document.querySelector('.action-exercise-button.correct');
    if (correctionButton) {
        correctionButton.click();
        console.log("✅ กด Correction เพื่อตรวจคำตอบ");
    } else {
        console.log("❌ ไม่พบปุ่ม Correction!");
        return;
    }

    // 4. หน่วงเวลา 1 วินาที
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 5. กดปุ่ม Solution
    let solutionButton = document.querySelector('button.btn-link.solution');
    if (solutionButton) {
        solutionButton.click();
        console.log("✅ กด Solution");

        // 6. เก็บคำตอบ
        let answers = [];
        let answerFields = document.querySelectorAll('.answer.form-control');
        
        if (answerFields.length === 0) {
            console.log("❌ ไม่พบช่องกรอกคำตอบ!");
            return;
        }

        answerFields.forEach(field => {
            answers.push(field.value);
        });

        console.log("📝 คำตอบที่เก็บ: ", answers);

        // 7. กดปุ่ม Repeat เพื่อเริ่มใหม่
        let repeatButton = document.querySelector('button[class*="repeat"]');
        if (repeatButton) {
            repeatButton.click();
            console.log("✅ กด Repeat");
        } else {
            console.log("❌ ไม่พบปุ่ม Repeat!");
            return;
        }

        // 8. หน่วงเวลา 0.5 วินาที
        await new Promise(resolve => setTimeout(resolve, 500));

        // 9. กดปุ่ม Start อีกครั้ง โดยอัตโนมัติ
        startButton = document.querySelector('.btn.btn-primary.start-exercise');
        if (startButton) {
            startButton.click();
            console.log("✅ กด Start อีกครั้งเพื่อเริ่มใหม่");
        } else {
            console.log("❌ ไม่พบปุ่ม Start อีกครั้ง!");
            return;
        }

        // 10. รอจนกว่าจะพบช่องกรอกคำตอบ
        await waitForElement('.answer.form-control');

        // 11. เติมคำตอบที่เก็บไว้
        let blanks = document.querySelectorAll('.answer.form-control');
        await Promise.all(Array.from(blanks).map((blank, index) => {
            if (answers[index]) {
                blank.value = answers[index]; // เติมคำตอบที่เก็บไว้
                console.log(`✅ เติมคำตอบ '${answers[index]}' ในช่องที่ ${index + 1}`);
            }
        }));

        // 12. กดปุ่ม Correction อีกครั้ง
        correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กด Correction เพื่อตรวจคำตอบอีกครั้ง");
        } else {
            console.log("❌ ไม่พบปุ่ม Correction อีกครั้ง!");
        }

        // 13. หน่วงเวลา 1 วินาที
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 14. กดปุ่ม Next เพื่อไปยังขั้นตอนถัดไป
        let nextButton = document.querySelector(".action-exercise-button.next");
        if (nextButton) {
            nextButton.click();
            console.log("➡️ กด Next ไปยังขั้นตอนถัดไป...");
        } else {
            console.log("❌ ไม่พบปุ่ม Next!");
        }

        console.log("🎉 เสร็จสิ้นการกดปุ่ม Start, กรอกคำตอบ, กด Next, กด Correction, Solution, Repeat และ Next!");
    } else {
        console.log("❌ ไม่พบปุ่ม Solution!");
    }
}

// ฟังก์ชันที่จะรอจนกว่าจะพบช่องกรอกคำตอบ
async function waitForElement(selector, timeout = 10000) {
    const startTime = Date.now();
    let element = null;
    while (!element) {
        element = document.querySelector(selector);
        if (element) break;
        if (Date.now() - startTime > timeout) {
            console.log("❌ หมดเวลาในการรอพบช่องกรอกคำตอบ!");
            return null;
        }
        await new Promise(resolve => setTimeout(resolve, 500)); // รอ 0.5 วินาที แล้วลองใหม่
    }
    return document.querySelectorAll(selector);
}

// เรียกใช้งานฟังก์ชัน
solveAndCheck();
