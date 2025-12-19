let editor;

const board_post = document.querySelector("#new_post")
const myGameListElement = document.querySelector("#game-list");

const createEditor = () => {
    editor = new toastui.Editor({
        el: document.querySelector('#editor'),
        height: '400px',
        initialEditType: 'wysiwyg', // 바로 글쓰기
        previewStyle: 'vertical',
        placeholder: '게임 리뷰를 작성하세요'
    });
}

const getUserPost = () => {
    const data = localStorage.getItem("userPost");
    return data ? JSON.parse(data) : [];
}

const mPost = (category) => {
    const mainPosts = getUserPost();

    mainPosts
    .filter(list =>  list.userCategory === category)
    .forEach((list) => {
        const usCategory = list.userCategory;
        const usTitle = list.userTitle;
        const usDate = list.date;

        myGameListElement.innerHTML +=`
        <div>${usCategory}${usTitle}${usDate}</div>
        `
    })
}

// 게시글 리스트
const showboardList = (category) => {
    myGameListElement.className = "post_list";
    myGameListElement.innerHTML = "";
    board_post.innerHTML = category;
    myGameListElement.innerHTML += `
        <div>
        <button id="topBoardBt" class="board_bt">글쓰기</button>
        `;
    mPost(category);
        
    myGameListElement.innerHTML +=`
        <button id="bottomBoardBt" class="board_bt">글쓰기</button>
        </div>
        `;
    //글쓰기 화면열기
    document.querySelectorAll(".board_bt").forEach(bt => {
        bt.addEventListener("click", () => {
            writePost(category);
        })
    });
};

//게시글 쓰기 폼
const writePost = (category) => {

    myGameListElement.innerHTML = "";
    board_post.innerHTML = "글쓰기";
    myGameListElement.innerHTML += `
            <div>
                <select id="boardCategory">
                    <option value="자유게시판">자유게시판</option>
                    <option value="공략/정보">공략/정보</option>
                </select>
                <input id="userTitle" type="text" placeholder="제목을 입력해 주세요.">
                    <button id="cancelBt">취소</button>
                    <button id="saveBt">등록</button>
                    <div id="editor"></div>
                
            </div>
            `
    createEditor();

    const boardCancel = document.querySelector("#cancelBt");
    const boardSave = document.querySelector("#saveBt");

    //글쓰기 취소
    boardCancel.addEventListener("click", () => {
        showboardList(category);
    });
    //글쓰기 세이브
    boardSave.addEventListener("click", () => {
        const userCategory = document.querySelector("#boardCategory").value;
        const userTitle = document.querySelector("#userTitle").value;
        const Content = editor.getHTML();
        const now = new Date();
        const date = now.toLocaleDateString("ko-KR", {
            year: "2-digit",
            month: "long",
            day: "2-digit"
        });
        const userPost = JSON.parse(localStorage.getItem('userPost')) || [];
        //보안을 위한 정규식 이건 많이사용될듯..
        const userContent = Content.replace(/<[^>]*>?/gm, '').trim();

        //글쓰기 데이터 저장
        if (userTitle.length < 2) {
            alert("제목은 2글자 이상이어야 합니다.");
            return;

        } if (userContent.length === 0) {
            alert("내용은 비워둘 수 없습니다.");
            return;
        } else {
            userPost.push({ userCategory, userTitle, userContent, date })
            localStorage.setItem("userPost", JSON.stringify(userPost));

            alert("작성 완료!");
            showboardList(category);
        }
    });
};

document.querySelectorAll(".board a").forEach(board => {
    board.addEventListener("click", () => {
        showboardList(board.innerText);
    });
});
console.log(mPost());
