import { Article } from "./types";

const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const calculateBtn =
  (document.getElementById("calculate-btn") as HTMLAnchorElement) ||
  console.log("calculate-btn nicht vorhanden.");
const calculatorOutput =
  (document.getElementById("calculator-output") as HTMLDivElement) ||
  console.log("calculator-output nicht vorhanden.");
const inputBodySize = document.getElementById("body-size") as HTMLInputElement;
const inputWeight = document.getElementById("weight") as HTMLInputElement;
const inputAge = document.getElementById("age") as HTMLInputElement;
const inputActivity = document.getElementById("activity") as HTMLSelectElement;
const blogOutputNews = document.getElementById(
  "dynamic-items"
) as HTMLDivElement;

function userSearch(input: string, inputUserLang: string, sort: string) {
  const searchLinkAPI = `https://newsapi.org/v2/everything?q=${input}&apiKey=${apiKey}&language=${inputUserLang}&sortBy=${sort}`;

  fetch(searchLinkAPI)
    .then((response) => response.json())
    .then((data) => {
      if (data.articles.length === 0) {
        window.alert("Keine Ergebnisse zu diesem Suchbegriff gefunden!");
        return;
      } else {
        data.articles.forEach((element: Article, index: number) => {
          if (index <= 3) {
            const newArticle = document.createElement("div");
            newArticle.className = "item-news";
            const newHeadline = document.createElement("h3");
            newHeadline.textContent = element.title;
            const description = document.createElement("p");
            description.textContent = element.description;
            const image = document.createElement("img");

            image.src = element.urlToImage || "kein Bild";
            const articleBtn = document.createElement("a");
            articleBtn.className = "plan-btn";
            articleBtn.innerText = "Zum Artikel";
            articleBtn.href = element.url;

            newArticle.append(newHeadline, image, description, articleBtn);
            console.log(newArticle);
            blogOutputNews.appendChild(newArticle);
          } else {
            return console.log("ende");
          }
        });
      }
    })
    .catch((error) => console.log("Fehlernachricht: ", error));
}

userSearch("healthy", "en", "relevancy");

function calculateCalories(
  gender: string,
  weight: number,
  height: number,
  age: number,
  pal: number
): number {
  let bmr: number;

  if (gender === "male") {
    bmr = 66.47 + 13.7 * weight + 5 * height - 6.8 * age;
  } else {
    bmr = 655.1 + 9.6 * weight + 1.8 * height - 4.7 * age;
  }

  return bmr * pal;
}

calculateBtn.addEventListener("click", () => {
  const totalCalories = Math.round(
    calculateCalories(
      "female",
      Number(inputWeight.value),
      Number(inputBodySize.value),
      Number(inputAge.value),
      Number(inputActivity.value)
    )
  );

  calculatorOutput.innerText = `Gesamtkalorien am Tag: ${totalCalories} kcal`;

  console.log(totalCalories);
});

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        entry.target.classList.remove("not-in-view");
      } else {
        entry.target.classList.remove("in-view");
        entry.target.classList.add("not-in-view");
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: [0, 0.1, 1],
  }
);

const tags = document.querySelectorAll(".left, .right");

tags.forEach((tag) => {
  intersectionObserver.observe(tag);
});
