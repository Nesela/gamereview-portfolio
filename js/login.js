const loginid = document.querySelector("#user");
const loginpw = document.querySelector("#pw");
const userloginbt = document.querySelector("#userLogin");
const loginmodal = document.querySelector("#modalPopup");

const loginbt = document.querySelectorAll("#login-button, #register-button");
const logoutbt = document.querySelector("#logout-button");

userloginbt.addEventListener("click", () => {
    const idcek = JSON.parse(localStorage.getItem("users")) || [];

    const found = idcek.find(user =>
        user.id === loginid.value &&
        user.pw === loginpw.value);

    if (found) {
        alert("userid" + " 님 로그인이 완료되었습니다.");
        loginmodal.style.display = "none"
        loginbt.forEach(bt => {
            bt.style.display = "none";
        });
        logoutbt.style.display = "block"
    } else {
        alert("회원정보가 일치하지 않습니다.");
    }
})