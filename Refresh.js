// —— Helpers ——  
function wait(ms) {  
  return new Promise(r => setTimeout(r, ms));  
}

async function clickAndLog(selector, label, timeout) {
  let btn;
  if (timeout) {
    const start = Date.now();
    while (!btn && Date.now() - start < timeout) {
      btn = document.querySelector(selector);
      if (!btn) await wait(50);
    }
  } else {
    btn = document.querySelector(selector);
  }
  if (btn) {
    btn.click();
    console.log(✅ ${label});
    return true;
  } else {
    console.warn(❌ ไม่พบ ${label});
    return false;
  }
}

function getScore() {
  const el = document.querySelector(".result-badge-text");
  return el ? parseInt(el.dataset.result || "0", 10) : 0;
}

// —— Core functions ——  

// 1. สุ่มทุกข้อพร้อมกัน  
async function doRefreshAll(delay = 10) {  
  const buttons = document.querySelectorAll(".halflings-icon.refresh");  
  console.log(🔄 [Refresh] กำลังสุ่ม ${buttons.length} ช่อง...);  
  for (let btn of buttons) {  
    btn.click();  
    await wait(delay);  
  }  
}

// 2. คลิก Correction  
async function doCorrection(delay = 1000) {  
  console.log("🎯 [Refresh] กด Correction...");  
  const ok = await clickAndLog(".action-exercise-button.correct", "ปุ่ม Correction", 3000);  
  if (ok) await wait(delay);  
  return ok;  
}

// 3. แก้ไขเฉพาะข้อผิด (ไม่มีลิมิต)  
async function fixIncorrect(loopDelay = 10) {  
  let wrongs;  
  do {  
    wrongs = Array.from(document.querySelectorAll(".input-group.has-error"));  
    if (wrongs.length) {  
      console.log(❌ [Refresh] พบข้อผิด ${wrongs.length} ข้อ → กำลังสุ่มใหม่...);  
      for (let q of wrongs) {  
        const btn = q.querySelector(".halflings-icon.refresh");  
        if (btn) {  
          btn.click();  
          await wait(loopDelay);  
        }  
      }  
      await doCorrection();  
    }  
  } while (wrongs.length);  
  console.log("🎉 [Refresh] ทุกข้อถูกต้องแล้ว!");  
}

// 4. ไป Next  
async function goNext(timeout = 5000) {  
  console.log("➡️ รอปุ่ม Next...");  
  const ok = await clickAndLog(".action-exercise-button.next", "ปุ่ม Next", timeout);  
  if (ok) await wait(1000);  
  return ok;  
}

// —— Main ——  
async function refreshSolve() {  
  console.log("🚀 เริ่ม refreshSolve()");

  let score = 0;
  let attempts = 0;
  const maxAttempts = 5;

  while (score < 100 && attempts < maxAttempts) {
    console.log(🔁 Attempt #${attempts + 1});
    await doRefreshAll();  
    const corrected = await doCorrection();  
    if (!corrected) {
      console.warn("❌ ไม่สามารถกด Correction ได้");
      return;
    }

    await fixIncorrect();  
    score = getScore();
    console.log(📊 คะแนนปัจจุบัน: ${score});
    attempts++;
  }

  if (score >= 100) {
    console.log("🏆 ได้คะแนนเต็ม 100 แล้ว!");
    await goNext();  
    console.log("✅ จบ refreshSolve()");
  } else {
    console.warn(⚠️ ทำซ้ำ ${attempts} ครั้งแล้วยังไม่ได้คะแนนเต็ม (คะแนน: ${score}));
  }
}

refreshSolve();
