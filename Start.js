// Start.js - Pro Edition (Single Click Version)
(async () => {
    const START_SELECTOR = 'button[aria-label="Start now"], button.start-exercise, .btn-primary.start-exercise';
    
    // ตัวแปรป้องกันการกดซ้ำภายในสคริปต์นี้
    let hasClicked = false;

    console.log('⏳ [JL] Monitoring Start button (Single Click Mode)...');

    // ฟังก์ชันคลิก
    const triggerStart = (btn) => {
        // ต้องมีปุ่ม + ไม่ถูก disable + ยังไม่เคยกดในรอบนี้
        if (btn && !btn.disabled && !hasClicked) {
            hasClicked = true; // ล็อคทันทีว่ากดแล้ว
            console.log('✅ [JL] Start clicked successfully');
            btn.click();
            return true;
        }
        return false;
    };

    // 1. เช็คทันทีที่สคริปต์ทำงาน
    const instantBtn = document.querySelector(START_SELECTOR);
    if (triggerStart(instantBtn)) return;

    // 2. ถ้าไม่เจอ ให้เฝ้าดู DOM
    const observer = new MutationObserver((_, obs) => {
        const asyncBtn = document.querySelector(START_SELECTOR);
        if (asyncBtn && !hasClicked) {
            if (triggerStart(asyncBtn)) {
                obs.disconnect(); // หยุดเฝ้าดูทันทีเมื่อกดสำเร็จ
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Safety timeout: ถ้าผ่านไป 8 วินาทียังไม่เจอ ให้หยุดเฝ้าดูเพื่อประหยัด RAM
    setTimeout(() => {
        observer.disconnect();
        hasClicked = false; // เคลียร์สถานะเผื่อมีการเรียกใช้ใหม่ในอนาคต
    }, 8000);
})();
