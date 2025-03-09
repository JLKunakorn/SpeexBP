if (typeof window.nextClicked === "undefined") {
    window.nextClicked = false;
}

if (typeof window.refreshSolve !== "function") {
    window.refreshSolve = async function () {
        console.log("🎯 [Refresh] เริ่มสุ่มคำตอบทั้งหมด (ครั้งแรก)...");

        // ✅ ค้นหาทุกข้อที่ต้องสุ่ม
        let allQuestions = document.querySelectorAll(".exercise-items .input-group");
        let refreshButtons = [];

        // ✅ แยกเฉพาะข้อที่ยังไม่ถูกต้อง (ไม่นับ .has-success)
        allQuestions.forEach(question => {
            if (!question.classList.contains("has-success")) {  // ข้ามข้อที่ถูกต้องแล้ว
                let refreshButton = question.querySelector(".halflings-icon.refresh");
                if (refreshButton) {
                    refreshButtons.push(refreshButton);
                }
            }
        });

        console.log(`🔄 [Refresh] สุ่มทั้งหมด ${refreshButtons.length} ข้อที่ยังไม่ถูกต้อง`);

        // ✅ สุ่มทุกข้อที่ต้องสุ่ม (ครั้งแรก)
        for (let i = 0; i < refreshButtons.length; i++) {
            refreshButtons[i].click();
            console.log(`🔄 [Refresh] สุ่มข้อที่ ${i + 1}`);
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // ✅ กด Correction ตรวจคำตอบ
        let correctionButton = document.querySelector(".action-exercise-button.correct");
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ [Refresh] กด Correction เพื่อตรวจคำตอบ...");
        } else {
            console.log("❌ [Refresh] ไม่พบปุ่ม Correction!");
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        // ✅ **สุ่มเฉพาะข้อผิดเท่านั้น**
        let incorrectAnswers = document.querySelectorAll(".exercise-items .input-group.has-error");
        while (incorrectAnswers.length > 0) {
            console.log(`❌ [Refresh] พบข้อผิด ${incorrectAnswers.length} ข้อ กำลังสุ่มใหม่...`);

            for (let question of incorrectAnswers) {
                let refreshButton = question.querySelector(".halflings-icon.refresh");
                if (refreshButton) {
                    refreshButton.click();
                    console.log("🔄 [Refresh] กดสุ่มใหม่เฉพาะข้อผิด...");
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }

            // ✅ กด Correction เพื่อตรวจสอบใหม่
            correctionButton = document.querySelector(".action-exercise-button.correct");
            if (correctionButton) {
                correctionButton.click();
                console.log("✅ [Refresh] กด Correction เพื่อตรวจคำตอบอีกครั้ง...");
            } else {
                console.log("❌ [Refresh] ไม่พบปุ่ม Correction!");
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 500));
            incorrectAnswers = document.querySelectorAll(".exercise-items .input-group.has-error");
        }

        console.log("🎉 [Refresh] สุ่มเสร็จ! ทุกข้อถูกต้องแล้ว!");

        // ✅ **เช็คว่ากด Next ไปแล้วหรือยัง**
        let nextButton = document.querySelector(".action-exercise-button.next");
        if (nextButton && !window.nextClicked) {
            window.nextClicked = true;  // ป้องกันกด Next ซ้ำ
            console.log("➡️ [Refresh] กด Next ไปยังขั้นตอนถัดไป...");
            nextButton.click();

            // ✅ **ป้องกันการเรียก checkAndRun() ซ้ำ**
            setTimeout(() => {
                console.log("🎯 [Refresh] เรียก checkAndRun() เพื่อเช็คประเภทใหม่...");
                window.nextClicked = false;  // รีเซ็ตค่าให้สามารถกด Next ได้ในรอบถัดไป
                checkAndRun();
            }, 2000);
        } else {
            console.log("❌ [Refresh] ไม่พบปุ่ม Next! หรือถูกกดไปแล้ว");
        }
    };
}






// ✅ ฟังก์ชัน `Drag`
if (typeof window.Drag !== "function") {
    window.Drag = function () {
        console.log("🚀 [Drag] เริ่มต้นการทำงาน...");

        let targetElement = document.querySelector('.exercise-items .drag-drop-placeholder.ui-droppable');

        if (targetElement) {
            targetElement.click();
            console.log("✅ [Drag] คลิกสำเร็จที่ .drag-drop-placeholder.ui-droppable");
        } else {
            console.log("❌ [Drag] ไม่พบ .drag-drop-placeholder.ui-droppable");
        }

        setTimeout(() => {
            console.log("🚀 [Drag] เริ่มต้นคลิกตามลำดับจากน้อยไปมาก...");

            let draggableElements = Array.from(document.querySelectorAll('.draggable-container .drag-drop.ui-state-default.ui-draggable.ui-draggable-handle.ui-droppable'));

            draggableElements.sort((a, b) => {
                let idA = parseInt(a.getAttribute('data-drag-drop-id').replace('drag-drop-', ''), 10);
                let idB = parseInt(b.getAttribute('data-drag-drop-id').replace('drag-drop-', ''), 10);
                return idA - idB;
            });

            draggableElements.forEach((element, index) => {
                setTimeout(() => {
                    element.click();
                    console.log(`✅ [Drag] คลิกที่ ${element.getAttribute('data-drag-drop-id')}`);
                }, index * 10);
            });

            console.log("🎯 [Drag] คลิก Drag-Drop เสร็จแล้ว!");

            setTimeout(() => {
                console.log("🚀 [Drag] กำลังกด Correction...");

                let correctionButton = document.querySelector('.action-exercise-button.correct');
                if (correctionButton) {
                    correctionButton.click();
                    console.log("✅ [Drag] กด Correction สำเร็จ");
                } else {
                    console.log("❌ [Drag] ไม่พบปุ่ม Correction!");
                }

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
                }, 1000);
            }, draggableElements.length * 10 + 500);
        }, 500);
    };
}

