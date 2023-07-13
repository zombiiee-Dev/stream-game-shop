let loading = false;
let search = "";
let genre = "";
let page = 1;
let limit = 10;

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

genre = urlParams.get("genres") || "";

search = urlParams.get("q") || "";
console.log("search",search);
const gameInfo = document.querySelector(".game-wrapper");

// TODO
// hoan thanh search feature
// khi gõ "dota" và bấm nút search => index.html?q=dota
// khi user enter địa chỉ này index.html?q=dota => giá trị khởi đầu của thẻ input search sẽ là "dota"


const getInfoGame = async (
  search,
  genres,
  page,
  limit
) => {
  if (loading) return;
  gameInfo.innerHTML = `<div class="loader"> Loading ...</div>`;
  try {
    loading = true;
    let url = `https://steam-api-mass.onrender.com/games?q=${search}&page=${page}&limit=${limit}`;

    if (genres) {
      url += `&genres=${genres}`
    }

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log("error1",error);
  }
}

const renderGames = async () => {
  try {
    const dataGames = await getInfoGame(search, genre, page, limit);
    
    console.log(gameInfo);
    if (!gameInfo) return;
    gameInfo.innerHTML = "";
    dataGames.data.forEach((game) => {
      const x = document.createElement("a");
      x.setAttribute("class", "setImage");
      x.setAttribute("href", `detail.html?id=${game.appid}`);
      const price = game.price;
      x.innerHTML = `<div class="cover">
                      <img src=${game.header_image}/>
                      <div class="game-info" id=${game.appid}>
                        <p>${game.name}</p>
                        <p>${
                          price === 0
                            ? "free to play"
                            : price +"$"}</p>
                      </div>
                    </div>`;
      gameInfo.appendChild(x);
    });
  } catch (error) {
    console.log("Loichonay", error);
  }
};
renderGames();


const getGenresList = async() =>{
  const url_genres = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres?page=1&limit=7`
  try {
    const response = await fetch(url_genres);
    const data = await response.json();
    console.log(data);
    return data;
   
  } catch (error) {
    console.log("error-genres",error.message);
  }
}

const renderGenresList = async() =>{
  const dataGenres = await getGenresList();

  const genresList = document.querySelector(".genres");
  dataGenres.data.forEach(genres => {
    const x = document.createElement("a");
    x.classList.add("type-games");

    if (genre === genres.name) {
      x.classList.add("active");
    }
    x.textContent=genres.name;
    x.setAttribute("href",`index.html?genres=${genres.name}`); // ?key=value, setAttribute("id", `?id=${id})`
    genresList.appendChild(x);
  })
}

renderGenresList();

const getGenres = async(genres) =>{
  const url_genres = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?genres=${genres}`
  try {
    const response = await fetch(url_genres);
    const data = await response.json();
    console.log(data);
    return data;
   
  } catch (error) {
    console.log("error-genres",error.message);
  }
  }
const renderGenres = async(genres)=>{
      const dataGenres = await getGenres(genres);
      const gameInfo = document.querySelector(".game-wrapper");
    console.log(gameInfo);
    if (!gameInfo) return;
    gameInfo.innerHTML = "";
    dataGenres.data.forEach((game) => {
      const x = document.createElement("a");
      x.setAttribute("class", "setImage");
      x.setAttribute("href", `index.html?genres=${genres}`);
      const price = game.price;
      x.innerHTML = `<div class="cover">
                      <img src=${game.header_image}/>
                      <div class="game-info" id=${game.appid}>
                        <p>${game.name}</p>
                        <p>${
                          price === 0
                            ? "free to play"
                            : price +"$"}</p>
                      </div>
                    </div>`;
      gameInfo.appendChild(x);
    });      
}

// const genresMenu = document.querySelector(".genres");
// const valueClick = genresMenu.addEventListener("click", (e) => {
//   const click = e.target;
//   const value = e.target.innerText.toLowerCase();
//   if(click.id==="game-action"){changeMenu(click);} 
//   if(click.id==="game-casual"){changeMenu(click);} 
//   if(click.id==="game-Strategy"){changeMenu(click);} 
//   if(click.id==="game-Adventure"){changeMenu(click);} 
//   if(click.id==="game-RPG"){changeMenu(click);} 
//   if(click.id==="game-Simulation"){changeMenu(click);}
//   if(click.id==="game-Free To Play"){changeMenu(click);}    
//   renderGenres(value);
// });

// let selectedItem = null;
// function changeMenu (click){
//   if (selectedItem) {
//     selectedItem.style.color = "";
//     selectedItem.style.fontSize = "1.2rem";
//   }
//   if (selectedItem === click) {
//     selectedItem = null;
//   } else {
//     click.style.color = "#f56a1e";
//     click.style.fontSize = "1.8rem";
//     selectedItem = click;
//   }
// }
  
const handleSearch = (input) => {
  if (input) {
    window.location.href = `index.html?genres=${input}&q=${input}`;
  }
}; 


const searchForm = document.querySelector("#searchForm");   
const searchInput = document.querySelector(".search");  
searchInput.addEventListener("submit",(e)=>{
    e.preventDefault();
    let inputSearch = e.target.searchForm.value;
    handleSearch(inputSearch);
    })
const searchImg = document.querySelector("#search-img");
  searchImg.addEventListener("click",(e)=>{
  e.preventDefault();
  let inputSearch = searchInput.value;
  handleSearch(inputSearch);
})


