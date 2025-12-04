const Newuser = document.querySelector("#Newuser");
const Newpw = document.querySelector("#Newpw");
const configPw = document.querySelector("#confirmPw");
const userReg = document.querySelector("#userReg");
const modalPopup = document.querySelector("#modalPopup");

userReg.addEventListener("click", () =>{
    const idcek = JSON.parse(localStorage.getItem("users")) || []; // 등록된 사용자 불러오기

    if(idcek.find(user => user.id === Newuser.value)){ //등록된 id불어와서 확인
        alert("중복된 아이디 입니다.")
        return;
    }
    if(Newuser.value.length < 2){
        alert("아이디는 2글자 이상이어야 합니다.");
        return;
    }
    if(Newpw.value.length < 4){
        alert("비밀번호는 4글자 이상이어야 합니다.");
        return;
    }
    if(Newpw.value === configPw.value){
        // localStorage.setItem("userid", Newuser.value);
        // localStorage.setItem("userpw", Newpw.value);
        idcek.push({id: Newuser.value, pw: Newpw.value }); //사용자 추가
        localStorage.setItem("users", JSON.stringify(idcek)); //저장하기

        alert("회원가입이 완료되었습니다.");
        modalPopup.style.display = "none";
    }else{
        alert("비밀번호가 일치하지 않습니다.");
    }
});