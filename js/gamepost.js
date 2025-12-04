const API_KEY = "4db8554f6c524aacb7f4bd32f85783f8";
const BASE_URL = "https://api.rawg.io/api/games";
const mygameList = document.querySelector("#game-list");
const myGameSlugs = [
    "monster-hunter-wilds",
    "elden-ring-nightreign",
    "satisfactory",
    "v-rising",
    "factorio",
    "sephiria"
];

const myGame = myGameSlugs.map(slug =>
    fetch(`${BASE_URL}/${slug}?key=${API_KEY}`)
    .then(res => res.json())
);

Promise.all(myGame).then(games => {
    mygameList.innerHTML ='';
    games.forEach(game => {
        mygameList.innerHTML +=`
        <div>
            <img src="${game.background_image}">
            <p>${game.name}</p>
            <p>${game.genres.slice(0, 2).map(g => g.name).join(', ')}</p>
        </div>`;
    });
});

const rpgGame = () => {
const gameList = fetch(`${BASE_URL}?key=${API_KEY}&genres=role-playing-games-rpg`)
    .then(res => res.json())
    
}


