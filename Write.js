// Write.js - Pro Edition (Precision Events)
(async () => {
    console.log("📝 [JL] Write Mode: Extraction & Injection Active");

    const wait = ms => new Promise(r => setTimeout(r, ms));
    const getBtn = (sel) => document.querySelector(sel);

    // 1. ดึงคำตอบจากเฉลย
    getBtn('.action-exercise-button.correct')?.click(); // กดตรวจก่อนเพื่อให้ปุ่ม Solution โผล่
    await wait(600);
    
    // หาปุ่ม Solution (รองรับทั้ง selector และการหาจากข้อความ)
    let solBtn = getBtn('button.solution') || [...document.querySelectorAll('button')].find(b => b.textContent.includes('Solution'));
    if (solBtn) {
        solBtn.click();
        await wait(600);
    }

    // เก็บคำตอบลง Memory
    const answers = [...document.querySelectorAll('.answer.form-control')].map(f => f.value).filter(v => v !== "");
    if (answers.length === 0) return console.warn("❌ [JL] Answers not found.");

    // 2. รีเซ็ตบทเรียน
    getBtn('button[class*="repeat"]')?.click();
    await wait(800);

    // 3. เติมคำตอบด้วยระบบ Smart Injection (ไม่ต้องรอ setTimeout นาน)
    const inputs = document.querySelectorAll('.answer.form-control');
    inputs.forEach((input, i) => {
        if (answers[i]) {
            input.disabled = false;
            input.value = answers[i];
            // ยิงสัญญาณเพื่อให้สคริปต์ของเว็บรู้ว่ามีการพิมพ์จริง
            ['input', 'change', 'blur'].forEach(ev => input.dispatchEvent(new Event(ev, { bubbles: true })));
        }
    });

    // 4. ส่งคำตอบและไปต่อ
    await wait(500);
    getBtn('.action-exercise-button.correct')?.click();
    
    // วนลูปรอปุ่ม Next (Smart Waiting)
    const nextObs = new MutationObserver((_, obs) => {
        const nxt = getBtn('.action-exercise-button.next');
        if (nxt && nxt.offsetWidth > 0) { nxt.click(); obs.disconnect(); }
    });
    nextObs.observe(document.body, { attributes: true, childList: true, subtree: true });
})();
