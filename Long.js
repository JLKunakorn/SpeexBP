// หาค่าของ data-scrambled-cell-id ที่น้อยสุด
const scrambledCells = document.querySelectorAll('.scrambled-cell-container');
let minId = Infinity;
let minCell = null;

scrambledCells.forEach(cell => {
    const cellId = parseInt(cell.querySelector('.scrambled-cell').getAttribute('data-scrambled-cell-id').replace('scrambled-cell-', ''));
    if (cellId < minId) {
        minId = cellId;
        minCell = cell;
    }
});

// หาตำแหน่งของ .text ที่อยู่ภายใน .item ตัวแรกสุด
const firstItem = document.querySelector('.exercise-items .item');
const textElement = firstItem.querySelector('.text');

// ย้าย minCell ไปอยู่ข้างบน .text
firstItem.insertBefore(minCell, textElement);

// ลบ scrambled-cell-container อื่น ๆ ที่ไม่ใช่ minCell
scrambledCells.forEach(cell => {
    if (cell !== minCell) {
        cell.remove();
    }
});

// หน่วงเวลา 0.5 วินาที
setTimeout(() => {
    // กดปุ่ม class="btn btn-primary action-exercise-button correct"
    const correctButton = document.querySelector('.btn.btn-primary.action-exercise-button.correct');
    if (correctButton) {
        correctButton.click();
    }

    // ตรวจสอบว่ามีปุ่ม class="btn btn-primary action-exercise-button next nxt-exercise" หรือไม่
    let checkNextButton = 0;
    const checkInterval = setInterval(() => {
        const nextButton = document.querySelector('.btn.btn-primary.action-exercise-button.next.nxt-exercise');
        if (nextButton) {
            clearInterval(checkInterval);
            // หน่วงเวลา 1 วินาที
            setTimeout(() => {
                nextButton.click();
            }, 1000);
        } else {
            checkNextButton += 1;
            if (checkNextButton >= 6) { // ตรวจสอบเป็นเวลา 3 วินาที (0.5s * 6 = 3s)
                clearInterval(checkInterval);
            }
        }
    }, 500);
}, 500);
