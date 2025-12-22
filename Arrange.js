// Arrange.js - Pro Edition (Native Sort)
(async () => {
    console.log("🧩 [JL] Arrange Mode: Native Block Sorting...");

    const wait = ms => new Promise(r => setTimeout(r, ms));

    // 1. หาประโยคที่มีบล็อกให้จัดเรียง
    const sentences = document.querySelectorAll('.scrambled-sentence.ui-sortable');
    
    sentences.forEach(sentenceEl => {
        const blocks = Array.from(sentenceEl.querySelectorAll('.scrambled-block'));
        
        // จัดเรียงตาม ID (scr-block-) ใน Memory
        const sorted = blocks.sort((a, b) => {
            const getID = el => parseInt(el.dataset.scrambledBlockId?.replace('scr-block-', '') || 0, 10);
            return getID(a) - getID(b);
        });

        // ย้ายตำแหน่งในหน้าเว็บทันที (AppendElement เดิมจะเป็นการย้ายตำแหน่งอัตโนมัติ)
        sorted.forEach(block => sentenceEl.appendChild(block));
    });

    console.log("✅ [JL] Sentence blocks reordered.");

    // 2. ส่งคำตอบและไปต่อผ่าน Bottom Bar
    await wait(400);
    const correctBtn = document.querySelector('.exercise-bottom-bar-main .action-exercise-button.correct');
    if (correctBtn) {
        correctBtn.click();
        
        // Smart Waiting สำหรับปุ่ม Next
        const obs = new MutationObserver((_, o) => {
            const next = document.querySelector('.exercise-bottom-bar-main .action-exercise-button.next.nxt-exercise');
            if (next && !next.disabled && next.offsetWidth > 0) {
                next.click();
                o.disconnect();
            }
        });
        obs.observe(document.body, { attributes: true, childList: true, subtree: true });
        setTimeout(() => obs.disconnect(), 6000);
    }
})();
