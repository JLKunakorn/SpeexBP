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
    console.log(`✅ ${label}`);  
    return true;  
  } else {  
    console.warn(`❌ ไม่พบ ${label}`);  
    return false;  
  }  
}

// —— Core functions ——

// 1. สุ่มทุกข้อพร้อมกัน  
async function doRefreshAll(delay = 5) {  
  const buttons = document.querySelectorAll(".halflings-icon.refresh");  
  console.log(`🔄 [Refresh] สุ่ม ${buttons.length} ช่อง...`);  
  for (let btn of buttons) {  
    btn.click();  
    await wait(delay);  
  }  
}

// 2. คลิก Correction  
async function doCorrection(delay = 200) {  
  console.log("🎯 [Refresh] กด Correction...");  
  const ok = await clickAndLog(".action-exercise-button.correct", "ปุ่ม Correction", 2000);  
  if (ok) await wait(delay);  
  return ok;  
}

// 3. แก้ไขเฉพาะข้อผิด (ไม่มีลิมิต)  
async function fixIncorrect(loopDelay = 5) {  
  let wrongs;  
  do {  
    wrongs = Array.from(document.querySelectorAll(".input-group.has-error"));  
    if (wrongs.length) {  
      console.log(`❌ [Refresh] พบข้อผิด ${wrongs.length} ข้อ → สุ่มใหม่`);  
      for (let q of wrongs) {  
        const btn = q.querySelector(".halflings-icon.refresh");  
        if (btn) {  
          btn.click();  
          await wait(loopDelay);  
        }  
      }  
      // กด Correction ซ้ำ  
      await doCorrection();  
    }  
  } while (wrongs.length);  
  console.log("🎉 ทุกข้อถูกต้องแล้ว!");  
}

// 4. ไป Next  
async function goNext(timeout = 2000) {  
  console.log("➡️ รอกด Next...");  
  const ok = await clickAndLog(".action-exercise-button.next", "ปุ่ม Next", timeout);  
  if (ok) await wait(200);  
  return ok;  
}

// —— Main ——  
async function refreshSolve() {  
  console.log("🚀 เริ่ม refreshSolve() (เร็วขึ้น)");  
  await doRefreshAll();  
  if (!await doCorrection()) return;  
  await fixIncorrect();  
  await goNext();  
  console.log("✅ จบ refreshSolve()");  
}

refreshSolve();
