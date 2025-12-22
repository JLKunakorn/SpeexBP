// Long.js - Pro Edition (Simulation Mode)
// ปรับปรุงใหม่: ใช้การ Sort ID และจำลองการคลิกเพื่อความแม่นยำ 100%
(async () => {
    console.log("🚀 [JL] Long.js: Simulation Mode Active");

    const wait = ms => new Promise(r => setTimeout(r, ms));

    // 1. เรียงลำดับคำตอบตาม ID (data-scrambled-cell-id) จากน้อยไปมาก
    const sortedCells = [...document.querySelectorAll('.scrambled-cell')]
        .sort((a, b) => {
            const idMatchA = a.dataset.scrambledCellId.match(/\d+/);
            const idMatchB = b.dataset.scrambledCellId.match(/\d+/);
            const idA = idMatchA ? parseInt(idMatchA[0], 10) : 0;
            const idB = idMatchB ? parseInt(idMatchB[0], 10) : 0;
            return idA - idB;
        });

    const containers = document.querySelectorAll('.scrambled-cell-container');
    
    if (sortedCells.length === 0) {
        console.warn("❌ [JL] No scrambled cells found.");
        return;
    }

    // 2. จำลองการคลิกวางตามลำดับ (Simulation)
    console.log(`🖱️ [JL] Matching ${sortedCells.length} containers...`);
    for (let i = 0; i < sortedCells.length; i++) {
        if (containers[i] && sortedCells[i]) {
            containers[i].click(); // คลิกช่องรับ (Target)
            await wait(100);
            sortedCells[i].click(); // คลิกคำตอบที่ถูกต้อง (Source)
            await wait(150);
        }
    }

    // 3. ส่งคำตอบ (Correction)
    await wait(500);
    const correctBtn = document.querySelector('.action-exercise-button.correct');
    if (correctBtn) {
        correctBtn.click();
        console.log("✅ [JL] Correction triggered.");
        
        // 4. รอจนกว่าปุ่ม Next จะปรากฏและพร้อมกด (Smart Waiting)
        const obs = new MutationObserver((_, o) => {
            const next = document.querySelector('.action-exercise-button.next, button[class*="next"]');
            if (next && next.offsetWidth > 0 && !next.disabled) {
                next.click();
                console.log("➡️ [JL] Next Clicked!");
                o.disconnect();
            }
        });
        obs.observe(document.body, { attributes: true, childList: true, subtree: true });
        
        // Safety timeout ป้องกันสคริปต์ค้าง
        setTimeout(() => obs.disconnect(), 8000);
    }
})();
