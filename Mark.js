// Mark.js - Pro Edition (Precision Interaction)
(async () => {
    console.log("🎯 [JL] Mark Mode: Precision Clicking Active");

    const getBtn = (sel) => document.querySelector(sel);

    // 1. ค้นหาคำที่เลือกได้ทั้งหมดในก้อนโจทย์
    const markTexts = document.querySelectorAll(".exercise-items .mark-text");
    
    if (markTexts.length > 0) {
        console.log(`🖱️ [JL] Selecting ${markTexts.length} items...`);
        // คลิกทุกตัวทันที (ไม่ใช้ Loop หน่วงเวลาเพื่อความไว)
        markTexts.forEach(mark => mark.click());
    }

    // 2. กด Correction ที่แถบด้านล่าง
    const correctBtn = getBtn('.exercise-bottom-bar-main .action-exercise-button.correct');
    if (correctBtn) {
        correctBtn.click();
        console.log("✅ [JL] Correction triggered.");
    }

    // 3. วนลูปรอปุ่ม Next (nxt-exercise) เพื่อข้ามหน้าทันทีที่ระบบตรวจเสร็จ
    const nextObs = new MutationObserver((_, obs) => {
        const nxt = getBtn('.exercise-bottom-bar-main .action-exercise-button.next.nxt-exercise');
        if (nxt && !nxt.disabled && nxt.offsetWidth > 0) {
            nxt.click();
            console.log("➡️ [JL] Next Clicked!");
            obs.disconnect();
        }
    });

    nextObs.observe(document.body, { attributes: true, childList: true, subtree: true });
    setTimeout(() => nextObs.disconnect(), 6000); // กันค้าง
})();
