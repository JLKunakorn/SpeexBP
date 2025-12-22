// Refresh.js - Pro Edition (Safe Cycle)
(async () => {
    console.log("🔄 [JL] Refresh Mode: Safe Brute Force Active");
    
    const MAX_ATTEMPTS = 15; // ป้องกันการสุ่มไม่จบสิ้น
    let attempts = 0;

    const getScore = () => {
        const el = document.querySelector(".result-badge-text");
        return el ? parseInt(el.dataset.result || "0", 10) : 0;
    };

    const solveCycle = async () => {
        if (attempts >= MAX_ATTEMPTS || getScore() >= 100) {
            console.log("🏆 [JL] Refresh Complete or Max Attempts reached.");
            document.querySelector('.action-exercise-button.next')?.click();
            return;
        }

        attempts++;
        const refreshBtns = document.querySelectorAll(".input-group:not(.has-success) .halflings-icon.refresh");
        
        if (refreshBtns.length === 0) return;

        console.log(`🔁 [JL] Attempt ${attempts}: Randomizing...`);
        refreshBtns.forEach(btn => btn.click());
        
        await new Promise(r => setTimeout(r, 600)); // รอ UI อัปเดต
        document.querySelector(".action-exercise-button.correct")?.click();

        // รอผลจาก Server แล้วเริ่มรอบใหม่
        setTimeout(solveCycle, 1500);
    };

    solveCycle();
})();
