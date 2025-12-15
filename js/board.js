const board_post = document.querySelector("#new_post")
const myGameListElement = document.querySelector("#game-list");
const board_bt = document.querySelector("#board_bt");

document.querySelectorAll(".board a").forEach(board => {
    board.addEventListener("click", () => {
        myGameListElement.className = "post_list";
        myGameListElement.innerHTML = "";

        const m_board = board.innerText;
        board_post.innerHTML = m_board;

        if (board_bt){
            board_bt.style.display = "block"
        } else{
            board_bt.style.display = "none"
        }
    })
})