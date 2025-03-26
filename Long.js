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

    // 2. ตรวจเช็ค class="exercise-items"
    let exerciseItems = document.querySelectorAll('.exercise-items .item');
    let successItemFound = false;

    // ตรวจเช็คว่า item ไหนมี class "scrambled-cell success"
    exerciseItems.forEach(item => {
        if (item.querySelector('.scrambled-cell.success')) {
            successItemFound = true;
        } else {
            item.remove();  // ลบ item ที่ไม่มี success
        }
    });

    // หน่วงเวลา 1 วินาทีหลังจากลบ item เพื่อให้เห็นผล
    await new Promise(resolve => setTimeout(resolve, 500));

    // 3. ถ้าไม่พบคำตอบที่ถูกต้องเลย
    if (!successItemFound) {
        console.log("❌ ไม่พบคำตอบที่ถูกต้อง ลองใหม่...");
        
        // 4. กดปุ่ม "Solution"
        let solutionButton = document.querySelector('button.btn-link.solution');
        if (solutionButton) {
            solutionButton.click();
            console.log("✅ กด Solution เพื่อแสดงคำตอบที่ถูกต้อง");
        } else {
            console.log("❌ ไม่พบปุ่ม Solution!");
        }

        // รอให้เฉลยแสดง
        await new Promise(resolve => setTimeout(resolve, 700));

        // 5. กดปุ่ม "Repeat" เพื่อเริ่มใหม่
        let repeatButton = document.querySelector('button[class*="repeat"]');
        if (repeatButton) {
            repeatButton.click();
            console.log("✅ กด Repeat เพื่อทำแบบทดสอบใหม่");
        } else {
            console.log("❌ ไม่พบปุ่ม Repeat!");
        }

        // รอให้หน้าโหลดใหม่
        await new Promise(resolve => setTimeout(resolve, 1000));

        // ลองใหม่
        solveAndClick();
    } else {
        console.log("🎉 พบคำที่ถูกต้องแล้ว!");

        // 6. กดปุ่ม "Correction" เพื่อตรวจคำตอบอีกครั้ง
        correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กดปุ่ม Correction หลังจากลบเสร็จ");
        }

        // หน่วงเวลา 1 วินาทีเพื่อให้คำตอบแสดงก่อน
        await new Promise(resolve => setTimeout(resolve, 700));

        // 7. รอจนกว่าผลลัพธ์เป็น 100 ก่อนกด Next
        while (!document.querySelector('span.result-badge-text[data-result="100"]')) {
            console.log("⏳ รอให้คะแนนเป็น 100 ก่อนกด Next...");
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log("✅ ได้คะแนน 100 แล้ว กดปุ่ม Next!");
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
