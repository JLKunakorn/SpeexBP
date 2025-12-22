// Long.js - Pro Edition (Simulation Mode)
(async () => {
    console.log("🚀 [JL] Long.js: Simulation Mode Active");

    const wait = ms => new Promise(r => setTimeout(r, ms));

    // 1. เรียงลำดับคำตอบตาม ID (data-scrambled-cell-id) จากน้อยไปมาก
    const sortedCells = [...document.querySelectorAll('.scrambled-cell')]
        .sort((a, b) => {
            const getID = el => parseInt(el.dataset.scrambledCellId.match(/\d+/)[0], 10);
            return getID(a) - getID(b);
        });

    const containers = document.querySelectorAll('.scrambled-cell-container');
    if (sortedCells.length === 0) return;

    // 2. จำลองการคลิกวางตามลำดับพิกัดที่ถูกต้อง
    console.log("🖱️ [JL] Matching containers with sorted IDs...");
    for (let i = 0; i < sortedCells.length; i++) {
        if (containers[i] && sortedCells[i]) {
            containers[i].click(); // คลิกช่องรับ
            await wait(100);
            sortedCells[i].click(); // คลิกคำตอบที่ ID ตรงกัน
            await wait(150);
        }
    }

    // 3. ส่งคำตอบ
    await wait(500);
    const correctBtn = document.querySelector('.action-exercise-button.correct');
    if (correctBtn) {
        correctBtn.click();
        
        // รอจนกว่าปุ่ม Next จะปรากฏ
        const obs = new MutationObserver((_, o) => {
            const next = document.querySelector('.action-exercise-button.next');
            if (next && next.offsetWidth > 0) {
                next.click();
                o.disconnect();
            }
        });
        obs.observe(document.body, { attributes: true, childList: true, subtree: true });
    }
})();
