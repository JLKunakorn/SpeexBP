// Many.js - Ultra Speed Edition (DOM Removal)
(async () => {
    console.log("⚡ [JL] Many Mode: Ultra Speed Removal Active");

    const getBtn = (sel) => document.querySelector(sel);

    // 1. ลบก้อนโจทย์ออกทันทีเพื่อข้ามการประมวลผลที่จุกจิก
    const exerciseItems = document.querySelectorAll('.exercise-items');
    exerciseItems.forEach(item => item.remove());
    console.log("🗑️ [JL] Exercise items removed.");

    // 2. กด Correction ที่แถบด้านล่าง (Bottom Bar) เพื่อยืนยันสถานะ
    const correctBtn = getBtn('.exercise-bottom-bar-main .action-exercise-button.correct');
    if (correctBtn) {
        correctBtn.click();
        console.log("🎯 [JL] Correction triggered from Bottom Bar");
    }

    // 3. วนลูปรอปุ่ม Next (nxt-exercise) พร้อมกดทันทีที่โผล่มา
    let attempts = 0;
    const nextInterval = setInterval(() => {
        const nextBtn = getBtn('.exercise-bottom-bar-main .action-exercise-button.next.nxt-exercise');
        
        // เงื่อนไข: เจอปุ่ม และปุ่มพร้อมกด (ไม่โดน disabled)
        if (nextBtn && !nextBtn.disabled && nextBtn.offsetWidth > 0) {
            nextBtn.click();
            console.log("➡️ [JL] Next Clicked!");
            clearInterval(nextInterval);
        }

        attempts++;
        if (attempts > 12) clearInterval(nextInterval); // Timeout 6 วินาที
    }, 500);
})();
