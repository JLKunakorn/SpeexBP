// 1. หาทุก item ที่มีอยู่ใน .exercise-items
let items = document.querySelectorAll('.exercise-items .item');

// 2. สำหรับแต่ละ item, เราจะทำการเรียงคำที่มีใน item นั้นๆ
items.forEach(item => {
    let scrambledBlocks = Array.from(item.querySelectorAll('.scrambled-block')); // ดึงคำใน item
    
    // 3. เรียงคำตาม data-scrambled-block-id
    scrambledBlocks.sort((a, b) => {
        let idA = a.getAttribute('data-scrambled-block-id').replace('scr-block-', '');
        let idB = b.getAttribute('data-scrambled-block-id').replace('scr-block-', '');
        return parseInt(idA) - parseInt(idB); // เรียงจากน้อยไปมาก
    });

    // 4. นำคำที่จัดเรียงแล้วไปใส่กลับใน container
    let parentElement = item.querySelector('.scrambled-sentence'); // หาพาเรนต์ของแต่ละ item
    
    // ลบทุกคำที่มีอยู่ใน container ก่อน
    parentElement.innerHTML = '';

    // 5. ใส่คำที่เรียงแล้วกลับเข้าไปในพาเรนต์
    scrambledBlocks.forEach((block) => {
        parentElement.appendChild(block); // ย้ายคำตามลำดับที่เรียง
    });
});

console.log("✅ เรียงคำในแต่ละ item ตามลำดับเรียบร้อยแล้ว!");

// 6. กดปุ่ม "Correction" เพื่อแสดงคำตอบที่ถูกต้อง
let correctionButton = document.querySelector('.action-exercise-button.correct');
if (correctionButton) {
    correctionButton.click();
    console.log("✅ กดปุ่ม Correction เพื่อแสดงคำตอบ");
} else {
    console.log("❌ ไม่พบปุ่ม Correction!");
}

// หน่วงเวลา 1 วินาที
setTimeout(async () => {
    // 7. กดปุ่ม "Next"
    let nextButton = document.querySelector('button[class*="next"]'); // เปลี่ยน selector ตามปุ่ม "Next" ในหน้าเว็บของคุณ
    if (nextButton) {
        nextButton.click();
        console.log("✅ กดปุ่ม Next เพื่อไปยังขั้นตอนถัดไป");
    } else {
        console.log("❌ ไม่พบปุ่ม Next!");
    }
}, 1000);
