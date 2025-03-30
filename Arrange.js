// 1. หาทุก item ที่มีอยู่ใน .exercise-items
let items = document.querySelectorAll('.exercise-items .item');

// 2. สำหรับแต่ละ item, จะทำการตรวจสอบว่ามี class "scrambled-sentence ui-sortable" หรือไม่
items.forEach(item => {
    let scrambledSentenceElement = item.querySelector('.scrambled-sentence');

    // ถ้าไม่พบ .scrambled-sentence หรือไม่มี class "ui-sortable" ให้ข้ามไปยัง item ถัดไป
    if (!scrambledSentenceElement || !scrambledSentenceElement.classList.contains('ui-sortable')) {
        console.log("❌ ไม่มี class 'scrambled-sentence ui-sortable' ข้ามไปยัง item ถัดไป...");
        return;  // ข้ามไปยัง item ถัดไป
    }

    // 3. ดึงคำใน .scrambled-block
    let scrambledBlocks = Array.from(item.querySelectorAll('.scrambled-block'));

    // 4. เรียงคำตาม data-scrambled-block-id
    scrambledBlocks.sort((a, b) => {
        let idA = a.getAttribute('data-scrambled-block-id').replace('scr-block-', '');
        let idB = b.getAttribute('data-scrambled-block-id').replace('scr-block-', '');
        return parseInt(idA) - parseInt(idB); // เรียงจากน้อยไปมาก
    });

    // 5. ลบคำที่มีอยู่ใน .scrambled-sentence ก่อน
    scrambledSentenceElement.innerHTML = '';

    // 6. ใส่คำที่เรียงแล้วกลับเข้าไปใน .scrambled-sentence
    scrambledBlocks.forEach((block) => {
        scrambledSentenceElement.appendChild(block);
    });
});

console.log("✅ เรียงคำในแต่ละ item ตามลำดับเรียบร้อยแล้ว!");

// 7. กดปุ่ม "Correction" เพื่อแสดงคำตอบที่ถูกต้อง
let correctionButton = document.querySelector('.action-exercise-button.correct');
if (correctionButton) {
    correctionButton.click();
    console.log("✅ กดปุ่ม Correction เพื่อแสดงคำตอบ");
} else {
    console.log("❌ ไม่พบปุ่ม Correction!");
}

// หน่วงเวลา 1 วินาที
setTimeout(async () => {
    // 8. กดปุ่ม "Next"
    let nextButton = document.querySelector('button[class*="next"]');
    if (nextButton) {
        nextButton.click();
        console.log("✅ กดปุ่ม Next เพื่อไปยังขั้นตอนถัดไป");
    } else {
        console.log("❌ ไม่พบปุ่ม Next!");
    }
}, 1000);
