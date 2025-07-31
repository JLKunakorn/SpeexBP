// === รวมชุดข้อมูล script ทั้งหมด ===
// โครงสร้างข้อมูลหลักที่เก็บ URL ของรูปภาพและสคริปต์ที่เกี่ยวข้องสำหรับแต่ละบทเรียน
(function() {
const exercises = {
    'A1': {
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/161452.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Darg2.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/570476.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Darg2.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/569863.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Ex14.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_569875.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/refs/heads/main/Ex18.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_608710.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Darg2.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/608701.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/remove.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/570746.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Ex8.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/570716.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Darg2.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/388712.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Darg2.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/600421.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/remove.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_608773.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Darg2.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/628057.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Ex13.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/608698.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Ex20.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/608691.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/remove.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/608699.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/remove.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/611493.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Ex3.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/608709.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Textlow.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/608705.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Darg2.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/388703.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Ex5.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_608722.jpg": "https://raw.githubusercontent.com/JLKunakorn/SP-A1/main/Ex6.js"
    },
    'A2': {
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/611991.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/e4.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_161754.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/Darg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_609021.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/Darg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/570841.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/Darg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609031.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/Darg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/165381.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/Darg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/613136.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/e19.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609033.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/Remob.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_609015.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/e3.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/570867.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/e6.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/161683.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/e12.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/569757.jpg": "https://raw.githubusercontent.com/JLKunakorn/A2/main/e10.js"
    }, // <-- จุดที่แก้ไข: เพิ่มเครื่องหมาย comma (,) ตรงนี้
    'B1.1': {
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/615303.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/w13.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/370931.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/Draggg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/388741.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/Draggg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/162072.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/w1.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_609408.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/w10.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609453.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/re12.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/isre_162221.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/Draggg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/165463.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/Draggg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/165074.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/Draggg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/388718.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/w018.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/166176.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/Draggg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/600651.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/rem.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/366877.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/rem.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609446.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/textdown.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/162181.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/w7.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/161959.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/w14.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/gte_gegb1002.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/rem.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609444.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/Draggg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/162045.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/w11.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/pc_auges3.jpg": "https://raw.githubusercontent.com/JLKunakorn/B11/main/Draggg.js"
    },
    'B1.2': {
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/163483.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/dar.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/165429.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/rev.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_611361.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/rev.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/612024.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/re9.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_612018.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/textup.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/pc_rocks4.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/dar.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/612004.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/dar.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/610764.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/ave.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/389226.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/dar.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/610760.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/w2.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/163486.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/w16.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/388750.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/w8.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/162278.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/w17.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/163479.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/dar.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/612184.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/re11.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/isre1_e1i11002.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/dar.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/162273.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/w6.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/611800.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/dar.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/162284.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/dar.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/610762.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/rev.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/pc_auges3.jpg": "https://raw.githubusercontent.com/JLKunakorn/B12/main/Draggg.js"
    },
    'B2.1': {
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/612206.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/re13.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/clte_612201.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/Darg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/163593.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/Darg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/611863.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/Remove.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/611095.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/re19.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609212.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/ave.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609211.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/Darg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/163647.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/Tup.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609380.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/w16.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609521.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/ave.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609374.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/Darg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609378.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/Darg.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609382.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/Tdown.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/isre_163682.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/Tup.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/611195.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/re3.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/610864.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/re10.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/623135.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/main/re14.js"
    },
    'B2.2': {
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609577.jpg": "https://raw.githubusercontent.com/JLKunakorn/B22/refs/heads/main/re15.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/isre2_e2ia1006.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/refs/heads/main/Tup.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/611055.jpg": "https://raw.githubusercontent.com/JLKunakorn/B22/refs/heads/main/w12.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/bte1_becb1005.jpg": "https://raw.githubusercontent.com/JLKunakorn/B22/refs/heads/main/re2.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/163831.jpg": "https://raw.githubusercontent.com/JLKunakorn/B22/refs/heads/main/re5.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/628198_2.jpg": "https://raw.githubusercontent.com/JLKunakorn/B22/refs/heads/main/re19.js",
        "https.bp.blogspot.com/-_Gwjx8v2g6Y/WOfH2DD2KUI/AAAAAAAADfM/h_i2421y9R48uJCTqDm_3j2x-y_4erQ6wCLcB/s1600/google-logo-2.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/refs/heads/main/Tdown.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/609547.jpg": "https://raw.githubusercontent.com/JLKunakorn/B22/refs/heads/main/re8.js",
        "https://d2d81dmxsitsnp.cloudfront.net/static/image/611665.jpg": "https://raw.githubusercontent.com/JLKunakorn/B21/refs/heads/main/Tdown.js"
    }
};


// === สร้าง UI Dropdown และปุ่ม Start บนหน้าเว็บ ===

// สร้าง Container สำหรับ UI
const container = document.createElement('div');
container.style.cssText = `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(30, 30, 30, 0.95);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: white;
  font-family: sans-serif;
`;
document.body.appendChild(container);

// สร้าง Element <select> (Dropdown)
const select = document.createElement('select');
select.style.cssText = `
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background: #1f1f1f;
  color: white;
  outline: none;
  box-shadow: 0 0 0 2px #007BFF inset;
`;
Object.keys(exercises).forEach(key => {
  const option = document.createElement('option');
  option.value = key;
  option.innerText = key;
  select.appendChild(option);
});
container.appendChild(select);

// สร้างปุ่ม Start
const button = document.createElement('button');
button.innerText = "▶ เริ่มทำแบบฝึก";
button.style.cssText = `
  padding: 15px 30px;
  font-size: 18px;
  background: linear-gradient(90deg, #007BFF, #00C6FF);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s;
`;
button.onmouseover = () => button.style.transform = 'scale(1.05)';
button.onmouseleave = () => button.style.transform = 'scale(1)';
container.appendChild(button);

// === ฟังก์ชันสำหรับโหลดสคริปต์จาก URL ===
function loadScript(url) {
  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

// === ฟังก์ชันที่จะทำงานเมื่อกดปุ่ม Start ===
function runScript() {
  const selectedExercise = select.value;
  const currentScripts = exercises[selectedExercise];
  document.querySelectorAll('img').forEach(image => {
    const src = image.getAttribute('src');
    if (currentScripts && currentScripts[src]) {
      console.log(`ภาพ ${src} ตรงกับสคริปต์: ${currentScripts[src]}`);
      loadScript(currentScripts[src]);
    }
  });
}

button.addEventListener('click', runScript);

})();
