const loginbt = document.querySelector("#login-button")
const regbt = document.querySelector("#register-button")
const modal = document.querySelector(".modal")

const loginContent = document.querySelector("#loginContent")
const regContent = document.querySelector("#regContent")

const xbt = document.querySelector(".close")

loginbt.addEventListener("click", () => {
    modal.style.display = "block";
    loginContent.style.display = "block";
    regContent.style.display = "none";
});

regbt.addEventListener("click", () => {
    modal.style.display = "block";
    regContent.style.display ="block";
    loginContent.style.display ="none";
});

xbt.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if(e.target === modal){
        modal.style.display ="none";
    }
})