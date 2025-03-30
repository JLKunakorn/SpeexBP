// 1. หาทุก item ที่มีอยู่ใน .exercise-items
let items = document.querySelectorAll('.exercise-items .item');

// 2. สำหรับแต่ละ item, จะทำการตรวจสอบว่ามี class "scrambled-sentence ui-sortable" หรือไม่
items.forEach(item => {
    // ค้นหา .scrambled-sentence ภายใน item
    let scrambledSentenceElements = item.querySelectorAll('.scrambled-sentence');

    scrambledSentenceElements.forEach(scrambledSentenceElement => {
        // ตรวจสอบว่า .scrambled-sentence นี้มี class "ui-sortable"
        if (!scrambledSentenceElement.classList.contains('ui-sortable')) {
            return;  // ข้ามไปยัง .scrambled-sentence ถัดไป
        }

        // 3. ดึงคำใน .scrambled-block ภายใน .scrambled-sentence
        let scrambledBlocks = Array.from(scrambledSentenceElement.querySelectorAll('.scrambled-block'));

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

        console.log("✅ เรียงคำใน .scrambled-sentence เสร็จเรียบร้อย!");
    });
});

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
