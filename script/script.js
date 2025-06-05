const API_URL = "http://10.69.0.17:3002/v1"
const results = document.querySelector(".results")

const MONTHS = ["Janvier", "Févrirer", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Ooctobre", "Novembre", "Decembre"]

const labels = document.querySelectorAll("form label")
for(let label of labels) {
    const input = label.querySelector("input[type=date]")
    const p = label.querySelector("p")
    input.addEventListener("input", e => {
        p.innerHTML = input.value.replaceAll("-", "/")
    })
    label.addEventListener("click", e => {
        e.preventDefault();
        input.showPicker();
    })
}

function createArticle(data) {  
    const article = Object.assign(document.createElement("article"), {className: "result"});
    article.appendChild(Object.assign(document.createElement("img"), {src: data.image, alt: data.name}))
    const contents = article.appendChild(Object.assign(document.createElement("div"), {className: "contents"}))
    const stars = contents.appendChild(Object.assign(document.createElement("div"), {className: "stars stars-" + data.melliferous}))
    for(let _ = 0; _ < data.melliferous; _++) stars.appendChild(Object.assign(document.createElement("span"), {className: "mdi mdi-star"}))
    contents.appendChild(Object.assign(document.createElement("h3"), {innerHTML: data.name}))
    const flowering = contents.appendChild(Object.assign(document.createElement("div"), {className: "flowering"}))
    const floraison = flowering.appendChild(Object.assign(document.createElement("span"), {className: "light"}))
    floraison.appendChild(Object.assign(document.createElement("span"), {clasName: "mdi mdi-bee"}))
    floraison.appendChild(document.createTextNode("Floraison"));
    flowering.appendChild(document.createTextNode(MONTHS[data.startBloom - 1] + " - " + MONTHS[data.endBloom - 1]))
    contents.appendChild(Object.assign(document.createElement("p"), {innerHTML: data.description}))
    const info = contents.appendChild(Object.assign(document.createElement("div"), {className: "info"}))
    const propolis = info.appendChild(document.createElement("div"))
    propolis.appendChild(Object.assign(document.createElement("p"), {className: "light", innerHTML: "Propolis"}))
    propolis.appendChild(Object.assign(document.createElement("span"), {className: data.propolis == 0 ? "mdi mdi-close-thick" : "mdi mdi-check-bold"}))
    const nectar = info.appendChild(document.createElement("div"))
    nectar.appendChild(Object.assign(document.createElement("p"), {className: "light", innerHTML: "Nectar"}))
    if(data.nectar == 0) {
        nectar.appendChild(Object.assign(document.createElement("span"), {className: "mdi mdi-close-thick"}))
    } else {
        nectar.appendChild(Object.assign(document.createElement("p"), {className: "value", innerHTML: data.nectar}))
        nectar.appendChild(Object.assign(document.createElement("progress"), {value: data.nectar, max: "3"}))
    }
    const pollen = info.appendChild(document.createElement("div"))
    pollen.appendChild(Object.assign(document.createElement("p"), {className: "light", innerHTML: "pollen"}))
    if(data.pollen == 0) {
        pollen.appendChild(Object.assign(document.createElement("span"), {className: "mdi mdi-close-thick"}))
    } else {
        pollen.appendChild(Object.assign(document.createElement("p"), {className: "value", innerHTML: data.pollen}))
        pollen.appendChild(Object.assign(document.createElement("progress"), {value: data.pollen, max: "3"}))
    }
    return article
}

const form = document.querySelector("form")

form.addEventListener("submit", async e => {
    e.preventDefault();
    const query = Object.entries(Object.fromEntries(new FormData(form).entries())).filter(e => e[1]).map(e => e.join("=")).join("&");
    const url = `${API_URL}/flowers?${query}`
    const req = await fetch(url)
    const data = await req.json();
    results.innerHTML = "";
    for(let element of data) {
        results.appendChild(createArticle(element))
    }
})