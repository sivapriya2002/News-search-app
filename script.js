const apiKey = '1ee813727d48de2f292b4f8a23015fa1'
const mainContainer = document.getElementById('main-container')
const search = document.getElementById('search')
const button = document.getElementById('button')

async function fetchRandomNews() {
    try {
        const apiUrl = `
        https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=8&apikey=${apiKey}`
        const res = await fetch(apiUrl);
        const data = await res.json();
        return data.articles;
    }
    catch (error) {
        console.log("Error fetching the random news");
        return [];
    }
}

button.addEventListener('click', async () => {
    const input = search.value.trim();
    if (input !== "") {
        const articles = await searchNews(input);
        displayBox(articles);
    }
})

async function searchNews(input) {
    try {
        const apiUrl = `
        https://gnews.io/api/v4/search?q=${input}&lang=en&country=in&max=8&apikey=${apiKey}`
        const res = await fetch(apiUrl);
        const data = await res.json();
        return data.articles;
    }
    catch (error) {
        console.log("Error searching the news", error);
        return [];
    }
}

function displayBox(art) {
    mainContainer.innerHTML = "";
    art.forEach((art) => {
        const card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("img");
        img.src = art.image;
        img.alt = art.title;
        const title = document.createElement("h2");
        // title.textContent = art.title
        if (art.title.length > 30) {
            title.textContent = art.title.slice(0, 30) + '...'
        } else {
            title.textContent = art.title
        }
        const para = document.createElement("p");
        // para.textContent = art.description;
        if (art.description.length > 80) {
            para.textContent = art.description.slice(1, 80) + '...'
        } else {
            para.textContent = art.descriptiona
        }

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(para);
        card.addEventListener('click', () => {
            window.open(art.url, "_blank")
        })
        mainContainer.appendChild(card);

    })
}

(async () => {
    try {
        const art = await fetchRandomNews();
        displayBox(art)
        console.log(art);
    } catch (error) {

    }
})();
