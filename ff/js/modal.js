const modalloginbt = document.querySelector("#login-button")
const regbt = document.querySelector("#register-button")
const modal = document.querySelector(".modal")

const loginContent = document.querySelector("#loginContent")
const regContent = document.querySelector("#regContent")

const xbt = document.querySelector(".close")

modalloginbt.addEventListener("click", () => {
    modal.style.display = "block";
    loginContent.style.display = "block";
    regContent.style.display = "none";
});

regbt.addEventListener("click", () => {
    modal.style.display = "block";
    regContent.style.display = "block";
    loginContent.style.display = "none";
    const rgInput = document.querySelectorAll("#regContent > input")
    rgInput.forEach(inputElement => {
        inputElement.value = "";
    })
});

xbt.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("mousedown", (e) => {
    // if (e.target === modal) {
    //     modal.style.display = "none";
    // }

    //드래그 로인한 모달 꺼짐 방지
    if (e.target === modal) { //배경클릭 체크
        const startX = e.clientX; // 클릭시작 X 좌표
        const startY = e.clientY; // 클릭시작 y 좌표

        modal.addEventListener("mouseup", (upEvent) => {
            // 클릭좌표와 마우스뗏을때의 좌표 비교 후 클릭or드래그 판단
            if (upEvent.target === modal &&
                Math.abs(upEvent.clientX - startX) < 5 && // x 이동거리
                Math.abs(upEvent.clientY - startY) < 5) { // y 이동거리
                modal.style.display = "none"; // 시작과 끝의 위치가 5px미만 = 클릭
            }
        }, { once: true }); // 한번만 실행
    }
});