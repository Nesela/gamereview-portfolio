let editor;

const board_post = document.querySelector("#new_post")
const myGameListElement = document.querySelector("#game-list");

const mainBoard = document.querySelector(".board")

const createEditor = () => {
    editor = new toastui.Editor({
        el: document.querySelector('#editor'),
        height: '400px',
        initialEditType: 'wysiwyg', // 바로 글쓰기
        previewStyle: 'vertical',
        placeholder: '게임 리뷰를 작성하세요'
    });
}

document.querySelectorAll(".board a").forEach(board => {
    board.addEventListener("click", () => {
        myGameListElement.className = "post_list";
        myGameListElement.innerHTML = "";

        const m_board = board.innerText;
        board_post.innerHTML = m_board;

        mygameList.innerHTML += `
        <div>
        <button id="board_bt">글쓰기</button>
        </div>
        `
        const board_bt = document.querySelector("#board_bt");
        board_bt.addEventListener("click", () => {
            myGameListElement.innerHTML = "";
            board_post.innerHTML = "글쓰기";
            mygameList.innerHTML += `
            <input type="text" placeholder="제목을 입력해 주세요."><p>
            <div id="editor"></div>
            `
            createEditor();

            const userPost = JSON.parse(localStorage.getItem('userPost')) || [];
            userPost.push({})
            localStorage.setItem("userPost", JSON.stringify(userPost));
        })
    });
});
//  category, title, content, date 

