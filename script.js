const API_KEY = "bc7e91c481ef4b80be95e384110a9a1d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("pakistan"));
async function fetchNews(qurey) {
  const res = await fetch(`${url}${qurey}&apikey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}
function bindData(articles) {
  const maincard = document.getElementById("maincard");
  const tempcard = document.getElementById("tempcard");
  maincard.innerHTML = "";
  articles.forEach((articles) => {
    if (!articles.urlToImage) return;
    const clonecard = tempcard.content.cloneNode(true);
    fillDataInCard(clonecard, articles);
    maincard.appendChild(clonecard);
  });
}
function fillDataInCard(clonecard, articles) {
  const newsImg = clonecard.querySelector("#newimage");
  const newsTitle = clonecard.querySelector("#cardheader");
  const newsSource = clonecard.querySelector("#cardheading2");
  const newsDesc = clonecard.querySelector("#cardpara");
  newsImg.src = articles.urlToImage;
  newsTitle.innerHTML = articles.title;
  
  const date = new Date(); 

  
  const options = {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);

  
  const sourceName = "BBC News"; 
  newsSource.innerHTML = `${sourceName} . ${formattedDate}`;

  newsDesc.innerHTML = articles.description;
  clonecard.firstElementChild.addEventListener("click", () => {
    window.open(articles.url, "_blank");
  });
}
function onNavItemClick(id) {
  fetchNews(id);
}

const searchbutton = document.getElementById("search-btn");
const searchtext = document.getElementById("search-item");

searchbutton.addEventListener("click", () => {
    const query = searchtext.value.trim(); 
    if (!query) return; 
    fetchNews(query); 
});
