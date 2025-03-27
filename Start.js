const button = document.querySelector('button.call-to-action:not(.ml-auto)');

if (button && button.innerText.trim() === "Start now") {
  button.click();
  console.log('✅ คลิกปุ่ม "Start now" ที่ไม่มี ml-auto สำเร็จ!');
} else {
  console.log('❌ ไม่พบปุ่ม "Start now" ที่ไม่มี ml-auto หรือปุ่มไม่ตรงเงื่อนไข');
}
