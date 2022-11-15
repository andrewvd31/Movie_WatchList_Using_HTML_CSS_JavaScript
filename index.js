const inputSearch = document.getElementById('movie-input-search')
const searchBtn = document.getElementById('search-btn')
const movieSection = document.getElementById('movie-section')
const emptyMenu = document.getElementById('empty-time')
const noResult = document.getElementById('unable-to-find')
let inputSearchValue = ""
let dataArray = []
let movieDetails = "" 
let movieArray = []

if (inputSearchValue === ""){
    emptyMenu.style.display = "block"
}

inputSearch.addEventListener('keyup',()=>{
    inputSearchValue = inputSearch.value
    emptyMenu.style.display = "none"
    noResult.style.display = "none"
        if (inputSearchValue === ""){
            movieSection.style.display = "none"
            emptyMenu.style.display = "block"
            inputSearchValue = ""
            dataArray = []
            movieDetails = ""
        }
})

function titleNames(datavalues){
    fetch(`https://www.omdbapi.com/?apikey=be336b83&t=${datavalues.Title}`)
        .then(res=>res.json())
        .then(dataTitle=>{ 
            movieDetails += 
            `<div class="img-section">
                    <img src="${dataTitle.Poster}" alt="N/A">
            </div>
            <div class="description-section">
                <h3>${dataTitle.Title}<span class="movie-rating"><i class="fa-solid fa-star"></i></span>${dataTitle.imdbRating}</h3>
                <div class="short-description">
                    <span class="time-minutes">${dataTitle.Runtime}</span>
                    <span class="genre">${dataTitle.Genre}</span>
                </div>
                <p class="movie-description">${dataTitle.Plot}</p>
            </div>
            <div>
                <hr>
            </div>
            `
            movieArray.push(movieDetails)
    })
}

searchBtn.addEventListener('click',searchBtnClick)

function searchBtnClick(){
    inputSearchValue = inputSearch.value
    fetch(`https://www.omdbapi.com/?apikey=be336b83&s=${inputSearchValue}`)
        .then(res=>res.json())
        .then(data=>{
            dataArray.push(data)
            movieSection.style.display = "block"
            if (data.Response == "False")
            {
                noResult.style.display = "block"
                movieSection.style.display = "none"
                emptyMenu.style.display = "none"
            }
            else{
                noResult.style.display = "none"
                movieSection.style.display = "block"
                for (let datavalues of dataArray[0].Search)
                {
                    titleNames(datavalues)
                }
                movieSection.innerHTML = movieDetails
            }
    })
}