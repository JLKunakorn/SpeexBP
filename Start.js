// Start.js - Pro Edition
(async () => {
    const START_SELECTOR = 'button[aria-label="Start now"], button.start-exercise, .btn-primary.start-exercise';
    
    console.log('⏳ [JL] Monitoring Start button...');

    // ฟังก์ชันคลิก
    const triggerStart = (btn) => {
        if (btn && !btn.disabled) {
            btn.click();
            console.log('✅ [JL] Start clicked successfully');
            return true;
        }
        return false;
    };

    // 1. เช็คทันทีที่สคริปต์ทำงาน
    const instantBtn = document.querySelector(START_SELECTOR);
    if (triggerStart(instantBtn)) return;

    // 2. ถ้าไม่เจอ ให้เฝ้าดู DOM (Event-Driven)
    const observer = new MutationObserver((_, obs) => {
        const asyncBtn = document.querySelector(START_SELECTOR);
        if (triggerStart(asyncBtn)) {
            obs.disconnect(); // งานเสร็จแล้ว ปิดตัวเพื่อประหยัดแรม
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Safety timeout: ถ้าผ่านไป 8 วินาทียังไม่เจอ ให้หยุดเฝ้าดู
    setTimeout(() => observer.disconnect(), 8000);
})();