if (typeof window.SingleChoice !== "function") {
    window.SingleChoice = async function () {
        console.log("🎯 [Single Choice] กำลังกดปุ่ม Correction เพื่อแสดงคำตอบที่ถูกต้อง...");

        let correctionButton = document.querySelector(".action-exercise-button.correct");
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กด Correction เพื่อแสดงคำตอบที่ถูกต้อง...");
        } else {
            console.log("❌ ไม่พบปุ่ม Correction!");
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        let allQuestions = document.querySelectorAll('.item.choice-item');
        console.log(`🎯 พบทั้งหมด ${allQuestions.length} ข้อ`);

        let clickPromises = Array.from(allQuestions).map((question, index) => {
            return new Promise(resolve => {
                let correctChoice = question.querySelector('.choice-option.should-be-checked');
                if (correctChoice) {
                    let radioInput = correctChoice.querySelector('input[type="radio"]');
                    if (radioInput) {
                        radioInput.click();
                        console.log(`✔️ เลือกตัวเลือกที่ถูกต้องในข้อที่ ${index + 1}`);
                    }
                }
                resolve();
            });
        });

        await Promise.all(clickPromises);

        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กด Correction อีกครั้งเพื่อตรวจสอบคำตอบ...");
        }

        let nextButton = document.querySelector(".action-exercise-button.next");
        if (nextButton && !window.nextClicked) { // ✅ ป้องกันกดซ้ำ
            window.nextClicked = true;
            nextButton.click();
            console.log("➡️ กด Next ไปยังขั้นตอนถัดไป...");

            setTimeout(() => {
                window.nextClicked = false; // ✅ รีเซ็ตเพื่อให้ทำงานในรอบถัดไป
                checkAndRun();  // ✅ เช็คประเภทคำถามถัดไป
            }, 2000);
        } else {
            console.log("❌ ไม่พบปุ่ม Next! หรือถูกกดไปแล้ว");
        }

        console.log("🎉 [Single Choice] เสร็จสิ้น!");
    };
}


