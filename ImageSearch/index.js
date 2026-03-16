const key = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
let inputData = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const searchResults = document.querySelector('.search-results');
const showMoreBtn = document.querySelector('#show-more-button');

let page = 1;
let picturesHtml = ''


async function searchImages(){

const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData.value}&client_id=${key}`;

    let data = ""

    try {
            const response = await fetch(url);
            data = await response.json();
        } catch (error) {
            console.error("Error fetching images:", error);
        }

        for (let i = 0; i < data.results.length; i++) {
            const imgSrc = data.results[i].urls.full;
            const description = (data.results[i].description) ? data.results[i].description : `${inputData.value}`;
            const linkTo = data.results[i].links.html;
            
                picturesHtml += `
                <div class="search-result">
                    <img
                    src="${imgSrc}"
                    alt="image"
                    />
                    <a
                    href="${linkTo}"
                    target="_blank"
                    rel="noopener noreferrer"
                    >${description}</a
                    >
                </div>
                `
        }

        searchResults.innerHTML = picturesHtml;

}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    page = 1;
    picturesHtml = ''
    searchImages();
    showMoreBtn.addEventListener('click', () => {
        page++;
        searchImages();
    })
})

