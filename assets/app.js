// ====== 코드 라우팅 ======
const ROUTES = {
  "0001": "desc-0001.html",
  "0011": "desc-0011.html",
  "0110": "desc-0110.html",
  "1001": "desc-1001.html",
  "0100": "desc-0100.html",
  "1110": "desc-1110.html",
  "0111": "desc-0111.html",
};

// ====== 키 설정: M1=F1, M2=F2 ======
const M1_KEYS = new Set(["F1"]);
const M2_KEYS = new Set(["F2"]);

function go(href){ location.href = href; }
function pageType(){ return document.body?.dataset?.page || ""; }

// 1페이지: F1 => 2페이지
function bindHome(){
  addEventListener("keydown", (e)=>{
    if(e.repeat) return;
    if(M1_KEYS.has(e.key)){
      e.preventDefault();
      go("code.html");
    }
  });
}

// 2페이지: 숫자입력/Backspace 삭제/Enter 제출/F2 홈
function bindCode(){
  let buffer = "";
  const boxes = [0,1,2,3].map(i=>document.getElementById(`d${i}`));

  function render(){
    const len = buffer.length;
    for(let i=0;i<4;i++){
      boxes[i].textContent = buffer[i] ?? "";
      boxes[i].classList.toggle("cursor", (i===len && len<4));
      boxes[i].classList.toggle("no-cursor", (len>=4));
    }
  }

  function reset(){ buffer=""; render(); }
  function submit(){
    if(buffer.length!==4) return;
    const target = ROUTES[buffer];
    if(target) go(target);
    else setTimeout(reset, 500);
  }

  render();

  addEventListener("keydown", (e)=>{
    if(e.repeat) return;

    // F2: 시작 페이지로
    if(M2_KEYS.has(e.key)){
      e.preventDefault();
      go("index.html");
      return;
    }

    // Backspace: 한 글자 삭제
    if(e.key==="Backspace"){
      e.preventDefault();
      if(buffer.length>0){
        buffer = buffer.slice(0,-1);
        render();
      }
      return;
    }

    // Enter: 제출
    if(e.key==="Enter"){
      e.preventDefault();
      submit();
      return;
    }

    // 숫자 입력
    if(/^\d$/.test(e.key)){
      e.preventDefault();
      if(buffer.length<4){
        buffer += e.key;
        render();
      }
    }
  });
}

// 설명 페이지: F1 => 2페이지로
function bindDesc(){
  addEventListener("keydown", (e)=>{
    if(e.repeat) return;
    if(M1_KEYS.has(e.key)){
      e.preventDefault();
      go("code.html");
    }
  });
}

const p = pageType();
if(p==="home") bindHome();
if(p==="code") bindCode();
if(p==="desc") bindDesc();