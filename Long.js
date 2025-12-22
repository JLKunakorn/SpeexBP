// Long.js - Pro Edition (v6.2 - DOM Transfer)
(async () => {
    console.log("🚀 [JL] Long.js: DOM Transfer Mode Active");

    const wait = ms => new Promise(r => setTimeout(r, ms));

    // 0. ฟังก์ชันช่วยดึง ID
    const getID = el => {
        const match = el.dataset.scrambledCellId?.match(/\d+/);
        return match ? parseInt(match[0], 10) : 999;
    };

    // 1. รวบรวมข้อมูล
    const cells = [...document.querySelectorAll('.scrambled-cell')];
    const containers = [...document.querySelectorAll('.scrambled-cell-container')];
    
    if (cells.length === 0 || containers.length === 0) {
        return console.warn("❌ [JL] No exercise elements found.");
    }

    // 2. เรียงลำดับคำตอบตาม ID จากน้อยไปมาก
    const sortedCells = cells.sort((a, b) => getID(a) - getID(b));

    // 3. ปฏิบัติการ "ย้ายบ้าน" (AppendChild)
    console.log(`📦 [JL] Transferring ${sortedCells.length} items...`);
    sortedCells.forEach((cell, i) => {
        if (containers[i]) {
            // ย้าย Element เข้าไปในช่องตรงๆ
            containers[i].appendChild(cell);
            
            // รีเซ็ต Style เพื่อให้แสดงผลในช่องได้อย่างถูกต้อง
            cell.style.position = "relative"; 
            cell.style.top = "0px";
            cell.style.left = "0px";
            cell.style.opacity = "1";
            cell.style.zIndex = "auto";
        }
    });

    // 4. ขั้นตอนการส่งคำตอบและไปต่อ
    console.log("⏳ [JL] Finalizing...");
    await wait(800); // รอให้ UI อัปเดตสถานะภายในเล็กน้อย

    // กดปุ่ม Correction (ใช้ Selector จาก Bottom Bar ที่แม่นยำที่สุด)
    const correctBtn = document.querySelector('.exercise-bottom-bar-main .action-exercise-button.correct');
    if (correctBtn && !correctBtn.disabled) {
        correctBtn.click();
        console.log("✅ [JL] Correction triggered.");

        // ใช้ MutationObserver เพื่อกด Next ทันทีที่ระบบตรวจเสร็จ (ไวที่สุด)
        const nextObs = new MutationObserver((_, obs) => {
            const nextBtn = document.querySelector('.exercise-bottom-bar-main .action-exercise-button.next.nxt-exercise');
            if (nextBtn && !nextBtn.disabled && nextBtn.offsetWidth > 0) {
                nextBtn.click();
                console.log("➡️ [JL] Next page triggered!");
                obs.disconnect();
            }
        });

        nextObs.observe(document.body, { attributes: true, childList: true, subtree: true });
        
        // Safety Timeout (ถ้าผ่านไป 8 วินาทีแล้วไม่ขยับ ให้ปิดตัวเฝ้าดู)
        setTimeout(() => nextObs.disconnect(), 8000);
    } else {
        console.warn("⚠️ [JL] Correction button not found or disabled.");
    }
})();
