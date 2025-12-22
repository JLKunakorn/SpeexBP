// Drag.js - Pro Edition
(async () => {
    console.log("🚀 [JL] Drag Mode: Atomic Sequence Active");

    const wait = ms => new Promise(r => setTimeout(r, ms));

    // 1. ค้นหาไอเทมทั้งหมด (ดึงข้อมูลมาเก็บใน Array ครั้งเดียวเพื่อประหยัดแรม)
    const draggables = Array.from(document.querySelectorAll('.draggable-container [data-drag-drop-id]'))
        .map(el => ({
            el,
            id: parseInt(el.dataset.dragDropId.match(/\d+/)?.[0] || 0, 10)
        }))
        .sort((a, b) => a.id - b.id); // เรียงลำดับจากน้อยไปมาก

    if (draggables.length === 0) return;

    // 2. คลิกที่ช่องว่าง (Placeholder) ตัวแรกเพื่อเริ่มกระบวนการวาง
    const placeholder = document.querySelector('.exercise-items .drag-drop-placeholder.ui-droppable');
    if (placeholder) {
        placeholder.click();
        await wait(200); // หน่วงสั้นๆ ให้ระบบเว็บพร้อมรับคำตอบ
    }

    // 3. วางคำตอบทั้งหมดแบบต่อเนื่อง (Atomic Click)
    draggables.forEach(item => item.el.click());
    console.log(`✅ [JL] Placed ${draggables.length} items`);

    // 4. รอและกด Correction
    await wait(500);
    const correctBtn = document.querySelector('.action-exercise-button.correct');
    if (correctBtn) {
        correctBtn.click();
        
        // 5. Smart Wait สำหรับปุ่ม Next (ทันทีที่ปุ่มโผล่)
        const obs = new MutationObserver((_, o) => {
            const nxt = document.querySelector('.action-exercise-button.next');
            if (nxt && nxt.offsetWidth > 0) {
                nxt.click();
                o.disconnect();
            }
        });
        obs.observe(document.body, { attributes: true, childList: true, subtree: true });
        setTimeout(() => obs.disconnect(), 5000);
    }
})();