if (typeof window.ManyAnswers !== "function") {
    window.ManyAnswers = async function () {
        console.log("🚀 เริ่มต้นการทำงาน Many Answers...");

        let choiceItems = document.querySelectorAll('.exercise-items .item.choice-item');
        for (let i = 1; i < choiceItems.length; i++) {
            choiceItems[i].remove();
        }
        console.log("✅ ลบ .choice-item เหลือเพียง 1 ตัว");

        let correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กด Correction เพื่อตรวจคำตอบ");
        } else {
            console.log("❌ ไม่พบปุ่ม Correction!");
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        let checkedOptions = document.querySelectorAll('.item.choice-item .choice-option.should-be-checked');
        if (checkedOptions.length === 0) {
            console.log("❌ ไม่พบตัวเลือกที่ต้องกด!");
            return;
        }

        checkedOptions.forEach(option => {
            let checkbox = option.querySelector('input.choice');
            if (checkbox) {
                checkbox.click();
                console.log(`✅ กดตัวเลือก: ${option.innerText.trim()}`);
            }
        });

        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กด Correction เพื่อตรวจคำตอบอีกครั้ง");
        }

        let nextButton = document.querySelector(".action-exercise-button.next");
        if (nextButton) {
            nextButton.click();
            console.log("➡️ กด Next ไปยังขั้นตอนถัดไป...");
        } else {
            console.log("❌ ไม่พบปุ่ม Next!");
        }

        console.log("🎉 [Many Answers] เสร็จสิ้น!");
    };
}

if (typeof window.markTextSolve !== "function") {
    window.markTextSolve = async function () {
        console.log("🎯 [Mark Text] เริ่มต้นการทำงาน...");

        let markTexts = document.querySelectorAll(".exercise-items .mark-text");
        if (markTexts.length > 0) {
            markTexts.forEach(mark => {
                mark.click();
                console.log("✅ [Mark Text] กดที่ .mark-text");
            });
        } else {
            console.log("❌ [Mark Text] ไม่พบ .mark-text");
        }

        let correctionButton = document.querySelector(".action-exercise-button.correct");
        if (correctionButton) {
            await new Promise(resolve => setTimeout(resolve, 500));
            correctionButton.click();
            console.log("✅ [Mark Text] กด Correction...");
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        let nextButton = document.querySelector(".action-exercise-button.next");
        if (nextButton) {
            nextButton.click();
            console.log("➡️ [Mark Text] กด Next...");
        }

        console.log("🎉 [Mark Text] เสร็จสิ้น!");
    };
}

if (typeof window.Arrange !== "function") {
    window.Arrange = async function () {
        console.log("🎯 [Arrange] เริ่มต้นการทำงาน...");

        let items = document.querySelectorAll('.exercise-items .item');
        items.forEach(item => {
            let scrambledBlocks = Array.from(item.querySelectorAll('.scrambled-block'));
            scrambledBlocks.sort((a, b) => {
                let idA = parseInt(a.getAttribute('data-scrambled-block-id').replace('scr-block-', ''), 10);
                let idB = parseInt(b.getAttribute('data-scrambled-block-id').replace('scr-block-', ''), 10);
                return idA - idB;
            });

            let parentElement = item.querySelector('.scrambled-sentence');
            parentElement.innerHTML = '';
            scrambledBlocks.forEach((block) => {
                parentElement.appendChild(block);
            });
        });

        console.log("✅ เรียงคำเสร็จแล้ว!");

        let correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กดปุ่ม Correction");
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        let nextButton = document.querySelector('.action-exercise-button.next');
        if (nextButton) {
            nextButton.click();
            console.log("✅ กดปุ่ม Next");
        }
    };
}

if (typeof window.correctionOrNext !== "function") {
    window.correctionOrNext = async function () {
        console.log("🎯 [Correction หรือ Next] กำลังเช็ค...");

        let correctionButton = document.querySelector(".action-exercise-button.correct");
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ กด Correction");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        let nextButton = document.querySelector(".action-exercise-button.next");
        if (nextButton) {
            nextButton.click();
            console.log("✅ กด Next");
        } else {
            console.log("❌ ไม่พบปุ่ม Next!");
        }

        setTimeout(checkAndRun, 2000);
    };
}

if (typeof window.Write !== "function") {
    window.Write = async function() {
        console.log("✍️ [Write] เริ่มต้นการทำงาน...");

        let correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ [Write] กด Correction เพื่อตรวจคำตอบ");
        } else {
            console.log("❌ [Write] ไม่พบปุ่ม Correction!");
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1500));

        let solutionButton = document.querySelector('button.btn-link.solution');
        if (solutionButton) {
            solutionButton.click();
            console.log("✅ [Write] กด Solution");

            await new Promise(resolve => setTimeout(resolve, 500));

            let answers = [];
            let answerFields = document.querySelectorAll('.answer.form-control');

            if (answerFields.length === 0) {
                console.log("❌ [Write] ไม่พบช่องกรอกคำตอบ!");
                return;
            }

            answerFields.forEach(field => {
                answers.push(field.value);
            });

            console.log("📝 [Write] คำตอบที่เก็บ: ", answers);

            let repeatButton = document.querySelector('button[class*="repeat"]');
            if (repeatButton) {
                repeatButton.click();
                console.log("✅ [Write] กด Repeat");
            } else {
                console.log("❌ [Write] ไม่พบปุ่ม Repeat!");
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 500));

            let blanks = document.querySelectorAll('.answer.form-control');
            await Promise.all(Array.from(blanks).map((blank, index) => {
                if (answers[index]) {
                    blank.value = answers[index];
                    console.log(`✅ [Write] เติมคำตอบ '${answers[index]}' ในช่องที่ ${index + 1}`);
                }
            }));

            correctionButton = document.querySelector('.action-exercise-button.correct');
            if (correctionButton) {
                correctionButton.click();
                console.log("✅ [Write] กด Correction เพื่อตรวจคำตอบอีกครั้ง");
            } else {
                console.log("❌ [Write] ไม่พบปุ่ม Correction อีกครั้ง!");
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            let nextButton = document.querySelector(".action-exercise-button.next");
            if (nextButton) {
                nextButton.click();
                console.log("➡️ [Write] กด Next ไปยังขั้นตอนถัดไป...");
            } else {
                console.log("❌ [Write] ไม่พบปุ่ม Next!");
            }

            console.log("🎉 [Write] เสร็จสิ้นการทำงาน!");
        } else {
            console.log("❌ [Write] ไม่พบปุ่ม Solution!");
        }
    };
}

