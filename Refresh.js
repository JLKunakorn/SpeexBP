// —— Helpers ——
function waitFor(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let elapsed = 0;
    const timer = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(timer);
        resolve(el);
      } else if ((elapsed += interval) >= timeout) {
        clearInterval(timer);
        reject(new Error(`Timeout waiting for ${selector}`));
      }
    }, interval);
  });
}

async function clickAndLog(selector, label, timeout) {
  const btn = timeout
    ? await waitFor(selector, timeout).catch(() => null)
    : document.querySelector(selector);
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
async function doRefreshAll(delay = 100) {
  const buttons = document.querySelectorAll(".halflings-icon.refresh");
  console.log(`🔄 [Refresh] กำลังสุ่ม ${buttons.length} ช่อง...`);
  for (let btn of buttons) {
    btn.click();
    await new Promise(r => setTimeout(r, delay));
  }
}

// 2. คลิก Correction
async function doCorrection(delay = 500) {
  console.log("🎯 [Refresh] กด Correction...");
  const ok = await clickAndLog(".action-exercise-button.correct", "ปุ่ม Correction", 3000);
  if (ok) await new Promise(r => setTimeout(r, delay));
  return ok;
}

// 3. แก้ไขเฉพาะข้อผิด
async function fixIncorrect(loopDelay = 100, maxRetries = 10) {
  let tries = 0;
  while (tries < maxRetries) {
    const wrongs = document.querySelectorAll(".input-group.has-error");
    if (wrongs.length === 0) {
      console.log("🎉 ทุกข้อผ่านแล้ว!");
      return true;
    }
    console.log(`❌ [Refresh] พบข้อผิด ${wrongs.length} ข้อ (ลองครั้งที่ ${tries + 1})...`);
    for (let q of wrongs) {
      const btn = q.querySelector(".halflings-icon.refresh");
      if (btn) {
        btn.click();
        await new Promise(r => setTimeout(r, loopDelay));
      }
    }
    // ตรวจซ้ำ
    await doCorrection();
    tries++;
  }
  console.error("⚠️ เกินรอบรีเฟรชสูงสุด");
  return false;
}

// 4. ไป Next
async function goNext(timeout = 5000) {
  console.log("➡️ รอปุ่ม Next...");
  const ok = await clickAndLog(".action-exercise-button.next", "ปุ่ม Next", timeout);
  return ok;
}

// —— Main —— 
async function refreshSolve() {
  console.log("🚀 เริ่ม refreshSolve()");
  await doRefreshAll();
  if (!await doCorrection()) return;
  if (!await fixIncorrect()) return;
  await goNext();
}

refreshSolve();
