const apikey = "8a2386120c6d475fb2322c0f5669f5ec";


const blogcontainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input')
const searchbutton = document.getElementById('search-button')

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=8&apikey=${apikey}`;
        // const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=8&apikey=${apikey}`;
        const response  = await fetch(apiUrl);
        const data = await response.json();
            return data.articles;         

    } catch (error) {
        console.error("Error fetching random news",error);
        return [];

    }

}

searchbutton.addEventListener("click", async () =>{
    const query = searchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)        

        }catch(error){
            console.log("Error fetching random news by query",error);
        }
    }
})
async function fetchNewsQuery(query){
    try {
        const apiUrl = ` https://newsapi.org/v2/everything?q=${query}&pageSize=8&apikey=${apikey}`;
        // const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=8&apikey=${apikey}`;
        const response  = await fetch(apiUrl);
        const data = await response.json();
            return data.articles;         

    } catch (error) {
        console.error("Error fetching random news",error);
        return [];

    }


}

function displayBlogs(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((articles) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = articles.urlToImage;
        img.alt = articles.title;
        const title = document.createElement("h2");
        title.textContent = articles.title;
         const description = document.createElement("p");

         const truncatedDes = articles.description.length > 120 ?
          articles.description.slice(0,120) + "....." :articles.description

         description.textContent= truncatedDes;
        
         blogcard.appendChild(img);
         blogcard.appendChild(title);
         blogcard.appendChild(description);
         blogcard.addEventListener("click",() =>{
            window.open(articles.url, "__blank")
         } )
         blogcontainer.appendChild(blogcard);
    })
    
}

(async () =>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }  catch (error){ 
        console.error("Error fetching random news",
        error);
    }
})();