window.Long = async function() {
    console.log("🎯 [Long] กำลังกดปุ่ม Correction เพื่อแสดงคำตอบที่ถูกต้อง...");

    let correctionButton = document.querySelector('.action-exercise-button.correct');
    if (correctionButton) {
        correctionButton.click();
        console.log("✅ [Long] กด Correction เพื่อตรวจคำตอบ");
    } else {
        console.log("❌ [Long] ไม่พบปุ่ม Correction!");
        return;
    }

    await new Promise(resolve => setTimeout(resolve, 700));

    let exerciseItems = document.querySelectorAll('.exercise-items .item');
    let successItemFound = false;

    exerciseItems.forEach(item => {
        if (item.querySelector('.scrambled-cell.success')) {
            successItemFound = true;
        } else {
            item.remove();
        }
    });

    await new Promise(resolve => setTimeout(resolve, 500));

    if (!successItemFound) {
        console.log("❌ [Long] ไม่พบคำตอบที่ถูกต้อง ลองใหม่...");
        let solutionButton = document.querySelector('button.btn-link.solution');
        if (solutionButton) {
            solutionButton.click();
            console.log("✅ [Long] กด Solution เพื่อแสดงคำตอบที่ถูกต้อง");
        } else {
            console.log("❌ [Long] ไม่พบปุ่ม Solution!");
        }

        await new Promise(resolve => setTimeout(resolve, 700));

        let repeatButton = document.querySelector('button[class*="repeat"]');
        if (repeatButton) {
            repeatButton.click();
            console.log("✅ [Long] กด Repeat เพื่อทำแบบทดสอบใหม่");
        } else {
            console.log("❌ [Long] ไม่พบปุ่ม Repeat!");
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        window.Long(); // ลองใหม่
    } else {
        console.log("🎉 [Long] พบคำที่ถูกต้องแล้ว!");

        correctionButton = document.querySelector('.action-exercise-button.correct');
        if (correctionButton) {
            correctionButton.click();
            console.log("✅ [Long] กดปุ่ม Correction หลังจากลบเสร็จ");
        }

        await new Promise(resolve => setTimeout(resolve, 700));

        let nextButton = document.querySelector('button[class*="next"]');
        if (nextButton && !window.nextClicked) { // ✅ ป้องกันการกดซ้ำ
            window.nextClicked = true;
            nextButton.click();
            console.log("✅ [Long] กดปุ่ม Next เพื่อไปยังขั้นตอนถัดไป");
            
            setTimeout(() => {
                window.nextClicked = false; // ✅ รีเซ็ตเพื่อให้ทำงานในรอบถัดไป
                checkAndRun();
            }, 2000);
        } else {
            console.log("❌ [Long] ไม่พบปุ่ม Next! หรือถูกกดไปแล้ว");
        }
    }
};





let autoLoop = setInterval(() => {
    let continueButton = document.querySelector(".btn.btn-primary.next");
    if (!continueButton) {
        checkAndRun();
    } else {
        console.log("🎉 [Auto] พบปุ่ม 'Continue Learning' หยุดการทำงาน");
        clearInterval(autoLoop);
    }
}, 3000);

// ✅ ฟังก์ชันเช็คเงื่อนไขและเลือกโหมดที่ต้องทำงาน
function checkAndRun() {
    let exerciseItems = document.querySelector(".exercise-items");

    if (exerciseItems) {
        let gapElements = exerciseItems.querySelectorAll(".gap-container.form-inline.form-group-sm");
        let dragElements = exerciseItems.querySelectorAll(".drag-drop-placeholder.ui-droppable");
        let radioElements = exerciseItems.querySelectorAll('input[type="radio"]');
        let checkBoxElements = exerciseItems.querySelectorAll('input[type="checkbox"]');
        let markTextElements = exerciseItems.querySelectorAll(".mark-text");
        let scrambledSentenceElements = exerciseItems.querySelectorAll(".scrambled-sentence.ui-sortable");
        let answerContainer = exerciseItems.querySelectorAll(".answer-container.form-inline.form-group-sm");
        let scrambledCellContainer = document.querySelector(".scrambled-cell-container");

        if (gapElements.length > 0) {
            console.log(`🔍 พบ ${gapElements.length} elements ที่ตรงกับเงื่อนไข! เรียกใช้ refreshSolve()...`);
            window.refreshSolve();
        } else if (dragElements.length > 0) {
            console.log(`🔍 พบ ${dragElements.length} elements ที่ตรงกับเงื่อนไข! เรียกใช้ Drag()...`);
            window.Drag();
        } else if (radioElements.length > 0) {
            console.log(`🔍 พบ ${radioElements.length} elements ที่ตรงกับเงื่อนไข! เรียกใช้ SingleChoice()...`);
            window.SingleChoice();
        } else if (checkBoxElements.length > 0) {
            console.log(`🔍 พบ ${checkBoxElements.length} elements ที่ตรงกับเงื่อนไข! เรียกใช้ ManyAnswers()...`);
            window.ManyAnswers();
        } else if (markTextElements.length > 0) {
            console.log(`🔍 พบ ${markTextElements.length} elements ที่ตรงกับเงื่อนไข! เรียกใช้ markTextSolve()...`);
            window.markTextSolve();
        } else if (scrambledSentenceElements.length > 0) {
            console.log(`🔍 พบ ${scrambledSentenceElements.length} elements ที่ตรงกับเงื่อนไข! เรียกใช้ Arrange()...`);
            window.Arrange();
        } else if (answerContainer.length > 0) {
            console.log(`🔍 พบ ${answerContainer.length} elements ที่ตรงกับเงื่อนไข! เรียกใช้ Write()...`);
            window.Write();
        } else if (scrambledCellContainer) { 
            console.log(`🔍 พบ Scrambled Cell Container! เรียกใช้ Long()...`);
            window.Long();
        } else {
            console.log("✅ ไม่พบเงื่อนไขที่ต้องทำงาน, กด Correction หรือ Next");
            window.correctionOrNext();
        }
    } else {
        console.log("❌ ไม่พบ .exercise-items บนหน้าเว็บ!");
    }
}

// ✅ รันโค้ดเมื่อเอกสารโหลดเสร็จ
setTimeout(checkAndRun, 2000);
