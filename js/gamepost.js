const baseDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() -1);
const startDay = document.querySelector("#firstDay");
const endDay = document.querySelector("#lastDay");
const firstDay = baseDate(oneYearAgo);
const lastDay = baseDate(today);
startDay.value = firstDay;
endDay.value = lastDay;

const dayChange = document.querySelector(".daych")
const post = document.querySelector("#new_post")
const daybt = document.querySelector(".dayck")
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

const loadGame = (genre, ordering, firstDay, lastDay) => {
    //태그를 쓸일이없었따...
    // let url = `${BASE_URL}?key=${API_KEY}`;
    // const tagList = ['building', 'automation', 'resource-management', 'roguelike'];

    // if (tagList.includes(genre)) {
    //     url += `&tags=${genre}`;
    // } else {
    //     url += `&genres=${genre}`;
    // }
    // url += `&ordering=${ordering}`;

    fetch(`${BASE_URL}?key=${API_KEY}&genres=${genre}&ordering=${ordering}&page_size=50&dates=${firstDay},${lastDay}`)
        .then(res => res.json())
        .then(data => {
            mygameList.innerHTML = ''
            data.results
                .filter(game => game.background_image) //이미지 있는거만 필터
                .slice(0, 20)  //20개까지 표기
                .forEach(game => {
                    mygameList.innerHTML += `
        <div>
            <img src="${game.background_image}">
            <p>${game.name}</p>
            <p>${game.genres.slice(0, 2).map(g => g.name).join(', ')}</p>
        </div>`;
                });
        });
};
// 유저 데이 입력값 불러오기
dayChange.addEventListener("click", () =>{
    const userStartDay = startDay.value
    const userEndDay = endDay.value
    loadGame(c)
});
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
        const currentEnd = endDay?.value || lastDay;

        post.innerHTML = mainText + " " + subpanel;
        loadGame(genre, ordering, currentStart, currentEnd);
        daybt.style.display = "inline";
    });
});

