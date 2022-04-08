console.log("These is my javasript file for news website");

//initialize the news api paramenter
let country = "in";
let apikey = "b2ece32bb0e748dbbc3cb4e5d5d70c44";
// grab the news container.
let newsAccordion = document.getElementById("newsAccordion");

//create an ajax get request.
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apikey}`,
  true
);
xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText); //this return the response in string, so using parse method converting the string in the object.
    let articles = json.articles;
    console.log(articles);
    let newshtml = "";
    articles.forEach(function(element, index){
      //  console.log(element, index);
      let news = `
            <div class="card">
            <h2 class="accordion-header" id="heading${index}">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse${index}"
                aria-expanded="true"
                aria-controls="collapse${index}"
              >
              <b>Breaking News ${index+1}:</b> ${element["title"]}
              </button>
            </h2>
            <div
              id="collapse${index}"
              class="accordion-collapse collapse "
              aria-labelledby="heading${index}"
              data-bs-parent="#newsAccordion"
            >
              <div class="accordion-body">${element["content"]}. <a href="${element["url"]}" target="_blank">Read more here</a></div>
            </div>
            </div>
      `;
      newshtml += news;
    });
    newsAccordion.innerHTML = newshtml;
  }
   else {
    console.log("some error occured");
  }
};
xhr.send();
