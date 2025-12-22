// Next.js - Pro Edition
(async () => {
    // รวม Selector ทุกรูปแบบที่ Speexx ใช้สำหรับปุ่มไปต่อ
    const NEXT_SELECTOR = '.action-exercise-button.next, .nxt-exercise, .btn-primary.next, button[class*="next"]';

    const clickNext = () => {
        const btn = document.querySelector(NEXT_SELECTOR);
        
        // เงื่อนไข: ต้องมีปุ่ม, ปุ่มต้องไม่ถูกปิดใช้งาน (disabled), และต้องมองเห็นได้ (offsetWidth > 0)
        if (btn && !btn.disabled && btn.offsetWidth > 0) {
            // ตรวจสอบข้อความภายในเพื่อความแม่นยำ (รองรับหลายภาษา)
            if (/next|ต่อ|continue|suivant|weiter/i.test(btn.innerText)) {
                btn.click();
                console.log("✅ [JL] Next/Continue triggered");
                return true;
            }
        }
        return false;
    };

    // 1. ลองคลิกทันที
    if (clickNext()) return;

    // 2. ถ้าคลิกไม่ได้ (เช่น ปุ่มยังโหลดไม่เสร็จ) ให้เฝ้าดูการเปลี่ยนแปลง
    console.log("🔍 [JL] Next button not ready, monitoring...");
    const obs = new MutationObserver(() => {
        if (clickNext()) {
            obs.disconnect();
        }
    });

    obs.observe(document.body, { attributes: true, childList: true, subtree: true });

    // ป้องกันสคริปต์ค้างถ้าหน้าเว็บ Error
    setTimeout(() => obs.disconnect(), 6000);
})();
