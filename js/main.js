const apiKey = '8c8e1a50-6322-4135-8875-5d40a5420d86',
      apiPopular = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1',
      apiURLSearch = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

async function getMovies(url) {
    const response = await fetch(url, {
        headers: {
            'X-API-KEY': 'e000e6f7-0269-441f-8cfd-77ca10c67aee',
            'Content-Type': 'application/json',
        },
    });

    const responseData = await response.json();
    renderMovies(responseData);
}

getMovies(apiPopular);

function getClassByRate(rate) {
    if (rate >= 7) {
        return 'green';
    } else if (rate >= 5 && rate < 7) {
        return 'orange';
    } else {
        return 'red';
    }
}

function renderMovies(data) {
    const movies = document.querySelector('.movies');

    document.querySelector('.movies').innerHTML = '';

    data.films.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="movie__cover-inner">
                <img class="movie__cover" src="${movie.posterUrlPreview}" alt="image">
                <div class="movie__cover--darkened"></div>
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres[0].genre}</div>
                ${
                    movie.rating &&
                    `
                  <div class="movie__average movie__average--${getClassByRate(
                    movie.rating
                  )}">${movie.rating}</div>
                  `
                  }
            </div>
        `;

        movies.append(movieEl);
    });
}

const form = document.querySelector('form'),
      search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchURL = `${apiURLSearch}${search.value}`;
    if (search.value) {
        getMovies(searchURL);
    }

    search.value = '';
});