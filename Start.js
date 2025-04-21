const btn = document.querySelector(
  '.practice-box-foot button.call-to-action:not(.ml-auto)[tabindex="-1"]'
);
if (btn) {
  btn.click();
  console.log('✅ คลิกปุ่ม Start now สำเร็จ!');
} else {
  console.warn('❌ ไม่พบปุ่ม Start now ที่ต้องการ');
}
