const startBtn = document.querySelector(
  '.practice-box-lesson .practice-box-foot button.call-to-action[tabindex="-1"]'
);

if (startBtn) {
  startBtn.click();
  console.log('✅ คลิกปุ่ม Start now ใน lesson สำเร็จ!');
} else {
  console.warn('❌ ไม่พบปุ่ม Start now ใน lesson');
}
