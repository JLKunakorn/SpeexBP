// Write.js - Speedhack Edition (Robust DOM Check)
(async () => {
    console.log("📝 [JL] Write Mode: Speedhack Compatible Active");

    // ฟังก์ชันช่วยรอ (ปรับให้ทำงานกับ TimerHooker ได้ดีขึ้น)
    // การใช้ requestAnimationFrame จะช่วยให้จังหวะตรงกับรอบการวาดหน้าจอ
    const wait = ms => new Promise(r => setTimeout(r, ms));

    const waitForElement = async (selector, timeout = 5000) => {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const el = document.querySelector(selector);
            // เช็คว่ามี Element และ "มองเห็นจริง" (ไม่ถูกซ่อน)
            if (el && el.offsetParent !== null && !el.disabled) return el;
            await wait(100); // Polling ทุก 100ms (ในเวลาที่ถูกเร่ง)
        }
        return null;
    };

    // 1. กด Correction เพื่อเปิดทาง (Loop เช็คจนกว่าปุ่ม Solution จะโผล่)
    console.log("Waiting for Solution button...");
    let solutionBtn = document.querySelector('button.solution, button.btn-link.solution');
    
    // ถ้ายังไม่มีปุ่ม Solution ให้กด Correction ย้ำๆ จนกว่าจะมา
    let attempts = 0;
    while (!solutionBtn && attempts < 20) {
        const correctBtn = document.querySelector('.action-exercise-button.correct');
        if (correctBtn && !correctBtn.disabled) {
            correctBtn.click();
            console.log("👆 Clicked Correction (Attempting to unveil Solution)");
        }
        
        await wait(300); // รอให้ UI ตอบสนอง
        solutionBtn = document.querySelector('button.solution, button.btn-link.solution');
        attempts++;
    }

    if (!solutionBtn) return console.error("❌ Solution button failed to appear!");

    // 2. กด Solution และเก็บคำตอบ
    solutionBtn.click();
    console.log("👁️ Revealed Solution");
    await wait(500); // รอ Animation เฉลย

    // ดึงค่าคำตอบ (Target HTML: input.answer.form-control)
    const inputs = document.querySelectorAll('.answer.form-control');
    const answers = Array.from(inputs).map(input => input.value).filter(v => v !== "");
    
    if (answers.length === 0) return console.error("❌ No answers extracted!");
    console.log("💾 Memorized:", answers);

    // 3. รีเซ็ตบทเรียน (กด Repeat)
    const repeatBtn = await waitForElement('button[class*="repeat"]');
    if (repeatBtn) {
        repeatBtn.click();
        console.log("🔄 Resetting exercise...");
        await wait(500);
    }

    // 4. รอให้ปุ่ม Start โผล่ (กรณีรีเซ็ตแล้วต้องกด Start ใหม่) หรือรอช่องว่างมา
    // บางที Speexx รีเซ็ตแล้วเป็นช่องว่างเลย หรือบางทีต้องกด Start
    const startBtn = document.querySelector('button.start-exercise');
    if (startBtn) {
        startBtn.click();
        await wait(500);
    }

    // 5. เติมคำตอบ (Injection Phase)
    // รอจนกว่าช่อง Input ช่องแรกจะโผล่มาและว่างเปล่า
    await waitForElement('.answer.form-control');
    const newInputs = document.querySelectorAll('.answer.form-control');

    newInputs.forEach((input, index) => {
        if (answers[index]) {
            input.value = answers[index];
            // [สำคัญ] ยิง Event รัวๆ เพื่อสู้กับ Speedhack ให้เว็บรู้ตัวว่าพิมพ์แล้ว
            input.dispatchEvent(new Event('focus', { bubbles: true }));
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            input.dispatchEvent(new Event('blur', { bubbles: true }));
        }
    });
    console.log("✍️ Answers injected.");

    // 6. จบงาน: กด Correction -> รอ Next
    await wait(300);
    const finalCorrect = document.querySelector('.action-exercise-button.correct');
    if (finalCorrect) finalCorrect.click();

    // ใช้ Observer ดักจับปุ่ม Next ทันทีที่คะแนนขึ้น
    const obs = new MutationObserver(() => {
        const nextBtn = document.querySelector('.action-exercise-button.next, .nxt-exercise');
        if (nextBtn && !nextBtn.disabled && nextBtn.offsetWidth > 0) {
            nextBtn.click();
            console.log("➡️ Next Clicked!");
            obs.disconnect();
        }
    });
    obs.observe(document.body, { childList: true, subtree: true });
    
    // Safety Timeout
    setTimeout(() => obs.disconnect(), 5000);

})();
