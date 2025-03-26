const button = document.querySelector('button.call-to-action:not(.ml-auto)');

if (button) {
  button.click();
  console.log('คลิกปุ่ม "เริ่มตอนนี้" ที่ไม่มี ml-auto แล้ว');
} else {
  console.log('ไม่พบปุ่ม "เริ่มตอนนี้" ที่ไม่มี ml-auto');
}
