// Write.js - Speedhack Optimized (Repeat Trigger)
(async () => {
    console.log("📝 [JL] Write Mode: Repeat-Trigger Active");

    const wait = ms => new Promise(r => setTimeout(r, ms));

    // ฟังก์ชันรอ Element ที่ทนทานต่อการเร่งเวลา
    const waitForVisible = async (selector, maxAttempts = 150) => {
        for (let i = 0; i < maxAttempts; i++) {
            const el = document.querySelector(selector);
            if (el && el.offsetParent !== null) return el;
            await wait(100); 
        }
        return null;
    };

    // 1. ตรวจสอบสถานะและกด Solution
    console.log("⏳ Checking Correction/Solution status...");
    
    let solutionBtn = document.querySelector('button.solution, button.btn-link.solution');
    
    if (!solutionBtn) {
        // กด Correction เพื่อเปิดทาง
        document.querySelector('.action-exercise-button.correct')?.click();
        
        // รอ Solution สูงสุด 15 วินาที (เผื่อ Lag จาก Speedhack)
        solutionBtn = await waitForVisible('button.solution, button.btn-link.solution');
    }

    if (!solutionBtn) {
        console.error("❌ Solution button not found. (Server Lag?)");
        // Emergency: ถ้าหาปุ่มเฉลยไม่เจอ ลองกด Correction อีกที
        document.querySelector('.action-exercise-button.correct')?.click();
        await wait(500);
        solutionBtn = document.querySelector('button.solution');
    }

    if (solutionBtn) {
        solutionBtn.click();
        console.log("👁️ Solution Clicked -> Waiting for Repeat Button...");
    }

    // 2. [จุดที่แก้] รอ "ปุ่ม Repeat" แทนการรอช่องคำตอบ (ชัวร์กว่ามาก)
    const repeatBtn = await waitForVisible('button[class*="repeat"]', 100);
    
    if (!repeatBtn) {
        return console.error("❌ Repeat button did not appear!");
    }
    console.log("✅ Review Mode Confirmed");

    // 3. จำคำตอบ (Memorize)
    // ถึงจุดนี้หน้าจอต้องมีคำตอบแล้วแน่นอน
    const inputs = document.querySelectorAll('.answer.form-control');
    const answers = Array.from(inputs).map(input => input.value).filter(v => v !== "");
    console.log(`💾 Memorized ${answers.length} answers`);

    // 4. รีเซ็ต (Click Repeat)
    repeatBtn.click();
    console.log("🔄 Repeat Clicked");
    
    // รอ Animation รีเซ็ต (สำคัญ)
    await wait(800);

    // กด Start ถ้ามี (บางโจทย์รีเซ็ตแล้วต้องกด Start ใหม่)
    const startBtn = document.querySelector('button.start-exercise');
    if (startBtn && startBtn.offsetParent !== null) {
        startBtn.click();
        await wait(500);
    }

    // 5. เติมคำตอบ (Injection)
    // รอช่องว่างช่องแรกโผล่มา
    const targetInput = await waitForVisible('.answer.form-control', 50);
    
    if (targetInput) {
        const newInputs = document.querySelectorAll('.answer.form-control');
        newInputs.forEach((input, index) => {
            if (answers[index]) {
                input.value = answers[index];
                // ยิง Event รัวๆ สู้ Speedhack
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                input.dispatchEvent(new Event('blur', { bubbles: true }));
            }
        });
        console.log("✍️ Injected Answers");
    }

    // 6. ส่งงานและไปต่อ
    await wait(300);
    document.querySelector('.action-exercise-button.correct')?.click();
    
    // ใช้ Observer รอ Next
    const nextObs = new MutationObserver((_, obs) => {
        const nextBtn = document.querySelector('.action-exercise-button.next, .nxt-exercise');
        // เงื่อนไข: ปุ่มต้องโผล่ + ไม่ disable + มีป้ายคะแนนขึ้นแล้ว
        const hasScore = document.querySelector('.result-badge-text');
        
        if (nextBtn && !nextBtn.disabled && nextBtn.offsetWidth > 0 && hasScore) {
            nextBtn.click();
            console.log("➡️ Next Clicked");
            obs.disconnect();
        }
    });
    
    nextObs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => nextObs.disconnect(), 10000);

})();
