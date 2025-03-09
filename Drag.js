console.log("🚀 [Drag] เริ่มต้นการทำงาน...");

// ค้นหา `.drag-drop-placeholder.ui-droppable` ตัวแรกที่อยู่ใน `.exercise-items`
let targetElement = document.querySelector('.exercise-items .drag-drop-placeholder.ui-droppable');

if (targetElement) {
    targetElement.click();
    console.log("✅ [Drag] คลิกสำเร็จที่ .drag-drop-placeholder.ui-droppable");
} else {
    console.log("❌ [Drag] ไม่พบ .drag-drop-placeholder.ui-droppable");
}

// หน่วงเวลาเล็กน้อยก่อนเริ่มคลิก drag-drop
setTimeout(() => {
    console.log("🚀 [Drag] เริ่มต้นคลิกตามลำดับจากน้อยไปมาก...");

    // หาวัตถุเป้าหมายทั้งหมดใน .draggable-container
    let draggableElements = Array.from(document.querySelectorAll('.draggable-container .drag-drop.ui-state-default.ui-draggable.ui-draggable-handle.ui-droppable'));

    // เรียงลำดับจากตัวเลขน้อยไปมาก ตามค่า data-drag-drop-id
    draggableElements.sort((a, b) => {
        let idA = parseInt(a.getAttribute('data-drag-drop-id').replace('drag-drop-', ''), 10);
        let idB = parseInt(b.getAttribute('data-drag-drop-id').replace('drag-drop-', ''), 10);
        return idA - idB;
    });

    // คลิกตามลำดับ
    draggableElements.forEach((element, index) => {
        setTimeout(() => {
            element.click();
            console.log(`✅ [Drag] คลิกที่ ${element.getAttribute('data-drag-drop-id')}`);
        }, index * 1); // หน่วงเวลากันพลาด (10ms ต่อคลิก)
    });

    console.log("🎯 [Drag] คลิก Drag-Drop เสร็จแล้ว!");

    // หน่วงเวลา 500ms ก่อนกด Correction
    setTimeout(() => {
        console.log("🚀 [Drag] กำลังกด Correction...");

        let correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ [Drag] กด Correction สำเร็จ");
        } else {
            console.log("❌ [Drag] ไม่พบปุ่ม Correction!");
        }

        // หน่วงเวลา 1 วินาทีแล้วกด Next
        setTimeout(() => {
            console.log("🚀 [Drag] กำลังกด Next...");

            let nextButton = document.querySelector('.action-exercise-button.next');
            if (nextButton) {
                nextButton.click();
                console.log("✅ [Drag] กด Next สำเร็จ");
            } else {
                console.log("❌ [Drag] ไม่พบปุ่ม Next!");
            }

            console.log("🎉 [Drag] เสร็จสิ้นการทำงาน!");
        }, 1000); // หน่วง 1 วินาทีหลังจากกด Correction
    }, draggableElements.length * 10 + 500); // หน่วง 500ms หลังจากคลิก drag-drop เสร็จ
}, 500); // หน่วง 0.5 วิ หลังจากกด .drag-drop-placeholder.ui-droppable
