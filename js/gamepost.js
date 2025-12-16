const baseDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

//날짜
const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() - 1);
const startDay = document.querySelector("#firstDay");
const endDay = document.querySelector("#lastDay");
const firstDay = baseDate(oneYearAgo);
const lastDay = baseDate(today);
startDay.value = firstDay;
endDay.value = lastDay;

let currentGenre = '';
let currentOrdering = '';

const search = document.querySelector("#main_search");

const usdaybt = document.querySelector("#dayBt");
const post = document.querySelector("#new_post");
const daybt = document.querySelector(".dayck");
const mygameList = document.querySelector("#game-list");
const API_KEY = "4db8554f6c524aacb7f4bd32f85783f8";
const BASE_URL = "https://api.rawg.io/api/games";
const myGameSlugs = [
    "monster-hunter-wilds",
    "elden-ring-nightreign",
    "satisfactory",
    "v-rising",
    "factorio",
    "sephiria"
];

//포털 메인 게임화면 (내가 추천 하는 게임)
const myGame = myGameSlugs.map(slug =>
    fetch(`${BASE_URL}/${slug}?key=${API_KEY}`)
        .then(res => res.json())
);

Promise.all(myGame).then(games => {
    mygameList.className = "post_grid";
    mygameList.innerHTML = '';
    games.forEach(game => {
        mygameList.innerHTML += `
        <div>
            <img src="${game.background_image}">
            <p>${game.name}</p>
            <p>${game.genres.slice(0, 2).map(g => g.name).join(', ')}</p>
        </div>`;
    });
});


const loadGame = (genre = '', ordering = '', firstDay = '', lastDay = '', searchUser = '') => {
    let url = `${BASE_URL}?key=${API_KEY}&page_size=50`;

    if (searchUser) {
        url += `&search=${searchUser}`;
    } else {
        url += `&genres=${genre}&ordering=${ordering}&dates=${firstDay},${lastDay}`
    }
    console.log('요청 URL:', url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            mygameList.className = "post_list";
            mygameList.innerHTML = ''
            data.results
                .filter(game => game.background_image) //이미지 있는거만 필터
                .slice(0, 20)  //20개까지 표기
                .forEach(game => {
                    mygameList.innerHTML += `
        <div class="gams_post">
        <div class="img-wrapper">
        <button class="prevBt imgBt">‹</button>
        <button class="nextBt imgBt">›</button>
        ${game.short_screenshots.slice(0, 6).map(ss => `<img src="${ss.image}">`).join('')}
        </div>
            
            <div class="post_text">
            <span>이름 : ${game.name}</span>
            <span>장르 : ${game.genres.slice(0, 2).map(g => g.name).join(', ')}</span>
            <span>평점 : ${game.rating}</span>           
            </div>
        </div>`;
                });
            //모든게임의 wrapper를 불러오기
            const gameWrapper = document.querySelectorAll("div > .img-wrapper");
            gameWrapper.forEach((wrapper) => {
                //img-wrapper 에서 개별적으로 불러오기
                const imgBt = wrapper.querySelectorAll(".imgBt");
                const gameimg = wrapper.querySelectorAll("img");
                let gameImgIndex = 0;

                gameimg.forEach((img, index) => {
                    img.style.display = index === 0 ? "block" : "none";
                })

                imgBt.forEach((button) => {
                    button.addEventListener("click", (ev) => {
                        //현재 이미지 숨기기
                        gameimg[gameImgIndex].style.display = "none";
                        const imgChange = ev.target.className.includes("prevBt") ? -1 : 1;
                        //인덱스 계산 (배열 양끝에서 순환)
                        gameImgIndex = (gameImgIndex + imgChange + gameimg.length) % gameimg.length;
                        gameimg[gameImgIndex].style.display = "block";
                    })
                })

            });
        });
};

//클릭시 변경될 화면
document.querySelectorAll(".subpanel a").forEach(a => {
    a.addEventListener("click", () => {
        const genre = a.dataset.genre;
        const ordering = a.dataset.ordering;
        const subpanel = a.innerText;
        const parentSpan = a.closest('span[data-subpanel]');
        const mainText = parentSpan ? parentSpan.firstChild.textContent.trim() : '';
        // input이 있으면 그 값, 없으면 기본 날짜 사용
        const currentStart = startDay?.value || firstDay;
        const currentEnd = endDay?.value || firstDay;

        currentGenre = genre;
        currentOrdering = ordering;
        post.innerHTML = mainText + " " + subpanel;

        loadGame(genre, ordering, currentStart, currentEnd, "");
        daybt.style.display = "inline";
    });
});

//변경된 날짜에 맞는 게임표시
usdaybt.addEventListener("click", () => {
    const userStartDay = startDay.value
    const userEndDay = endDay.value

    loadGame(currentGenre, currentOrdering, userStartDay, userEndDay, "");
});


//게임 검색
search.addEventListener("keydown", (enter) => {
    if (enter.key === "Enter") {
        const searchUser = search.value.trim();

        if (searchUser) {
            post.innerHTML = `게임검색`;
            loadGame("", "", "", "", searchUser);
        } else {
            alert("검색어를 입력해주세요")
        }
    }
});