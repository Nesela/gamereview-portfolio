let editor;
let currentBoard = "전체게시판";
let currentPage = 1;

const board_post = document.querySelector("#new_post")
const myGameListElement = document.querySelector("#game-list");
const day = document.querySelector("#dayck");

const createEditor = () => {
    editor = new toastui.Editor({
        el: document.querySelector('#editor'),
        height: '400px',
        initialEditType: 'wysiwyg', // 바로 글쓰기
        previewStyle: 'vertical',
        placeholder: '게임 리뷰를 작성하세요'
    });
};
//로컬스토리지 불러오기
const getUserPost = () => {
    const data = localStorage.getItem("userPost");
    return data ? JSON.parse(data) : [];
};

//게시글 보이게하기
const mPost = (category, page = 1) => {
    const mainPosts = getUserPost();
    daybt.style.display = "none";
    const filtered = mainPosts
        .filter(list => category === "전체게시판" || list.userCategory === category)
        .reverse();

    const start = (page - 1) * 30;
    const paged = filtered.slice(start, start + 30);

    paged.forEach((list, index) => {
        myGameListElement.innerHTML += `
        <div class="boardMainText post_item" 
        data-index="${start + index}">
        
            <span>${list.userCategory}</span>
            <span class="post_click">${list.userTitle}</span>
            <span class="post_click">${list.date}</span>
        </div>
        `;
    });


    if (filtered.length > 30) {
        const totalPages = Math.ceil(filtered.length / 30); // 전체 페이지 수

        let paginationHTML = '<div class="pagination">';

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="page-btn" data-page="${i}">${i}</button>
            `;
        }
        paginationHTML += '</div>';
        myGameListElement.innerHTML += paginationHTML;
        //페이지 버튼
        setTimeout(() => {
            document.querySelectorAll('.page-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const pageNum = parseInt(e.target.dataset.page);
                    currentPage = pageNum;
                    showboardList(currentBoard, pageNum);
                });
            });
        }, 0);
    }
};



//게시글 상세내용
myGameListElement.addEventListener("click", (e) => {
    //게시글 상세내용 뒤로가기버튼
    if (e.target.id === "mPostBack") {
        showboardList(currentBoard, currentPage);
        return;
    };

    const etc = e.target.closest(".post_click");
    if (!etc && e.target.id !== "mPostDelete") return;

    const clickPost = e.target.closest(".post_item");
    const index = parseInt(clickPost.dataset.index);

    // 게시글 상세내용 삭제 버튼
    if (e.target.id === "mPostDelete") {
        const allPost = JSON.parse(localStorage.getItem("userPost"));
        const DeletePost = allPost.filter(item => {
            if (item.userTitle === post.userTitle && item.date === post.date) {
                return false;
            }
            return true;
        });
        localStorage.setItem("userPost", JSON.stringify(DeletePost));
        alert("게시글이 삭제되었습니다.")
        showboardList(currentBoard, currentPage);
        return;
    }


    const posts = getUserPost()
        .filter(list => currentBoard === "전체게시판" || list.userCategory === clickPost.querySelector('span').textContent)
        .reverse();
    const post = posts[index];

    myGameListElement.innerHTML = `
        <button id="mPostBack">뒤로가기</button>
        <div>
            <div>${post.userTitle}</div>
            <div>${post.date}</div>
            <div>${post.userContent}</div>
        </div>
        <button id="mPostDelete">삭제</button>
    `;
}
);



// 게시글 리스트
const showboardList = (category, page = 1) => {
    currentBoard = category;
    currentPage = page;
    myGameListElement.className = "post_list";
    myGameListElement.innerHTML = "";
    board_post.innerHTML = category;
    myGameListElement.innerHTML += `
        <div class="board_css">
        <button id="topBoardBt" class="board_bt">글쓰기</button>
        </div>
        `;
    mPost(category, page);

    myGameListElement.innerHTML += `
    <div class="board_css">
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
            <div id="writePost">
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
        const userContent = editor.getHTML();
        const now = new Date();
        const date = now.toLocaleDateString("ko-KR", {
            year: "2-digit",
            month: "long",
            day: "2-digit"
        });
        const userPost = JSON.parse(localStorage.getItem('userPost')) || [];
        //보안을 위한 정규식 이건 많이사용될듯..
        const textOnly = userContent.replace(/<[^>]*>?/gm, '').trim();

        //글쓰기 데이터 저장
        if (userTitle.length < 2) {
            alert("제목은 2글자 이상이어야 합니다.");
            return;

        } if (textOnly.length === 0) {
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

// const makeTodayPosts = () => {
//     const posts = [];
//     const categories = ["자유게시판", "공략/정보"];
    
//     // 오늘 날짜 설정 (작성하신 포맷 그대로 적용)
//     const now = new Date();
//     const today = now.toLocaleDateString("ko-KR", {
//         year: 'numeric', 
//         month: 'long', 
//         day: 'numeric'
//     });

//     for (let i = 1; i <= 50; i++) {
//         posts.push({
//             userCategory: categories[Math.floor(Math.random() * categories.length)],
//             userTitle: `작성된 테스트글 ${i}`,
//             userContent: `본문 내용입니다. 번호: ${i}`,
//             date: today // 모두 동일한 오늘 날짜
//         });
//     }

//     // 기존 데이터를 지우고 새 데이터 50개 저장
//     localStorage.setItem("userPost", JSON.stringify(posts));
// };