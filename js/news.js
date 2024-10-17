"use strict"
//^ API NEWS Method : "https://newsapi.org/v2/everything?q=Apple&from=2024-10-10&to=2024-10-30&sortBy=popularity&apiKey=9f3db94efe874e31a2f2f671cdd5f7da", Method: "GET" 
//* HTML elements
// Container all news
const news = document.getElementById("news")
//* Functions
// Request and respone from API and DOM
async function getDetails() {
    let weatherAPINews = await fetch(`https://newsapi.org/v2/everything?q=Apple&from=2024-10-10&to=2024-10-30&sortBy=popularity&apiKey=9f3db94efe874e31a2f2f671cdd5f7da`)
    let allNews = await weatherAPINews.json()
    // loop for display all news in HTML
    for (let i = 0; i < allNews.articles.length; i++) {
        // Array for storage date each time
        let date = [] // [date , time]
        // Validtion is this news removed and image exist 
        if (allNews.articles[i].title !== "[Removed]" && allNews.articles[i].urlToImage !== null) {
            // Date and sent to date Array 
            date.push(allNews.articles[i].publishedAt.split("T"));
            // Display all in HTML  
            news.innerHTML += `
<div class="cardNews bg-transparent mb-1 shadow-lg">
    <div class="">
        <div class="header">
            <div class="image" style="background-image: url('${allNews.articles[i].urlToImage}');background-repeat: no-repeat;background-size: cover;background-position: center;">
            <span class="tag">${allNews.articles[i].author || "Author not exist"}</span>
            </div>
                <div class="date p-2">
                    <span class="fs-6 text-white" style="font-weight:600">${date[0][0]}</span>
                </div>
        </div>
        <div class="info px-2">
            <a rel="noopener noreferrer" href="${allNews.articles[i].url}" class="block text-white" target="_blank">
            <span class="title pt-0">${allNews.articles[i].title}</span>
            </a>
            <p class="description" style="color:whitesmoke;font-weight:300">${allNews.articles[i].description}</p>
        </div>
                </div>
              </div>        
              `
        }


    }
}
getDetails()