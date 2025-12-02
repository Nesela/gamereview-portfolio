const loginid = document.querySelector("#user");
const loginpw = document.querySelector("#pw");
const userloginbt = document.querySelector("#userLogin");
const loginmodal = document.querySelector("#modalPopup");

const loginbt = document.querySelectorAll("#login-button, #register-button");
const logoutbt = document.querySelector("#logout-button");

const LOGINUSERS_KEY = "loginUsers";

const checkUser = () => {
    const loggedInUser = localStorage.getItem(LOGINUSERS_KEY);

    if (loggedInUser) {
        loginbt.forEach(bt => {
            bt.style.display = "none";
        });
        logoutbt.style.display = "block"
    } else {
        loginbt.forEach(bt => {
            bt.style.display = "inline";
        });
        logoutbt.style.display = "none"
    }
}
checkUser();

logoutbt.addEventListener("click", () => {
    const currentUser = localStorage.getItem(LOGINUSERS_KEY);
    localStorage.removeItem(LOGINUSERS_KEY);

    checkUser();
    alert(currentUser + "님 로그아웃 되었습니다.")
});

userloginbt.addEventListener("click", () => {
    const idcek = JSON.parse(localStorage.getItem("users")) || [];

    const found = idcek.find(user =>
        user.id === loginid.value &&
        user.pw === loginpw.value);

    if (found) {
        localStorage.setItem(LOGINUSERS_KEY, found.id);
        alert(found.id + " 님 로그인이 완료되었습니다.");
        loginmodal.style.display = "none"
        checkUser();
    } else {
        alert("회원정보가 일치하지 않습니다.");
    }
})