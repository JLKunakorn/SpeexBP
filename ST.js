// ST.js - Pro Edition (Precision Cycle)
(async () => {
    console.log("🚀 [JL] ST Mode: Full Solution Cycle Active");

    const wait = ms => new Promise(r => setTimeout(r, ms));
    const getBtn = (sel) => document.querySelector(sel);
    
    // ฟังก์ชันรอ Element แบบไม่กินแรม (MutationObserver)
    const waitFor = (sel, timeout = 10000) => new Promise(res => {
        const el = document.querySelector(sel);
        if (el) return res(el);
        const obs = new MutationObserver(() => {
            const target = document.querySelector(sel);
            if (target) { res(target); obs.disconnect(); }
        });
        obs.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => { obs.disconnect(); res(null); }, timeout);
    });

    const runST = async () => {
        // 1. กด Start ครั้งแรก
        const startBtn = await waitFor('.btn.btn-primary.start-exercise');
        if (startBtn) {
            startBtn.click();
            console.log("✅ Start clicked");
        } else return console.log("❌ Start button not found");

        // 2. กด Correction เพื่อเปิดปุ่ม Solution
        const correctBtn = await waitFor('.action-exercise-button.correct');
        if (correctBtn) {
            await wait(400); // หน่วงนิดหน่อยให้ระบบพร้อม
            correctBtn.click();
            console.log("✅ Correction clicked");
        }

        // 3. รอและกด Solution
        const solutionBtn = await waitFor('button.btn-link.solution');
        if (!solutionBtn) return console.log("❌ Solution button not found");
        solutionBtn.click();
        console.log("✅ Solution clicked");
        await wait(800);

        // 4. เก็บคำตอบลง Memory
        const answerFields = document.querySelectorAll('.answer.form-control');
        const answers = Array.from(answerFields).map(f => f.value);
        console.log("📝 Memorized answers:", answers);

        if (answers.length === 0) return console.log("❌ No answers found");

        // 5. กด Repeat เพื่อเริ่มรอบใหม่
        const repeatBtn = getBtn('button[class*="repeat"]');
        if (repeatBtn) {
            repeatBtn.click();
            console.log("✅ Repeat clicked");
        }

        // 6. รอและกด Start อีกครั้งหลังจาก Repeat
        const reStartBtn = await waitFor('.btn.btn-primary.start-exercise');
        if (reStartBtn) {
            await wait(400);
            reStartBtn.click();
            console.log("✅ Start (Round 2) clicked");
        }

        // 7. เติมคำตอบที่จำไว้ (พร้อมยิง Event ครบชุด)
        await waitFor('.answer.form-control');
        const blanks = document.querySelectorAll('.answer.form-control');
        blanks.forEach((input, i) => {
            if (answers[i]) {
                input.value = answers[i];
                // ยิง Event เพื่อให้ระบบยอมรับค่าว่ามีการพิมพ์จริง
                ['input', 'change', 'blur'].forEach(ev => 
                    input.dispatchEvent(new Event(ev, { bubbles: true }))
                );
            }
        });
        console.log("🎯 All answers injected");

        // 8. ขั้นตอนสุดท้าย: ตรวจและไปต่อ
        await wait(600);
        getBtn('.action-exercise-button.correct')?.click();
        
        // รอจนกว่าปุ่ม Next จะพร้อมกด
        const nextBtn = await waitFor(".action-exercise-button.next");
        if (nextBtn) {
            await wait(1500); // รอ animation ตรวจคำตอบเสร็จ
            nextBtn.click();
            console.log("🎉 ST Process Finished: Next Page!");
        }
    };

    runST();
})();
