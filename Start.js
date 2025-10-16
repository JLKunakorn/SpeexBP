const startBtn = document.querySelector(
  'button[aria-label="Start now"][type="button"][tabindex="0"]'
);

if (startBtn) {
  startBtn.click();
  console.log('✅ คลิกปุ่ม Start now สำเร็จ!');
} else {
  console.warn('❌ ไม่พบปุ่ม Start now');
}
